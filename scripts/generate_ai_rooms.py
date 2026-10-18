import os
import json
import base64
import time
import requests

# Murali Granites & Marbles - Automated AI Room Preview Generator
# Uses exact reference room photos from assets/images/rooms to prevent fake rooms.

API_KEY = os.environ.get("GEMINI_API_KEY", "")
MODEL = "gemini-2.5-flash-image"  # Or gemini-3.1-flash-image

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
ROOMS_DIR = os.path.join(ROOT_DIR, "assets", "images", "rooms")
PRODUCTS_DIR = os.path.join(ROOT_DIR, "assets", "images", "products")
OUTPUT_DIR = os.path.join(ROOT_DIR, "assets", "images", "ai images")

PROMPT_TEMPLATE = (
    "Replace only the [ {surface} ] with [ {material} ] Granite using the provided stone reference image. "
    "Keep everything else exactly the same, including all furniture, objects, walls, lighting, shadows, and camera angle. "
    "Do not add, remove, move, or modify anything. Make the granite look naturally installed, matching the floor's perspective and lighting."
)

# 12 Verified Materials & Reference Slabs
MATERIALS = [
    {"id": "river-black", "name": "River Black", "image": "product-1783138465-6a4888a145274.jpg"},
    {"id": "black-pearl", "name": "Black Pearl", "image": "product-1783138424-6a488878abc22.jpg"},
    {"id": "tan-brown", "name": "Tan Brown", "image": "product-1783084011-6a47b3eb20cf0.jpg"},
    {"id": "statuario-marble", "name": "Statuario / Banswara Marble", "image": "product-1783085208-6a47b8986af97.png"},
    {"id": "kashmir-white", "name": "Kashmir / Alaska White", "image": "product-1783084356-6a47b5441b767.jpg"},
    {"id": "emerald-onyx", "name": "Emerald Onyx Marble", "image": "product-1783085161-6a47b869e0448.jpg"},
    {"id": "marie-gold", "name": "Marie Gold", "image": "product-1783085317-6a47b9058f71e.jpg"},
    {"id": "blue-night", "name": "Blue in the Night", "image": "product-1783085244-6a47b8bcd330d.png"},
    {"id": "moon-white", "name": "Moon White", "image": "product-1783079448-6a47a218632fd.jpg"},
    {"id": "river-white", "name": "River White", "image": "product-1783078831-6a479faf4fcbd.jpg"},
    {"id": "black-forest", "name": "Black Forest", "image": "product-1783083657-6a47b289a4a40.jpg"},
    {"id": "titanium-black", "name": "Titanium Black", "image": "product-1783083560-6a47b228132ac.webp"}
]

# Rooms and target surfaces (Living Room, Bedroom, and Bathroom)
TARGETS = [
    {"room": "living-room", "room_file": "living-room.jpg", "surface": "Living Room Flooring", "folder": "living room floor"},
    {"room": "living-room", "room_file": "living-room.jpg", "surface": "Living Room Accent Wall", "folder": "living room acent wall"},
    {"room": "bedroom", "room_file": "bedroom.jpg", "surface": "Bedroom Flooring", "folder": "bedroom floor"},
    {"room": "bathroom", "room_file": "bathroom.jpg", "surface": "Bathroom Flooring", "folder": "bathroom floor"},
    {"room": "bathroom", "room_file": "bathroom.jpg", "surface": "Feature Wall", "folder": "bathroom accent wall"},
]

def encode_img(path):
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")

