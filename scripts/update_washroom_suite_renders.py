#!/usr/bin/env python3
import os
import json
from PIL import Image

base_dir = r'd:\projects\Web-Dev\chirag\ch01'
rooms_dir = os.path.join(base_dir, 'assets', 'images', 'rooms')
dir1 = os.path.join(base_dir, 'assets', 'images', 'room_renders', 'washroom suite floor')
dir2 = os.path.join(base_dir, 'assets', 'images', 'room_renders', 'washroom-suite-floor')
os.makedirs(dir1, exist_ok=True)
os.makedirs(dir2, exist_ok=True)

# 1. Update washroom-suite base room photo to native 16:9 wide-angle
base_src = r'C:\Users\Smart\.gemini\antigravity-ide\brain\91d257e6-ca06-4a83-9ff9-bb6980cccb84\suite_statuario_marble_1793114456292.jpg'
im_base = Image.open(base_src).resize((1376, 768), Image.Resampling.LANCZOS)
im_base.save(os.path.join(rooms_dir, 'washroom-suite.jpg'), 'JPEG', quality=95)
im_base.save(os.path.join(rooms_dir, 'washroom-suite.webp'), 'WEBP', quality=90)
print('Updated base washroom-suite.jpg and .webp to native 16:9 wide-angle.')

# 2. Save 3 verified renders for washroom-suite
suite_renders = [
    {
        'id': 'statuario-marble',
        'name': 'Statuario Marble',
        'category': 'Marble',
        'src': base_src,
        'slab': 'assets/images/products/product-1783085208-6a47b8986af97.png'
    },
    {
        'id': 'river-black',
        'name': 'River Black',
        'category': 'Granite',
        'src': r'C:\Users\Smart\.gemini\antigravity-ide\brain\91d257e6-ca06-4a83-9ff9-bb6980cccb84\suite_river_black_1793114404349.jpg',
        'slab': 'assets/images/products/product-1783138465-6a4888a145274.jpg'
    },
    {
        'id': 'black-pearl',
        'name': 'Black Pearl',
        'category': 'Granite',
        'src': r'C:\Users\Smart\.gemini\antigravity-ide\brain\91d257e6-ca06-4a83-9ff9-bb6980cccb84\suite_black_pearl_1793114492431.jpg',
        'slab': 'assets/images/products/product-1783138424-6a488878abc22.jpg'
    }
]

manifest_path = os.path.join(base_dir, 'assets', 'data', 'visualizer-manifest.json')
with open(manifest_path, 'r', encoding='utf-8') as f:
    manifest = json.load(f)

for item in suite_renders:
    im = Image.open(item['src']).resize((1376, 768), Image.Resampling.LANCZOS)
    p1 = os.path.join(dir1, f"render_{item['name']}.png")
    p2 = os.path.join(dir2, f"{item['id']}.png")
    p3 = os.path.join(dir2, f"{item['id']}.webp")
    im.save(p1, 'PNG')
    im.save(p2, 'PNG')
    im.save(p3, 'WEBP', quality=88)
    print(f"Processed Suite {item['name']}")
    
    # Update or add in manifest
    rel_preview = f"assets/images/room_renders/washroom suite floor/render_{item['name']}.png"
    rel_norm = f"assets/images/room_renders/washroom-suite-floor/{item['id']}.png"
    for e in manifest:
        if e['room_id'] == 'bathroom' and e['surface_id'] == 'floor' and e.get('design_id') == 'design-2' and e['product_id'] == item['id']:
            e['generated_preview'] = rel_preview
            e['normalized_render_path'] = rel_norm
            break
    else:
        manifest.append({
            'product_id': item['id'],
            'product_name': item['name'],
            'category': item['category'],
            'room_id': 'bathroom',
            'room_name': 'Bathroom',
            'design_id': 'design-2',
            'design_name': 'Freestanding Bathtub Suite',
            'surface_id': 'floor',
            'surface_name': 'Bathroom Flooring',
            'original_room_image': 'assets/images/rooms/washroom-suite.jpg',
            'original_stone_image': item['slab'],
            'generated_preview': rel_preview,
            'normalized_render_path': rel_norm,
            'width': 1376,
            'height': 768,
            'aspect_ratio': 1.7917,
            'aspect_ratio_match': True,
            'status': 'verified_architectural_render',
            'review_status': 'verified'
        })

with open(manifest_path, 'w', encoding='utf-8') as f:
    json.dump(manifest, f, indent=2)

print(f"Total manifest entries: {len(manifest)}")
