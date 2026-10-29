import os

files_to_update = [
    'd:/projects/Web-Dev/chirag/ch01/visualizer-3.html',
    'd:/projects/Web-Dev/chirag/visualizer-3.html',
    'd:/projects/Web-Dev/chirag/ch01/V1/index.html',
    'd:/projects/Web-Dev/chirag/V1/index.html',
]

for p in files_to_update:
    if os.path.exists(p):
        with open(p, 'r', encoding='utf-8') as f:
            content = f.read()
        new_content = content.replace('v=3.5.1', 'v=3.5.2')
        with open(p, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {p} to v=3.5.2")
