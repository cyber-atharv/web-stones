import asyncio
import json
import subprocess
import urllib.request
import websockets

async def test_bathroom_upload():
    chrome_path = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
    url = 'http://127.0.0.1:8092/pages/visualizer-2.html?room=bathroom'

    proc = subprocess.Popen([
        chrome_path,
        '--headless=new',
        '--window-size=412,915',
        '--disable-gpu',
        '--no-sandbox',
        '--remote-debugging-port=9222',
        url
    ])

    await asyncio.sleep(4)
    try:
        req = urllib.request.urlopen('http://127.0.0.1:9222/json', timeout=5)
        tabs = json.loads(req.read().decode('utf-8'))
        tab = [t for t in tabs if 'visualizer-2' in t.get('url', '')][0]
        async with websockets.connect(tab['webSocketDebuggerUrl']) as ws:
            msg_id = 0
            async def send_eval(expr):
                nonlocal msg_id
                msg_id += 1
                cmd = {'id': msg_id, 'method': 'Runtime.evaluate', 'params': {'expression': expr, 'returnByValue': True, 'awaitPromise': True}}
                await ws.send(json.dumps(cmd))
                while True:
                    res = json.loads(await ws.recv())
                    if res.get('id') == msg_id:
                        return res.get('result', {}).get('result', {}).get('value')

            # Wait for 3D bathroom ready
            for _ in range(30):
                ready = await send_eval("Boolean(window.skfbReady)")
                if ready:
                    break
                await asyncio.sleep(0.5)

            is_ready = await send_eval("Boolean(window.skfbReady)")
            print("Bathroom 3D Engine ready:", is_ready)

            # Upload custom photo in bathroom mode
            res = await send_eval('''
            (async () => {
                const c = document.createElement('canvas');
                c.width = c.height = 120;
                const ctx = c.getContext('2d');
                ctx.fillStyle = '#4A3B2C';
                ctx.fillRect(0,0,120,120);
                ctx.fillStyle = '#C5A059';
                ctx.fillRect(20,20,80,80);
                
                const blob = await new Promise(r => c.toBlob(r, 'image/jpeg'));
                const file = new File([blob], 'Client_Royal_Bronze.jpg', { type: 'image/jpeg' });
                
                await window.addFiles([file]);
                return {
                    appliedStone: window.surf[window.cur].src ? window.surf[window.cur].src.name : null,
                    isCustom: window.surf[window.cur].src ? window.surf[window.cur].src.isCustom : false,
                    surface: window.cur,
                    surfaceLabel: window.surf[window.cur].label
                };
            })()
            ''')
            print("Custom photo upload in bathroom result:", res)
            assert res['appliedStone'] == 'Client Royal Bronze'
            assert res['isCustom'] == True
            assert res['surface'] == 'bath_floor'
            print("BATHROOM CUSTOM STONE UPLOAD & AUTO-APPLY PASSED 100%!")
    finally:
        proc.kill()

if __name__ == '__main__':
    asyncio.run(test_bathroom_upload())

