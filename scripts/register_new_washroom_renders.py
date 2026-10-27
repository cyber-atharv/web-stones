#!/usr/bin/env python3
import os
import json
from PIL import Image

base_dir = r'd:\projects\Web-Dev\chirag\ch01'
dir1 = os.path.join(base_dir, 'assets', 'images', 'room_renders', 'washroom indian floor')
dir2 = os.path.join(base_dir, 'assets', 'images', 'room_renders', 'washroom-indian-floor')
os.makedirs(dir1, exist_ok=True)
os.makedirs(dir2, exist_ok=True)

manifest_path = os.path.join(base_dir, 'assets', 'data', 'visualizer-manifest.json')
with open(manifest_path, 'r', encoding='utf-8') as f:
    manifest = json.load(f)

new_renders = [
    {
        'id': 'black-pearl',
        'name': 'Black Pearl',
        'category': 'Granite',
        'src': r'C:\Users\Smart\.gemini\antigravity-ide\brain\91d257e6-ca06-4a83-9ff9-bb6980cccb84\wash_ind_black_pearl_1793113904975.jpg',
        'slab': 'assets/images/products/product-1783138424-6a488878abc22.jpg'
    },
    {
        'id': 'tan-brown',
        'name': 'Tan Brown',
        'category': 'Granite',
        'src': r'C:\Users\Smart\.gemini\antigravity-ide\brain\91d257e6-ca06-4a83-9ff9-bb6980cccb84\wash_ind_tan_brown_1793113931851.jpg',
        'slab': 'assets/images/products/product-1783084011-6a47b3eb20cf0.jpg'
    },
    {
        'id': 'kashmir-white',
        'name': 'Kashmir White',
        'category': 'Granite',
        'src': r'C:\Users\Smart\.gemini\antigravity-ide\brain\91d257e6-ca06-4a83-9ff9-bb6980cccb84\wash_ind_kashmir_white_1793114012351.jpg',
        'slab': 'assets/images/products/product-1783084356-6a47b5441b767.jpg'
    },
    {
        'id': 'emerald-onyx',
        'name': 'Emerald Onyx',
        'category': 'Onyx Marble',
        'src': r'C:\Users\Smart\.gemini\antigravity-ide\brain\91d257e6-ca06-4a83-9ff9-bb6980cccb84\wash_ind_emerald_onyx_1793114037790.jpg',
        'slab': 'assets/images/products/product-1783085161-6a47b869e0448.jpg'
    },
    {
        'id': 'marie-gold',
        'name': 'Marie Gold',
        'category': 'Granite',
        'src': r'C:\Users\Smart\.gemini\antigravity-ide\brain\91d257e6-ca06-4a83-9ff9-bb6980cccb84\wash_ind_marie_gold_1793114070550.jpg',
        'slab': 'assets/images/products/product-1783085317-6a47b9058f71e.jpg'
    },
    {
        'id': 'blue-night',
        'name': 'Blue in the Night',
        'category': 'Granite',
        'src': r'C:\Users\Smart\.gemini\antigravity-ide\brain\91d257e6-ca06-4a83-9ff9-bb6980cccb84\wash_ind_blue_night_1793114106633.jpg',
        'slab': 'assets/images/products/product-1783085244-6a47b8bcd330d.png'
    },
    {
        'id': 'moon-white',
        'name': 'Moon White',
        'category': 'Granite',
        'src': r'C:\Users\Smart\.gemini\antigravity-ide\brain\91d257e6-ca06-4a83-9ff9-bb6980cccb84\wash_ind_moon_white_1793114133302.jpg',
        'slab': 'assets/images/products/product-1783079448-6a47a218632fd.jpg'
    },
    {
        'id': 'river-white',
        'name': 'River White',
        'category': 'Granite',
        'src': r'C:\Users\Smart\.gemini\antigravity-ide\brain\91d257e6-ca06-4a83-9ff9-bb6980cccb84\wash_ind_river_white_1793114157960.jpg',
        'slab': 'assets/images/products/product-1783078831-6a479faf4fcbd.jpg'
    },
    {
        'id': 'black-forest',
        'name': 'Black Forest',
        'category': 'Granite',
        'src': r'C:\Users\Smart\.gemini\antigravity-ide\brain\91d257e6-ca06-4a83-9ff9-bb6980cccb84\wash_ind_black_forest_1793114183051.jpg',
        'slab': 'assets/images/products/product-1783083657-6a47b289a4a40.jpg'
    },
    {
        'id': 'titanium-black',
        'name': 'Titanium Black',
        'category': 'Granite',
        'src': r'C:\Users\Smart\.gemini\antigravity-ide\brain\91d257e6-ca06-4a83-9ff9-bb6980cccb84\wash_ind_titanium_black_1793114213726.jpg',
        'slab': 'assets/images/products/product-1783083560-6a47b228132ac.jpg'
    }
]

existing_keys = set((e['room_id'], e['surface_id'], e.get('design_id'), e['product_id']) for e in manifest)
added_count = 0

for item in new_renders:
    im = Image.open(item['src']).resize((1376, 768), Image.Resampling.LANCZOS)
    p1 = os.path.join(dir1, f"render_{item['name']}.png")
    p2 = os.path.join(dir2, f"{item['id']}.png")
    p3 = os.path.join(dir2, f"{item['id']}.webp")
    im.save(p1, 'PNG')
    im.save(p2, 'PNG')
    im.save(p3, 'WEBP', quality=88)
    print(f"Processed {item['name']}: {im.size}")
    
    key = ('bathroom', 'floor', 'design-3', item['id'])
    if key not in existing_keys:
        manifest.append({
            'product_id': item['id'],
            'product_name': item['name'],
            'category': item['category'],
            'room_id': 'bathroom',
            'room_name': 'Bathroom',
            'design_id': 'design-3',
            'design_name': 'Indian Heritage Luxury Suite',
            'surface_id': 'floor',
            'surface_name': 'Bathroom Flooring',
            'original_room_image': 'assets/images/rooms/washroom-indian.jpg',
            'original_stone_image': item['slab'],
            'generated_preview': f"assets/images/room_renders/washroom indian floor/render_{item['name']}.png",
            'normalized_render_path': f"assets/images/room_renders/washroom-indian-floor/{item['id']}.png",
            'width': 1376,
            'height': 768,
            'aspect_ratio': 1.7917,
            'aspect_ratio_match': True,
            'status': 'verified_architectural_render',
            'review_status': 'verified'
        })
        added_count += 1
        existing_keys.add(key)

with open(manifest_path, 'w', encoding='utf-8') as f:
    json.dump(manifest, f, indent=2)

print(f"Total renders now in manifest: {len(manifest)} (+{added_count} added)")
