import os
import json
import base64
import time
import requests

# Murali Granites & Marbles - Automated AI Room Preview Generator
# Uses exact reference room photos from assets/images/rooms to prevent fake rooms.

API_KEY = os.environ.get("GEMINI_API_KEY", "AQ.Ab8RN6IyqzeoTX0Wa-1SOHXCg6PIzeAaWkP5JPbStFQNUU3mMA")
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

def main():
    print("=== STARTING AI ROOM GENERATION ===")
    for target in TARGETS:
        dest_folder = os.path.join(OUTPUT_DIR, target["folder"])
        os.makedirs(dest_folder, exist_ok=True)
        
        for mat in MATERIALS:
            out_filename = f"Gemini_Generated_Image_{mat['name']}.png"
            out_path = os.path.join(dest_folder, out_filename)
            
            if os.path.exists(out_path):
                print(f"[EXISTS] Skipping already generated: {target['folder']} / {mat['name']}")
                continue
                
            print(f"[GENERATING] {target['folder']} -> {mat['name']}...")
            success = generate_preview(target["room_file"], mat["image"], mat["name"], target["surface"], out_path)
            time.sleep(2)  # Respect rate limit window

if __name__ == "__main__":
    main()
