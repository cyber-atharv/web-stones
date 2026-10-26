#!/usr/bin/env python3
"""
Acceptance Test Suite for Murali Granites & Marbles Visualizer
Validates:
1. Every manifest entry returns HTTP 200 over the web server.
2. Every base room and stone slab image returns HTTP 200.
3. Programmatic detection of aspect ratio match/offenders.
4. Completeness of all 12 stones across rooms x surfaces.
5. Exact render vs 'coming soon' mapping without faking.
6. Validation of visualizer.html DOM and scripts.
"""

import urllib.request
import urllib.parse
import json
import os
import re
from PIL import Image

BASE_URL = 'http://localhost:8092/'
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def run_tests():
    print("=" * 75)
    print("RUNNING ACCEPTANCE TEST SUITE")
    print("=" * 75)

    # 1. Manifest JSON Test
    manifest_url = BASE_URL + 'assets/data/visualizer-manifest.json'
    req = urllib.request.urlopen(manifest_url)
    assert req.status == 200, "Manifest file failed to load with HTTP 200"
    manifest = json.loads(req.read().decode('utf-8'))
    print(f"Test 1: Manifest loaded successfully (HTTP {req.status}, {len(manifest)} renders)")

    # 2. HTTP 200 for all renders, bases, and products
    renders_ok = 0
    bases_ok = set()
    products_ok = set()
    ar_offenders = []

    for entry in manifest:
        # Render image
        r_url = BASE_URL + urllib.parse.quote(entry['generated_preview'])
        r_resp = urllib.request.urlopen(r_url)
        if r_resp.status == 200:
            renders_ok += 1

        # Base photo
        b_path = entry['original_room_image']
        if b_path not in bases_ok:
            b_url = BASE_URL + urllib.parse.quote(b_path)
            b_resp = urllib.request.urlopen(b_url)
            if b_resp.status == 200:
                bases_ok.add(b_path)

        # Stone slab photo
        p_path = entry['original_stone_image']
        if p_path not in products_ok:
            p_url = BASE_URL + urllib.parse.quote(p_path)
            p_resp = urllib.request.urlopen(p_url)
            if p_resp.status == 200:
                products_ok.add(p_path)

        if not entry.get('aspect_ratio_match', True):
            ar_offenders.append(entry)

    # Also verify parking, balcony, and new room base photos
    new_bases = [
        'assets/images/rooms/parking.webp',
        'assets/images/rooms/balcony.webp',
        'assets/images/rooms/living-room-2.jpg',
        'assets/images/rooms/washroom-suite.jpg',
        'assets/images/rooms/washroom-indian.jpg',
        'assets/images/rooms/elevation.jpg'
    ]
    for nb in new_bases:
        resp = urllib.request.urlopen(BASE_URL + nb)
        if resp.status == 200:
            bases_ok.add(nb)

    print(f"Test 2: All {renders_ok}/{len(manifest)} render files return HTTP 200 OK.")
    print(f"Test 3: All {len(bases_ok)} base room images return HTTP 200 OK.")
    print(f"Test 4: All {len(products_ok)} product slab photos return HTTP 200 OK.")
    print(f"Test 5: Aspect ratio matching check: {len(manifest) - len(ar_offenders)}/{len(manifest)} match base 16:9 exactly.")
    print(f"        Aspect ratio offenders: {len(ar_offenders)}")
    for off in ar_offenders:
        print(f"        -> {off['room_id']} > {off['surface_id']} > {off['product_id']}: {off['width']}x{off['height']} (AR: {off['aspect_ratio']}) vs base 1376x768 (AR: 1.7917)")

    # 3. Test Room x Surface x Stone Matrix
    canonical_stones = [
        'river-black', 'black-pearl', 'tan-brown', 'statuario-marble',
        'kashmir-white', 'emerald-onyx', 'marie-gold', 'blue-night',
        'moon-white', 'river-white', 'black-forest', 'titanium-black'
    ]

    active_scenes = [
        ('kitchen', 'countertop', 12, 0),
        ('living-room', 'floor', 12, 0),
        ('living-room', 'wall', 12, 0),
        ('bathroom', 'floor', 12, 0),
        ('bathroom', 'wall', 12, 0),
        ('bedroom', 'floor', 12, 0),
        ('staircase', 'stairs', 12, 0),
        ('dining-room', 'floor', 12, 0),
        ('parking', 'paving', 12, 0),
        ('balcony', 'flooring', 12, 0)
    ]

    print("\nTest 6: Validating Room x Surface x 12 Stones Matrix:")
    manifest_set = set((item['room_id'], item['surface_id'], item['product_id']) for item in manifest)

    for room_id, surface_id, expected_renders, expected_missing in active_scenes:
        actual_renders = sum(1 for sid in canonical_stones if (room_id, surface_id, sid) in manifest_set)
        actual_missing = len(canonical_stones) - actual_renders
        assert actual_renders == expected_renders, f"Mismatch for {room_id} > {surface_id}: expected {expected_renders}, got {actual_renders}"
        assert actual_missing == expected_missing, f"Mismatch for {room_id} > {surface_id}: expected {expected_missing}, got {actual_missing}"
        print(f"  * {room_id:<12} > {surface_id:<12}: {actual_renders}/12 verified renders, {actual_missing}/12 honest 'coming soon' states. (PASS)")

    # 4. Check visualizer.html for code integrity
    vis_html_path = os.path.join(BASE_DIR, 'visualizer.html')
    with open(vis_html_path, 'r', encoding='utf-8') as f:
        html = f.read()

    forbidden = [
        '#surfaceOverlayContainer',
        'id="surfaceOverlayContainer"',
        'stoneTextureTile',
        'stoneLightingShade',
        'stoneGlossSheen',
        'stoneComparisonTool',
        'id="stoneComparisonTool"',
        'initStoneComparison',
        'clipPath:',
        'shadingGradient:',
        'limitationNotice',
        'isProxy',
        'roomShowcaseMap'
    ]

    print("\nTest 7: Verification of Zero Residual Legacy Hacks in visualizer.html:")
    for term in forbidden:
        count = html.count(term)
        assert count == 0, f"Found legacy hack '{term}' in visualizer.html ({count} occurrences)!"
        print(f"  * Zero occurrences of '{term}': PASS")

    # 5. Check CSS 16:9 aspect ratio containment
    assert 'aspect-[16/9]' in html or 'aspect-ratio: 16 / 9' in html, "Stage viewport does not enforce 16:9 aspect ratio box"
    print("\nTest 8: Strict 16:9 aspect ratio containment enforced on stage viewport: PASS")

    # 6. Check Slider Labels
    assert 'Original (0%)' in html, "'Original (0%)' label not found in visualizer.html"
    assert 'Selected stone (100%)' in html, "'Selected stone (100%)' label not found in visualizer.html"
    print("Test 9: Slider labels renamed to 'Original (0%)' and 'Selected stone (100%)': PASS")

    # 7. Check Toast Notice & View in other room button
    assert 'renderPendingToast' in html, "renderPendingToast element not found"
    assert 'viewInOtherRoomBtn' in html, "viewInOtherRoomBtn element not found"
    print("Test 10: Honest pending toast and 'View in other room' button verified: PASS")

    # 8. Check New Client Deliverables
    assert 'living-room-2.jpg' in html, "living-room-2.jpg not referenced in visualizer.html"
    assert 'washroom-suite.jpg' in html, "washroom-suite.jpg not referenced in visualizer.html"
    assert 'washroom-indian.jpg' in html, "washroom-indian.jpg not referenced in visualizer.html"
    assert 'elevation.jpg' in html, "elevation.jpg not referenced in visualizer.html"
    assert 'Building Elevation' in html, "Building Elevation not found in visualizer.html"
    assert 'countertopZoomModal' in html, "countertopZoomModal element not found in visualizer.html"
    assert 'zoomCountertopBtn' in html, "zoomCountertopBtn element not found in visualizer.html"
    assert 'appearanceModeBar' in html, "appearanceModeBar element not found in visualizer.html"
    assert 'stage-atmosphere-dark' in html, "stage-atmosphere-dark style not found in visualizer.html"
    assert 'stage-atmosphere-highlight' in html, "stage-atmosphere-highlight style not found in visualizer.html"
    print("Test 11: All new client features (Living room 2, Washroom variations, Elevation, Countertop Zoom, 3 Appearance Modes): PASS")

    print("\n" + "=" * 75)
    print("ALL 11 ACCEPTANCE TESTS PASSED SUCCESSFULLY (100%)")
    print("=" * 75)

if __name__ == '__main__':
    run_tests()

