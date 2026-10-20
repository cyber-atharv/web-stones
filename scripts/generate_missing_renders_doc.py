#!/usr/bin/env python3
"""
Generates MISSING_RENDERS.md with ready-to-paste AI generation prompts for all unrendered combinations.
"""

import json
import os
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(BASE_DIR, 'scripts'))

import importlib.util
spec = importlib.util.spec_from_file_location('build_manifest', os.path.join(BASE_DIR, 'scripts', 'build-manifest.py'))
bm = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bm)

manifest_path = os.path.join(BASE_DIR, 'assets', 'data', 'visualizer-manifest.json')
with open(manifest_path, 'r', encoding='utf-8') as f:
    manifest = json.load(f)

existing = set((item['room_id'], item['surface_id'], item['product_id']) for item in manifest)

lines = []
lines.append('# Murali Granites & Marbles — Missing Renders Report & AI Generation Prompts')
lines.append('')
lines.append('This document provides a comprehensive inventory of all architectural spaces, surfaces, and stone combinations that do not yet have a verified pre-rendered image. It also specifies the **Aspect Ratio Offender** that requires re-generation, and includes ready-to-paste prompts for every combination.')
lines.append('')
lines.append('---')
lines.append('')
lines.append('## 1. Inventory Summary')
lines.append('')
lines.append('| Scene / Surface | Base Photo | Total Stones | Rendered | Missing | Status |')
lines.append('| :--- | :--- | :---: | :---: | :---: | :--- |')
def get_count(r, s):
    return sum(1 for item in manifest if item['room_id'] == r and item['surface_id'] == s)

kc = get_count('kitchen', 'countertop')
sc = get_count('staircase', 'stairs')
dc = get_count('dining-room', 'floor')
pc = get_count('parking', 'paving')

lines.append('| **Bathroom Accent Wall** | `rooms/bathroom.jpg` | 12 | 12 | 0 | Complete *(1 aspect ratio fix needed)* |')
lines.append('| **Bathroom Floor** | `rooms/bathroom.jpg` | 12 | 12 | 0 | Complete |')
lines.append('| **Bedroom Floor** | `rooms/bedroom.jpg` | 12 | 12 | 0 | Complete |')
lines.append('| **Living Room Accent Wall** | `rooms/living-room.jpg` | 12 | 12 | 0 | Complete |')
lines.append('| **Living Room Floor** | `rooms/living-room.jpg` | 12 | 12 | 0 | Complete |')
lines.append(f'| **Kitchen Countertop & Island** | `rooms/kitchen.jpg` | 12 | {kc} | {12 - kc} | {"Complete" if kc == 12 else "In Progress"} |')
lines.append(f'| **Staircase Stairs** | `rooms/staircase.jpg` | 12 | {sc} | {12 - sc} | {"Complete" if sc == 12 else "In Progress"} |')
lines.append(f'| **Dining Room Floor** | `rooms/dining-room.jpg` | 12 | {dc} | {12 - dc} | {"Complete" if dc == 12 else "In Progress"} |')
lines.append(f'| **Outdoor Parking Driveway & Porch** | `rooms/parking.webp` | 12 | {pc} | {12 - pc} | {"Complete" if pc == 12 else "Active in UI (Prompts ready)"} |')
lines.append('| **Kitchen Flooring** | `rooms/kitchen.jpg` | 12 | 0 | 12 | Hidden in UI until renders exist |')
lines.append('| **Kitchen Design 2 (Waterfall Island)** | `gallery_showcase/02_statuario_kitchen.jpg` | 12 | 0 | 12 | Showcase photo; excluded from picker |')
lines.append('| **Foyer Flooring** | `rooms/foyer.jpg` | 12 | 0 | 12 | Future expansion |')
lines.append('| **Lounge Accent Wall** | `rooms/lounge-wall.jpg` | 12 | 0 | 12 | Future expansion |')
lines.append('')
lines.append('---')
lines.append('')
lines.append('## 2. Aspect Ratio Offender Requiring Re-Render')
lines.append('')
lines.append('One existing render has an aspect ratio mismatch vs its base room photo, causing vertical distortion/cropping in a 16:9 box:')
lines.append('- **File**: `assets/images/room_renders/bathroom accent wall/render_Titanium Black.png`')
lines.append('- **Dimensions**: `1196x896` (Aspect Ratio: `1.3348` / 4:3)')
lines.append('- **Base Photo**: `assets/images/rooms/bathroom.jpg` (`1376x768`, Aspect Ratio: `1.7917` / 16:9)')
lines.append('- **Target File**: `assets/images/room_renders/bathroom accent wall/render_Titanium Black.png` (or `bathroom-wall/titanium-black.png`)')
lines.append('- **Base Reference**: `assets/images/rooms/bathroom.jpg`')
lines.append('- **Stone Slab Reference**: `assets/images/products/product-1783083560-6a47b228132ac.jpg`')
lines.append('')
lines.append('**Ready-to-Paste Generation Prompt:**')
lines.append('```text')
lines.append('Using the attached photo of Bathroom (assets/images/rooms/bathroom.jpg) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the Feature Wall with Titanium Black natural stone, using the attached stone slab photo (assets/images/products/product-1783083560-6a47b228132ac.jpg) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.')
lines.append('```')
lines.append('')
lines.append('---')
lines.append('')

