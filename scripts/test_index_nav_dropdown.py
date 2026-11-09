import asyncio
import json
import subprocess
import time
import urllib.request
import websockets
import base64

async def run_nav_test():
    chrome_path = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
    url = 'http://127.0.0.1:8092/index.html'

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
    await asyncio.sleep(3)

    try:
        req = urllib.request.urlopen('http://127.0.0.1:9222/json', timeout=5)
        tabs = json.loads(req.read().decode('utf-8'))
        tab = [t for t in tabs if 'index.html' in t.get('url', '') or '8092' in t.get('url', '')][0]
        ws_url = tab['webSocketDebuggerUrl']
        print("Connected to Tab WS:", ws_url)

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

            # Wait for DOM ready
            await asyncio.sleep(1)

            # Test 1: Check styles on index.html
            res = await eval_js("""
                (function() {
                    const card = document.getElementById('navCard3DShowroom');
                    const mainRow = card.querySelector('.nav-dropdown-main-row');
                    const popover = card.querySelector('.nav-rooms-popover');
                    const btn = card.querySelector('.nav-room-expand-btn');
                    
                    const cardStyle = window.getComputedStyle(card);
                    const popoverStyle = window.getComputedStyle(popover);
                    const mainRowStyle = window.getComputedStyle(mainRow);
                    
                    return {
                        cardFlexDirection: cardStyle.flexDirection,
                        popoverMaxHeight: popoverStyle.maxHeight,
                        popoverOpacity: popoverStyle.opacity,
                        popoverOverflow: popoverStyle.overflow,
                        mainRowDisplay: mainRowStyle.display,
                        hasExpandBtn: !!btn
                    };
                })()
            """)
            print("Computed styles test before expansion:", res)
            assert res['cardFlexDirection'] == 'column', f"Expected column flex direction, got {res['cardFlexDirection']}"
            assert res['popoverMaxHeight'] == '0px', f"Expected popover maxHeight 0px, got {res['popoverMaxHeight']}"
            assert res['popoverOpacity'] == '0', f"Expected popover opacity 0, got {res['popoverOpacity']}"

            # Open dropdown menu
            await eval_js("document.querySelector('.nav-dropdown').classList.add('open')")
            await asyncio.sleep(0.5)

            # Take screenshot of closed state
            ss_data = await send_cmd("Page.captureScreenshot", {"format": "png"})
            with open("scripts/screenshot_index_nav_closed.png", "wb") as f:
                f.write(base64.b64decode(ss_data["data"]))
            print("Saved scripts/screenshot_index_nav_closed.png")

            # Click the expand button to open rooms popover
            expand_res = await eval_js("""
                (function() {
                    const btn = document.querySelector('.nav-room-expand-btn');
                    btn.click();
                    const card = document.getElementById('navCard3DShowroom');
                    const popover = card.querySelector('.nav-rooms-popover');
                    const popoverStyle = window.getComputedStyle(popover);
                    return {
                        cardIsOpen: card.classList.contains('open'),
                        popoverOpacity: popoverStyle.opacity,
                        popoverMaxHeight: popoverStyle.maxHeight
                    };
                })()
            """)
            print("After clicking expand button:", expand_res)
            assert expand_res['cardIsOpen'] is True, "Expected card to have .open class after button click"

            await asyncio.sleep(0.6)
            # Check after transition
            res_expanded = await eval_js("""
                (function() {
                    const popover = document.querySelector('.nav-rooms-popover');
                    const popoverStyle = window.getComputedStyle(popover);
                    const r = popover.getBoundingClientRect();
                    return {
                        popoverOpacity: popoverStyle.opacity,
                        popoverMaxHeight: popoverStyle.maxHeight,
                        height: r.height,
                        width: r.width
                    };
                })()
            """)
            print("Computed styles after expansion transition:", res_expanded)
            assert float(res_expanded['popoverOpacity']) > 0.8, f"Expected opacity ~1, got {res_expanded['popoverOpacity']}"
            assert res_expanded['height'] > 50, f"Expected visible height > 50, got {res_expanded['height']}"

            # Take screenshot of expanded state
            ss_data_exp = await send_cmd("Page.captureScreenshot", {"format": "png"})
            with open("scripts/screenshot_index_nav_expanded.png", "wb") as f:
                f.write(base64.b64decode(ss_data_exp["data"]))
            print("Saved scripts/screenshot_index_nav_expanded.png")

            print("ALL DROPDOWN TESTS PASSED SUCCESSFULLY!")

    finally:
        proc.terminate()
        try:
            proc.wait(timeout=2)
        except:
            proc.kill()

if __name__ == '__main__':
    asyncio.run(run_nav_test())
