import os

paths = [
    'd:/projects/Web-Dev/chirag/ch01/V1/js/main.min.js',
    'd:/projects/Web-Dev/chirag/V1/js/main.min.js',
    'd:/projects/Web-Dev/web gl/showroom-littleworkshop/js/main.min.js',
]

for p in paths:
    if not os.path.exists(p):
        continue
    with open(p, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    target = 'function(t,e){t.exports=".js"}'
    replacement = 'function(t,e){t.exports=".js?v=3.5.2"}'

    if target in content:
        content = content.replace(target, replacement)
        with open(p, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Patched {p} with scene cache-busting query parameter (?v=3.5.2)")
    elif replacement in content:
        print(f"Already patched: {p}")
    else:
        print(f"Target pattern not found in {p}")
