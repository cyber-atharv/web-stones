/**
 * Murali Granites & Marbles — Living Room Showroom & Suite 3D WebGL Room
 */
(function (window) {
  'use strict';

  window.WebGlRooms = window.WebGlRooms || {};

  window.WebGlRooms.living = function (ctx) {
    const { THREE, group, reg, roomDefs, ROOM_CAMERAS, core, showroomSlabs, presets } = ctx;
    const { M, box, cyl, sbox, plant, createWoodTexture, createFabricTexture, createPlasterTexture, createRugTexture } = core;

    const maxAni = 4;
    const woodTex = createWoodTexture(maxAni);
    const fabricTex = createFabricTexture(maxAni);
    const fabricCushTex = createFabricTexture(maxAni, '#e4d8c5');
    const plasterTex = createPlasterTexture(maxAni);
    const rugTex = createRugTexture(maxAni);

    const wall = new THREE.MeshStandardMaterial({ map: plasterTex, roughness: 0.85 });
    const wood = new THREE.MeshStandardMaterial({ map: woodTex, roughness: 0.38, metalness: 0.05 });
    const slat = new THREE.MeshStandardMaterial({ map: woodTex, roughness: 0.42, metalness: 0.04 });
    const black = new THREE.MeshStandardMaterial({ color: 0x181918, roughness: 0.25, metalness: 0.8 });
    const sofa = new THREE.MeshStandardMaterial({ map: fabricTex, roughness: 0.94 });
    const cush = new THREE.MeshStandardMaterial({ map: fabricCushTex, roughness: 0.90 });
    const pot = new THREE.MeshStandardMaterial({ color: 0x3d352b, roughness: 0.6 });
    const green = new THREE.MeshStandardMaterial({ color: 0x2e4630, roughness: 0.35, metalness: 0.05 });
    const rugMat = new THREE.MeshStandardMaterial({ map: rugTex, roughness: 0.95 });

    // 1. Lighting
    const sun = new THREE.DirectionalLight(0xffe5bf, 3.2);
    sun.position.set(-4, 9, 6);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.bias = -0.0003;
    sun.shadow.radius = 2.0;
    group.add(sun);

    const fill = new THREE.DirectionalLight(0xc7ddff, 1.25);
    fill.position.set(5, 5, -5);
    group.add(fill);

    const livingSpot = new THREE.SpotLight(0xfff1dc, 2.4, 15, Math.PI * 0.3, 0.4, 1.2);
    livingSpot.position.set(0, 6.5, 0);
    livingSpot.target.position.set(0, 0, 0);
    group.add(livingSpot);
    group.add(livingSpot.target);

    // 2. Floor & Rug
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(12, 11), M('#e0d3bd', 0.22));
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0.025;
    floor.receiveShadow = true;
    group.add(floor);

    const rug = new THREE.Mesh(new THREE.PlaneGeometry(6.4, 4.8), rugMat);
    rug.rotation.x = -Math.PI / 2;
    rug.position.set(-0.8, 0.035, -1.2);
    rug.receiveShadow = true;
    group.add(rug);

    // 3. Slats, Window Wall & TV Unit
    for (let i = 0; i < 16; i++) box(0.055, 4.25, 0.08, -5.77, 2.16, -4.7 + i * 0.62, slat, group);
    box(5.3, 0.12, 0.12, 0, 3.65, -5.28, black, group);
    box(5.3, 0.12, 0.12, 0, 1, -5.28, black, group);
    for (const x of [-2.65, 0, 2.65]) box(0.1, 2.65, 0.12, x, 2.32, -5.28, black, group);
    const glass = M('#a4c6d0', 0.25);
    glass.emissive = new THREE.Color('#34535d');
    glass.emissiveIntensity = 0.3;
    box(5.15, 2.5, 0.035, 0, 2.32, -5.32, glass, group);

    box(0.2, 3.1, 5.6, 5.65, 2.15, -1.8, wood, group);
    box(0.13, 1.65, 3.05, 5.5, 2.65, -1.8, black, group);
    box(0.035, 1.48, 2.88, 5.42, 2.65, -1.8, M('#0e171a', 0.2), group);

    // 4. Sectional Sofa & Coffee Table
    box(3.8, 0.48, 1.15, -1.3, 0.52, -2.55, sofa, group);
    box(3.8, 1.12, 0.34, -1.3, 1.15, -3, sofa, group);
    box(0.34, 0.8, 1.25, -3.2, 0.82, -2.52, sofa, group);
    box(0.34, 0.8, 1.25, 0.6, 0.82, -2.52, sofa, group);
    for (let i = 0; i < 3; i++) {
      box(1.12, 0.18, 0.88, -2.45 + i * 1.15, 0.82, -2.43, cush, group);
      box(1.02, 0.8, 0.22, -2.45 + i * 1.15, 1.52, -2.82, cush, group);
    }
    cyl(0.58, 0.62, 0.13, -0.55, 0.84, 0.05, black, group);
    cyl(0.14, 0.18, 0.78, -0.55, 0.43, 0.05, black, group);
    cyl(0.42, 0.48, 0.1, -0.55, 0.26, 0.05, black, group);

    box(1.25, 0.26, 1.1, 2.05, 0.62, -1.35, slat, group);
    box(1.15, 1.05, 0.22, 2.05, 1.13, -1.78, slat, group);
    box(1.05, 0.15, 0.88, 2.05, 0.83, -1.35, cush, group);

    plant(-4.7, -4.2, 1.4, pot, green, group);
    plant(4.7, -4.5, 1.25, pot, green, group);
    plant(4.7, 2.8, 1.1, pot, green, group);
    box(0.08, 1.65, 1.25, -4.5, 2.75, -5.3, slat, group);
    box(0.04, 1.48, 1.08, -4.45, 2.75, -5.23, M('#bca68b'), group);

    // Register Surfaces
    reg('living', 'living_floor', 'Grand Living Floor', floor, null, 12, 11);
    reg('living', 'living_accent', 'Accent Feature Wall', sbox(4.5, 3.2, 0.2, 0, 1.6, -5.2, wall, group), 1, 4.5, 3.2);
    reg('living', 'living_walls', 'Main Villa Walls', sbox(8.5, 3.2, 0.2, -4.5, 1.6, 0, wall, group), 1, 8.5, 3.2);

    // Cameras (V1 360° Walkthrough Showroom is Primary, Three.js fallback is included)
    ROOM_CAMERAS.living = {
      type: 'v1',
      title: 'Living Room Showroom (3D Walkthrough)',
      subtitle: '• Interactive 360° Walkthrough & PBR Marble Flooring',
      hint: '<span class="text-[#10B981] font-semibold">💡 3D Walkthrough Showroom:</span> Click and drag to look around 360°, tap on floor circles to walk through the villa, and pick any marble or granite below to customize floors and walls in real-time.',
      defaultCam: 'floor',
      cameras: [
        { id: 'floor', label: '🧱 Grand Floor', surfKey: 'living_floor' },
        { id: 'accent', label: '🖼️ Feature Wall', surfKey: 'living_accent' },
        { id: 'walls', label: '🏛️ Main Walls', surfKey: 'living_walls' },
        { id: 'walkthrough', label: '🚶 360° Walkthrough', surfKey: 'living_floor' }
      ]
    };

    // Default Stones
    const livFloorStone = showroomSlabs.find(s => s.name === 'Statuario') || showroomSlabs.find(s => s.name === 'Calacatta White') || presets[0];
    const livAccentStone = showroomSlabs.find(s => s.name === 'River Black') || showroomSlabs.find(s => s.name === 'Titanium Black') || presets[0];
    const livWallsStone = showroomSlabs.find(s => s.name === 'Armani Grey PGVT Tile') || showroomSlabs.find(s => s.name === 'Steel Grey') || presets[0];

    if (roomDefs.living) {
      if (roomDefs.living.surfaces.living_floor) {
        roomDefs.living.surfaces.living_floor.src = livFloorStone;
        roomDefs.living.surfaces.living_floor.set = { struct: 'slab', mode: 'mirror', size: 2.4, rot: 0, gloss: 0.95, grout: 2 };
      }
      if (roomDefs.living.surfaces.living_accent) {
        roomDefs.living.surfaces.living_accent.src = livAccentStone;
        roomDefs.living.surfaces.living_accent.set = { struct: 'slab', mode: 'mirror', size: 2.4, rot: 0, gloss: 0.92, grout: 2 };
      }
      if (roomDefs.living.surfaces.living_walls) {
        roomDefs.living.surfaces.living_walls.src = livWallsStone;
        roomDefs.living.surfaces.living_walls.set = { struct: 'tile120', mode: 'repeat', size: 1.2, rot: 0, gloss: 0.70, grout: 2 };
      }
    }
  };
})(window);
