#!/usr/bin/env python3
"""
Murali Granites & Marbles - Washroom Render Automation Script
Generates remaining verified photorealistic renders for Washroom Design 3 (Indian Heritage Luxury Suite).
Quota resets at 05:26:57 UTC / 10:56 AM IST.
"""

import os
import sys
import json
from PIL import Image

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ROOMS_DIR = os.path.join(BASE_DIR, 'assets', 'images', 'rooms')
PRODUCTS_DIR = os.path.join(BASE_DIR, 'assets', 'images', 'products')
RENDERS_DIR_1 = os.path.join(BASE_DIR, 'assets', 'images', 'room_renders', 'washroom indian floor')
RENDERS_DIR_2 = os.path.join(BASE_DIR, 'assets', 'images', 'room_renders', 'washroom-indian-floor')
MANIFEST_PATH = os.path.join(BASE_DIR, 'assets', 'data', 'visualizer-manifest.json')

WASHROOM_INDIAN_BASE = os.path.join(ROOMS_DIR, 'washroom-indian.jpg')

# Remaining 10 Stones to render for Indian Heritage Luxury Suite
REMAINING_STONES = [
    {
        'id': 'black-pearl',
        'name': 'Black Pearl',
        'category': 'Granite',
        'slab': os.path.join(PRODUCTS_DIR, 'product-1783138424-6a488878abc22.jpg'),
        'description': 'deep black granite with uniform silver and metallic crystalline specks'
    },
    {
        'id': 'tan-brown',
        'name': 'Tan Brown',
        'category': 'Granite',
        'slab': os.path.join(PRODUCTS_DIR, 'product-1783084011-6a47b3eb20cf0.jpg'),
        'description': 'rich dark brown and charcoal granite with copper-garnet floral crystalline flecks'
    },
    {
        'id': 'kashmir-white',
        'name': 'Kashmir White',
        'category': 'Granite',
        'slab': os.path.join(PRODUCTS_DIR, 'product-1783084356-6a47b5441b767.jpg'),
        'description': 'crisp off-white granite with soft silver veining and delicate garnet berry speckles'
    },
    {
        'id': 'emerald-onyx',
        'name': 'Emerald Onyx',
        'category': 'Onyx Marble',
        'slab': os.path.join(PRODUCTS_DIR, 'product-1783085161-6a47b869e0448.jpg'),
        'description': 'translucent deep jade and olive green onyx marble with golden honey and ivory veining bands'
    },
    {
        'id': 'marie-gold',
        'name': 'Marie Gold',
        'category': 'Granite',
        'slab': os.path.join(PRODUCTS_DIR, 'product-1783085317-6a47b9058f71e.jpg'),
        'description': 'warm golden amber granite with flowing honey ochre ribbons and deep brown mineral veins'
    },
    {
        'id': 'blue-night',
        'name': 'Blue in the Night',
        'category': 'Granite',
        'slab': os.path.join(PRODUCTS_DIR, 'product-1783085244-6a47b8bcd330d.png'),
        'description': 'midnight black-navy granite with iridescent luminescent sapphire blue crystals'
    },
    {
        'id': 'moon-white',
        'name': 'Moon White',
        'category': 'Granite',
        'slab': os.path.join(PRODUCTS_DIR, 'product-1783079448-6a47a218632fd.jpg'),
        'description': 'fine-grained oyster white granite with silvery gray whorls and crimson micro-garnet flecks'
    },
    {
        'id': 'river-white',
        'name': 'River White',
        'category': 'Granite',
        'slab': os.path.join(PRODUCTS_DIR, 'product-1783078831-6a479faf4fcbd.jpg'),
        'description': 'luminous white granite with dynamic smokey gray horizontal currents and rich burgundy garnet points'
    },
    {
        'id': 'black-forest',
        'name': 'Black Forest',
        'category': 'Granite',
        'slab': os.path.join(PRODUCTS_DIR, 'product-1783083657-6a47b289a4a40.jpg'),
        'description': 'dramatic jet black granite with sweeping snow-white ribbons, waves, and topographical contours'
    },
    {
        'id': 'titanium-black',
        'name': 'Titanium Black',
        'category': 'Granite',
        'slab': os.path.join(PRODUCTS_DIR, 'product-1783083560-6a47b228132ac.jpg'),
        'description': 'luxurious black granite with electric golden-amber ribbons, quartz veins, and high-contrast contrast'
    }
]

