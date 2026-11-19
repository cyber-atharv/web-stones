/**
 * Murali Granites & Marbles — Executive Bar & Cigar Lounge 3D WebGL Room
 */
(function (window) {
  'use strict';

  window.WebGlRooms = window.WebGlRooms || {};

  window.WebGlRooms.bar = function (ctx) {
    const { THREE, group, reg, roomDefs, ROOM_CAMERAS, core, showroomSlabs, presets } = ctx;
    const { M, box, cyl, sbox, createPlasterTexture } = core;

    const maxAni = 4;
    const plasterTex = createPlasterTexture(maxAni);
    const wall = new THREE.MeshStandardMaterial({ map: plasterTex, roughness: 0.85 });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xc5a059, metalness: 0.88, roughness: 0.2 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x161618, roughness: 0.35 });
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

    // 1. Lighting (Intimate Cigar Lounge Mood & Back-Bar Glow)
    const barSun = new THREE.DirectionalLight(0xffe0b8, 2.6);
    barSun.position.set(-5, 9, 5);
    barSun.castShadow = true;
    group.add(barSun);

    const barShelfGlow1 = new THREE.PointLight(0xffbe6b, 2.0, 5.0);
    barShelfGlow1.position.set(0, 1.8, -4.0);
    group.add(barShelfGlow1);

    const barShelfGlow2 = new THREE.PointLight(0xffbe6b, 2.0, 5.0);
    barShelfGlow2.position.set(0, 2.6, -4.0);
    group.add(barShelfGlow2);

    const barCounterGlow = new THREE.PointLight(0xffd588, 1.6, 4.5);
    barCounterGlow.position.set(0, 0.85, 0.5);
    group.add(barCounterGlow);

    // 2. High-Gloss Dark Marble Lounge Floor
    const barFloor = new THREE.Mesh(new THREE.PlaneGeometry(12, 11), M('#1e1c1a', 0.25));
    barFloor.rotation.x = -Math.PI / 2;
    barFloor.position.set(0, 0.025, 0);
    barFloor.receiveShadow = true;
    group.add(barFloor);

    // 3. Perimeter Lounge Walls
    sbox(12, 4.2, 0.2, 0, 2.1, -4.4, wall, group);
    const barLeftWall = sbox(0.2, 4.2, 10, -5.9, 2.1, 0, wall, group);
    const barRightWall = sbox(0.2, 4.2, 10, 5.9, 2.1, 0, wall, group);

    // 4. Back-Bar Showcase Feature Cladding Wall
    const barBackSlab = sbox(7.2, 3.4, 0.16, 0, 2.2, -4.3, wall, group);

    // Liquor Display Shelving & Glassware
    box(6.8, 0.05, 0.42, 0, 1.6, -4.0, goldMat, group);
    box(6.8, 0.05, 0.42, 0, 2.2, -4.0, goldMat, group);
    box(6.8, 0.05, 0.42, 0, 2.8, -4.0, goldMat, group);

    cyl(0.04, 0.04, 0.28, -2.2, 1.76, -4.0, M('#9c6628', 0.1), group);
    cyl(0.05, 0.05, 0.24, -1.8, 1.74, -4.0, M('#234d31', 0.1), group);
    cyl(0.045, 0.045, 0.26, -1.4, 1.75, -4.0, M('#e2dfd2', 0.05), group);
    cyl(0.04, 0.04, 0.28, 1.4, 1.76, -4.0, M('#9c6628', 0.1), group);
    cyl(0.05, 0.05, 0.24, 1.8, 1.74, -4.0, M('#234d31', 0.1), group);
    cyl(0.045, 0.045, 0.26, 2.2, 1.75, -4.0, M('#e2dfd2', 0.05), group);

    // 5. Monolithic Waterfall Granite Bar Island
    box(4.6, 0.95, 1.4, 0, 0.475, 0.0, darkMat, group);
    const barIslandTop = sbox(4.9, 0.1, 1.65, 0, 1.0, 0.0, wall, group);
    const barIslandLeftDrop = sbox(0.1, 1.0, 1.65, -2.45, 0.5, 0.0, wall, group);
    const barIslandRightDrop = sbox(0.1, 1.0, 1.65, 2.45, 0.5, 0.0, wall, group);

    box(0.65, 0.25, 0.45, -1.3, 0.85, -0.2, goldMat, group);
    cyl(0.015, 0.015, 0.28, -1.3, 1.15, -0.4, goldMat, group);

    const barFootrail = cyl(0.025, 0.025, 4.4, 0, 0.18, 0.95, goldMat, group);
    barFootrail.rotation.z = Math.PI / 2;

    // Barstools & Pendant Lights
    for (let bsi = 0; bsi < 4; bsi++) {
      const bx = -1.6 + bsi * 1.08;
      cyl(0.018, 0.018, 0.72, bx, 0.36, 1.45, goldMat, group);
      cyl(0.2, 0.2, 0.03, bx, 0.03, 1.45, goldMat, group);
      cyl(0.2, 0.2, 0.08, bx, 0.74, 1.45, M('#2b1d16', 0.3), group);
    }
    for (let pi = 0; pi < 3; pi++) {
      const px = -1.4 + pi * 1.4;
      cyl(0.005, 0.005, 1.2, px, 2.8, 0.0, darkMat, group);
      cyl(0.14, 0.16, 0.32, px, 2.05, 0.0, glassMat, group);
      cyl(0.03, 0.03, 0.05, px, 2.05, 0.0, warmLedMat, group);
    }

    // Register Surfaces
    reg('bar', 'bar_island_top', 'Waterfall Bar Island Top', barIslandTop, 2, 4.9, 1.65);
    reg('bar', 'bar_island_top', 'Waterfall Bar Island Top', barIslandLeftDrop, 0, 0.1, 1.65);
    reg('bar', 'bar_island_top', 'Waterfall Bar Island Top', barIslandRightDrop, 1, 0.1, 1.65);
    reg('bar', 'bar_floor', 'Lounge Marble Floor', barFloor, null, 12, 11);
    reg('bar', 'bar_back_slab', 'Back-Bar Feature Cladding', barBackSlab, 4, 7.2, 3.4);
    reg('bar', 'bar_walls', 'Acoustic Lounge Walls', barLeftWall, 1, 10, 4.2);
    reg('bar', 'bar_walls', 'Acoustic Lounge Walls', barRightWall, 0, 10, 4.2);

    // Cameras
    ROOM_CAMERAS.bar = {
      type: 'three',
      title: 'Cigar Lounge & Executive Bar Suite (3D WebGL)',
      subtitle: '• Monolithic Waterfall Island & Translucent Onyx',
      hint: '<span class="text-[#E7C887] font-semibold">💡 Executive Bar Studio:</span> Select <b>Waterfall Island Top</b>, <b>Back-Bar Feature Wall</b>, <b>Lounge Floor</b>, or <b>Acoustic Walls</b>.',
      defaultCam: 'bar_front',
      cameras: [
        { id: 'bar_front', label: '🍸 Waterfall Bar Overview', azimuth: Math.PI * 0.25, elevation: 0.34, distance: 9.2, target: [0, 1.1, 0.2] },
        { id: 'island', label: '🥃 Bar Counter & Stools', azimuth: Math.PI * 0.48, elevation: 0.28, distance: 6.8, target: [0, 0.9, 0.5] },
        { id: 'backbar', label: '🍾 Back-Bar Cladding', azimuth: Math.PI * 0.05, elevation: 0.26, distance: 7.4, target: [0, 1.8, -3.2] }
      ]
    };

    // Default Stones
    const barIslandStone = showroomSlabs.find(s => s.name === 'Titanium Black') || presets[0];
    const barFloorStone = showroomSlabs.find(s => s.name === 'Armani Gris GVT Matte Tile') || presets[0];
    const barBackStone = showroomSlabs.find(s => s.name === 'Emerald Onyx Marble') || presets[0];
    const barWallStone = showroomSlabs.find(s => s.name === 'Steel Grey') || presets[0];

    if (roomDefs.bar) {
      if (roomDefs.bar.surfaces.bar_island_top) {
        roomDefs.bar.surfaces.bar_island_top.src = barIslandStone;
        roomDefs.bar.surfaces.bar_island_top.set = { struct: 'slab', mode: 'mirror', size: 2.4, rot: 0, gloss: 0.95, grout: 1 };
      }
      if (roomDefs.bar.surfaces.bar_floor) {
        roomDefs.bar.surfaces.bar_floor.src = barFloorStone;
        roomDefs.bar.surfaces.bar_floor.set = { struct: 'tile120', mode: 'repeat', size: 1.2, rot: 0, gloss: 0.88, grout: 2 };
      }
      if (roomDefs.bar.surfaces.bar_back_slab) {
        roomDefs.bar.surfaces.bar_back_slab.src = barBackStone;
        roomDefs.bar.surfaces.bar_back_slab.set = { struct: 'slab', mode: 'mirror', size: 2.4, rot: 0, gloss: 0.94, grout: 1 };
      }
      if (roomDefs.bar.surfaces.bar_walls) {
        roomDefs.bar.surfaces.bar_walls.src = barWallStone;
        roomDefs.bar.surfaces.bar_walls.set = { struct: 'tile120', mode: 'repeat', size: 1.2, rot: 0, gloss: 0.70, grout: 2 };
      }
    }
  };
})(window);
