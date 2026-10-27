import re
import os
import json

BASE_DIR = 'ch01'

print("=" * 60)
print("UPDATING ALL WEBSITE FILES TO WEBP & SMOOTH ANIMATIONS")
print("=" * 60)

# ==============================================================================
# 1. UPDATE index.html
# ==============================================================================
index_path = os.path.join(BASE_DIR, 'index.html')
with open(index_path, 'r', encoding='utf-8') as f:
    index_html = f.read()

# Replace room images with .webp
index_html = index_html.replace('assets/images/rooms/kitchen.jpg', 'assets/images/rooms/kitchen.webp')
index_html = index_html.replace('assets/images/rooms/living-room.jpg', 'assets/images/rooms/living-room.webp')
index_html = index_html.replace('assets/images/rooms/bathroom.jpg', 'assets/images/rooms/bathroom.webp')
index_html = index_html.replace('assets/images/rooms/bedroom.jpg', 'assets/images/rooms/bedroom.webp')

# Replace product images in collection cards and STONES array with .webp
index_html = re.sub(r'assets/images/products/(product-[a-zA-Z0-9_\-]+)\.(?:jpg|png)', r'assets/images/products/\1.webp', index_html)

# Add CSS for ultra-smooth animations and hover interactions
index_animation_styles = """
/* ── Enhanced Butter-Smooth Animations & Interactions ── */
@keyframes goldShimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
.gold-shimmer {
  background: linear-gradient(90deg, #C9A96E 0%, #FFF3D6 25%, #C9A96E 50%, #E8C98A 75%, #C9A96E 100%);
  background-size: 200% auto;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  animation: goldShimmer 8s linear infinite;
}

@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 4px 14px rgba(201, 169, 110, 0.25); }
  50% { box-shadow: 0 8px 28px rgba(201, 169, 110, 0.55); }
}
.btn-gold {
  animation: pulseGlow 3.5s ease-in-out infinite;
  will-change: transform, box-shadow;
}

/* Micro-interactions & GPU-accelerated card hover */
.coll-card {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease !important;
  will-change: transform;
}
.coll-card:hover {
  transform: translateY(-8px) scale(1.015) !important;
  box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.85), 0 0 30px rgba(201, 169, 110, 0.28) !important;
  border-color: rgba(201, 169, 110, 0.5) !important;
}

.viz-room-card {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease !important;
  will-change: transform;
}
.viz-room-card:hover {
  transform: translateY(-8px) scale(1.025) !important;
  box-shadow: 0 24px 50px -10px rgba(0, 0, 0, 0.9), 0 0 35px rgba(201, 169, 110, 0.35) !important;
  border-color: var(--gold) !important;
}
.viz-room-card img {
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
}
.viz-room-card:hover img {
  transform: scale(1.1) !important;
}

.why-card {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease !important;
  will-change: transform;
}
.why-card:hover {
  transform: translateY(-6px) !important;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.75), 0 0 25px rgba(201, 169, 110, 0.22) !important;
  border-color: rgba(201, 169, 110, 0.45) !important;
}

.stat {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease !important;
}
.stat:hover {
  transform: translateY(-4px) !important;
  border-color: rgba(201, 169, 110, 0.5) !important;
}

/* Smooth reveal animation easing */
.rv {
  opacity: 0;
  transform: translateY(32px) scale(0.98);
  transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) !important;
  will-change: opacity, transform;
}
.rv.in {
  opacity: 1 !important;
  transform: translateY(0) scale(1) !important;
}
"""

if '/* ── Enhanced Butter-Smooth Animations & Interactions ── */' not in index_html:
    index_html = index_html.replace('</style>', index_animation_styles + '\n</style>')

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(index_html)
print("  [x] index.html updated with WebP & smooth micro-animations.")

# ==============================================================================
# 2. UPDATE products-showcase.js
# ==============================================================================
showcase_path = os.path.join(BASE_DIR, 'assets', 'js', 'products-showcase.js')
with open(showcase_path, 'r', encoding='utf-8') as f:
    showcase_js = f.read()