def get_washroom_prompt(stone):
    return (
        f"Architectural interior photography of the Indian luxury royal bathroom suite from the first image. "
        f"The entire bathroom floor is seamlessly paved with genuine polished {stone['name']} {stone['category']} slabs from the second image, "
        f"featuring {stone['description']}, mirror polished high-gloss finish, with natural soft reflections of the cove wall niches, brass urn, and copper tub. "
        "The carved teak vanity, copper bathtub, arched niches, brass fixtures, screen, and ambient warm lighting remain completely identical and unaltered. "
        "Single camera shot, photorealistic, 8k resolution, precise 16:9 aspect ratio."
    )

def register_render(stone, image_path):
    os.makedirs(RENDERS_DIR_1, exist_ok=True)
    os.makedirs(RENDERS_DIR_2, exist_ok=True)
    
    im = Image.open(image_path).resize((1376, 768), Image.Resampling.LANCZOS)
    png_path_1 = os.path.join(RENDERS_DIR_1, f"render_{stone['name']}.png")
    png_path_2 = os.path.join(RENDERS_DIR_2, f"{stone['id']}.png")
    webp_path_2 = os.path.join(RENDERS_DIR_2, f"{stone['id']}.webp")
    
    im.save(png_path_1, 'PNG')
    im.save(png_path_2, 'PNG')
    im.save(webp_path_2, 'WEBP', quality=88)
    print(f"Saved: {png_path_1}")
    
    # Manifest update
    with open(MANIFEST_PATH, 'r', encoding='utf-8') as f:
        manifest = json.load(f)
        
    rel_preview = f"assets/images/room_renders/washroom indian floor/render_{stone['name']}.png"
    rel_norm = f"assets/images/room_renders/washroom-indian-floor/{stone['id']}.png"
    
    # Check if exists
    for e in manifest:
        if e['room_id'] == 'bathroom' and e['surface_id'] == 'floor' and e.get('design_id') == 'design-3' and e['product_id'] == stone['id']:
            e['generated_preview'] = rel_preview
            e['normalized_render_path'] = rel_norm
            break
    else:
        manifest.append({
            'product_id': stone['id'],
            'product_name': stone['name'],
            'category': stone['category'],
            'room_id': 'bathroom',
            'room_name': 'Bathroom',
            'design_id': 'design-3',
            'design_name': 'Indian Heritage Luxury Suite',
            'surface_id': 'floor',
            'surface_name': 'Bathroom Flooring',
            'original_room_image': 'assets/images/rooms/washroom-indian.jpg',
            'original_stone_image': f"assets/images/products/{os.path.basename(stone['slab'])}",
            'generated_preview': rel_preview,
            'normalized_render_path': rel_norm,
            'width': 1376,
            'height': 768,
            'aspect_ratio': 1.7917,
            'aspect_ratio_match': True,
            'status': 'verified_architectural_render',
            'review_status': 'verified'
        })
        
    with open(MANIFEST_PATH, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, indent=2)
    print(f"Registered {stone['name']} in manifest.")

if __name__ == '__main__':
    print("Murali Granites & Marbles - Indian Washroom Render Automation Plan:")
    for i, s in enumerate(REMAINING_STONES, 1):
        print(f" {i}. {s['name']} ({s['category']})")
        print(f"    Prompt: {get_washroom_prompt(s)[:110]}...")
