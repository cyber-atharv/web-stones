/**
 * Murali Granites & Marbles — Utility Suite & Scullery 3D WebGL Room
 */
(function (window) {
  'use strict';

  window.WebGlRooms = window.WebGlRooms || {};

  window.WebGlRooms.utility = function (ctx) {
    const { THREE, group, reg, roomDefs, ROOM_CAMERAS, core, showroomSlabs, presets } = ctx;
    const { M, box, cyl, sbox, createPlasterTexture, createWoodTexture } = core;

    const maxAni = 4;
    const plasterTex = createPlasterTexture(maxAni);
    const wall = new THREE.MeshStandardMaterial({ map: plasterTex, roughness: 0.85 });
    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xdddddd, metalness: 0.95, roughness: 0.08 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x161618, roughness: 0.35 });
    const woodCabinet = createWoodTexture ? new THREE.MeshStandardMaterial({ map: createWoodTexture(maxAni), roughness: 0.35 }) : darkMat;
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0xc0dfe8,
      transparent: true,
      opacity: 0.38,
      roughness: 0.06,
      metalness: 0.1
    });

    // 1. Lighting (Crisp Task Lighting & Directional Sunlight)
    const utilitySun = new THREE.DirectionalLight(0xfff8ee, 2.9);
    utilitySun.position.set(-5, 9, 4);
    utilitySun.castShadow = true;
    group.add(utilitySun);

    const utilityFill = new THREE.DirectionalLight(0xdce8f5, 1.2);
    utilityFill.position.set(5, 6, -3);
    group.add(utilityFill);

    const utilityTaskLight = new THREE.PointLight(0xffecd0, 1.6, 6.0);
    utilityTaskLight.position.set(-1.2, 2.2, -3.2);
    group.add(utilityTaskLight);

    // 2. Anti-Skid Heavy-Duty Utility Flooring
    const utilityFloor = new THREE.Mesh(new THREE.PlaneGeometry(10, 8), M('#2c2824', 0.6));
    utilityFloor.rotation.x = -Math.PI / 2;
    utilityFloor.position.set(0, 0.025, 0);
    utilityFloor.receiveShadow = true;
    group.add(utilityFloor);

    // 3. Service Balcony / Scullery Walls
    sbox(10, 3.8, 0.2, 0, 1.9, -3.9, wall, group);
    sbox(0.2, 3.8, 8, -4.9, 1.9, 0, wall, group);
    sbox(0.2, 3.8, 8, 4.9, 1.9, 0, wall, group);

    // 4. Heavy-Duty Base Cabinetry & Countertop Slab
    box(6.6, 0.88, 0.85, -1.2, 0.44, -3.45, darkMat, group);
    const utilityCounter = sbox(6.8, 0.08, 0.9, -1.2, 0.92, -3.45, wall, group);

    // Deep Undermount Wash Sink & Commercial Spray Faucet
    box(1.4, 0.38, 0.6, -2.2, 0.72, -3.45, chromeMat, group);
    cyl(0.02, 0.02, 0.48, -2.2, 1.18, -3.72, chromeMat, group);
    box(0.04, 0.04, 0.22, -2.2, 1.4, -3.62, chromeMat, group);

    // 5. Heavy Splashback Dado Wall
    const utilityBacksplash = sbox(6.8, 1.2, 0.16, -1.2, 1.55, -3.88, wall, group);

    // 6. Laundry Appliance Station
    box(0.75, 0.9, 0.75, 1.4, 0.45, -3.45, M('#f0f0f4', 0.15), group);
    box(0.75, 0.9, 0.75, 2.35, 0.45, -3.45, M('#f0f0f4', 0.15), group);
    cyl(0.24, 0.24, 0.03, 1.4, 0.48, -3.06, darkMat, group);
    cyl(0.24, 0.24, 0.03, 2.35, 0.48, -3.06, darkMat, group);

    // Upper Cabinets & Window
    box(6.8, 0.9, 0.45, -1.2, 2.65, -3.67, woodCabinet, group);
    box(0.12, 1.8, 2.2, 4.85, 2.0, 0, darkMat, group);
    box(0.03, 1.7, 2.1, 4.85, 2.0, 0, glassMat, group);

    // Register Surfaces
    reg('utility', 'utility_floor', 'Heavy-Duty Anti-Skid Floor', utilityFloor, null, 10, 8);
    reg('utility', 'utility_counter', 'Scullery Heavy-Duty Counter', utilityCounter, 2, 6.8, 0.9);
    reg('utility', 'utility_backsplash', 'Wash Dado Splashback Wall', utilityBacksplash, 4, 6.8, 1.2);

    // Cameras
    ROOM_CAMERAS.utility = {
      type: 'three',
      title: 'Utility Suite & Prep Scullery (3D WebGL)',
      subtitle: '• Heavy-Duty Granite Counters & Anti-Skid Tile',
      hint: '<span class="text-[#E7C887] font-semibold">💡 Utility Material Studio:</span> Select <b>Anti-Skid Floor</b>, <b>Scullery Countertop</b>, or <b>Dado Splashback Wall</b>.',
      defaultCam: 'util_front',
      cameras: [
        { id: 'util_front', label: '🧺 Scullery Counter View', azimuth: Math.PI * 0.0, elevation: 0.32, distance: 7.2, target: [-0.8, 1.2, -2.5] },
        { id: 'counter', label: '🚰 Wash Sink & Appliances', azimuth: Math.PI * 0.18, elevation: 0.28, distance: 5.6, target: [-1.2, 1.0, -3.2] },
        { id: 'floor', label: '🧱 Anti-Skid Utility Floor', azimuth: Math.PI * 0.38, elevation: 0.52, distance: 7.8, target: [0, 0.2, -1.0] }
      ]
    };

    // Default Stones
    const uFloorStone = showroomSlabs.find(s => s.name === 'Steel Grey') || presets[0];
    const uCounterStone = showroomSlabs.find(s => s.name === 'Titanium Black') || presets[0];
    const uSplashStone = showroomSlabs.find(s => s.name === 'Calacatta Gold PGVT Tile') || presets[0];

    if (roomDefs.utility) {
      if (roomDefs.utility.surfaces.utility_floor) {
        roomDefs.utility.surfaces.utility_floor.src = uFloorStone;
        roomDefs.utility.surfaces.utility_floor.set = { struct: 'tile60', mode: 'repeat', size: 0.6, rot: 0, gloss: 0.65, grout: 2.5 };
      }
      if (roomDefs.utility.surfaces.utility_counter) {
        roomDefs.utility.surfaces.utility_counter.src = uCounterStone;
        roomDefs.utility.surfaces.utility_counter.set = { struct: 'slab', mode: 'mirror', size: 2.4, rot: 0, gloss: 0.92, grout: 2 };
      }
      if (roomDefs.utility.surfaces.utility_backsplash) {
        roomDefs.utility.surfaces.utility_backsplash.src = uSplashStone;
        roomDefs.utility.surfaces.utility_backsplash.set = { struct: 'tile60', mode: 'repeat', size: 0.6, rot: 0, gloss: 0.82, grout: 2 };
      }
    }
  };
})(window);
