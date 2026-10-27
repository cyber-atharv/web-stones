#!/usr/bin/env python3
"""
Convert all PNG and JPG images in ch01/assets/images to modern, high-performance WebP format.
Optimizes file size for blazing fast loading while maintaining photorealistic visual fidelity.
"""

import os
import sys
from PIL import Image

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMAGES_DIR = os.path.join(BASE_DIR, 'assets', 'images')

converted_count = 0
skipped_count = 0
error_count = 0
total_orig_bytes = 0
total_webp_bytes = 0

print("=" * 70)
print("BATCH CONVERTING IMAGES TO MODERN WEBP FORMAT")
print("=" * 70)

for root, dirs, files in os.walk(IMAGES_DIR):
    for f in files:
        ext = os.path.splitext(f)[1].lower()
        if ext in ['.jpg', '.jpeg', '.png']:
            src_path = os.path.join(root, f)
            webp_path = os.path.splitext(src_path)[0] + '.webp'
            
            orig_size = os.path.getsize(src_path)
            total_orig_bytes += orig_size
            
            # Check if webp already exists
            if os.path.exists(webp_path):
                webp_size = os.path.getsize(webp_path)
                total_webp_bytes += webp_size
                skipped_count += 1
                continue
            
            try:
                im = Image.open(src_path)
                if im.mode in ['RGBA', 'LA']:
                    # Preserve alpha channel for transparent PNGs
                    im.save(webp_path, 'WEBP', quality=90, method=6)
                elif im.mode == 'P':
                    # Palette mode with possible transparency
                    im = im.convert('RGBA')
                    im.save(webp_path, 'WEBP', quality=90, method=6)
                else:
                    if im.mode != 'RGB':
                        im = im.convert('RGB')
                    im.save(webp_path, 'WEBP', quality=88, method=6)
                
                webp_size = os.path.getsize(webp_path)
                total_webp_bytes += webp_size
                converted_count += 1
                
                savings = (1 - (webp_size / orig_size)) * 100 if orig_size > 0 else 0
                if converted_count % 20 == 0 or converted_count <= 5:
                    rel_path = os.path.relpath(webp_path, BASE_DIR)
                    print(f"[{converted_count}] {rel_path} ({orig_size // 1024}KB -> {webp_size // 1024}KB, -{savings:.1f}%)")
            except Exception as e:
                print(f"Error converting {src_path}: {e}")
                error_count += 1

print("\n" + "=" * 70)
print(f"CONVERSION COMPLETE:")
print(f" - Newly Converted: {converted_count}")
print(f" - Already Existing: {skipped_count}")
print(f" - Errors: {error_count}")
print(f" - Total Original Size: {total_orig_bytes / (1024 * 1024):.2f} MB")
print(f" - Total WebP Size:     {total_webp_bytes / (1024 * 1024):.2f} MB")
if total_orig_bytes > 0:
    net_savings = (1 - (total_webp_bytes / total_orig_bytes)) * 100
    print(f" - Bandwidth Savings:   {net_savings:.1f}%")
print("=" * 70)
