#!/usr/bin/env python3
"""
Murali Granites & Marbles - Dining Room Floor Render Generator
Uses Google Gemini Image Generation API (gemini-3.1-flash-image) with an API key.
Generates all 10 missing dining room floor renders and saves them to:
  assets/images/room_renders/dining room floor/render_{Stone Name}.png
"""

import os
import sys
import json
import base64
import urllib.request
import urllib.error
from PIL import Image

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ROOMS_DIR = os.path.join(BASE_DIR, 'assets', 'images', 'rooms')
PRODUCTS_DIR = os.path.join(BASE_DIR, 'assets', 'images', 'products')
RENDERS_DIR = os.path.join(BASE_DIR, 'assets', 'images', 'room_renders', 'dining room floor')

DINING_BASE_IMAGE = os.path.join(ROOMS_DIR, 'dining-room.jpg')

# 10 Missing Stones for Dining Room Floor
MISSING_STONES = [
    {
        'id': 'river-black',
        'name': 'River Black',
        'type': 'Granite',
        'slab': os.path.join(PRODUCTS_DIR, 'product-1783138465-6a4888a145274.jpg'),
        'output_name': 'render_River Black.png'
    },
    {
        'id': 'black-pearl',
        'name': 'Black Pearl',
        'type': 'Granite',
        'slab': os.path.join(PRODUCTS_DIR, 'product-1783138424-6a488878abc22.jpg'),
        'output_name': 'render_Black Pearl.png'
    },
    {
        'id': 'kashmir-white',
        'name': 'Kashmir Alaska White',
        'type': 'Granite',
        'slab': os.path.join(PRODUCTS_DIR, 'product-1783084356-6a47b5441b767.jpg'),
        'output_name': 'render_Kashmir Alaska White.png'
    },
    {
        'id': 'emerald-onyx',
        'name': 'Emerald Onyx Marble',
        'type': 'Onyx Marble',
        'slab': os.path.join(PRODUCTS_DIR, 'product-1783085161-6a47b869e0448.jpg'),
        'output_name': 'render_Emerald Onyx Marble.png'
    },
    {
        'id': 'marie-gold',
        'name': 'Marie Gold',
        'type': 'Granite',
        'slab': os.path.join(PRODUCTS_DIR, 'product-1783085317-6a47b9058f71e.jpg'),
        'output_name': 'render_Marie Gold.png'
    },
    {
        'id': 'blue-night',
        'name': 'Blue in the Night',
        'type': 'Granite',
        'slab': os.path.join(PRODUCTS_DIR, 'product-1783085244-6a47b8bcd330d.png'),
        'output_name': 'render_Blue in the Night.png'
    },
    {
        'id': 'moon-white',
        'name': 'Moon White',
        'type': 'Granite',
        'slab': os.path.join(PRODUCTS_DIR, 'product-1783079448-6a47a218632fd.jpg'),
        'output_name': 'render_Moon White.png'
    },
    {
        'id': 'river-white',
        'name': 'River White',
        'type': 'Granite',
        'slab': os.path.join(PRODUCTS_DIR, 'product-1783078831-6a479faf4fcbd.jpg'),
        'output_name': 'render_River White.png'
    },
    {
        'id': 'black-forest',
        'name': 'Black Forest',
        'type': 'Granite',
        'slab': os.path.join(PRODUCTS_DIR, 'product-1783083657-6a47b289a4a40.jpg'),
        'output_name': 'render_Black Forest.png'
    },
    {
        'id': 'titanium-black',
        'name': 'Titanium Black',
        'type': 'Granite',
        'slab': os.path.join(PRODUCTS_DIR, 'product-1783083560-6a47b228132ac.jpg'),
        'output_name': 'render_Titanium Black.png'
    }
]

def generate_render(api_key, stone):
    print(f"\n[+] Generating render for {stone['name']} ({stone['id']})...")
    
    with open(DINING_BASE_IMAGE, 'rb') as f:
        base_b64 = base64.b64encode(f.read()).decode('utf-8')
    
    with open(stone['slab'], 'rb') as f:
        slab_b64 = base64.b64encode(f.read()).decode('utf-8')
        
    prompt = (
        f"Replace only the dining room floor with {stone['name']} {stone['type']} using the provided stone reference image. "
        "Keep everything else exactly the same, including all furniture, dining table and chairs, objects, walls, lighting, shadows, reflections, and camera angle. "
        f"Do not add, remove, move, or modify anything. Make the {stone['type']} look naturally installed, matching the floor's perspective, tile borders, and lighting."
    )
    
    payload = {
        'contents': [{
            'parts': [
                {'inlineData': {'mimeType': 'image/jpeg', 'data': base_b64}},
                {'inlineData': {'mimeType': 'image/jpeg' if stone['slab'].endswith('.jpg') else 'image/png', 'data': slab_b64}},
                {'text': prompt}
            ]
        }],
        'generationConfig': {
            'responseModalities': ['IMAGE', 'TEXT']
        }
    }
    
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image:generateContent?key={api_key}"
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})
    
    try:
        with urllib.request.urlopen(req) as resp:
            res = json.loads(resp.read().decode('utf-8'))
            for c in res.get('candidates', []):
                for p in c.get('content', {}).get('parts', []):
                    if 'inlineData' in p:
                        img_bytes = base64.b64decode(p['inlineData']['data'])
                        out_path = os.path.join(RENDERS_DIR, stone['output_name'])
                        with open(out_path, 'wb') as out_f:
                            out_f.write(img_bytes)
                        
                        # Verify image dimensions
                        with Image.open(out_path) as im:
                            print(f"  -> SUCCESS! Saved {stone['output_name']} ({im.size[0]}x{im.size[1]})")
                        return True
            print("  -> ERROR: No image data returned in response.")
            return False
            
    except urllib.error.HTTPError as e:
        err_msg = e.read().decode('utf-8')
        print(f"  -> HTTP Error {e.code}: {err_msg[:200]}")
        return False
    except Exception as e:
        print(f"  -> Error: {e}")
        return False

def main():
    api_key = sys.argv[1] if len(sys.argv) > 1 else os.environ.get('GEMINI_API_KEY', '')
    os.makedirs(RENDERS_DIR, exist_ok=True)
    
    print(f"=== Dining Room Render Generator ===")
    print(f"Base: {DINING_BASE_IMAGE}")
    print(f"Output: {RENDERS_DIR}")
    print(f"Total stones to generate: {len(MISSING_STONES)}")
    
    success_count = 0
    for stone in MISSING_STONES:
        target_file = os.path.join(RENDERS_DIR, stone['output_name'])
        if os.path.exists(target_file):
            print(f"[skip] {stone['output_name']} already exists.")
            success_count += 1
            continue
            
        success = generate_render(api_key, stone)
        if success:
            success_count += 1
        else:
            print("Stopping due to error (e.g. quota limit).")
            break
            
    print(f"\nCompleted: {success_count}/{len(MISSING_STONES)} renders ready.")

if __name__ == '__main__':
    main()
