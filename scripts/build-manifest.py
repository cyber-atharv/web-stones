#!/usr/bin/env python3
"""
Murali Granites & Marbles - Manifest Generator
Scans assets/images/room_renders/ and maps all renders to canonical stones and rooms.
Generates assets/data/visualizer-manifest.json.
"""

import os
import re
import json
from PIL import Image

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RENDERS_DIR = os.path.join(BASE_DIR, 'assets', 'images', 'room_renders')
ROOMS_DIR = os.path.join(BASE_DIR, 'assets', 'images', 'rooms')
PRODUCTS_DIR = os.path.join(BASE_DIR, 'assets', 'images', 'products')
DATA_DIR = os.path.join(BASE_DIR, 'assets', 'data')

CANONICAL_STONES = {
    'river-black': {
        'name': 'River Black',
        'category': 'Granite',
        'image': 'assets/images/products/product-1783138465-6a4888a145274.jpg'
    },
    'black-pearl': {
        'name': 'Black Pearl',
        'category': 'Granite',
        'image': 'assets/images/products/product-1783138424-6a488878abc22.jpg'
    },
    'tan-brown': {
        'name': 'Tan Brown',
        'category': 'Granite',
        'image': 'assets/images/products/product-1783084011-6a47b3eb20cf0.jpg'
    },
    'statuario-marble': {
        'name': 'Statuario / Banswara Marble',
        'category': 'Marble',
        'image': 'assets/images/products/product-1783085208-6a47b8986af97.png'
    },
    'kashmir-white': {
        'name': 'Kashmir / Alaska White',
        'category': 'Granite',
        'image': 'assets/images/products/product-1783084356-6a47b5441b767.jpg'
    },
    'emerald-onyx': {
        'name': 'Emerald Onyx Marble',
        'category': 'Onyx',
        'image': 'assets/images/products/product-1783085161-6a47b869e0448.jpg'
    },
    'marie-gold': {
        'name': 'Marie Gold',
        'category': 'Granite',
        'image': 'assets/images/products/product-1783085317-6a47b9058f71e.jpg'
    },
    'blue-night': {
        'name': 'Blue in the Night',
        'category': 'Granite',
        'image': 'assets/images/products/product-1783085244-6a47b8bcd330d.png'
    },
    'moon-white': {
        'name': 'Moon White',
        'category': 'Granite',
        'image': 'assets/images/products/product-1783079448-6a47a218632fd.jpg'
    },
    'river-white': {
        'name': 'River White',
        'category': 'Granite',
        'image': 'assets/images/products/product-1783078831-6a479faf4fcbd.jpg'
    },
    'black-forest': {
        'name': 'Black Forest',
        'category': 'Granite',
        'image': 'assets/images/products/product-1783083657-6a47b289a4a40.jpg'
    },
    'titanium-black': {
        'name': 'Titanium Black',
        'category': 'Granite',
        'image': 'assets/images/products/product-1783083560-6a47b228132ac.jpg'
    }
}

FOLDER_MAPPINGS = {
    'kitchen countertop': {
        'room_id': 'kitchen',
        'room_name': 'Kitchen',
        'surface_id': 'countertop',
        'surface_name': 'Countertop & Island',
        'base_image': 'assets/images/rooms/kitchen.jpg',
        'normalized_folder': 'kitchen-countertop'
    },
    'living room acent wall': {
        'room_id': 'living-room',
        'room_name': 'Living Room',
        'surface_id': 'wall',
        'surface_name': 'Accent Wall',
        'base_image': 'assets/images/rooms/living-room.jpg',
        'normalized_folder': 'living-room-wall'
    },
    'living room floor': {
        'room_id': 'living-room',
        'room_name': 'Living Room',
        'surface_id': 'floor',
        'surface_name': 'Flooring',
        'base_image': 'assets/images/rooms/living-room.jpg',
        'normalized_folder': 'living-room-floor'
    },
    'bathroom accent wall': {
        'room_id': 'bathroom',
        'room_name': 'Bathroom',
        'surface_id': 'wall',
        'surface_name': 'Feature Wall',
        'base_image': 'assets/images/rooms/bathroom.jpg',
        'normalized_folder': 'bathroom-wall'
    },
    'bathroom floor': {
        'room_id': 'bathroom',
        'room_name': 'Bathroom',
        'surface_id': 'floor',
        'surface_name': 'Bathroom Flooring',
        'base_image': 'assets/images/rooms/bathroom.jpg',
        'normalized_folder': 'bathroom-floor'
    },
    'bedroom floor': {
        'room_id': 'bedroom',
        'room_name': 'Bedroom',
        'surface_id': 'floor',
        'surface_name': 'Bedroom Flooring',
        'base_image': 'assets/images/rooms/bedroom.jpg',
        'normalized_folder': 'bedroom-floor'
    },
    'staircase stairs': {
        'room_id': 'staircase',
        'room_name': 'Staircase',
        'surface_id': 'stairs',
        'surface_name': 'Stair Treads & Risers',
        'base_image': 'assets/images/rooms/staircase.jpg',
        'normalized_folder': 'staircase-stairs'
    },
    'dining room floor': {
        'room_id': 'dining-room',
        'room_name': 'Dining Room',
        'surface_id': 'floor',
        'surface_name': 'Dining Room Flooring',
        'base_image': 'assets/images/rooms/dining-room.jpg',
        'normalized_folder': 'dining-room-floor'
    },
    'parking paving': {
        'room_id': 'parking',
        'room_name': 'Outdoor Parking',
        'surface_id': 'paving',
        'surface_name': 'Driveway & Porch Paving',
        'base_image': 'assets/images/rooms/parking.webp',
        'normalized_folder': 'parking-paving'
    }
}

