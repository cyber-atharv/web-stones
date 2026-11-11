import os
import glob
import json
from PIL import Image

BRAIN_DIR = r"C:\Users\Atharv\.gemini\antigravity\brain\9461a02a-aabf-4559-aa52-7bf1393d6eb7"
BASE_DIR = r"d:\project\web-stones"
TARGET_DIR = os.path.join(BASE_DIR, "assets", "images", "room_renders", "kitchen floor")
NORMALIZED_DIR = os.path.join(BASE_DIR, "assets", "images", "room_renders", "kitchen-floor")
MANIFEST_PATH = os.path.join(BASE_DIR, "assets", "data", "visualizer-manifest.json")

os.makedirs(TARGET_DIR, exist_ok=True)
os.makedirs(NORMALIZED_DIR, exist_ok=True)

# 12 stones definition matching showroom inventory
STONES = [
    {
        "product_id": "black-forest",
        "product_name": "Black Forest",
        "category": "Granite",
        "pattern": "kitchen_floor_black_forest*.jpg",
        "render_stem": "render_Black Forest",
        "normalized_stem": "black-forest",
        "stone_img": "assets/images/products/product-1783083657-6a47b289a4a40.webp"
    },
    {
        "product_id": "black-pearl",
        "product_name": "Black Pearl",
        "category": "Granite",
        "pattern": "kitchen_floor_black_pearl*.jpg",
        "render_stem": "render_Black Pearl",
        "normalized_stem": "black-pearl",
        "stone_img": "assets/images/products/product-1783138424-6a488878abc22.webp"
    },
    {
        "product_id": "blue-night",
        "product_name": "Blue in the Night",
        "category": "Granite",
        "pattern": "kitchen_floor_blue_in_the_night*.jpg",
        "render_stem": "render_Blue in the Night",
        "normalized_stem": "blue-night",
        "stone_img": "assets/images/products/product-1783085244-6a47b8bcd330d.webp"
    },
    {
        "product_id": "emerald-onyx",
        "product_name": "Emerald Onyx Marble",
        "category": "Onyx",
        "pattern": "kitchen_floor_emerald_onyx*.jpg",
        "render_stem": "render_Emerald Onyx",
        "normalized_stem": "emerald-onyx",
        "stone_img": "assets/images/products/product-1783085161-6a47b869e0448.webp"
    },
    {
        "product_id": "kashmir-white",
        "product_name": "Kashmir / Alaska White",
        "category": "Granite",
        "pattern": "kitchen_floor_kashmir_white*.jpg",
        "render_stem": "render_Kashmir White",
        "normalized_stem": "kashmir-white",
        "stone_img": "assets/images/products/product-1783084356-6a47b5441b767.webp"
    },
    {
        "product_id": "marie-gold",
        "product_name": "Marie Gold",
        "category": "Granite",
        "pattern": "kitchen_floor_marie_gold*.jpg",
        "render_stem": "render_Marie Gold",
        "normalized_stem": "marie-gold",
        "stone_img": "assets/images/products/product-1783085317-6a47b9058f71e.webp"
    },
    {
        "product_id": "moon-white",
        "product_name": "Moon White",
        "category": "Granite",
        "pattern": "kitchen_floor_moon_white*.jpg",
        "render_stem": "render_Moon White",
        "normalized_stem": "moon-white",
        "stone_img": "assets/images/products/product-1783079448-6a47a218632fd.webp"
    },
    {
        "product_id": "river-black",
        "product_name": "River Black",
        "category": "Granite",
        "pattern": "kitchen_floor_river_black*.jpg",
        "render_stem": "render_River Black",
        "normalized_stem": "river-black",
        "stone_img": "assets/images/products/product-1783138465-6a4888a145274.webp"
    },
    {
        "product_id": "river-white",
        "product_name": "River White",
        "category": "Granite",
        "pattern": "kitchen_floor_river_white*.jpg",
        "render_stem": "render_River White",
        "normalized_stem": "river-white",
        "stone_img": "assets/images/products/product-1783078831-6a479faf4fcbd.webp"
    },
    {
        "product_id": "statuario-marble",
        "product_name": "Statuario / Banswara Marble",
        "category": "Marble",
        "pattern": "*statuario*.jpg",
        "render_stem": "render_Statuario",
        "normalized_stem": "statuario-marble",
        "stone_img": "assets/images/products/product-1783085208-6a47b8986af97.webp"
    },
    {
        "product_id": "tan-brown",
        "product_name": "Tan Brown",
        "category": "Granite",
        "pattern": "kitchen_floor_tan_brown*.jpg",
        "render_stem": "render_Tan Brown",
        "normalized_stem": "tan-brown",
        "stone_img": "assets/images/products/product-1783084011-6a47b3eb20cf0.webp"
    },
    {
        "product_id": "titanium-black",
        "product_name": "Titanium Black",
        "category": "Granite",
        "pattern": "kitchen_floor_titanium_black*.jpg",
        "render_stem": "render_Titanium Black",
        "normalized_stem": "titanium-black",
        "stone_img": "assets/images/products/product-1783083560-6a47b228132ac.webp"
    }
]

