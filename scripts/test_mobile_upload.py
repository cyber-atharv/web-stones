import asyncio
import json
import subprocess
import urllib.request
import websockets

async def test_mobile_upload():
    chrome_path = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
    url = 'http://127.0.0.1:8092/pages/visualizer-2.html'

    proc = subprocess.Popen([
        chrome_path,
        '--headless=new',
        '--window-size=412,915', # Mobile Viewport (Pixel 7 / iPhone Pro Max)
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

            # Wait for DOM ready
            for _ in range(20):
                ready = await send_eval("Boolean(document.querySelector('#btnCameraUpload') && document.querySelector('.th-upload-card'))")
                if ready:
                    break
                await asyncio.sleep(0.5)

            # 1. Check mobile upload banner and quick upload card exist
            banner_exists = await send_eval("Boolean(document.querySelector('#btnCameraUpload'))")
            card_exists = await send_eval("Boolean(document.querySelector('.th-upload-card'))")
            print('Test 1 - Mobile Upload Banner exists:', banner_exists)
            print('Test 2 - Grid Upload Card exists:', card_exists)
            assert banner_exists and card_exists

            # 2. Simulate user uploading a custom stone photo
            res = await send_eval('''
            (async () => {
                // Generate a 100x100 sample granite tile image
                const c = document.createElement('canvas');
                c.width = c.height = 100;
                const ctx = c.getContext('2d');
                ctx.fillStyle = '#C5A059';
                ctx.fillRect(0,0,100,100);
                ctx.fillStyle = '#1A1A1E';
                ctx.fillRect(10,10,30,30);
                ctx.fillRect(60,60,30,30);
                
                const blob = await new Promise(r => c.toBlob(r, 'image/jpeg'));
                const file = new File([blob], 'Client_Golden_Onyx.jpg', { type: 'image/jpeg' });
                
                // Trigger addFiles
                await window.addFiles([file]);
                return {
                    appliedStone: window.surf[window.cur].src ? window.surf[window.cur].src.name : null,
                    isCustom: window.surf[window.cur].src ? window.surf[window.cur].src.isCustom : false,
                    photoCount: window.photos.length,
                    firstCardTitle: document.querySelectorAll('#grid .th')[1].title,
                    hasCustomBadge: Boolean(document.querySelector('.badge-photo-custom'))
                };
            })()
            ''')
            print('Test 3 - Custom Upload Result:', res)
            assert res['appliedStone'] == 'Client Golden Onyx', f"Unexpected stone: {res['appliedStone']}"
            assert res['isCustom'] == True
            assert res['photoCount'] >= 1
            assert res['hasCustomBadge'] == True
            print('ALL MOBILE PHOTO UPLOAD TESTS PASSED 100%!')
    finally:
        proc.terminate()
        try:
            proc.wait(timeout=2)
        except:
            proc.kill()

if __name__ == '__main__':
    asyncio.run(test_mobile_upload())
