/**
 * Murali Granites & Marbles — Master Bathroom Suite 3D WebGL Room
 */
(function (window) {
  'use strict';

  window.WebGlRooms = window.WebGlRooms || {};

  window.WebGlRooms.bathroom = function (ctx) {
    const { THREE, group, reg, roomDefs, ROOM_CAMERAS, core, showroomSlabs, presets } = ctx;
    const { M, box, cyl, sbox, createPlasterTexture, createWoodTexture } = core;

    const maxAni = 4;
    const plasterTex = createPlasterTexture(maxAni);
    const wall = new THREE.MeshStandardMaterial({ map: plasterTex, roughness: 0.85 });
    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xdddddd, metalness: 0.95, roughness: 0.08 });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xc5a059, metalness: 0.88, roughness: 0.2 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x161618, roughness: 0.35 });
    const whiteCeramic = new THREE.MeshStandardMaterial({ color: 0xfbfbfd, roughness: 0.1 });
    const woodCabinet = createWoodTexture ? new THREE.MeshStandardMaterial({ map: createWoodTexture(maxAni), roughness: 0.35 }) : darkMat;
    const slat = woodCabinet;
    const green = new THREE.MeshStandardMaterial({ color: 0x2e4630, roughness: 0.35, metalness: 0.05 });
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

    // 1. Lighting (Dedicated Soft Architectural PBR Illumination)
    const bathSun = new THREE.DirectionalLight(0xfff3e2, 3.0);
    bathSun.position.set(-5, 8.5, 4);
    bathSun.castShadow = true;
    bathSun.shadow.mapSize.set(2048, 2048);
    bathSun.shadow.bias = -0.0003;
    bathSun.shadow.radius = 2.0;
    group.add(bathSun);

    const bathFill = new THREE.DirectionalLight(0xc2daf0, 1.35);
    bathFill.position.set(4.5, 6, -3.5);
    group.add(bathFill);

    const bathVanityLight = new THREE.PointLight(0xffdfa0, 1.6, 6.0);
    bathVanityLight.position.set(3.8, 2.3, 0.8);
    group.add(bathVanityLight);

    // 2. Bathroom Floor Mesh
    const bathFloor = new THREE.Mesh(new THREE.PlaneGeometry(10, 8.8), M('#ded4c5', 0.2));
    bathFloor.rotation.x = -Math.PI / 2;
    bathFloor.position.set(0, 0.025, 0);
    bathFloor.receiveShadow = true;
    group.add(bathFloor);

    // 3. Bathtub Feature Wall & LED Niche
    sbox(10, 4.4, 0.2, 0, 2.2, -4.4, wall, group);
    box(4.2, 0.65, 0.16, -0.6, 1.85, -4.32, darkMat, group);
    box(4.1, 0.04, 0.08, -0.6, 2.14, -4.3, warmLedMat, group);

    cyl(0.04, 0.04, 0.2, -1.8, 1.65, -4.3, M('#7a4f32', 0.15), group);
    cyl(0.045, 0.045, 0.24, -1.6, 1.67, -4.3, M('#2b3d30', 0.15), group);
    cyl(0.035, 0.035, 0.16, -1.4, 1.63, -4.3, whiteCeramic, group);

    // 4. Freestanding Oval Bathtub
    const tubGroup = new THREE.Group();
    tubGroup.position.set(-0.6, 0.4, -2.6);
    const tubOuter = new THREE.Mesh(new THREE.CylinderGeometry(0.92, 0.74, 0.78, 36), whiteCeramic);
    tubOuter.scale.set(1.42, 1.0, 0.88);
    tubOuter.castShadow = tubOuter.receiveShadow = true;
    tubGroup.add(tubOuter);
    const tubInner = new THREE.Mesh(new THREE.CylinderGeometry(0.84, 0.66, 0.76, 36), M('#f4f4f4', 0.1));
    tubInner.scale.set(1.36, 1.0, 0.82);
    tubInner.position.y = 0.03;
    tubGroup.add(tubInner);
    group.add(tubGroup);

    // Chrome Tub Mixer
    cyl(0.025, 0.025, 1.0, 0.8, 0.5, -2.6, chromeMat, group);
    box(0.28, 0.04, 0.04, 0.68, 0.98, -2.6, chromeMat, group);
    cyl(0.02, 0.02, 0.14, 0.8, 0.78, -2.52, chromeMat, group);

    // 5. Shower Enclosure Wall & Frameless Glass Screen
    const bathShowerWall = sbox(0.2, 4.4, 4.4, -4.9, 2.2, -2.2, wall, group);
    box(2.2, 0.05, 4.0, -3.8, 0.03, -2.2, M('#232528', 0.6), group);
    box(0.08, 0.02, 2.0, -4.6, 0.06, -2.2, chromeMat, group);
    box(0.03, 2.7, 2.6, -2.7, 1.36, -2.4, glassMat, group);
    box(0.04, 0.04, 2.6, -2.7, 2.72, -2.4, darkMat, group);
    box(2.2, 0.04, 0.04, -3.8, 2.72, -2.4, darkMat, group);

    box(0.5, 0.03, 0.03, -4.5, 2.85, -2.2, chromeMat, group);
    cyl(0.2, 0.2, 0.025, -4.2, 2.8, -2.2, chromeMat, group);
    cyl(0.04, 0.04, 0.03, -4.78, 1.3, -2.2, chromeMat, group);
    cyl(0.04, 0.04, 0.03, -4.78, 1.15, -2.2, chromeMat, group);

    // 6. Floating Designer Vanity
    box(0.85, 0.52, 3.2, 4.3, 0.62, 0.8, woodCabinet, group);
    for (let fi = 0; fi < 12; fi++) {
      box(0.02, 0.48, 0.04, 3.86, 0.62, -0.6 + fi * 0.26, slat, group);
    }

    const bathVanity = sbox(0.92, 0.08, 3.3, 4.34, 0.92, 0.8, wall, group);

    box(0.58, 0.18, 0.85, 4.34, 0.92, 0.0, whiteCeramic, group);
    box(0.58, 0.18, 0.85, 4.34, 0.92, 1.6, whiteCeramic, group);

    cyl(0.02, 0.02, 0.34, 4.65, 1.12, 0.0, goldMat, group);
    box(0.2, 0.03, 0.03, 4.54, 1.28, 0.0, goldMat, group);
    cyl(0.02, 0.02, 0.34, 4.65, 1.12, 1.6, goldMat, group);
    box(0.2, 0.03, 0.03, 4.54, 1.28, 1.6, goldMat, group);

    cyl(0.55, 0.55, 0.025, 4.76, 2.15, 0.0, M('#eaf3f8', 0.04), group);
    cyl(0.58, 0.58, 0.015, 4.78, 2.15, 0.0, warmLedMat, group);
    cyl(0.55, 0.55, 0.025, 4.76, 2.15, 1.6, M('#eaf3f8', 0.04), group);
    cyl(0.58, 0.58, 0.015, 4.78, 2.15, 1.6, warmLedMat, group);

    // 7. Walls, Towel Rails & Plant
    sbox(0.2, 4.4, 8.8, 4.9, 2.2, 0, wall, group);
    sbox(0.2, 4.4, 4.4, -4.9, 2.2, 2.2, wall, group);

    box(0.12, 2.8, 1.6, -4.8, 2.4, 2.6, darkMat, group);
    box(0.03, 2.65, 1.48, -4.8, 2.4, 2.6, M('#dceaf0', 0.35), group);

    cyl(0.018, 0.018, 1.8, 4.7, 1.5, -1.8, darkMat, group);
    cyl(0.018, 0.018, 1.8, 4.7, 1.5, -1.2, darkMat, group);
    for (let ri = 0; ri < 5; ri++) {
      box(0.03, 0.025, 0.6, 4.7, 0.8 + ri * 0.32, -1.5, darkMat, group);
    }
    box(0.14, 0.44, 0.46, 4.64, 1.42, -1.5, M('#f5f2eb', 0.95), group);

    box(0.52, 0.06, 1.1, -2.4, 0.44, 2.0, woodCabinet, group);
    cyl(0.025, 0.025, 0.42, -2.55, 0.22, 1.55, darkMat, group);
    cyl(0.025, 0.025, 0.42, -2.55, 0.22, 2.45, darkMat, group);

    cyl(0.24, 0.18, 0.42, -4.2, 0.22, 2.6, M('#dedede', 0.3), group);
    for (let li = 0; li < 6; li++) {
      const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.85, 6), green);
      leaf.position.set(-4.2 + Math.sin(li * 1.05) * 0.16, 0.65 + (li % 3) * 0.1, 2.6 + Math.cos(li * 1.05) * 0.16);
      leaf.rotation.x = (Math.random() - 0.5) * 0.2;
      leaf.rotation.z = (Math.random() - 0.5) * 0.2;
      leaf.castShadow = true;
      group.add(leaf);
    }

    // Register Surfaces
    reg('bathroom', 'bath_floor', 'Bathroom Floor', bathFloor, null, 10, 8.8);
    reg('bathroom', 'bath_shower_wall', 'Shower Wall', bathShowerWall, 0, 4.4, 4.4);
    reg('bathroom', 'bath_vanity', 'Vanity Countertop', bathVanity, 2, 0.92, 3.3);

    // Cameras
    ROOM_CAMERAS.bathroom = {
      type: 'three',
      title: 'Master Bathroom Suite (3D WebGL)',
      subtitle: '• Master Bath & Spa Architectural Suite',
      hint: '<span class="text-[#E7C887] font-semibold">💡 Bathroom Material Studio:</span> Select <b>Bathroom Floor</b>, <b>Shower Wall</b>, or <b>Vanity Countertop</b> to customize in 3D.',
      defaultCam: 'bath_front',
      cameras: [
        { id: 'bath_front', label: '🛁 Bathtub & Spa View', azimuth: Math.PI * 0.18, elevation: 0.35, distance: 9.8, target: [-0.5, 1.2, -1.8] },
        { id: 'vanity', label: '🪞 Double Vanity Counter', azimuth: Math.PI * 0.65, elevation: 0.32, distance: 7.2, target: [3.8, 1.2, 0.8] },
        { id: 'shower', label: '🚿 Walk-In Rain Shower', azimuth: Math.PI * 0.05, elevation: 0.28, distance: 7.5, target: [-3.8, 1.5, -2.2] }
      ]
    };

    // Default Stones
    const bFloorStone = showroomSlabs.find(s => s.name === 'River White') || presets[0];
    const bShowerWallStone = showroomSlabs.find(s => s.name === 'Emerald Onyx Marble') || presets.find(p => p.name === 'Calacatta White') || presets[0];
    const bVanityStone = showroomSlabs.find(s => s.name === 'Titanium Black') || showroomSlabs.find(s => s.name === 'Black Pearl') || showroomSlabs[2];

    if (roomDefs.bathroom) {
      if (roomDefs.bathroom.surfaces.bath_floor) {
        roomDefs.bathroom.surfaces.bath_floor.src = bFloorStone;
        roomDefs.bathroom.surfaces.bath_floor.set = { struct: 'tile60', mode: 'repeat', size: 0.6, rot: 0, gloss: 0.85, grout: 2 };
      }
      if (roomDefs.bathroom.surfaces.bath_shower_wall) {
        roomDefs.bathroom.surfaces.bath_shower_wall.src = bShowerWallStone;
        roomDefs.bathroom.surfaces.bath_shower_wall.set = { struct: 'tile120', mode: 'repeat', size: 1.2, rot: 0, gloss: 0.92, grout: 1.5 };
      }
      if (roomDefs.bathroom.surfaces.bath_vanity) {
        roomDefs.bathroom.surfaces.bath_vanity.src = bVanityStone;
        roomDefs.bathroom.surfaces.bath_vanity.set = { struct: 'slab', mode: 'mirror', size: 2.4, rot: 0, gloss: 0.95, grout: 2 };
      }
    }
  };
})(window);
