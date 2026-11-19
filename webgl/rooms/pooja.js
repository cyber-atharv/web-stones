/**
 * Murali Granites & Marbles — Pooja Room & Sacred Mandir Sanctuary 3D WebGL Room
 */
(function (window) {
  'use strict';

  window.WebGlRooms = window.WebGlRooms || {};

  window.WebGlRooms.pooja = function (ctx) {
    const { THREE, group, reg, roomDefs, ROOM_CAMERAS, core, showroomSlabs, presets } = ctx;
    const { M, box, cyl, sbox, createPlasterTexture } = core;

    const maxAni = 4;
    const plasterTex = createPlasterTexture(maxAni);
    const wall = new THREE.MeshStandardMaterial({ map: plasterTex, roughness: 0.85 });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xc5a059, metalness: 0.88, roughness: 0.2 });

    // 1. Lighting (Warm Spiritual Illumination & Brass Diya Flames)
    const poojaSun = new THREE.DirectionalLight(0xffeedb, 2.4);
    poojaSun.position.set(-3, 8, 4);
    poojaSun.castShadow = true;
    group.add(poojaSun);

    const poojaDiyaGlow1 = new THREE.PointLight(0xff9922, 2.2, 4.5);
    poojaDiyaGlow1.position.set(-1.4, 1.2, -1.8);
    group.add(poojaDiyaGlow1);

    const poojaDiyaGlow2 = new THREE.PointLight(0xff9922, 2.2, 4.5);
    poojaDiyaGlow2.position.set(1.4, 1.2, -1.8);
    group.add(poojaDiyaGlow2);

    const poojaAltarCove = new THREE.PointLight(0xffe6a3, 2.0, 5.0);
    poojaAltarCove.position.set(0, 2.0, -3.2);
    group.add(poojaAltarCove);

    // 2. Pristine White Marble Flooring
    const poojaFloor = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), M('#faf8f5', 0.15));
    poojaFloor.rotation.x = -Math.PI / 2;
    poojaFloor.position.set(0, 0.025, 0);
    poojaFloor.receiveShadow = true;
    group.add(poojaFloor);

    // 3. Sanctuary Perimeter Walls
    sbox(8, 3.8, 0.2, 0, 1.9, -3.9, wall, group);
    sbox(0.2, 3.8, 8, -3.9, 1.9, 0, wall, group);
    sbox(0.2, 3.8, 8, 3.9, 1.9, 0, wall, group);

    // 4. Backlit Altar Sanctum Niche
    const poojaAltarWall = sbox(3.6, 2.4, 0.18, 0, 2.0, -3.85, wall, group);
    box(3.8, 2.6, 0.08, 0, 2.0, -3.89, goldMat, group);

    // 5. Tiered Sacred Deity Pedestal
    const poojaPedestal1 = sbox(3.8, 0.25, 1.5, 0, 0.125, -2.85, wall, group);
    const poojaPedestal2 = sbox(2.8, 0.28, 1.0, 0, 0.38, -3.05, wall, group);
    const poojaPedestalTop = sbox(1.5, 0.18, 0.6, 0, 0.61, -3.1, wall, group);

    // 6. Ornate Temple Pillars & Carved Lintel Arch
    cyl(0.08, 0.09, 2.6, -1.6, 1.7, -2.2, goldMat, group);
    cyl(0.08, 0.09, 2.6, 1.6, 1.7, -2.2, goldMat, group);
    box(3.6, 0.25, 0.25, 0, 3.05, -2.2, goldMat, group);
    cyl(0.25, 0.02, 0.45, 0, 3.4, -2.2, goldMat, group);

    // 7. Sacred Hanging Bells & Traditional Oil Lamps (Samai)
    cyl(0.01, 0.01, 1.2, -1.0, 2.8, -1.5, goldMat, group);
    cyl(0.1, 0.03, 0.18, -1.0, 2.1, -1.5, goldMat, group);
    cyl(0.01, 0.01, 1.2, 1.0, 2.8, -1.5, goldMat, group);
    cyl(0.1, 0.03, 0.18, 1.0, 2.1, -1.5, goldMat, group);
    cyl(0.035, 0.06, 1.05, -1.4, 0.53, -1.8, goldMat, group);
    cyl(0.035, 0.06, 1.05, 1.4, 0.53, -1.8, goldMat, group);
    cyl(0.22, 0.2, 0.04, 0, 0.42, -2.3, goldMat, group);

    // Register Surfaces
    reg('pooja', 'pooja_floor', 'Sanctuary Marble Floor', poojaFloor, null, 8, 8);
    reg('pooja', 'pooja_altar_wall', 'Sacred Mandir Wall', poojaAltarWall, 4, 3.6, 2.4);
    reg('pooja', 'pooja_pedestals', 'Sanctum Pedestals', poojaPedestal1, 2, 3.8, 1.5);
    reg('pooja', 'pooja_pedestals', 'Sanctum Pedestals', poojaPedestal2, 2, 2.8, 1.0);
    reg('pooja', 'pooja_pedestals', 'Sanctum Pedestals', poojaPedestalTop, 2, 1.5, 0.6);

    // Cameras
    ROOM_CAMERAS.pooja = {
      type: 'three',
      title: 'Pooja Room & Sacred Mandir Sanctuary (3D WebGL)',
      subtitle: '• Divine Statuario & Carved Temple Cladding',
      hint: '<span class="text-[#E7C887] font-semibold">💡 Mandir Material Studio:</span> Select <b>Sanctuary Marble Floor</b>, <b>Sacred Mandir Wall</b>, or <b>Sanctum Pedestals</b> to customize in 3D.',
      defaultCam: 'pooja_front',
      cameras: [
        { id: 'pooja_front', label: '🪔 Mandir Sanctum View', azimuth: Math.PI * 0.0, elevation: 0.26, distance: 6.8, target: [0, 1.4, -2.5] },
        { id: 'altar', label: '🕉️ Deity Pedestal & Altar', azimuth: Math.PI * 0.14, elevation: 0.32, distance: 4.8, target: [0, 0.9, -2.9] },
        { id: 'floor', label: '🧱 Sanctuary Marble Floor', azimuth: Math.PI * 0.35, elevation: 0.48, distance: 7.2, target: [0, 0.4, -1.0] }
      ]
    };

    // Default Stones
    const poojaFloorStone = showroomSlabs.find(s => s.name === 'Statuario') || showroomSlabs.find(s => s.name === 'Calacatta White') || presets[0];
    const poojaWallStone = showroomSlabs.find(s => s.name === 'Calacatta Gold PGVT Tile') || presets[0];
    const poojaPedStone = showroomSlabs.find(s => s.name === 'Alaska White') || presets[0];

    if (roomDefs.pooja) {
      if (roomDefs.pooja.surfaces.pooja_floor) {
        roomDefs.pooja.surfaces.pooja_floor.src = poojaFloorStone;
        roomDefs.pooja.surfaces.pooja_floor.set = { struct: 'slab', mode: 'mirror', size: 2.4, rot: 0, gloss: 0.96, grout: 1 };
      }
      if (roomDefs.pooja.surfaces.pooja_altar_wall) {
        roomDefs.pooja.surfaces.pooja_altar_wall.src = poojaWallStone;
        roomDefs.pooja.surfaces.pooja_altar_wall.set = { struct: 'slab', mode: 'mirror', size: 2.4, rot: 0, gloss: 0.94, grout: 1 };
      }
      if (roomDefs.pooja.surfaces.pooja_pedestals) {
        roomDefs.pooja.surfaces.pooja_pedestals.src = poojaPedStone;
        roomDefs.pooja.surfaces.pooja_pedestals.set = { struct: 'slab', mode: 'repeat', size: 1.8, rot: 0, gloss: 0.92, grout: 1 };
      }
    }
  };
})(window);
