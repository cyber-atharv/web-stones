import os
import shutil

artifact_dir = r"C:\Users\Smart\.gemini\antigravity-ide\brain\5b11579c-5c35-4837-a8ab-99757ba1be5d"

mapping = {
    "vis_kitchen_granite_1791705222110.jpg": "kitchen.jpg",
    "vis_living_marble_1791705249215.jpg": "living-room.jpg",
    "vis_bathroom_onyx_1791705271899.jpg": "bathroom.jpg",
    "vis_dining_granite_1791705304308.jpg": "dining-room.jpg",
    "vis_foyer_bookmatch_1791705331131.jpg": "foyer.jpg",
    "vis_lounge_accent_wall_1791705357526.jpg": "lounge-wall.jpg"
}

dest_dir = r"d:\projects\Web-Dev\chirag\ch01\assets\images\rooms"

for src_name, dest_name in mapping.items():
    src_path = os.path.join(artifact_dir, src_name)
    dest_path = os.path.join(dest_dir, dest_name)
    backup_path = os.path.join(dest_dir, dest_name.replace(".jpg", "_orig.jpg"))

    if os.path.exists(dest_path) and not os.path.exists(backup_path):
        shutil.copy2(dest_path, backup_path)
        print(f"Backed up: {dest_name} -> {backup_path}")

    if os.path.exists(src_path):
        shutil.copy2(src_path, dest_path)
        print(f"Copied generated room to: {dest_path}")
    else:
        print(f"Warning: {src_path} not found!")

print("All visualizer room photos updated with high-end generated renders!")