# Replace all product image URLs to .webp
showcase_js = re.sub(r'assets/images/products/(product-[a-zA-Z0-9_\-]+)\.(?:jpg|png)', r'assets/images/products/\1.webp', showcase_js)

# Add fallback handler in onerror so it tries .jpg if .webp is unavailable, then fallback icon
old_onerror = 'onerror="this.onerror=null;this.src=\'assets/images/favicon.png\';"'
new_onerror = 'onerror="if(!this.dataset.triedFallback){this.dataset.triedFallback=\'1\';this.src=this.src.replace(\'.webp\',\'.jpg\');}else{this.onerror=null;this.src=\'assets/images/favicon.png\';}"'
showcase_js = showcase_js.replace(old_onerror, new_onerror)

# Enhance product tile styling for buttery-smooth hover lift
old_tile_style = 'transition:transform 0.5s ease;'
new_tile_style = 'transition:transform 0.55s cubic-bezier(0.16, 1, 0.3, 1); will-change: transform;'
showcase_js = showcase_js.replace(old_tile_style, new_tile_style)

with open(showcase_path, 'w', encoding='utf-8') as f:
    f.write(showcase_js)
print("  [x] products-showcase.js updated with WebP & resilient fallback.")

# ==============================================================================
# 3. UPDATE api/products.json
# ==============================================================================
api_products_path = os.path.join(BASE_DIR, 'api', 'products.json')
if os.path.exists(api_products_path):
    with open(api_products_path, 'r', encoding='utf-8') as f:
        api_data = json.load(f)
    
    for item in api_data:
        if 'image_url' in item and item['image_url']:
            item['image_url'] = re.sub(r'\.(?:jpg|png)$', '.webp', item['image_url'])
    
    with open(api_products_path, 'w', encoding='utf-8') as f:
        json.dump(api_data, f, indent=2)
    print("  [x] api/products.json updated with WebP paths.")

# ==============================================================================
# 4. UPDATE visualizer.html GALLERY SHOWCASE & ACTIVE THUMB
# ==============================================================================
vis_path = os.path.join(BASE_DIR, 'visualizer.html')
with open(vis_path, 'r', encoding='utf-8') as f:
    vis_html = f.read()

# Replace gallery showcase images with .webp
vis_html = re.sub(r'assets/images/room_renders/gallery_showcase/([a-zA-Z0-9_\-]+)\.(?:jpg|png)', r'assets/images/room_renders/gallery_showcase/\1.webp', vis_html)
# Replace activeStoneThumb initial src with .webp
vis_html = re.sub(r'id="activeStoneThumb" src="assets/images/products/(product-[a-zA-Z0-9_\-]+)\.(?:jpg|png)"', r'id="activeStoneThumb" src="assets/images/products/\1.webp"', vis_html)

with open(vis_path, 'w', encoding='utf-8') as f:
    f.write(vis_html)
print("  [x] visualizer.html gallery showcase & thumb updated to WebP.")

# Also update update_visualizer.py so future regenerations keep activeStoneThumb as .webp
update_vis_path = os.path.join(BASE_DIR, 'scripts', 'update_visualizer.py')
with open(update_vis_path, 'r', encoding='utf-8') as f:
    upd_content = f.read()
upd_content = re.sub(r'assets/images/room_renders/gallery_showcase/([a-zA-Z0-9_\-]+)\.(?:jpg|png)', r'assets/images/room_renders/gallery_showcase/\1.webp', upd_content)
upd_content = re.sub(r'id="activeStoneThumb" src="assets/images/products/(product-[a-zA-Z0-9_\-]+)\.(?:jpg|png)"', r'id="activeStoneThumb" src="assets/images/products/\1.webp"', upd_content)
with open(update_vis_path, 'w', encoding='utf-8') as f:
    f.write(upd_content)
print("  [x] update_visualizer.py synchronized.")

print("=" * 60)
print("ALL WEBSITE FILES SUCCESSFULLY UPDATED TO WEBP & SMOOTH ANIMATIONS")
print("=" * 60)
