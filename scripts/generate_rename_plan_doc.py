#!/usr/bin/env python3
"""
Generates RENAME_PLAN.md documenting the dry-run file hygiene plan.
"""

import os
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(BASE_DIR, 'scripts'))

import importlib.util
spec = importlib.util.spec_from_file_location('normalize_renders', os.path.join(BASE_DIR, 'scripts', 'normalize-renders.py'))
nr = importlib.util.module_from_spec(spec)
spec.loader.exec_module(nr)

plan = nr.plan_normalization()

lines = []
lines.append('# Murali Granites & Marbles — Render Normalization & WebP Plan')
lines.append('')
lines.append('This document provides the dry-run plan for normalizing all 72 architectural render filenames and converting them to WebP format (~85 quality) with PNG kept as source. **All original files and directories are 100% preserved.**')
lines.append('')
lines.append('---')
lines.append('')
lines.append('## 1. Executive Summary')
lines.append('')
lines.append('- **Total Verified Renders**: 72 files across 8 architectural scenes')
lines.append('- **Target Filename Convention**: `<stone-id>.png` and `<stone-id>.webp`')
lines.append('- **Source Retention**: Originals in `assets/images/room_renders/<original-folder>/` remain untouched.')
lines.append('- **Normalized Destination**: `assets/images/room_renders/<normalized-folder>/`')
lines.append('- **Script Available**: Run `python scripts/normalize-renders.py --apply` to execute on confirmation.')
lines.append('')
lines.append('---')
lines.append('')
lines.append('## 2. Directory Mapping')
lines.append('')
lines.append('| Source Directory | Normalized Directory | Renders | Base Photo Reference |')
lines.append('| :--- | :--- | :---: | :--- |')
lines.append('| `kitchen countertop/` | `kitchen-countertop/` | 8 | `rooms/kitchen.jpg` |')
lines.append('| `living room acent wall/` | `living-room-wall/` | 12 | `rooms/living-room.jpg` |')
lines.append('| `living room floor/` | `living-room-floor/` | 12 | `rooms/living-room.jpg` |')
lines.append('| `bathroom accent wall/` | `bathroom-wall/` | 12 | `rooms/bathroom.jpg` |')
lines.append('| `bathroom floor/` | `bathroom-floor/` | 12 | `rooms/bathroom.jpg` |')
lines.append('| `bedroom floor/` | `bedroom-floor/` | 12 | `rooms/bedroom.jpg` |')
lines.append('| `staircase stairs/` | `staircase-stairs/` | 2 | `rooms/staircase.jpg` |')
lines.append('| `dining room floor/` | `dining-room-floor/` | 2 | `rooms/dining-room.jpg` |')
lines.append('')
lines.append('---')
lines.append('')
lines.append('## 3. Detailed File Normalization Table (Dry-Run)')
lines.append('')
lines.append('| Stone ID | Stone Name | Dimensions | Size | Original Path | Normalized PNG Target | WebP Target (~85 Q) |')
lines.append('| :--- | :--- | :---: | :---: | :--- | :--- | :--- |')

for item in plan:
    kb = f"{item['size_bytes']/1024:.1f} KB"
    src = f"{item['src_folder']}/{item['src_file']}"
    dst_png = f"{item['dst_folder']}/{item['stone_id']}.png"
    dst_webp = f"{item['dst_folder']}/{item['stone_id']}.webp"
    lines.append(f"| `{item['stone_id']}` | {item['stone_name']} | {item['dimensions']} | {kb} | `{src}` | `{dst_png}` | `{dst_webp}` |")

lines.append('')
lines.append('---')
lines.append('')
lines.append('## 4. Execution Command')
lines.append('')
lines.append('To execute this plan on confirmation without modifying any existing original images:')
lines.append('```bash')
lines.append('python scripts/normalize-renders.py --apply')
lines.append('```')

out_path = os.path.join(BASE_DIR, 'RENAME_PLAN.md')
with open(out_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))

print(f"Successfully generated {out_path}")