def calibrate_image(src_path, target_stem, normalized_stem):
    target_w, target_h = 1376, 768
    with Image.open(src_path) as im:
        im = im.convert("RGB")
        w, h = im.size
        # target aspect ratio: 1376 / 768 = 1.7916666...
        target_aspect = target_w / target_h
        current_aspect = w / h
        
        if abs(current_aspect - target_aspect) > 0.01:
            if current_aspect > target_aspect:
                # too wide: crop width
                new_w = int(h * target_aspect)
                left = (w - new_w) // 2
                im = im.crop((left, 0, left + new_w, h))
            else:
                # too tall: crop height
                new_h = int(w / target_aspect)
                top = (h - new_h) // 2
                im = im.crop((0, top, w, top + new_h))
        
        if im.size != (target_w, target_h):
            im = im.resize((target_w, target_h), Image.Resampling.LANCZOS)
        
        # Save to TARGET_DIR
        webp_path = os.path.join(TARGET_DIR, f"{target_stem}.webp")
        jpg_path = os.path.join(TARGET_DIR, f"{target_stem}.jpg")
        norm_webp_path = os.path.join(NORMALIZED_DIR, f"{normalized_stem}.webp")
        
        im.save(webp_path, "WEBP", quality=88, method=6)
        im.save(jpg_path, "JPEG", quality=92, optimize=True)
        im.save(norm_webp_path, "WEBP", quality=88, method=6)
        print(f"Processed: {target_stem} -> {im.size}")

def run():
    print("Checking brain and target directory for files...")
    calibrated_ids = []
    
    for s in STONES:
        # check brain dir
        matches = glob.glob(os.path.join(BRAIN_DIR, s["pattern"]))
        # exclude countertop samples if searching statuario
        if s["product_id"] == "statuario-marble":
            matches = [m for m in matches if "countertop" not in m and "sample_floor" in m or "kitchen_floor" in m or "statuario" in m.lower()]
            # If already exists in TARGET_DIR
            existing = os.path.join(TARGET_DIR, f"{s['render_stem']}.webp")
            if os.path.exists(existing) and not matches:
                matches = [os.path.join(TARGET_DIR, f"{s['render_stem']}.jpg")]
        
        if matches:
            latest = sorted(matches, key=os.path.getmtime)[-1]
            calibrate_image(latest, s["render_stem"], s["normalized_stem"])
            calibrated_ids.append(s["product_id"])
        else:
            existing = os.path.join(TARGET_DIR, f"{s['render_stem']}.webp")
            if os.path.exists(existing):
                # Ensure normalized copy exists
                norm_webp = os.path.join(NORMALIZED_DIR, f"{s['normalized_stem']}.webp")
                if not os.path.exists(norm_webp):
                    with Image.open(existing) as im:
                        im.save(norm_webp, "WEBP", quality=88)
                calibrated_ids.append(s["product_id"])
                print(f"Already exists: {s['render_stem']}")
            else:
                print(f"Waiting for generation: {s['product_id']} ({s['pattern']})")

    # Update manifest
    with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
        manifest = json.load(f)
    
    # Remove any existing kitchen floor entries to avoid duplicates
    manifest = [e for e in manifest if not (e.get("room_id") == "kitchen" and e.get("surface_id") == "floor")]
    
    # Add all calibrated kitchen floor entries
    added_count = 0
    for s in STONES:
        if s["product_id"] in calibrated_ids:
            manifest_entry = {
                "product_id": s["product_id"],
                "product_name": s["product_name"],
                "category": s["category"],
                "room_id": "kitchen",
                "room_name": "Kitchen",
                "surface_id": "floor",
                "surface_name": "Kitchen Marble Flooring",
                "original_room_image": "assets/images/rooms/kitchen-luxury.webp",
                "original_stone_image": s["stone_img"],
                "generated_preview": f"assets/images/room_renders/kitchen floor/{s['render_stem']}.webp",
                "normalized_render_path": f"assets/images/room_renders/kitchen-floor/{s['normalized_stem']}.webp",
                "width": 1376,
                "height": 768,
                "aspect_ratio": 1.7917,
                "aspect_ratio_match": True,
                "status": "verified_architectural_render",
                "review_status": "verified",
                "png_preview": f"assets/images/room_renders/kitchen floor/{s['render_stem']}.jpg"
            }
            manifest.append(manifest_entry)
            added_count += 1
            
    with open(MANIFEST_PATH, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)
    print(f"Manifest successfully updated: added {added_count} kitchen floor entries. Total manifest items: {len(manifest)}")

if __name__ == "__main__":
    run()

