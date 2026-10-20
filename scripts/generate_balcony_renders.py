#!/usr/bin/env python3
"""
Murali Granites & Marbles - Balcony Flooring Render Generator
Automation script and reference prompt builder for the remaining 8 Balcony Flooring renders.
"""

import os
import sys
import json

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ROOMS_DIR = os.path.join(BASE_DIR, 'assets', 'images', 'rooms')
PRODUCTS_DIR = os.path.join(BASE_DIR, 'assets', 'images', 'products')
RENDERS_DIR = os.path.join(BASE_DIR, 'assets', 'images', 'room_renders', 'balcony flooring')

BALCONY_BASE_IMAGE = os.path.join(ROOMS_DIR, 'balcony.jpg')

# Remaining 8 Stones to render for Covered Balcony Flooring
REMAINING_BALCONY_STONES = [
    {
        'id': 'kashmir-white',
        'name': 'Kashmir Alaska White',
        'type': 'Granite',
        'slab': os.path.join(PRODUCTS_DIR, 'product-1783084356-6a47b5441b767.jpg'),
        'output_name': 'render_Kashmir White.png'
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
    },
    {
        'id': 'river-black',
        'name': 'River Black',
        'type': 'Granite',
        'slab': os.path.join(PRODUCTS_DIR, 'product-1783138465-6a4888a145274.jpg'),
        'output_name': 'render_River Black.png'
    }
]

def get_balcony_prompt(stone):
    return (
        f"High-end architectural photograph of the contemporary covered outdoor balcony terrace from the first image. "
        f"The balcony floor tiles are seamlessly paved with genuine polished {stone['name']} {stone['type']} slabs from the second image, "
        "exhibiting authentic natural stone geological veining, crystalline textures, and realistic soft surface reflections across large format floor tiles with subtle clean grouting. "
        "The balcony railing, glass balustrade, outdoor furniture, ceiling lights, ambient outdoor sunlight, shadows, and scenic exterior view remain completely intact and unaltered. "
        "Photorealistic, 8k resolution, architectural interior design showcase, precise 16:9 aspect ratio."
    )

if __name__ == '__main__':
    print("Covered Balcony Generator configured with 8 pending stones:")
    for s in REMAINING_BALCONY_STONES:
        exists = os.path.exists(os.path.join(RENDERS_DIR, s['output_name']))
        status = "EXISTS" if exists else "PENDING"
        print(f" - [{status}] {s['name']} -> {s['output_name']}")
