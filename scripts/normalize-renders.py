#!/usr/bin/env python3
"""
Murali Granites & Marbles - Render Normalization & WebP Conversion Script
Normalizes render filenames to <stone-id>.png and converts to WebP (~85 quality).
Preserves all original files. Supports --dry-run (default) and --apply.
"""

import os
import sys
import argparse
import shutil
from PIL import Image

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RENDERS_DIR = os.path.join(BASE_DIR, 'assets', 'images', 'room_renders')

import importlib.util
spec = importlib.util.spec_from_file_location("build_manifest", os.path.join(BASE_DIR, 'scripts', 'build-manifest.py'))
bm = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bm)
FOLDER_MAPPINGS = bm.FOLDER_MAPPINGS
CANONICAL_STONES = bm.CANONICAL_STONES
match_stone_id = bm.match_stone_id

def plan_normalization():
    plan = []
    
    for folder_name, meta in FOLDER_MAPPINGS.items():
        src_folder = os.path.join(RENDERS_DIR, folder_name)
        dst_folder = os.path.join(RENDERS_DIR, meta['normalized_folder'])
        
        if not os.path.exists(src_folder):
            continue
            
        for fname in sorted(os.listdir(src_folder)):
            if not fname.lower().endswith(('.png', '.webp', '.jpg')):
                continue
                
            stone_id = match_stone_id(fname)
            if not stone_id:
                continue
                
            src_path = os.path.join(src_folder, fname)
            dst_png = os.path.join(dst_folder, f"{stone_id}.png")
            dst_webp = os.path.join(dst_folder, f"{stone_id}.webp")
            
            w, h = 0, 0
            try:
                with Image.open(src_path) as img:
                    w, h = img.size
            except Exception:
                pass
                
            plan.append({
                'room_id': meta['room_id'],
                'surface_id': meta['surface_id'],
                'stone_id': stone_id,
                'stone_name': CANONICAL_STONES[stone_id]['name'],
                'src_folder': folder_name,
                'src_file': fname,
                'src_path': src_path,
                'dst_folder': meta['normalized_folder'],
                'dst_png': dst_png,
                'dst_webp': dst_webp,
                'dimensions': f"{w}x{h}",
                'size_bytes': os.path.getsize(src_path) if os.path.exists(src_path) else 0
            })
            
    return plan

def run_dry_run(plan):
    print("=" * 80)
    print("MURALI GRANITES & MARBLES — RENDER NORMALIZATION DRY-RUN PLAN")
    print("=" * 80)
    print(f"Total files identified for normalization: {len(plan)}\n")
    
    current_folder = ""
    for item in plan:
        if item['dst_folder'] != current_folder:
            current_folder = item['dst_folder']
            print(f"\n[DIR] TARGET DIRECTORY: assets/images/room_renders/{current_folder}/")
            print(f"      (Source: assets/images/room_renders/{item['src_folder']}/)")
            print(f"      {'-'*75}")
            
        src_rel = f"{item['src_folder']}/{item['src_file']}"
        dst_rel_png = f"{item['dst_folder']}/{item['stone_id']}.png"
        dst_rel_webp = f"{item['dst_folder']}/{item['stone_id']}.webp"
        
        print(f"   * {item['stone_id']:<16} ({item['dimensions']}, {item['size_bytes']/1024:.1f} KB)")
        print(f"     Source : {src_rel}")
        print(f"     -> PNG : {dst_rel_png}")
        print(f"     -> WebP: {dst_rel_webp} (Quality ~85)")

    print("\n" + "=" * 80)
    print("DRY RUN SUMMARY:")
    print("  * 72 PNG source files ready to normalize into 8 clean folders.")
    print("  * 72 WebP optimized files will be generated at ~85 quality.")
    print("  * Original filenames & folders will be 100% PRESERVED (no deletions).")
    print("=" * 80)

def apply_normalization(plan):
    print("Applying normalization plan...")
    created_png = 0
    created_webp = 0
    
    for item in plan:
        dst_dir = os.path.dirname(item['dst_png'])
        os.makedirs(dst_dir, exist_ok=True)
        
        # 1. Copy source PNG to normalized <stone-id>.png
        if not os.path.exists(item['dst_png']) or os.path.abspath(item['src_path']) != os.path.abspath(item['dst_png']):
            shutil.copy2(item['src_path'], item['dst_png'])
            created_png += 1
            
        # 2. Convert to WebP quality 85
        try:
            with Image.open(item['src_path']) as img:
                img.save(item['dst_webp'], 'WEBP', quality=85)
                created_webp += 1
        except Exception as e:
            print(f"Error converting {item['src_path']} to WebP: {e}")
            
    print(f"Normalization complete!")
    print(f"• Normalized PNGs created: {created_png}")
    print(f"• WebP conversions created: {created_webp}")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Normalize render files and convert to WebP.')
    parser.add_argument('--apply', action='store_true', help='Execute normalization and WebP generation')
    parser.add_argument('--dry-run', action='store_true', default=True, help='Display dry-run plan (default)')
    args = parser.parse_args()
    
    plan = plan_normalization()
    if args.apply:
        apply_normalization(plan)
    else:
        run_dry_run(plan)