missing_count = (12 - kc) + (12 - sc) + (12 - dc) + (12 - pc)
lines.append(f'## 3. High-Priority Missing Renders ({missing_count} Remaining Scenes)')
lines.append('')

def generate_section(title, room_id, room_display, surface_id, surface_display, base_path, target_folder, force_all=False):
    missing_stones = [sid for sid, sinfo in bm.CANONICAL_STONES.items() if force_all or (room_id, surface_id, sid) not in existing]
    if not missing_stones:
        return
    lines.append(f'### {title} ({len(missing_stones)} Missing)')
    lines.append('')
    count = 0
    for sid in missing_stones:
        sinfo = bm.CANONICAL_STONES[sid]
        count += 1
        target_fn = f'render_{sinfo["name"]}.png'
        normalized_fn = f'{sid}.png'
        lines.append(f'#### {count}. {sinfo["name"]} (`{sid}`)')
        lines.append(f'- **Target File**: `assets/images/room_renders/{target_folder}/{target_fn}`')
        lines.append(f'- **Normalized Target**: `assets/images/room_renders/{target_folder}/{normalized_fn}`')
        lines.append(f'- **Base Photo**: `{base_path}` (1376x768, 16:9)')
        lines.append(f'- **Stone Slab Reference**: `{sinfo["image"]}`')
        lines.append('**Prompt:**')
        lines.append('```text')
        lines.append(f'Using the attached photo of {room_display} ({base_path}) as the exact reference (same camera angle, framing, lighting, furniture and objects), replace ONLY the {surface_display} with {sinfo["name"]} natural stone, using the attached stone slab photo ({sinfo["image"]}) for colour, veining and scale; keep all other elements unchanged; photorealistic, 1376x768.')
        lines.append('```')
        lines.append('')

# Kitchen Countertop
generate_section('A. Kitchen Countertop & Island', 'kitchen', 'Kitchen', 'countertop', 'Countertop & Island', 'assets/images/rooms/kitchen.jpg', 'kitchen-countertop')

# Staircase
generate_section('B. Staircase Stairs', 'staircase', 'Staircase', 'stairs', 'Stair Treads and Risers', 'assets/images/rooms/staircase.jpg', 'staircase-stairs')

# Dining Room Floor
generate_section('C. Dining Room Floor', 'dining-room', 'Dining Room', 'floor', 'Flooring', 'assets/images/rooms/dining-room.jpg', 'dining-room-floor')

# Parking Paving
generate_section('D. Outdoor Parking Driveway & Porch Paving', 'parking', 'Outdoor Parking Area', 'paving', 'Driveway and Porch Heavy-Duty Granite Paving', 'assets/images/rooms/parking.webp', 'parking-paving')

# Kitchen Floor (12)
generate_section('E. Kitchen Flooring (12 Missing Renders — floor visible at base of kitchen.jpg)', 'kitchen', 'Kitchen', 'floor', 'Kitchen Flooring', 'assets/images/rooms/kitchen.jpg', 'kitchen-floor', force_all=True)

lines.append('---')
lines.append('')
lines.append('## 4. Optional Future Expansion Scenes (24 Prompts)')
lines.append('')
lines.append('If the client approves expanding into the remaining showroom reference rooms:')
lines.append('')
# Foyer Floor (12)
generate_section('F. Foyer Flooring (12 Prompts)', 'foyer', 'Foyer', 'floor', 'Foyer Flooring', 'assets/images/rooms/foyer.jpg', 'foyer-floor', force_all=True)
# Lounge Wall (12)
generate_section('G. Architectural Lounge Accent Wall (12 Prompts)', 'lounge-wall', 'Architectural Lounge', 'wall', 'Lounge Feature Wall', 'assets/images/rooms/lounge-wall.jpg', 'lounge-wall', force_all=True)

out_file = os.path.join(BASE_DIR, 'MISSING_RENDERS.md')
with open(out_file, 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))

print(f"Successfully generated {out_file}")
