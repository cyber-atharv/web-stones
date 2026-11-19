/**
 * Murali Granites & Marbles — Contemporary Chef Kitchen Suite 3D WebGL Room
 */
(function (window) {
  'use strict';

  window.WebGlRooms = window.WebGlRooms || {};

  window.WebGlRooms.kitchen = function (ctx) {
    const { THREE, group, reg, roomDefs, ROOM_CAMERAS, core, showroomSlabs, presets } = ctx;
    const { M, box, cyl, sbox, createPlasterTexture, createWoodTexture } = core;

    const maxAni = 4;
    const plasterTex = createPlasterTexture(maxAni);
    const wall = new THREE.MeshStandardMaterial({ map: plasterTex, roughness: 0.85 });
    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xdddddd, metalness: 0.95, roughness: 0.08 });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xc5a059, metalness: 0.88, roughness: 0.2 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x161618, roughness: 0.35 });
    const woodCabinet = createWoodTexture ? new THREE.MeshStandardMaterial({ map: createWoodTexture(maxAni), roughness: 0.35 }) : darkMat;
    const slat = woodCabinet;
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0xc0dfe8,
      transparent: true,
      opacity: 0.38,
      roughness: 0.06,
      metalness: 0.1
    });
    const warmLedMat = new THREE.MeshStandardMaterial({
      color: 0xfff0dd,
      emissive: new THREE.Color(0xffd180),
      emissiveIntensity: 0.9,
      roughness: 0.5
    });

    // 1. Lighting (Dedicated Architectural PBR Illumination)
    const kitchenSun = new THREE.DirectionalLight(0xfff6ea, 2.9);
    kitchenSun.position.set(-6, 9.5, 5);
    kitchenSun.castShadow = true;
    kitchenSun.shadow.mapSize.set(2048, 2048);
    kitchenSun.shadow.bias = -0.0005;
    kitchenSun.shadow.radius = 2.5;
    group.add(kitchenSun);

    const kitchenFill = new THREE.DirectionalLight(0xdbe9ff, 1.25);
    kitchenFill.position.set(5.5, 6, -4);
    group.add(kitchenFill);

    const islandPendantLight = new THREE.PointLight(0xffdfa8, 1.8, 6.5);
    islandPendantLight.position.set(0, 2.2, 0.2);
    group.add(islandPendantLight);

    const backsplashGlow = new THREE.PointLight(0xffecd0, 1.4, 5.0);
    backsplashGlow.position.set(0, 1.75, -4.1);
    group.add(backsplashGlow);

    // 2. Kitchen Large-Format Flooring
    const kitchenFloor = new THREE.Mesh(new THREE.PlaneGeometry(12, 11), M('#ded4c5', 0.2));
    kitchenFloor.rotation.x = -Math.PI / 2;
    kitchenFloor.position.set(0, 0.025, 0);
    kitchenFloor.receiveShadow = true;
    group.add(kitchenFloor);

    // 3. Perimeter Architectural Walls
    sbox(12, 1.8, 0.2, 0, 3.2, -4.4, wall, group);
    sbox(0.2, 4.2, 9, -5.9, 2.1, 0, wall, group);
    sbox(0.2, 4.2, 9, 5.9, 2.1, 0, wall, group);

    // 4. Wall Backsplash Slab Area
    const kitchenBacksplash = sbox(8.4, 1.4, 0.16, 0, 1.6, -4.38, wall, group);

    // Base Cabinets & Kickplate
    box(8.4, 0.9, 0.82, 0, 0.45, -3.99, darkMat, group);
    box(8.3, 0.1, 0.72, 0, 0.05, -3.94, M('#101012', 0.2), group);

    // Perimeter Countertop Slab
    const kitchenPerimeterCounter = sbox(8.5, 0.08, 0.86, 0, 0.94, -3.97, wall, group);

    // Upper Floating Cabinets & LED Strip
    box(8.4, 1.05, 0.45, 0, 2.82, -4.18, woodCabinet, group);
    box(8.3, 0.03, 0.08, 0, 2.28, -4.15, warmLedMat, group);

    // 5. Central Grand Waterfall Kitchen Island & Table
    box(4.2, 0.88, 1.6, 0, 0.44, 0.2, darkMat, group);
    for (let si = 0; si < 28; si++) {
      box(0.04, 0.86, 0.03, -1.89 + si * 0.14, 0.44, 1.02, slat, group);
    }

    const kitchenIslandTop = sbox(4.5, 0.1, 1.84, 0, 0.93, 0.2, wall, group);
    const kitchenIslandLeftDrop = sbox(0.1, 0.93, 1.84, -2.25, 0.465, 0.2, wall, group);
    const kitchenIslandRightDrop = sbox(0.1, 0.93, 1.84, 2.25, 0.465, 0.2, wall, group);
    box(4.3, 0.03, 0.04, 0, 0.87, 0.98, warmLedMat, group);

    // 6. Sink, Gooseneck Faucet, Induction Cooktop & Pendants
    box(1.0, 0.35, 0.55, -1.8, 0.78, -3.97, M('#202224', 0.3), group);
    cyl(0.025, 0.025, 0.42, -1.8, 1.15, -4.22, goldMat, group);
    box(0.04, 0.04, 0.24, -1.8, 1.35, -4.12, goldMat, group);
    cyl(0.015, 0.015, 0.12, -1.8, 1.28, -4.01, goldMat, group);

    box(1.2, 0.02, 0.65, 1.8, 0.99, -3.97, M('#0a0a0c', 0.05), group);
    cyl(0.16, 0.16, 0.025, 1.45, 1.0, -3.97, M('#252528', 0.2), group);
    cyl(0.19, 0.19, 0.025, 2.15, 1.0, -3.97, M('#252528', 0.2), group);

    for (let pi = 0; pi < 3; pi++) {
      const px = -1.4 + pi * 1.4;
      cyl(0.005, 0.005, 1.6, px, 3.1, 0.2, darkMat, group);
      cyl(0.09, 0.14, 0.24, px, 2.2, 0.2, goldMat, group);
      cyl(0.04, 0.04, 0.06, px, 2.06, 0.2, warmLedMat, group);
    }

    for (let bsi = 0; bsi < 3; bsi++) {
      const bx = -1.3 + bsi * 1.3;
      cyl(0.015, 0.02, 0.66, bx - 0.2, 0.33, 1.5, darkMat, group);
      cyl(0.015, 0.02, 0.66, bx + 0.2, 0.33, 1.5, darkMat, group);
      cyl(0.015, 0.02, 0.66, bx, 0.33, 1.7, darkMat, group);
      cyl(0.24, 0.24, 0.07, bx, 0.67, 1.56, M('#5c4028', 0.4), group);
    }

    box(0.85, 3.8, 2.4, -5.4, 1.9, -2.8, woodCabinet, group);
    box(0.86, 0.65, 0.65, -5.39, 1.8, -2.5, darkMat, group);
    box(0.86, 0.65, 0.65, -5.39, 1.1, -2.5, darkMat, group);
    box(0.04, 0.58, 0.58, -4.95, 1.8, -2.5, M('#10171d', 0.1), group);
    box(0.04, 0.58, 0.58, -4.95, 1.1, -2.5, M('#10171d', 0.1), group);
    box(0.86, 2.1, 1.1, -5.39, 1.05, -3.5, chromeMat, group);

    box(0.12, 3.4, 6.2, 5.8, 1.7, 0.2, darkMat, group);
    box(0.03, 3.2, 6.0, 5.8, 1.7, 0.2, glassMat, group);

    // Register Surfaces
    reg('kitchen', 'kitchen_countertop', 'Kitchen Island & Table', kitchenIslandTop, 2, 4.5, 1.84);
    reg('kitchen', 'kitchen_countertop', 'Kitchen Island & Table', kitchenIslandLeftDrop, 0, 0.93, 1.84);
    reg('kitchen', 'kitchen_countertop', 'Kitchen Island & Table', kitchenIslandRightDrop, 1, 0.93, 1.84);
    reg('kitchen', 'kitchen_countertop', 'Kitchen Island & Table', kitchenPerimeterCounter, 2, 8.5, 0.86);
    reg('kitchen', 'kitchen_backsplash', 'Wall Backsplash Tiles', kitchenBacksplash, 4, 8.4, 1.4);

    // Cameras
    ROOM_CAMERAS.kitchen = {
      type: 'three',
      title: 'Chef Kitchen Suite (3D WebGL)',
      subtitle: '• Modern Island & Countertop',
      hint: '<span class="text-[#E7C887] font-semibold">💡 Kitchen Material Studio:</span> Select <b>Kitchen Island &amp; Countertop</b> or <b>Backsplash Tiles</b>, then pick any granite, marble, or tile format below.',
      defaultCam: 'counter',
      cameras: [
        { id: 'counter', label: '🔪 Island Countertop', azimuth: Math.PI * 0.24, elevation: 0.36, distance: 8.8, target: [0, 1.0, 0.2] },
        { id: 'hob', label: '🍳 Hob & Cooking Wall', azimuth: Math.PI * 0.05, elevation: 0.30, distance: 7.2, target: [1.8, 1.2, -3.6] },
        { id: 'wide', label: '🍽️ Full Kitchen View', azimuth: Math.PI * 0.32, elevation: 0.45, distance: 12.0, target: [0, 1.2, -0.5] }
      ]
    };

    // Default Stones
    const kCounterStone = showroomSlabs.find(s => s.name === 'River Black') || presets[0];
    const kBacksplashStone = showroomSlabs.find(s => s.name === 'Calacatta Gold PGVT Tile') || presets[0];

    if (roomDefs.kitchen) {
      if (roomDefs.kitchen.surfaces.kitchen_countertop) {
        roomDefs.kitchen.surfaces.kitchen_countertop.src = kCounterStone;
        roomDefs.kitchen.surfaces.kitchen_countertop.set = { struct: 'slab', mode: 'mirror', size: 2.4, rot: 0, gloss: 0.96, grout: 2 };
      }
      if (roomDefs.kitchen.surfaces.kitchen_backsplash) {
        roomDefs.kitchen.surfaces.kitchen_backsplash.src = kBacksplashStone;
        roomDefs.kitchen.surfaces.kitchen_backsplash.set = { struct: 'tile60', mode: 'repeat', size: 0.6, rot: 0, gloss: 0.88, grout: 2 };
      }
    }
  };
})(window);
