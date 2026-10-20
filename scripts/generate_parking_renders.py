#!/usr/bin/env python3
"""
Murali Granites & Marbles - Outdoor Parking Paving Render Generator
Automates generating the remaining 9 parking paving renders.
"""

import os
import sys
import json
import base64
import urllib.request
import urllib.error

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ROOMS_DIR = os.path.join(BASE_DIR, 'assets', 'images', 'rooms')
PRODUCTS_DIR = os.path.join(BASE_DIR, 'assets', 'images', 'products')
RENDERS_DIR = os.path.join(BASE_DIR, 'assets', 'images', 'room_renders', 'parking paving')

PARKING_BASE_IMAGE = os.path.join(ROOMS_DIR, 'parking.webp')

# Remaining 9 Stones to render for Outdoor Parking
REMAINING_PARKING_STONES = [
    {
        'id': 'statuario-marble',
        'name': 'Statuario Banswara White Marble',
        'type': 'Marble',
        'slab': os.path.join(PRODUCTS_DIR, 'product-1783085208-6a47b8986af97.png'),
        'output_name': 'render_Statuario Banswara Marble.png'
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

def get_parking_prompt(stone):
    return (
        f"Replace only the driveway and porch heavy-duty granite paving floor with {stone['name']} {stone['type']} using the provided stone reference image. "
        "Keep everything else exactly the same, including the parked car, walls, columns, planters, trees, lighting, shadows, and camera angle. "
        f"Do not add, remove, move, or modify anything. Make the {stone['type']} paving look naturally installed, matching the driveway's perspective and outdoor lighting."
    )

if __name__ == '__main__':
    print("Outdoor Parking Generator configured with 9 pending stones:")
    for s in REMAINING_PARKING_STONES:
        print(f" - {s['name']} -> {s['output_name']}")
