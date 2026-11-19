/**
 * Murali Granites & Marbles — Parking Suite & Driveway Paving 3D WebGL Room
 */
(function (window) {
  'use strict';

  window.WebGlRooms = window.WebGlRooms || {};

  window.WebGlRooms.parking = function (ctx) {
    const { THREE, group, reg, roomDefs, ROOM_CAMERAS, core, showroomSlabs, presets } = ctx;
    const { M, box, cyl, sbox, createPlasterTexture, createWoodTexture } = core;

    const maxAni = 4;
    const plasterTex = createPlasterTexture(maxAni);
    const wall = new THREE.MeshStandardMaterial({ map: plasterTex, roughness: 0.85 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x161618, roughness: 0.35 });
    const woodCabinet = new THREE.MeshStandardMaterial({ map: createWoodTexture(maxAni), roughness: 0.35 });
    const green = new THREE.MeshStandardMaterial({ color: 0x2e4630, roughness: 0.35, metalness: 0.05 });
    const warmLedMat = new THREE.MeshStandardMaterial({
      color: 0xfff0dd,
      emissive: new THREE.Color(0xffd180),
      emissiveIntensity: 0.9,
      roughness: 0.5
    });

    // 1. Lighting (PBR Outdoor Sunlight, Sky Fill & Bollard Lights)
    const parkingSun = new THREE.DirectionalLight(0xfffaea, 3.4);
    parkingSun.position.set(-8, 14, 10);
    parkingSun.castShadow = true;
    parkingSun.shadow.mapSize.set(2048, 2048);
    parkingSun.shadow.bias = -0.0005;
    parkingSun.shadow.radius = 2.0;
    group.add(parkingSun);

    const parkingSkyFill = new THREE.DirectionalLight(0xbdd7ee, 1.4);
    parkingSkyFill.position.set(8, 10, -6);
    group.add(parkingSkyFill);

    const parkingBollard1 = new THREE.PointLight(0xffdfa0, 1.3, 7.5);
    parkingBollard1.position.set(-5.5, 0.85, 2.0);
    group.add(parkingBollard1);

    const parkingBollard2 = new THREE.PointLight(0xffdfa0, 1.3, 7.5);
    parkingBollard2.position.set(-5.5, 0.85, -3.2);
    group.add(parkingBollard2);

    const parkingPorchGlow = new THREE.PointLight(0xffecd0, 1.4, 7.0);
    parkingPorchGlow.position.set(6.2, 3.0, -1.2);
    group.add(parkingPorchGlow);

    // 2. Heavy-Duty Driveway & Parking Floor
    const parkingFloor = new THREE.Mesh(new THREE.PlaneGeometry(16, 14), M('#32302e', 0.55));
    parkingFloor.rotation.x = -Math.PI / 2;
    parkingFloor.position.set(0, 0.025, 0);
    parkingFloor.receiveShadow = true;
    group.add(parkingFloor);

    // 3. Perimeter Compound Boundary Walls & Coping Caps
    const parkingBackWall = sbox(16, 3.2, 0.3, 0, 1.6, -6.85, wall, group);
    const parkingLeftWall = sbox(0.3, 3.2, 14, -7.85, 1.6, 0, wall, group);
    box(16.4, 0.12, 0.45, 0, 3.26, -6.85, darkMat, group);
    box(0.45, 0.12, 14.4, -7.85, 3.26, 0, darkMat, group);

    // 4. Flamed Granite Curb Stones & Planter Border
    const parkingKerbLeft = sbox(0.35, 0.28, 13.6, -5.8, 0.14, 0, wall, group);
    const parkingKerbBack = sbox(12.4, 0.28, 0.35, 0.4, 0.14, -4.8, wall, group);

    // Raised Garden Planter Bed along boundary wall
    box(1.7, 0.22, 13.6, -6.85, 0.11, 0, M('#231c15', 0.95), group);
    for (let pi = 0; pi < 7; pi++) {
      const cypress = new THREE.Mesh(new THREE.ConeGeometry(0.42, 2.3, 8), green);
      cypress.position.set(-6.85, 1.25, -5.0 + pi * 1.75);
      cypress.castShadow = true;
      group.add(cypress);
    }

    // 5. Architectural Pergola / Carport Structure
    box(0.18, 3.4, 0.18, 4.8, 1.7, -4.2, darkMat, group);
    box(0.18, 3.4, 0.18, 4.8, 1.7, 1.8, darkMat, group);
    box(0.18, 3.4, 0.18, -1.8, 1.7, -4.2, darkMat, group);
    box(0.18, 3.4, 0.18, -1.8, 1.7, 1.8, darkMat, group);
    box(7.0, 0.18, 0.18, 1.5, 3.4, -4.2, darkMat, group);
    box(7.0, 0.18, 0.18, 1.5, 3.4, 1.8, darkMat, group);
    box(0.18, 0.18, 6.4, -1.8, 3.4, -1.2, darkMat, group);
    box(0.18, 0.18, 6.4, 4.8, 3.4, -1.2, darkMat, group);

    for (let li = 0; li < 14; li++) {
      box(6.8, 0.08, 0.12, 1.5, 3.52, -4.0 + li * 0.42, woodCabinet, group);
    }

    // 6. Villa Entrance Porch, Steps & Facade Wall
    const parkingPorch = sbox(3.2, 0.35, 6.0, 6.25, 0.175, -1.2, wall, group);
    const parkingStep = sbox(0.6, 0.18, 5.6, 4.35, 0.09, -1.2, wall, group);
    sbox(0.25, 4.2, 8.0, 7.85, 2.1, -1.2, wall, group);
    box(0.08, 2.8, 1.6, 7.68, 1.75, -1.2, woodCabinet, group);
    box(3.4, 0.15, 6.2, 6.25, 3.4, -1.2, darkMat, group);

    // 7. Luxury Vehicle Silhouette & Wheel Hubs
    box(2.05, 0.72, 4.35, 1.5, 0.52, -1.2, M('#15171a', 0.18), group);
    box(1.72, 0.52, 2.25, 1.5, 1.14, -1.35, M('#0a0c0e', 0.08), group);
    const whF1 = cyl(0.35, 0.35, 0.22, 0.38, 0.35, -2.55, darkMat, group); whF1.rotation.z = Math.PI / 2;
    const whF2 = cyl(0.35, 0.35, 0.22, 2.62, 0.35, -2.55, darkMat, group); whF2.rotation.z = Math.PI / 2;
    const whR1 = cyl(0.35, 0.35, 0.22, 0.38, 0.35, 0.15, darkMat, group); whR1.rotation.z = Math.PI / 2;
    const whR2 = cyl(0.35, 0.35, 0.22, 2.62, 0.35, 0.15, darkMat, group); whR2.rotation.z = Math.PI / 2;
    box(0.32, 0.1, 0.04, 0.85, 0.52, 0.98, warmLedMat, group);
    box(0.32, 0.1, 0.04, 2.15, 0.52, 0.98, warmLedMat, group);

    for (let bi = 0; bi < 4; bi++) {
      cyl(0.055, 0.055, 0.72, -5.5, 0.36, -4.0 + bi * 2.75, darkMat, group);
      cyl(0.058, 0.058, 0.08, -5.5, 0.68, -4.0 + bi * 2.75, warmLedMat, group);
    }

    // Register Surfaces
    reg('parking', 'parking_floor', 'Heavy-Duty Driveway Floor', parkingFloor, null, 16, 14);
    reg('parking', 'parking_wall', 'Compound Boundary Wall', parkingBackWall, 4, 16, 3.2);
    reg('parking', 'parking_wall', 'Compound Boundary Wall', parkingLeftWall, 1, 0.3, 14);
    reg('parking', 'parking_kerb', 'Flamed Granite Kerb', parkingKerbLeft, 2, 0.35, 13.6);
    reg('parking', 'parking_kerb', 'Flamed Granite Kerb', parkingKerbBack, 2, 12.4, 0.35);
    reg('parking', 'parking_porch', 'Entry Porch & Steps', parkingPorch, 2, 3.2, 6.0);
    reg('parking', 'parking_porch', 'Entry Porch & Steps', parkingStep, 2, 0.6, 5.6);

    // Cameras
    ROOM_CAMERAS.parking = {
      type: 'three',
      title: 'Luxury Driveway & Parking Suite (3D WebGL)',
      subtitle: '• Heavy-Duty Granite Pavers & Compound Cladding',
      hint: '<span class="text-[#E7C887] font-semibold">💡 Driveway Material Studio:</span> Customize <b>Heavy-Duty Driveway Floor</b>, <b>Boundary Wall Cladding</b>, <b>Kerb Stones</b>, or <b>Entry Porch &amp; Steps</b>.',
      defaultCam: 'drive_wide',
      cameras: [
        { id: 'drive_wide', label: '🚗 Driveway Overview', azimuth: Math.PI * 0.22, elevation: 0.40, distance: 15.5, target: [0.5, 1.0, -0.5] },
        { id: 'porch', label: '🏛️ Entrance Porch', azimuth: Math.PI * 0.68, elevation: 0.32, distance: 9.8, target: [5.8, 1.2, -1.2] },
        { id: 'wall', label: '🧱 Compound Wall & Border', azimuth: Math.PI * 0.08, elevation: 0.28, distance: 11.2, target: [-2.0, 1.5, -4.8] }
      ]
    };

    // Default Stones
    const pFloorStone = showroomSlabs.find(s => s.name === 'Sahara Beige Heavy-Duty Parking Tile') || presets[0];
    const pWallStone = showroomSlabs.find(s => s.name === 'Armani Gris GVT Matte Tile') || presets[0];
    const pKerbStone = showroomSlabs.find(s => s.name === 'Steel Grey') || showroomSlabs[0];
    const pPorchStone = showroomSlabs.find(s => s.name === 'Tan Brown') || presets[0];

    if (roomDefs.parking) {
      if (roomDefs.parking.surfaces.parking_floor) {
        roomDefs.parking.surfaces.parking_floor.src = pFloorStone;
        roomDefs.parking.surfaces.parking_floor.set = { struct: 'tile60', mode: 'repeat', size: 0.6, rot: 0, gloss: 0.45, grout: 2.5 };
      }
      if (roomDefs.parking.surfaces.parking_wall) {
        roomDefs.parking.surfaces.parking_wall.src = pWallStone;
        roomDefs.parking.surfaces.parking_wall.set = { struct: 'tile120', mode: 'repeat', size: 1.2, rot: 0, gloss: 0.60, grout: 2 };
      }
      if (roomDefs.parking.surfaces.parking_kerb) {
        roomDefs.parking.surfaces.parking_kerb.src = pKerbStone;
        roomDefs.parking.surfaces.parking_kerb.set = { struct: 'slab', mode: 'mirror', size: 2.4, rot: 0, gloss: 0.55, grout: 1 };
      }
      if (roomDefs.parking.surfaces.parking_porch) {
        roomDefs.parking.surfaces.parking_porch.src = pPorchStone;
        roomDefs.parking.surfaces.parking_porch.set = { struct: 'tile60', mode: 'repeat', size: 0.6, rot: 0, gloss: 0.70, grout: 2 };
      }
    }
  };
})(window);
