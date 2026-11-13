import json
import struct
import os

def create_box_glb(output_path, size_x, size_y, size_z, is_horizontal=False, texture_repeat=(1.0, 1.0)):
    # Half extents
    hx = size_x / 2.0
    hy = size_y / 2.0
    hz = size_z / 2.0

    if is_horizontal:
        # Horizontal flat slab on ground: X = width, Y = thickness, Z = length
        # Bottom sits at Y = 0
        min_y = 0.0
        max_y = size_y
        positions = [
            # Top face (+Y)
            -hx, max_y,  hz,
             hx, max_y,  hz,
             hx, max_y, -hz,
            -hx, max_y, -hz,
            # Bottom face (-Y)
            -hx, min_y, -hz,
             hx, min_y, -hz,
             hx, min_y,  hz,
            -hx, min_y,  hz,
            # Front face (+Z)
            -hx, min_y,  hz,
             hx, min_y,  hz,
             hx, max_y,  hz,
            -hx, max_y,  hz,
            # Back face (-Z)
             hx, min_y, -hz,
            -hx, min_y, -hz,
            -hx, max_y, -hz,
             hx, max_y, -hz,
            # Left face (-X)
            -hx, min_y, -hz,
            -hx, min_y,  hz,
            -hx, max_y,  hz,
            -hx, max_y, -hz,
            # Right face (+X)
             hx, min_y,  hz,
             hx, min_y, -hz,
             hx, max_y, -hz,
             hx, max_y,  hz,
        ]
        normals = [
            0,1,0, 0,1,0, 0,1,0, 0,1,0,
            0,-1,0, 0,-1,0, 0,-1,0, 0,-1,0,
            0,0,1, 0,0,1, 0,0,1, 0,0,1,
            0,0,-1, 0,0,-1, 0,0,-1, 0,0,-1,
            -1,0,0, -1,0,0, -1,0,0, -1,0,0,
            1,0,0, 1,0,0, 1,0,0, 1,0,0
        ]
    else:
        # Standing vertical slab: X = width, Y = height, Z = thickness
        # Bottom sits at Y = 0
        min_y = 0.0
        max_y = size_y
        positions = [
            # Front face (+Z) - The primary stone slab face
            -hx, min_y,  hz,
             hx, min_y,  hz,
             hx, max_y,  hz,
            -hx, max_y,  hz,
            # Back face (-Z)
             hx, min_y, -hz,
            -hx, min_y, -hz,
            -hx, max_y, -hz,
             hx, max_y, -hz,
            # Top face (+Y)
            -hx, max_y,  hz,
             hx, max_y,  hz,
             hx, max_y, -hz,
            -hx, max_y, -hz,
            # Bottom face (-Y)
            -hx, min_y, -hz,
             hx, min_y, -hz,
             hx, min_y,  hz,
            -hx, min_y,  hz,
            # Left face (-X)
            -hx, min_y, -hz,
            -hx, min_y,  hz,
            -hx, max_y,  hz,
            -hx, max_y, -hz,
            # Right face (+X)
             hx, min_y,  hz,
             hx, min_y, -hz,
             hx, max_y, -hz,
             hx, max_y,  hz,
        ]
        normals = [
            0,0,1, 0,0,1, 0,0,1, 0,0,1,
            0,0,-1, 0,0,-1, 0,0,-1, 0,0,-1,
            0,1,0, 0,1,0, 0,1,0, 0,1,0,
            0,-1,0, 0,-1,0, 0,-1,0, 0,-1,0,
            -1,0,0, -1,0,0, -1,0,0, -1,0,0,
            1,0,0, 1,0,0, 1,0,0, 1,0,0
        ]

    rx, ry = texture_repeat
    uvs = [
        # Face 1 (Primary display face)
        0.0, 1.0*ry,
        1.0*rx, 1.0*ry,
        1.0*rx, 0.0,
        0.0, 0.0,
        # Face 2
        0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0,
        # Face 3
        0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0,
        # Face 4
        0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0,
        # Face 5
        0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0,
        # Face 6
        0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0,
    ]

    indices = []
    for face in range(6):
        base = face * 4
        indices.extend([base, base + 1, base + 2, base, base + 2, base + 3])

    # Convert to binary
    pos_bytes = bytearray()
    min_pos = [float('inf')]*3
    max_pos = [float('-inf')]*3
    for i in range(0, len(positions), 3):
        x, y, z = positions[i], positions[i+1], positions[i+2]
        pos_bytes.extend(struct.pack('<fff', x, y, z))
        min_pos[0] = min(min_pos[0], x)
        min_pos[1] = min(min_pos[1], y)
        min_pos[2] = min(min_pos[2], z)
        max_pos[0] = max(max_pos[0], x)
        max_pos[1] = max(max_pos[1], y)
        max_pos[2] = max(max_pos[2], z)

    norm_bytes = bytearray()
    for n in normals:
        norm_bytes.extend(struct.pack('<f', float(n)))

    uv_bytes = bytearray()
    min_uv = [float('inf')]*2
    max_uv = [float('-inf')]*2
    for i in range(0, len(uvs), 2):
        u, v = uvs[i], uvs[i+1]
        uv_bytes.extend(struct.pack('<ff', u, v))
        min_uv[0] = min(min_uv[0], u)
        min_uv[1] = min(min_uv[1], v)
        max_uv[0] = max(max_uv[0], u)
        max_uv[1] = max(max_uv[1], v)

    idx_bytes = bytearray()
    for idx in indices:
        idx_bytes.extend(struct.pack('<H', idx))

    # Buffer layout:
    # 0: indices (36 unsigned shorts = 72 bytes)
    # 1: positions (24 * 3 * 4 = 288 bytes)
    # 2: normals (24 * 3 * 4 = 288 bytes)
    # 3: uvs (24 * 2 * 4 = 192 bytes)
    # Total = 840 bytes

    bin_data = bytearray()
    bin_data.extend(idx_bytes)
    # Pad to 4 bytes if needed
    while len(bin_data) % 4 != 0:
        bin_data.append(0)
    pos_offset = len(bin_data)
    bin_data.extend(pos_bytes)

    norm_offset = len(bin_data)
    bin_data.extend(norm_bytes)

    uv_offset = len(bin_data)
    bin_data.extend(uv_bytes)

    while len(bin_data) % 4 != 0:
        bin_data.append(0)

    total_bin_len = len(bin_data)

    gltf = {
        "asset": {
            "version": "2.0",
            "generator": "Murali Granites WebXR AR Exporter"
        },
        "scene": 0,
        "scenes": [
            {
                "nodes": [0]
            }
        ],
        "nodes": [
            {
                "mesh": 0,
                "name": "Murali_Stone_Slab"
            }
        ],
        "meshes": [
            {
                "primitives": [
                    {
                        "attributes": {
                            "POSITION": 1,
                            "NORMAL": 2,
                            "TEXCOORD_0": 3
                        },
                        "indices": 0,
                        "material": 0
                    }
                ],
                "name": "StoneSlabMesh"
            }
        ],
        "materials": [
            {
                "name": "Murali_Stone_PBR",
                "pbrMetallicRoughness": {
                    "baseColorFactor": [0.92, 0.90, 0.88, 1.0],
                    "metallicFactor": 0.05,
                    "roughnessFactor": 0.25
                },
                "doubleSided": False
            }
        ],
        "accessors": [
            {
                "bufferView": 0,
                "byteOffset": 0,
                "componentType": 5123,  # UNSIGNED_SHORT
                "count": len(indices),
                "type": "SCALAR",
                "max": [max(indices)],
                "min": [min(indices)]
            },
            {
                "bufferView": 1,
                "byteOffset": 0,
                "componentType": 5126,  # FLOAT
                "count": len(positions) // 3,
                "type": "VEC3",
                "max": max_pos,
                "min": min_pos
            },
            {
                "bufferView": 2,
                "byteOffset": 0,
                "componentType": 5126,  # FLOAT
                "count": len(normals) // 3,
                "type": "VEC3",
                "max": [1.0, 1.0, 1.0],
                "min": [-1.0, -1.0, -1.0]
            },
            {
                "bufferView": 3,
                "byteOffset": 0,
                "componentType": 5126,  # FLOAT
                "count": len(uvs) // 2,
                "type": "VEC2",
                "max": max_uv,
                "min": min_uv
            }
        ],
        "bufferViews": [
            {
                "buffer": 0,
                "byteOffset": 0,
                "byteLength": len(idx_bytes),
                "target": 34963  # ELEMENT_ARRAY_BUFFER
            },
            {
                "buffer": 0,
                "byteOffset": pos_offset,
                "byteLength": len(pos_bytes),
                "target": 34962  # ARRAY_BUFFER
            },
            {
                "buffer": 0,
                "byteOffset": norm_offset,
                "byteLength": len(norm_bytes),
                "target": 34962  # ARRAY_BUFFER
            },
            {
                "buffer": 0,
                "byteOffset": uv_offset,
                "byteLength": len(uv_bytes),
                "target": 34962  # ARRAY_BUFFER
            }
        ],
        "buffers": [
            {
                "byteLength": total_bin_len
            }
        ]
    }

    json_str = json.dumps(gltf, separators=(',', ':'))
    json_bytes = json_str.encode('utf-8')
    while len(json_bytes) % 4 != 0:
        json_bytes += b' '

    total_glb_len = 12 + 8 + len(json_bytes) + 8 + total_bin_len

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, 'wb') as f:
        # GLB Header
        f.write(b'glTF')  # magic
        f.write(struct.pack('<I', 2))  # version
        f.write(struct.pack('<I', total_glb_len))

        # Chunk 0: JSON
        f.write(struct.pack('<I', len(json_bytes)))
        f.write(b'JSON')
        f.write(json_bytes)

        # Chunk 1: BIN
        f.write(struct.pack('<I', total_bin_len))
        f.write(b'BIN\x00')
        f.write(bin_data)

    print(f"Generated GLB: {output_path} ({total_glb_len} bytes)")

# 1. Jumbo Slab Model (2.8m x 1.6m x 0.02m) standing upright
create_box_glb('assets/models/jumbo_slab.glb', size_x=2.8, size_y=1.6, size_z=0.03, is_horizontal=False)

# 2. Floor Tiles AR Model (2.4m x 2.4m x 0.015m) flat on floor (repeats 4x4 tiles)
create_box_glb('assets/models/floor_tiles_ar.glb', size_x=2.4, size_y=0.015, size_z=2.4, is_horizontal=True, texture_repeat=(4.0, 4.0))