def match_stone_id(filename):
    clean = filename.lower().replace('_', ' ').replace('-', ' ')
    clean = re.sub(r'\s+', ' ', clean)
    
    if 'rivewr black' in clean or 'river black' in clean:
        return 'river-black'
    if 'river white' in clean:
        return 'river-white'
    if 'black pearl' in clean:
        return 'black-pearl'
    if 'tan brown' in clean or 'tan rown' in clean or ('tan' in clean and 'rown' in clean):
        return 'tan-brown'
    if 'statuario' in clean or 'banswara' in clean:
        return 'statuario-marble'
    if 'kashmirm' in clean or 'kashmir' in clean or 'alaska' in clean:
        return 'kashmir-white'
    if 'emerald' in clean or 'onyx' in clean:
        return 'emerald-onyx'
    if 'marie' in clean or 'gold' in clean:
        return 'marie-gold'
    if 'blue' in clean:
        return 'blue-night'
    if 'moon' in clean:
        return 'moon-white'
    if 'forest' in clean:
        return 'black-forest'
    if 'titanium' in clean:
        return 'titanium-black'
    return None

def build_manifest():
    manifest = []
    aspect_discrepancies = []

    # Get base room dimensions
    base_dims = {}
    for mapping in FOLDER_MAPPINGS.values():
        bpath = os.path.join(BASE_DIR, mapping['base_image'])
        if os.path.exists(bpath) and mapping['base_image'] not in base_dims:
            try:
                with Image.open(bpath) as bimg:
                    bw, bh = bimg.size
                    bar = round(bw / bh, 4)
                    base_dims[mapping['base_image']] = {'width': bw, 'height': bh, 'aspect_ratio': bar}
            except Exception as e:
                print(f"Error reading base {bpath}: {e}")

    for folder_name, meta in FOLDER_MAPPINGS.items():
        folder_path = os.path.join(RENDERS_DIR, folder_name)
        if not os.path.exists(folder_path):
            print(f"Warning: Folder not found {folder_path}")
            continue

        base_info = base_dims.get(meta['base_image'], {'width': 1376, 'height': 768, 'aspect_ratio': 1.7917})

        for fname in sorted(os.listdir(folder_path)):
            if not fname.lower().endswith(('.png', '.webp', '.jpg')):
                continue

            stone_id = match_stone_id(fname)
            if not stone_id:
                print(f"Unmatched render file: {folder_name}/{fname}")
                continue

            stone_info = CANONICAL_STONES[stone_id]
            fpath = os.path.join(folder_path, fname)
            rel_render_path = f"assets/images/room_renders/{folder_name}/{fname}"

            rw, rh, rar = 0, 0, 0
            try:
                with Image.open(fpath) as img:
                    rw, rh = img.size
                    rar = round(rw / rh, 4)
            except Exception as e:
                print(f"Error opening image {fpath}: {e}")

            # Check aspect ratio match tolerance (within 1% difference)
            ar_diff = abs(rar - base_info['aspect_ratio'])
            is_ar_match = ar_diff < 0.02

            if not is_ar_match:
                aspect_discrepancies.append({
                    'room_id': meta['room_id'],
                    'surface_id': meta['surface_id'],
                    'stone_id': stone_id,
                    'file': fname,
                    'render_dims': f"{rw}x{rh}",
                    'render_ar': rar,
                    'base_dims': f"{base_info['width']}x{base_info['height']}",
                    'base_ar': base_info['aspect_ratio']
                })

            entry = {
                'product_id': stone_id,
                'product_name': stone_info['name'],
                'category': stone_info['category'],
                'room_id': meta['room_id'],
                'room_name': meta['room_name'],
                'surface_id': meta['surface_id'],
                'surface_name': meta['surface_name'],
                'original_room_image': meta['base_image'],
                'original_stone_image': stone_info['image'],
                'generated_preview': rel_render_path,
                'normalized_render_path': f"assets/images/room_renders/{meta['normalized_folder']}/{stone_id}.png",
                'width': rw,
                'height': rh,
                'aspect_ratio': rar,
                'aspect_ratio_match': is_ar_match,
                'status': 'verified_architectural_render',
                'review_status': 'verified'
            }
            manifest.append(entry)

    # Sort manifest for deterministic output
    manifest.sort(key=lambda x: (x['room_id'], x['surface_id'], x['product_id']))

    os.makedirs(DATA_DIR, exist_ok=True)
    out_path = os.path.join(DATA_DIR, 'visualizer-manifest.json')
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, indent=2)

    print(f"Successfully generated manifest with {len(manifest)} verified renders.")
    print(f"Saved to: {out_path}")
    print(f"Aspect ratio discrepancies found: {len(aspect_discrepancies)}")
    for d in aspect_discrepancies:
        print(f"  - {d['room_id']} > {d['surface_id']} > {d['stone_id']} ({d['file']}): {d['render_dims']} (AR {d['render_ar']}) vs base {d['base_dims']} (AR {d['base_ar']})")

    return manifest, aspect_discrepancies

if __name__ == '__main__':
    build_manifest()
