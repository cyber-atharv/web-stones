import json
import os

paths = [
    'd:/projects/Web-Dev/chirag/ch01/V1/assets/scenes/interior2.js',
    'd:/projects/Web-Dev/chirag/V1/assets/scenes/interior2.js',
]

for path in paths:
    if not os.path.exists(path):
        print(f"File not found: {path}")
        continue

    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    root_children = data['object']['children']
    print(f"\nProcessing {path}")
    print(f"Children before: {len(root_children)}")

    # Find rugs and furniture to remove
    to_remove = []
    for i, c in enumerate(root_children):
        name = c.get('name', '')
        if name in ['rug', 'rug (1)']:
            print(f"Removing child at index {i}: {name}")
            to_remove.append(c)

    for item in to_remove:
        root_children.remove(item)

    print(f"Children after: {len(root_children)}")

    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)

    print(f"Saved {path} successfully.")