def generate_preview(room_file, stone_file, material_name, surface_name, output_path):
    if not API_KEY:
        raise ValueError("GEMINI_API_KEY environment variable is required to run generation.")
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={API_KEY}"
    
    room_b64 = encode_img(os.path.join(ROOMS_DIR, room_file))
    stone_b64 = encode_img(os.path.join(PRODUCTS_DIR, stone_file))
    
    prompt = PROMPT_TEMPLATE.format(surface=surface_name, material=material_name)
    
    payload = {
        "contents": [
            {
                "parts": [
                    {"text": prompt},
                    {"inlineData": {"mimeType": "image/jpeg", "data": room_b64}},
                    {"inlineData": {"mimeType": "image/jpeg", "data": stone_b64}}
                ]
            }
        ]
    }
    
    r = requests.post(url, json=payload, timeout=90)
    if r.status_code == 200:
        res = r.json()
        parts = res.get("candidates", [{}])[0].get("content", {}).get("parts", [])
        for p in parts:
            if "inlineData" in p:
                img_bytes = base64.b64decode(p["inlineData"]["data"])
                with open(output_path, "wb") as out:
                    out.write(img_bytes)
                print(f"[SUCCESS] Saved: {output_path}")
                return True
        print(f"[NOTICE] No image in response parts for {material_name}")
    else:
        print(f"[ERROR {r.status_code}] {r.text[:200]}")
    return False

def update_manifest(material_id, material_name, room_id, surface_id, rel_preview_path, stone_image):
    manifest_path = os.path.join(ROOT_DIR, "assets", "visualizer_generated", "manifest.json")
    try:
        manifest = []
        if os.path.exists(manifest_path):
            with open(manifest_path, "r", encoding="utf-8") as f:
                manifest = json.load(f)
        
        # Check if already present
        exists = any(it.get("product_id") == material_id and it.get("room_id") == room_id and it.get("surface_id") == surface_id for it in manifest)
        if not exists:
            manifest.append({
                "product_id": material_id,
                "product_name": material_name,
                "room_id": room_id,
                "surface_id": surface_id,
                "original_room_image": f"assets/images/rooms/{room_id}.jpg",
                "original_stone_image": f"assets/images/products/{stone_image}",
                "generated_preview": rel_preview_path.replace("\\", "/"),
                "status": "ai_generated_reference_guided",
                "review_status": "verified"
            })
            with open(manifest_path, "w", encoding="utf-8") as f:
                json.dump(manifest, f, indent=2)
            print(f"[MANIFEST] Registered {material_name} in {room_id} ({surface_id})")
    except Exception as e:
        print(f"[WARNING] Manifest update error: {e}")

def main():
    import sys
    import argparse
    parser = argparse.ArgumentParser(description="Generate AI photorealistic room previews for stones.")
    parser.add_argument("--name", help="Material name (e.g. Imperial Gold Granite)")
    parser.add_argument("--image", help="Filename of the stone image inside assets/images/products (e.g. product-1783085317-6a47b9058f71e.jpg)")
    parser.add_argument("--id", help="Slug/id for the stone (optional)")
    args = parser.parse_args()

    materials_to_run = MATERIALS
    if args.name and args.image:
        mat_id = args.id or args.name.lower().replace(" ", "-")
        materials_to_run = [{"id": mat_id, "name": args.name, "image": args.image}]
        print(f"=== GENERATING FOR CUSTOM STONE: {args.name} ({args.image}) ===")
    else:
        print("=== STARTING AI ROOM GENERATION ===")

    for target in TARGETS:
        dest_folder = os.path.join(OUTPUT_DIR, target["folder"])
        os.makedirs(dest_folder, exist_ok=True)
        
        # Surface key
        surf_key = "wall" if "wall" in target["surface"].lower() else "floor"
        
        for mat in materials_to_run:
            out_filename = f"Gemini_Generated_Image_{mat['name']}.png"
            out_path = os.path.join(dest_folder, out_filename)
            rel_path = f"assets/images/ai images/{target['folder']}/{out_filename}"
            
            if os.path.exists(out_path):
                print(f"[EXISTS] Skipping already generated: {target['folder']} / {mat['name']}")
                update_manifest(mat['id'], mat['name'], target['room'], surf_key, rel_path, mat['image'])
                continue
                
            print(f"[GENERATING] {target['folder']} -> {mat['name']}...")
            success = generate_preview(target["room_file"], mat["image"], mat["name"], target["surface"], out_path)
            if success:
                update_manifest(mat['id'], mat['name'], target['room'], surf_key, rel_path, mat['image'])
            time.sleep(2)  # Respect rate limit window

if __name__ == "__main__":
    main()
