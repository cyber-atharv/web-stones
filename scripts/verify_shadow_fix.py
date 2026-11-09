import asyncio
import json
import subprocess
import time
import urllib.request
import websockets
import base64
from PIL import Image
import numpy as np

async def verify_fix():
    chrome_path = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
    url = 'http://127.0.0.1:8092/pages/visualizer-3.html?room=living'

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
        tab = [t for t in tabs if 'visualizer-3' in t.get('url', '')][0]
        ws_url = tab['webSocketDebuggerUrl']

        async with websockets.connect(ws_url, max_size=20*1024*1024) as ws:
            msg_id = 0

            async def send_cmd(method, params=None):
                nonlocal msg_id
                msg_id += 1
                cmd = {"id": msg_id, "method": method, "params": params or {}}
                await ws.send(json.dumps(cmd))
                while True:
                    res = json.loads(await ws.recv())
                    if res.get("id") == msg_id:
                        return res.get("result", {})

            async def eval_js(expr):
                r = await send_cmd("Runtime.evaluate", {"expression": expr, "returnByValue": True, "awaitPromise": True})
                return r.get("result", {}).get("value")

            # Wait for studio to be ready
            await asyncio.sleep(4)

            # Check floor lightmap M texture in live WebGL
            check_res = await eval_js("""
                (function() {
                    const iframe = document.getElementById('showroom-frame');
                    const iWin = iframe.contentWindow;
                    const app = iWin.showroomApp;
                    const scene = app && app.scene ? app.scene : null;
                    const floor = scene ? scene.getObjectByName('floor') : null;
                    if (!floor) return { error: 'No floor' };
                    
                    const mat = floor.material;
                    const texM = mat.uniforms.sTextureLightMapM.value;
                    
                    const canvas = document.createElement('canvas');
                    canvas.width = texM.image.width || 1024;
                    canvas.height = texM.image.height || 1024;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(texM.image, 0, 0);
                    
                    const crop = ctx.getImageData(0, 627, 632, 397).data;
                    let minR = 255, maxR = 0, sumR = 0, countLow = 0;
                    for (let i = 0; i < crop.length; i += 4) {
                        const r = crop[i];
                        if (r < minR) minR = r;
                        if (r > maxR) maxR = r;
                        sumR += r;
                        if (r < 30) countLow++;
                    }
                    
                    return {
                        minR: minR,
                        maxR: maxR,
                        meanR: (sumR / (crop.length / 4)),
                        countLow: countLow,
                        totalPixels: (crop.length / 4)
                    };
                })()
            """)
            print("Live floor lightmap M analysis on initial load:", check_res)
            assert check_res['countLow'] == 0, f"Expected 0 pixels < 30, got {check_res['countLow']}"
            assert check_res['minR'] >= 30, f"Expected minR >= 30, got {check_res['minR']}"

            # Click on Emerald Onyx Marble in the studio grid
            click_res = await eval_js("""
                (function() {
                    const iframe = document.getElementById('showroom-frame');
                    const doc = iframe.contentDocument || iframe.contentWindow.document;
                    const card = doc.querySelector('.msd-card[data-slug*=\"emerald-onyx\"]') ||
                                 doc.querySelector('.msd-card[data-slug*=\"marie-gold\"]') ||
                                 doc.querySelectorAll('.msd-card')[3];
                    if (card) {
                        card.click();
                        return { clicked: true, slug: card.getAttribute('data-slug') };
                    }
                    return { error: 'Card not found', cardsCount: doc.querySelectorAll('.msd-card').length };
                })()
            """)
            print("Click result:", click_res)
            await asyncio.sleep(2)

            # Check floor lightmap M again after applying stone
            check_after = await eval_js("""
                (function() {
                    const iframe = document.getElementById('showroom-frame');
                    const iWin = iframe.contentWindow;
                    const app = iWin.showroomApp;
                    const scene = app && app.scene ? app.scene : null;
                    const floor = scene ? scene.getObjectByName('floor') : null;
                    if (!floor) return { error: 'No floor after click' };
                    const mat = floor.material;
                    const texM = mat.uniforms.sTextureLightMapM.value;
                    
                    const canvas = document.createElement('canvas');
                    canvas.width = texM.image.width || 1024;
                    canvas.height = texM.image.height || 1024;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(texM.image, 0, 0);
                    
                    const crop = ctx.getImageData(0, 627, 632, 397).data;
                    let minR = 255, maxR = 0, sumR = 0, countLow = 0;
                    for (let i = 0; i < crop.length; i += 4) {
                        const r = crop[i];
                        if (r < minR) minR = r;
                        if (r > maxR) maxR = r;
                        sumR += r;
                        if (r < 30) countLow++;
                    }
                    
                    return {
                        matName: mat.name,
                        minR: minR,
                        maxR: maxR,
                        meanR: (sumR / (crop.length / 4)),
                        countLow: countLow
                    };
                })()
            """)
            print("Floor lightmap M after applying stone:", check_after)
            assert check_after['countLow'] == 0, f"Expected 0 pixels < 30, got {check_after['countLow']}"
            assert check_after['minR'] >= 30, f"Expected minR >= 30, got {check_after['minR']}"

            # Capture screenshot
            ss = await send_cmd("Page.captureScreenshot", {"format": "png"})
            with open("scripts/screenshot_verified_no_shadow.png", "wb") as f:
                f.write(base64.b64decode(ss["data"]))
            print("Saved scripts/screenshot_verified_no_shadow.png")

            # Analyze screenshot floor region
            im = Image.open('scripts/screenshot_verified_no_shadow.png')
            arr = np.array(im)
            center_crop = arr[500:800, 700:1100]
            dark_count = np.sum(np.all(center_crop[..., :3] < 30, axis=2))
            print("Center floor dark pixels (< 30) in screenshot:", dark_count)
            print("Mean brightness in center floor:", center_crop[..., :3].mean())

            print("========================================")
            print(" SHADOW ANOMALY RESOLVED SUCCESSFULLY! ")
            print("========================================")

    finally:
        proc.terminate()
        try:
            proc.wait(timeout=2)
        except:
            proc.kill()

if __name__ == '__main__':
    asyncio.run(verify_fix())
