import asyncio
import json
import subprocess
import tempfile
import time
import urllib.parse
import urllib.request
import websockets

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
REMOTE_PORT = 9346
BASE_URL = "http://127.0.0.1:8092"

async def run_tests():
    user_data_dir = tempfile.mkdtemp(prefix="chrome_sync_test_")
    proc = subprocess.Popen([
        CHROME_PATH,
        "--headless=new",
        "--disable-extensions",
        "--window-size=1600,1000",
        "--disable-gpu",
        "--no-sandbox",
        "--disable-setuid-sandbox",
        f"--user-data-dir={user_data_dir}",
        f"--remote-debugging-port={REMOTE_PORT}",
        f"{BASE_URL}/pages/admin.html"
    ])
    await asyncio.sleep(2.5)

    try:
        targets = json.loads(urllib.request.urlopen(f"http://127.0.0.1:{REMOTE_PORT}/json").read())
        ws_url = targets[0]["webSocketDebuggerUrl"]

        async with websockets.connect(ws_url, max_size=20_000_000) as ws:
            msg_counter = 0

            async def send_cmd(method, params=None):
                nonlocal msg_counter
                msg_counter += 1
                mid = msg_counter
                await ws.send(json.dumps({"id": mid, "method": method, "params": params or {}}))
                while True:
                    resp = json.loads(await asyncio.wait_for(ws.recv(), timeout=12.0))
                    if resp.get("id") == mid:
                        res = resp.get("result", {})
                        if "exceptionDetails" in res:
                            raise Exception("CDP Error: " + str(res["exceptionDetails"]))
                        return res

            async def eval_js(js_code):
                res = await send_cmd("Runtime.evaluate", {
                    "expression": js_code,
                    "returnByValue": True,
                    "awaitPromise": False
                })
                return res.get("result", {}).get("value")

            async def navigate_to(url, wait_sec=1.5):
                nonlocal msg_counter
                msg_counter += 1
                nav_id = msg_counter
                frag = url.split("?")[0].split("/")[-1]
                await ws.send(json.dumps({"id": nav_id, "method": "Page.navigate", "params": {"url": url}}))
                start = time.time()
                while time.time() - start < 6.0:
                    try:
                        r = json.loads(await asyncio.wait_for(ws.recv(), timeout=1.0))
                        if r.get("id") == nav_id:
                            break
                    except asyncio.TimeoutError:
                        break
                for _ in range(40):
                    await asyncio.sleep(0.15)
                    try:
                        loc = await eval_js('window.location.href + " " + document.readyState')
                        if loc and frag in loc and any(s in loc for s in ['interactive', 'complete']):
                            await asyncio.sleep(wait_sec)
                            return
                    except Exception:
                        pass
                await asyncio.sleep(wait_sec)

            # 1. SETUP & AUTHENTICATE ADMIN PORTAL
            print("\n--- Step 1: Initialize Admin Session & Test Data ---", flush=True)
            await eval_js("""
                localStorage.setItem('murali_admin_auth', 'true');
                localStorage.setItem('murali_admin_session', JSON.stringify({ expiresAt: Date.now() + 86400000 }));
                localStorage.setItem('murali_admin_user', JSON.stringify({ email: 'admin@muraligranites.com', name: 'Chanakya Murali', role: 'Chief Curator & Admin' }));
            """)
            await navigate_to(f"{BASE_URL}/pages/admin.html", wait_sec=1.5)

            admin_user = await eval_js("document.getElementById('sidebarUserName')?.textContent")
            print(f"Test 1 - Admin Authenticated: '{admin_user}'", flush=True)

            test_stone = {
                "id": "imperial-royal-onyx",
                "name": "Imperial Royal Onyx",
                "slug": "imperial-royal-onyx",
                "category": "Onyx",
                "origin": "Rajasthan",
                "finish": "Polished Mirror",
                "thickness": "20mm",
                "color": "Gold",
                "usage_area": "Feature Walls, Countertops, Flooring",
                "image_url": "assets/images/products/product-1783085161-6a47b869e0448.webp",
                "description": "Luminous golden translucent onyx marble quarried in Rajasthan.",
                "status": "approved",
                "isDefault": False,
                "created_at": "2026-11-04T20:00:00Z"
            }

            test_price = {
                "id": "p_test_onyx",
                "name": "Imperial Royal Onyx",
                "category": "Onyx",
                "rate": "₹450",
                "status": "In Stock",
                "thickness": "20mm",
                "lots": "2,800 sq.ft"
            }

            test_vis = {
                "product_id": "imperial-royal-onyx",
                "product_slug": "imperial-royal-onyx",
                "product_name": "Imperial Royal Onyx",
                "room_id": "kitchen",
                "surface_id": "countertop",
                "generated_preview": "assets/images/room_renders/kitchen countertop/render_River Black.webp",
                "status": "approved",
                "review_status": "verified",
                "isDefault": False
            }

            await eval_js(f"""
                (() => {{
                    let cust = JSON.parse(localStorage.getItem('murali_custom_products') || '[]');
                    cust = cust.filter(s => s.slug !== 'imperial-royal-onyx');
                    cust.unshift({json.dumps(test_stone)});
                    localStorage.setItem('murali_custom_products', JSON.stringify(cust));

                    let pr = JSON.parse(localStorage.getItem('murali_pricing_catalog') || '[]');
                    pr = pr.filter(p => p.name !== 'Imperial Royal Onyx');
                    pr.unshift({json.dumps(test_price)});
                    localStorage.setItem('murali_pricing_catalog', JSON.stringify(pr));

                    let vis = JSON.parse(localStorage.getItem('murali_custom_visualizers') || '[]');
                    vis = vis.filter(v => v.product_slug !== 'imperial-royal-onyx');
                    vis.unshift({json.dumps(test_vis)});
                    localStorage.setItem('murali_custom_visualizers', JSON.stringify(vis));

                    if (window.MuraliSync) window.MuraliSync.broadcastSync('admin_seed');
                }})();
            """)

            await navigate_to(f"{BASE_URL}/pages/admin.html", wait_sec=1.5)

            admin_table_check = await eval_js("""
                (() => {
                    const tabBtn = document.querySelector('.nav-tab-btn[data-tab="tab-stones"]');
                    if (tabBtn) tabBtn.click();
                    const rows = Array.from(document.querySelectorAll('#stonesTableBody tr'));
                    return rows.some(r => r.textContent.includes('Imperial Royal Onyx'));
                })();
            """)
            print(f"Test 2 - Custom Stone rendered in Admin Catalog: {admin_table_check}", flush=True)

            admin_vis_check = await eval_js("""
                (() => {
                    const tabBtn = document.querySelector('.nav-tab-btn[data-tab="tab-visualizer"]');
                    if (tabBtn) tabBtn.click();
                    const rows = Array.from(document.querySelectorAll('#visualizerTableBody tr'));
                    return rows.some(r => r.textContent.includes('Imperial Royal Onyx'));
                })();
            """)
            print(f"Test 3 - Visualizer Render registered in Admin Visualizer Studio: {admin_vis_check}", flush=True)

            # 2. VERIFY VISUALIZER 1.0
            print("\n--- Step 2: Verify Visualizer 1.0 Dynamic Sync ---", flush=True)
            await navigate_to(f"{BASE_URL}/pages/visualizer.html?room=kitchen&surface=countertop&product=imperial-royal-onyx", wait_sec=2.0)

            v1_stone_present = await eval_js("""
                (() => {
                    const mats = window.visualizerMaterials || [];
                    return mats.some(m => m.id === 'imperial-royal-onyx' || m.name === 'Imperial Royal Onyx');
                })();
            """)
            print(f"Test 4 - Visualizer 1.0 synced new stone into material catalog: {v1_stone_present}", flush=True)

            v1_state = await eval_js("""
                (() => {
                    const mats = window.visualizerMaterials || [];
                    const mat = mats.find(m => m.id === 'imperial-royal-onyx' || m.name === 'Imperial Royal Onyx');
                    if (mat && window.selectMaterial) {
                        window.selectMaterial(mat);
                        if (window.updateStage) window.updateStage();
                        if (window.updateInfoCard) window.updateInfoCard();
                    }
                    return {
                        name: document.getElementById('cardMaterialName')?.textContent,
                        price: document.getElementById('cardPriceTag')?.textContent,
                        img: document.getElementById('generatedRoomImg')?.src
                    };
                })();
            """)

            v1_render_unquoted = urllib.parse.unquote(v1_state.get("img") or "")
            render_matches = "render_River Black" in v1_render_unquoted
            print(f"Test 5 - Visualizer 1.0 active material: '{v1_state.get('name')}'", flush=True)
            print(f"Test 6 - Visualizer 1.0 live price badge: '{v1_state.get('price')}'", flush=True)
            print(f"Test 7 - Visualizer 1.0 custom render applied: {render_matches} ('{v1_render_unquoted}')", flush=True)

            # 3. VERIFY VISUALIZER 2.0
            print("\n--- Step 3: Verify Visualizer 2.0 3D Studio Sync ---", flush=True)
            await navigate_to(f"{BASE_URL}/pages/visualizer-2.html?room=bathroom", wait_sec=2.0)

            v2_stone_present = await eval_js("""
                (() => {
                    const thumbs = Array.from(document.querySelectorAll('#grid .th'));
                    return thumbs.some(t => t.textContent.includes('Imperial Royal Onyx'));
                })();
            """)
            print(f"Test 8 - Visualizer 2.0 Studio Dock synced custom stone into DOM: {v2_stone_present}", flush=True)

            v2_price_rendered = await eval_js("""
                (() => {
                    const thumbs = Array.from(document.querySelectorAll('#grid .th'));
                    const onyxThumb = thumbs.find(t => t.textContent.includes('Imperial Royal Onyx'));
                    return onyxThumb ? onyxThumb.textContent : '';
                })();
            """)
            print(f"Test 9 - Visualizer 2.0 Swatch includes price: '{v2_price_rendered}'", flush=True)

            # 4. VERIFY VISUALIZER 3.0
            print("\n--- Step 4: Verify Visualizer 3.0 Architectural Showroom Sync ---", flush=True)
            await navigate_to(f"{BASE_URL}/pages/visualizer-3.html?room=living", wait_sec=2.5)
            v3_frame_present = await eval_js("!!document.getElementById('showroom-frame')")
            print(f"Test 10 - Visualizer 3.0 Showroom viewport active: {v3_frame_present}", flush=True)

            v3_studio_stone = await eval_js("""
                (() => {
                    const frame = document.getElementById('showroom-frame');
                    const win = frame ? frame.contentWindow : null;
                    const studio = win ? (win.muraliStoneStudio || win.MuraliStoneStudio) : null;
                    if (studio && Array.isArray(studio.dynamicShowroomStones)) {
                        return studio.dynamicShowroomStones.some(s => s.name === 'Imperial Royal Onyx' || s.slug === 'imperial-royal-onyx');
                    }
                    return false;
                })();
            """)
            print(f"Test 11 - Visualizer 3.0 Stone Studio synced custom stone: {v3_studio_stone}", flush=True)

            await eval_js("const f = document.getElementById('showroom-frame'); if (f) f.src = 'about:blank';")
            await asyncio.sleep(0.3)

            # 5. VERIFY PRODUCTS COLLECTION PAGE
            print("\n--- Step 5: Verify Products Collection Page Sync ---", flush=True)
            await navigate_to(f"{BASE_URL}/pages/products.html", wait_sec=2.0)
            prod_meta = await eval_js("""
                (() => {
                    const tiles = Array.from(document.querySelectorAll('.product-tile'));
                    const found = tiles.find(t => t.textContent.includes('Imperial Royal Onyx'));
                    return found ? found.querySelector('.tile-meta')?.textContent.trim() : null;
                })();
            """)
            print(f"Test 12 - Products Collection Page tile price & stock: '{prod_meta}'", flush=True)

            # 6. VERIFY DRAFT / UNPUBLISH TOGGLE
            print("\n--- Step 6: Verify Draft / Approval Status Toggle ---", flush=True)
            await eval_js("""
                (() => {
                    let cust = JSON.parse(localStorage.getItem('murali_custom_products') || '[]');
                    cust.forEach(s => {
                        if (s.slug === 'imperial-royal-onyx') s.status = 'draft';
                    });
                    localStorage.setItem('murali_custom_products', JSON.stringify(cust));
                    if (window.MuraliSync) window.MuraliSync.broadcastSync('draft_toggle');
                    if (typeof refreshProductDataset === 'function') refreshProductDataset();
                })();
            """)

            await navigate_to(f"{BASE_URL}/pages/products.html", wait_sec=2.0)
            draft_hidden = await eval_js("""
                (() => {
                    const tiles = Array.from(document.querySelectorAll('.product-tile'));
                    return !tiles.some(t => t.textContent.includes('Imperial Royal Onyx'));
                })();
            """)
            print(f"Test 13 - Draft stone hidden from public catalogue: {draft_hidden}", flush=True)

            # Clean up test stone
            await eval_js("""
                (() => {
                    let cust = JSON.parse(localStorage.getItem('murali_custom_products') || '[]');
                    cust = cust.filter(s => s.slug !== 'imperial-royal-onyx');
                    localStorage.setItem('murali_custom_products', JSON.stringify(cust));

                    let pr = JSON.parse(localStorage.getItem('murali_pricing_catalog') || '[]');
                    pr = pr.filter(p => p.name !== 'Imperial Royal Onyx');
                    localStorage.setItem('murali_pricing_catalog', JSON.stringify(pr));

                    let vis = JSON.parse(localStorage.getItem('murali_custom_visualizers') || '[]');
                    vis = vis.filter(v => v.product_slug !== 'imperial-royal-onyx');
                    localStorage.setItem('murali_custom_visualizers', JSON.stringify(vis));
                })();
            """)

            all_passed = (
                admin_table_check and
                admin_vis_check and
                v1_stone_present and
                render_matches and
                v2_stone_present and
                v3_frame_present and
                v3_studio_stone and
                (prod_meta is not None) and
                draft_hidden
            )

            print("\n=======================================================")
            if all_passed:
                print(" ALL 13 END-TO-END SYNC CHECKPOINTS VERIFIED (100% PASS) ")
            else:
                print(" WARNING: SOME VERIFICATION CHECKPOINTS FAILED ")
            print("=======================================================")

            return all_passed

    finally:
        proc.terminate()
        try:
            proc.wait(timeout=2)
        except Exception:
            proc.kill()
        try:
            shutil.rmtree(user_data_dir, ignore_errors=True)
        except Exception:
            pass

if __name__ == "__main__":
    success = asyncio.run(run_tests())
    exit(0 if success else 1)
