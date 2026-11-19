/**
 * Murali Granites & Marbles — Grand Entrance Foyer & Vestibule 3D WebGL Room
 */
(function (window) {
  'use strict';

  window.WebGlRooms = window.WebGlRooms || {};

  window.WebGlRooms.foyer = function (ctx) {
    const { THREE, group, reg, roomDefs, ROOM_CAMERAS, core, showroomSlabs, presets } = ctx;
    const { M, box, cyl, sbox, createPlasterTexture, createWoodTexture } = core;

    const maxAni = 4;
    const plasterTex = createPlasterTexture(maxAni);
    const wall = new THREE.MeshStandardMaterial({ map: plasterTex, roughness: 0.85 });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xc5a059, metalness: 0.88, roughness: 0.2 });
    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xdddddd, metalness: 0.95, roughness: 0.08 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x161618, roughness: 0.35 });
    const slat = createWoodTexture ? new THREE.MeshStandardMaterial({ map: createWoodTexture(maxAni), roughness: 0.42 }) : darkMat;
    const warmLedMat = new THREE.MeshStandardMaterial({
      color: 0xfff0dd,
      emissive: new THREE.Color(0xffd180),
      emissiveIntensity: 0.9,
      roughness: 0.5
    });

    // 1. Lighting (Grand Chandelier Warmth & Directional Sunlight)
    const foyerSun = new THREE.DirectionalLight(0xfff2e0, 2.8);
    foyerSun.position.set(-6, 10, 5);
    foyerSun.castShadow = true;
    group.add(foyerSun);

    const foyerChandelier = new THREE.PointLight(0xffe2b0, 2.6, 8.5);
    foyerChandelier.position.set(0, 3.4, 0);
    group.add(foyerChandelier);

    // 2. Grand Foyer Floor & Central Geometric Bookmatch Medallion
    const foyerFloor = new THREE.Mesh(new THREE.PlaneGeometry(12, 10), M('#eae4d8', 0.18));
    foyerFloor.rotation.x = -Math.PI / 2;
    foyerFloor.position.set(0, 0.025, 0);
    foyerFloor.receiveShadow = true;
    group.add(foyerFloor);

    const foyerMedallion = sbox(4.6, 0.012, 4.6, 0, 0.032, 0, wall, group);
    box(4.8, 0.014, 4.8, 0, 0.033, 0, goldMat, group);

    // 3. Foyer Perimeter Architectural Walls
    sbox(12, 4.2, 0.2, 0, 2.1, -4.9, wall, group);
    sbox(0.2, 4.2, 10, -5.9, 2.1, 0, wall, group);
    sbox(0.2, 4.2, 10, 5.9, 2.1, 0, wall, group);

    // 4. Grand Bookmatched Feature Accent Wall with Fluted Slats
    const foyerAccentWall = sbox(6.2, 3.8, 0.18, 0, 2.1, -4.8, wall, group);
    for (let fi = 0; fi < 14; fi++) {
      box(0.08, 3.8, 0.08, -3.8 + fi * 0.12, 2.1, -4.75, slat, group);
      box(0.08, 3.8, 0.08, 3.2 + fi * 0.12, 2.1, -4.75, slat, group);
    }

    // 5. Cantilevered Stone Console Table & Mirror
    const foyerConsole = sbox(3.2, 0.14, 0.7, 0, 0.88, -4.3, wall, group);
    box(2.4, 0.8, 0.4, 0, 0.4, -4.3, goldMat, group);

    cyl(0.85, 0.85, 0.02, 0, 2.45, -4.7, warmLedMat, group);
    cyl(0.8, 0.8, 0.03, 0, 2.45, -4.68, chromeMat, group);

    // 6. Villa Grand Entrance Double Door
    box(0.12, 3.2, 2.2, -5.85, 1.6, 1.2, darkMat, group);
    cyl(0.02, 0.02, 1.8, -5.75, 1.6, 1.2, goldMat, group);
    cyl(0.25, 0.18, 1.1, -2.2, 0.55, -4.1, M('#dedede', 0.4), group);

    // Register Surfaces
    reg('foyer', 'foyer_floor', 'Grand Entry Floor', foyerFloor, null, 12, 10);
    reg('foyer', 'foyer_medallion', 'Waterjet Medallion Accent', foyerMedallion, 2, 4.6, 4.6);
    reg('foyer', 'foyer_accent_wall', 'Bookmatched Accent Wall', foyerAccentWall, 4, 6.2, 3.8);
    reg('foyer', 'foyer_console', 'Console Table Top', foyerConsole, 2, 3.2, 0.7);

    // Cameras
    ROOM_CAMERAS.foyer = {
      type: 'three',
      title: 'Grand Entrance Foyer Suite (3D WebGL)',
      subtitle: '• Waterjet Medallions & Bookmatched Marble Entry',
      hint: '<span class="text-[#E7C887] font-semibold">💡 Foyer Material Studio:</span> Select <b>Grand Entry Floor</b>, <b>Medallion Accent</b>, <b>Bookmatched Wall</b>, or <b>Console Table</b>.',
      defaultCam: 'foyer_front',
      cameras: [
        { id: 'foyer_front', label: '🏛️ Grand Foyer View', azimuth: Math.PI * 0.0, elevation: 0.30, distance: 9.8, target: [0, 1.5, -2.2] },
        { id: 'medallion', label: '⚜️ Floor Medallion Inlay', azimuth: Math.PI * 0.28, elevation: 0.65, distance: 7.2, target: [0, 0.05, 0] },
        { id: 'console', label: '🪞 Accent Wall & Console', azimuth: Math.PI * 0.06, elevation: 0.24, distance: 6.4, target: [0, 1.8, -4.2] }
      ]
    };

    // Default Stones
    const fFloorStone = showroomSlabs.find(s => s.name === 'Armani Gris GVT Matte Tile') || showroomSlabs.find(s => s.name === 'Statuario') || presets[0];
    const fMedallionStone = showroomSlabs.find(s => s.name === 'River Black') || presets[0];
    const fAccentStone = showroomSlabs.find(s => s.name === 'Calacatta Gold PGVT Tile') || showroomSlabs.find(s => s.name === 'Calacatta White') || presets[0];
    const fConsoleStone = showroomSlabs.find(s => s.name === 'Titanium Black') || showroomSlabs[2];

    if (roomDefs.foyer) {
      if (roomDefs.foyer.surfaces.foyer_floor) {
        roomDefs.foyer.surfaces.foyer_floor.src = fFloorStone;
        roomDefs.foyer.surfaces.foyer_floor.set = { struct: 'tile120', mode: 'repeat', size: 1.2, rot: 0, gloss: 0.88, grout: 2 };
      }
      if (roomDefs.foyer.surfaces.foyer_medallion) {
        roomDefs.foyer.surfaces.foyer_medallion.src = fMedallionStone;
        roomDefs.foyer.surfaces.foyer_medallion.set = { struct: 'slab', mode: 'mirror', size: 2.4, rot: 0, gloss: 0.95, grout: 1 };
      }
      if (roomDefs.foyer.surfaces.foyer_accent_wall) {
        roomDefs.foyer.surfaces.foyer_accent_wall.src = fAccentStone;
        roomDefs.foyer.surfaces.foyer_accent_wall.set = { struct: 'slab', mode: 'mirror', size: 2.4, rot: 0, gloss: 0.94, grout: 1.5 };
      }
      if (roomDefs.foyer.surfaces.foyer_console) {
        roomDefs.foyer.surfaces.foyer_console.src = fConsoleStone;
        roomDefs.foyer.surfaces.foyer_console.set = { struct: 'slab', mode: 'mirror', size: 2.4, rot: 0, gloss: 0.92, grout: 1 };
      }
    }
  };
})(window);
