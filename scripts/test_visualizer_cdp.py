import asyncio
import json
import subprocess
import time
import urllib.request
import websockets

async def run_cdp_test():
    chrome_path = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
    url = 'http://127.0.0.1:8092/pages/visualizer-2.html?room=bathroom'

    proc = subprocess.Popen([
        chrome_path,
        '--headless=new',
        '--window-size=1600,1000',
        '--disable-gpu',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--remote-debugging-port=9222',
        url
    ])

    print("Chrome started (PID:", proc.pid, ")")
    await asyncio.sleep(4)

    try:
        req = urllib.request.urlopen('http://127.0.0.1:9222/json', timeout=5)
        tabs = json.loads(req.read().decode('utf-8'))
        tab = [t for t in tabs if 'visualizer-2' in t.get('url', '')][0]
        ws_url = tab['webSocketDebuggerUrl']
        print("Connected to Tab WS:", ws_url)

        async with websockets.connect(ws_url) as ws:
            msg_id = 0

            async def send_eval(expr):
                nonlocal msg_id
                msg_id += 1
                cmd = {
                    "id": msg_id,
                    "method": "Runtime.evaluate",
                    "params": {"expression": expr, "returnByValue": True, "awaitPromise": True}
                }
                await ws.send(json.dumps(cmd))
                while True:
                    res = json.loads(await ws.recv())
                    if res.get("id") == msg_id:
                        return res.get("result", {}).get("result", {}).get("value")

            # 1. Verify bathroom DOM layout
            stage_active = await send_eval("document.querySelector('#skfb-stage').classList.contains('active')")
            view_disp = await send_eval("document.querySelector('#view').style.display")
            chips_count = await send_eval("document.querySelectorAll('#chips button').length")
            chips_text = await send_eval("Array.from(document.querySelectorAll('#chips button')).map(b => b.textContent)")

            print(f"Test 1 - Stage Active Class: {stage_active} (expected: True)")
            print(f"Test 2 - Three.js Canvas Display: '{view_disp}' (expected: 'none')")
            print(f"Test 3 - Surface Chips Count: {chips_count} (expected: 5)")
            print(f"Test 4 - Surface Chips: {chips_text}")

            assert stage_active == True, f"Expected skfb-stage to have active class, got {stage_active}"
            assert view_disp == 'none', f"Expected view to be none, got {view_disp}"
            assert chips_count == 5, f"Expected 5 chips, got {chips_count}"
            assert any("Floor" in c for c in chips_text), "Floor chip not found in chips"

            # 2. Wait for Sketchfab API to become ready (up to 30s)
            print("Waiting for 3D bathroom viewer to download and fire viewerready...")
            skfb_ready = False
            for sec in range(30):
                ready_val = await send_eval("Boolean(window.skfbReady && window.skfbApi)")
                mat_floor = await send_eval("Boolean(window.skfbMaterials && window.skfbMaterials.floor)")
                if ready_val and mat_floor:
                    skfb_ready = True
                    print(f"3D Bathroom Viewer is READY and materials mapped after {sec+1}s!")
                    break
                await asyncio.sleep(1)

            print(f"Test 5 - 3D Engine Ready: {skfb_ready}")
            assert skfb_ready, "3D bathroom viewer failed to report ready"

            # Wait a moment for initial materials to settle
            await asyncio.sleep(2)

            # 3. Test changing floor stone by clicking a stone swatch
            print("Ensuring Bathroom Floor chip is selected...")
            await send_eval("document.querySelectorAll('#chips button')[0].click()")
            await asyncio.sleep(0.5)

            initial_floor_tex = await send_eval("window.skfbMaterials.floor.channels.AlbedoPBR.texture ? window.skfbMaterials.floor.channels.AlbedoPBR.texture.uid : null")
            print(f"Initial floor texture UID: {initial_floor_tex}")

            print("Clicking stone swatch #3 in grid...")
            th_count = await send_eval("document.querySelectorAll('#grid .th').length")
            print(f"Found {th_count} stone thumbnails in grid")
            assert th_count > 0, "No stone thumbnails found in grid"

            await send_eval("document.querySelectorAll('#grid .th')[3].click()")
            await asyncio.sleep(1.0)

            toast_text = await send_eval("document.querySelector('#studio-toast') ? document.querySelector('#studio-toast').textContent : ''")
            print(f"Test 6 - Studio Toast Feedback: '{toast_text}'")
            assert len(toast_text) > 0 and ("Applying" in toast_text or "applied in 3D!" in toast_text), f"Toast unexpected: '{toast_text}'"

            # Wait for texture to upload (up to 8 seconds)
            new_floor_tex = None
            for _ in range(8):
                await asyncio.sleep(1.0)
                new_floor_tex = await send_eval("window.skfbMaterials.floor.channels.AlbedoPBR.texture ? window.skfbMaterials.floor.channels.AlbedoPBR.texture.uid : null")
                if new_floor_tex and new_floor_tex != initial_floor_tex:
                    break
            print(f"Test 7 - Updated floor texture UID: {new_floor_tex}")
            assert new_floor_tex is not None, "Floor texture UID is None after stone click"
            assert new_floor_tex != initial_floor_tex, "Floor texture UID did not change after stone click"

            # 4. Test format change: Grand Slab -> Tile 60x60
            print("Changing format to Tile 60x60...")
            await send_eval("document.querySelector('[data-struct=\"tile60\"]').click()")
            await asyncio.sleep(1.0)

            tile60_toast = await send_eval("document.querySelector('#studio-toast') ? document.querySelector('#studio-toast').textContent : ''")
            print(f"Test 8 - Tile 60x60 Toast: '{tile60_toast}'")
            assert "Tile 60×60" in tile60_toast or "Tile 60x60" in tile60_toast, f"Expected Tile 60x60 in toast, got: '{tile60_toast}'"

            # 5. Test Shower Wall tile customization
            print("Selecting Shower Wall chip...")
            await send_eval("document.querySelectorAll('#chips button')[2].click()")
            await asyncio.sleep(1)

            print("Clicking stone swatch #3 for Shower Wall...")
            await send_eval("document.querySelectorAll('#grid .th')[3].click()")
            await asyncio.sleep(1.0)

            wall_toast = await send_eval("document.querySelector('#studio-toast') ? document.querySelector('#studio-toast').textContent : ''")
            print(f"Test 9 - Wall Toast: '{wall_toast}'")
            assert len(wall_toast) > 0 and ("Applying" in wall_toast or "applied in 3D!" in wall_toast), f"Expected wall toast, got: '{wall_toast}'"

            await asyncio.sleep(2.0)
            wall_tex = await send_eval("window.skfbMaterials.wall.channels.AlbedoPBR.texture ? window.skfbMaterials.wall.channels.AlbedoPBR.texture.uid : null")
            print(f"Test 10 - Updated wall texture UID: {wall_tex}")
            assert wall_tex is not None, "Wall texture UID is None"

            # 6. Test camera presets
            print("Testing camera presets...")
            cam_floor_ok = await send_eval("Boolean(document.querySelector('#btnCamFloor'))")
            cam_wall_ok = await send_eval("Boolean(document.querySelector('#btnCamWall'))")
            cam_vanity_ok = await send_eval("Boolean(document.querySelector('#btnCamVanity'))")
            print(f"Test 11 - Camera buttons exist: floor={cam_floor_ok}, wall={cam_wall_ok}, vanity={cam_vanity_ok}")
            assert cam_floor_ok and cam_wall_ok and cam_vanity_ok, "Camera preset buttons missing"

            print("\n==========================================")
            print(" ALL 3D BATHROOM TILE TESTS PASSED 100%! ")
            print("==========================================")

    finally:
        proc.terminate()
        try:
            proc.wait(timeout=2)
        except:
            proc.kill()

if __name__ == '__main__':
    asyncio.run(run_cdp_test())
