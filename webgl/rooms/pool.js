/**
 * Murali Granites & Marbles — Swimming Pool Deck & Sunken Lounge 3D WebGL Room
 */
(function (window) {
  'use strict';

  window.WebGlRooms = window.WebGlRooms || {};

  window.WebGlRooms.pool = function (ctx) {
    const { THREE, group, reg, roomDefs, ROOM_CAMERAS, core, showroomSlabs, presets } = ctx;
    const { M, box, cyl, sbox, createWaterTexture, createPlasterTexture } = core;

    const maxAni = 4;
    const waterTex = createWaterTexture(maxAni);
    const plasterTex = createPlasterTexture(maxAni);
    const wall = new THREE.MeshStandardMaterial({ map: plasterTex, roughness: 0.85 });
    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xdddddd, metalness: 0.95, roughness: 0.08 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x161618, roughness: 0.35 });
    const woodCabinet = core.createWoodTexture ? new THREE.MeshStandardMaterial({ map: core.createWoodTexture(maxAni), roughness: 0.35 }) : darkMat;

    // 1. Lighting (Crisp Resort Sunlight, Sky Fill & Aqua Glow)
    const poolSun = new THREE.DirectionalLight(0xfffaea, 3.5);
    poolSun.position.set(-7, 13, 8);
    poolSun.castShadow = true;
    poolSun.shadow.mapSize.set(2048, 2048);
    poolSun.shadow.bias = -0.0005;
    group.add(poolSun);

    const poolSky = new THREE.DirectionalLight(0xbde3ff, 1.5);
    poolSky.position.set(6, 8, -5);
    group.add(poolSky);

    const poolAquaLight = new THREE.PointLight(0x00e5ff, 2.6, 9.0);
    poolAquaLight.position.set(-1.8, -0.3, 0);
    group.add(poolAquaLight);

    // 2. Crystal Aqua Pool Water Plane
    const poolWaterMat = new THREE.MeshStandardMaterial({
      color: 0x0fa5c4,
      map: waterTex,
      roughness: 0.06,
      metalness: 0.22,
      transparent: true,
      opacity: 0.82
    });
    const poolWater = new THREE.Mesh(new THREE.PlaneGeometry(6.6, 10.6), poolWaterMat);
    poolWater.rotation.x = -Math.PI / 2;
    poolWater.position.set(-1.8, 0.08, 0);
    group.add(poolWater);

    // 3. Large Format Anti-Slip Wet Deck Paving
    const poolDeck = new THREE.Mesh(new THREE.PlaneGeometry(16, 14), M('#363432', 0.55));
    poolDeck.rotation.x = -Math.PI / 2;
    poolDeck.position.set(0, 0.025, 0);
    poolDeck.receiveShadow = true;
    group.add(poolDeck);

    // 4. Perimeter Bullnose Pool Edge Coping Stones
    const poolCopingE = sbox(0.5, 0.1, 10.8, 1.5, 0.12, 0, wall, group);
    const poolCopingW = sbox(0.5, 0.1, 10.8, -5.1, 0.12, 0, wall, group);
    const poolCopingN = sbox(7.1, 0.1, 0.5, -1.8, 0.12, -5.4, wall, group);
    const poolCopingS = sbox(7.1, 0.1, 0.5, -1.8, 0.12, 5.4, wall, group);

    // 5. Cascading Waterfall Feature Wall
    const poolWaterWall = sbox(6.8, 3.4, 0.4, -1.8, 1.7, -6.6, wall, group);
    box(3.2, 0.06, 0.3, -1.8, 2.2, -6.3, chromeMat, group);
    sbox(0.3, 3.4, 14, -7.85, 1.7, 0, wall, group);

    // 6. Sunken Conversation Lounge Steps & Bench
    const poolLoungeBench = sbox(4.5, 0.45, 4.5, 4.8, 0.225, 0, wall, group);
    box(3.8, 0.2, 3.8, 4.8, 0.45, 0, M('#e4dcd0', 0.8), group);
    box(3.8, 0.5, 0.3, 4.8, 0.7, -1.8, M('#d0c5b5', 0.8), group);
    box(0.3, 0.5, 3.8, 6.6, 0.7, 0, M('#d0c5b5', 0.8), group);
    cyl(0.5, 0.5, 0.4, 4.8, 0.45, 0, darkMat, group);

    // 7. Resort Sun Loungers
    box(0.75, 0.25, 2.0, 2.6, 0.15, -2.4, woodCabinet, group);
    box(0.75, 0.25, 2.0, 2.6, 0.15, 2.4, woodCabinet, group);

    // Register Surfaces
    reg('pool', 'pool_deck', 'Pool Deck Paving', poolDeck, null, 16, 14);
    reg('pool', 'pool_coping', 'Perimeter Coping Slabs', poolCopingE, 2, 0.5, 10.8);
    reg('pool', 'pool_coping', 'Perimeter Coping Slabs', poolCopingW, 2, 0.5, 10.8);
    reg('pool', 'pool_coping', 'Perimeter Coping Slabs', poolCopingN, 2, 7.1, 0.5);
    reg('pool', 'pool_coping', 'Perimeter Coping Slabs', poolCopingS, 2, 7.1, 0.5);
    reg('pool', 'pool_waterwall', 'Cascading Water Wall', poolWaterWall, 4, 6.8, 3.4);
    reg('pool', 'pool_bench', 'Sunken Lounge Bench', poolLoungeBench, 2, 4.5, 4.5);

    // Cameras
    ROOM_CAMERAS.pool = {
      type: 'three',
      title: 'Swimming Pool Deck & Sunken Lounge (3D WebGL)',
      subtitle: '• Resort Paving & Coping Slabs',
      hint: '<span class="text-[#E7C887] font-semibold">💡 Swimming Pool Studio:</span> Customize <b>Pool Deck Paving</b>, <b>Coping Slabs</b>, <b>Water Feature Wall</b>, or <b>Sunken Lounge Bench</b> with anti-slip pavers & granite.',
      defaultCam: 'pool_wide',
      cameras: [
        { id: 'pool_wide', label: '🏊 Pool Overview', azimuth: Math.PI * 0.24, elevation: 0.42, distance: 15.0, target: [-0.5, 0.5, 0] },
        { id: 'lounge', label: '🛋️ Sunken Lounge', azimuth: Math.PI * 0.72, elevation: 0.34, distance: 9.5, target: [4.2, 0.6, 0] },
        { id: 'waterwall', label: '🌊 Water Feature Wall', azimuth: Math.PI * 0.05, elevation: 0.28, distance: 10.5, target: [-1.8, 1.4, -4.5] }
      ]
    };

    // Default Stones
    const poolDeckStone = showroomSlabs.find(s => s.name === 'Sahara Beige Heavy-Duty Parking Tile') || showroomSlabs.find(s => s.name === 'Steel Grey') || presets[0];
    const poolCopingStone = showroomSlabs.find(s => s.name === 'Absolute Black Flamed') || showroomSlabs.find(s => s.name === 'Titanium Black') || presets[0];
    const poolWallStone = showroomSlabs.find(s => s.name === 'Calacatta Gold PGVT Tile') || presets[0];
    const poolBenchStone = showroomSlabs.find(s => s.name === 'Alaska White') || presets[0];

    if (roomDefs.pool) {
      if (roomDefs.pool.surfaces.pool_deck) {
        roomDefs.pool.surfaces.pool_deck.src = poolDeckStone;
        roomDefs.pool.surfaces.pool_deck.set = { struct: 'tile60', mode: 'repeat', size: 0.6, rot: 0, gloss: 0.50, grout: 2.5 };
      }
      if (roomDefs.pool.surfaces.pool_coping) {
        roomDefs.pool.surfaces.pool_coping.src = poolCopingStone;
        roomDefs.pool.surfaces.pool_coping.set = { struct: 'slab', mode: 'mirror', size: 2.4, rot: 0, gloss: 0.85, grout: 1.5 };
      }
      if (roomDefs.pool.surfaces.pool_waterwall) {
        roomDefs.pool.surfaces.pool_waterwall.src = poolWallStone;
        roomDefs.pool.surfaces.pool_waterwall.set = { struct: 'tile120', mode: 'repeat', size: 1.2, rot: 0, gloss: 0.92, grout: 2 };
      }
      if (roomDefs.pool.surfaces.pool_bench) {
        roomDefs.pool.surfaces.pool_bench.src = poolBenchStone;
        roomDefs.pool.surfaces.pool_bench.set = { struct: 'slab', mode: 'mirror', size: 2.2, rot: 0, gloss: 0.88, grout: 2 };
      }
    }
  };
})(window);
