/**
 * Murali Granites & Marbles — Pooja Room & Sacred Mandir Sanctuary 3D WebGL Room
 * Modular Architectural Sanctuary with Hand-Carved Marble Altar, Tiered Pedestals,
 * Brass Samai Oil Lamps, Hanging Temple Bells, Backlit Sanctum, and 4 Customizable Surfaces.
 */
(function (window) {
  'use strict';

  window.WebGlRooms = window.WebGlRooms || {};

  window.WebGlRooms.pooja = function (ctx) {
    const { THREE, group, reg, roomDefs, ROOM_CAMERAS, core, showroomSlabs, presets } = ctx;
    const { M, box, cyl, sbox, plant, createWoodTexture } = core;

    // ── Architectural & Sacred Materials ──
    const pureGoldMat = new THREE.MeshStandardMaterial({
      color: 0xdeb841,
      metalness: 0.94,
      roughness: 0.12
    });

    const antiqueBrassMat = new THREE.MeshStandardMaterial({
      color: 0xc89d38,
      metalness: 0.88,
      roughness: 0.24
    });

    const teakWoodMat = createWoodTexture
      ? new THREE.MeshStandardMaterial({ map: createWoodTexture(4, '#4a2d16'), roughness: 0.38, metalness: 0.04 })
      : new THREE.MeshStandardMaterial({ color: 0x4a2d16, roughness: 0.4 });

    const softIvoryWall = new THREE.MeshStandardMaterial({
      color: 0xede8df,
      roughness: 0.90,
      metalness: 0.02
    });

    const flameMat = new THREE.MeshStandardMaterial({
      color: 0xffaa00,
      emissive: new THREE.Color(0xff6600),
      emissiveIntensity: 3.2,
      roughness: 0.2
    });

    const warmLedGlow = new THREE.MeshStandardMaterial({
      color: 0xfffaea,
      emissive: new THREE.Color(0xffd47a),
      emissiveIntensity: 1.8,
      roughness: 0.2
    });

    const marigoldOrange = new THREE.MeshStandardMaterial({
      color: 0xff6600,
      roughness: 0.82
    });

    const marigoldYellow = new THREE.MeshStandardMaterial({
      color: 0xffbb00,
      roughness: 0.82
    });

    const freshGreenLeaf = new THREE.MeshStandardMaterial({
      color: 0x2e5a27,
      roughness: 0.32,
      metalness: 0.05
    });

    // ── 1. Sacred Illumination (Golden Aura & Flickering Diya Light) ──
    const mainSun = new THREE.DirectionalLight(0xfff0db, 2.6);
    mainSun.position.set(-4, 9.0, 4.5);
    mainSun.castShadow = true;
    mainSun.shadow.mapSize.set(2048, 2048);
    mainSun.shadow.bias = -0.0003;
    mainSun.shadow.radius = 2.0;
    group.add(mainSun);

    const warmAmbientFill = new THREE.DirectionalLight(0xffe8c8, 1.3);
    warmAmbientFill.position.set(4, 7.0, -2);
    group.add(warmAmbientFill);

    // Dynamic flickering oil lamp point lights
    const poojaDiyaGlow1 = new THREE.PointLight(0xff9420, 2.4, 5.0, 1.4);
    poojaDiyaGlow1.position.set(-1.45, 1.35, -1.8);
    group.add(poojaDiyaGlow1);

    const poojaDiyaGlow2 = new THREE.PointLight(0xff9420, 2.4, 5.0, 1.4);
    poojaDiyaGlow2.position.set(1.45, 1.35, -1.8);
    group.add(poojaDiyaGlow2);

    const altarCoveLight = new THREE.PointLight(0xffdf88, 2.6, 6.5, 1.2);
    altarCoveLight.position.set(0, 2.2, -3.2);
    group.add(altarCoveLight);

    const sanctumSpot = new THREE.SpotLight(0xfff3db, 2.2, 10, Math.PI / 4, 0.35, 1.2);
    sanctumSpot.position.set(0, 3.8, -1.0);
    sanctumSpot.target.position.set(0, 1.2, -3.0);
    group.add(sanctumSpot);
    group.add(sanctumSpot.target);

    // ── 2. Sanctuary Shell (Ceiling Soffit Beams & Jali Wall Panels) ──
    // Perimeter Ceiling Soffit Frame (Open front/center so camera never gets occluded)
    box(8.6, 0.28, 1.2, 0, 3.88, -3.4, softIvoryWall, group); // Back soffit
    box(1.2, 0.28, 6.8, -3.7, 3.88, 0, softIvoryWall, group);  // Left soffit
    box(1.2, 0.28, 6.8, 3.7, 3.88, 0, softIvoryWall, group);   // Right soffit
    // Perimeter warm golden LED cove lighting
    box(6.8, 0.04, 0.04, 0, 3.74, -2.82, warmLedGlow, group);
    box(0.04, 0.04, 5.8, -3.12, 3.74, 0, warmLedGlow, group);
    box(0.04, 0.04, 5.8, 3.12, 3.74, 0, warmLedGlow, group);

    // Back Main Wall
    box(8.6, 3.9, 0.25, 0, 1.95, -3.95, softIvoryWall, group);

    // Left & Right Enclosing Sanctuary Walls
    box(0.25, 3.9, 7.8, -3.95, 1.95, 0, softIvoryWall, group);
    box(0.25, 3.9, 7.8, 3.95, 1.95, 0, softIvoryWall, group);

    // Teakwood Carved Jali (Lattice) Accent Screens along side walls
    [-3.78, 3.78].forEach(xPos => {
      // Jali outer teak frame
      box(0.06, 3.2, 2.2, xPos, 1.9, -1.2, teakWoodMat, group);
      // Horizontal & vertical lattice slats
      for (let ji = 0; ji < 7; ji++) {
        box(0.04, 0.04, 2.0, xPos, 0.6 + ji * 0.44, -1.2, antiqueBrassMat, group);
      }
      for (let ki = 0; ki < 5; ki++) {
        box(0.04, 2.8, 0.04, xPos, 1.9, -2.0 + ki * 0.4, antiqueBrassMat, group);
      }
    });

    // ── 3. SURFACE 1: Sacred Sanctuary Marble Floor (`pooja_floor`) ──
    const poojaFloorGeo = new THREE.PlaneGeometry(8.2, 7.8);
    const poojaFloorMat = M('#faf8f5', 0.14, 0.04);
    const poojaFloor = new THREE.Mesh(poojaFloorGeo, poojaFloorMat);
    poojaFloor.rotation.x = -Math.PI / 2;
    poojaFloor.position.set(0, 0.02, 0);
    poojaFloor.receiveShadow = true;
    group.add(poojaFloor);

    // Laser-Cut Polished Brass Geometric Inlay Border on Floor
    box(7.2, 0.005, 0.04, 0, 0.025, -3.4, pureGoldMat, group);
    box(7.2, 0.005, 0.04, 0, 0.025, 3.4, pureGoldMat, group);
    box(0.04, 0.005, 6.8, -3.58, 0.025, 0, pureGoldMat, group);
    box(0.04, 0.005, 6.8, 3.58, 0.025, 0, pureGoldMat, group);
    // Inner delicate gold stringline
    box(6.8, 0.004, 0.015, 0, 0.026, -3.2, pureGoldMat, group);
    box(6.8, 0.004, 0.015, 0, 0.026, 3.2, pureGoldMat, group);
    box(0.015, 0.004, 6.4, -3.38, 0.026, 0, pureGoldMat, group);
    box(0.015, 0.004, 6.4, 3.38, 0.026, 0, pureGoldMat, group);

    // Central Brass & Stone Lotus Medallion Inlay on floor in front of altar
    const lotusCenter = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 0.006, 32), pureGoldMat);
    lotusCenter.position.set(0, 0.026, -0.6);
    group.add(lotusCenter);
    const lotusInner = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.68, 0.008, 8), M('#f4ede2', 0.12));
    lotusInner.position.set(0, 0.027, -0.6);
    lotusInner.rotation.y = Math.PI / 8;
    group.add(lotusInner);

    // ── 4. SURFACE 2: Backlit Sacred Altar Backdrop Wall (`pooja_altar_wall`) ──
    const altarWallGeo = new THREE.BoxGeometry(4.6, 2.9, 0.18);
    const altarWallMat = M('#fdfaf3', 0.15, 0.04);
    const poojaAltarWall = new THREE.Mesh(altarWallGeo, [
      altarWallMat, altarWallMat, altarWallMat, altarWallMat, altarWallMat, altarWallMat
    ]);
    poojaAltarWall.position.set(0, 2.1, -3.8);
    poojaAltarWall.castShadow = true;
    poojaAltarWall.receiveShadow = true;
    group.add(poojaAltarWall);

    // Perimeter Backlit Halo LED Channel behind Altar Wall
    box(4.8, 3.05, 0.04, 0, 2.1, -3.88, warmLedGlow, group);
    // Polished Brass Mandir Outer Frame Moulding
    box(4.9, 0.08, 0.12, 0, 3.6, -3.76, pureGoldMat, group);
    box(0.08, 3.1, 0.12, -2.4, 2.1, -3.76, pureGoldMat, group);
    box(0.08, 3.1, 0.12, 2.4, 2.1, -3.76, pureGoldMat, group);

    // Sacred Embossed Om / Sun Ray Brass Motif in center of altar wall
    cyl(0.38, 0.38, 0.03, 0, 2.65, -3.7, pureGoldMat, group, 32);
    for (let ri = 0; ri < 12; ri++) {
      const angle = (ri / 12) * Math.PI * 2;
      const ray = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.28, 4), pureGoldMat);
      ray.position.set(Math.sin(angle) * 0.52, 2.65 + Math.cos(angle) * 0.52, -3.7);
      ray.rotation.z = -angle;
      group.add(ray);
    }

    // ── 5. SURFACE 3: Tiered Sacred Deity Pedestal (`pooja_pedestals`) ──
    // Tier 1: Wide Base Stone Platform with bullnose moulding
    const ped1Geo = new THREE.BoxGeometry(4.4, 0.28, 1.8);
    const ped1Mat = M('#f8f5ee', 0.16, 0.04);
    const poojaPedestal1 = new THREE.Mesh(ped1Geo, [ped1Mat, ped1Mat, ped1Mat, ped1Mat, ped1Mat, ped1Mat]);
    poojaPedestal1.position.set(0, 0.14, -2.85);
    poojaPedestal1.castShadow = true;
    poojaPedestal1.receiveShadow = true;
    group.add(poojaPedestal1);
    box(4.44, 0.02, 1.84, 0, 0.27, -2.85, pureGoldMat, group); // gold stringline

    // Tier 2: Intermediate Altar Step
    const ped2Geo = new THREE.BoxGeometry(3.4, 0.28, 1.2);
    const poojaPedestal2 = new THREE.Mesh(ped2Geo, [ped1Mat, ped1Mat, ped1Mat, ped1Mat, ped1Mat, ped1Mat]);
    poojaPedestal2.position.set(0, 0.42, -3.05);
    poojaPedestal2.castShadow = true;
    poojaPedestal2.receiveShadow = true;
    group.add(poojaPedestal2);
    box(3.44, 0.02, 1.24, 0, 0.55, -3.05, pureGoldMat, group);

    // Tier 3: Central Deity Simhasan (Throne Pedestal)
    const ped3Geo = new THREE.BoxGeometry(2.0, 0.22, 0.7);
    const poojaPedestalTop = new THREE.Mesh(ped3Geo, [ped1Mat, ped1Mat, ped1Mat, ped1Mat, ped1Mat, ped1Mat]);
    poojaPedestalTop.position.set(0, 0.67, -3.15);
    poojaPedestalTop.castShadow = true;
    poojaPedestalTop.receiveShadow = true;
    group.add(poojaPedestalTop);
    box(2.04, 0.02, 0.74, 0, 0.77, -3.15, pureGoldMat, group);

    // ── 6. SURFACE 4: Carved Marble Mandir Pillars & Canopy (`pooja_mandir_pillars`) ──
    // Dual Monumental Fluted Pillars flanking the Altar Sanctum
    const pillarMat = M('#f4ede2', 0.20, 0.04);
    const leftPillar = sbox(0.28, 3.2, 0.28, -2.1, 1.74, -2.4, pillarMat, group);
    const rightPillar = sbox(0.28, 3.2, 0.28, 2.1, 1.74, -2.4, pillarMat, group);

    // Pillar Plinths & Carved Capitals
    [-2.1, 2.1].forEach(px => {
      // Base stepped plinth
      box(0.42, 0.18, 0.42, px, 0.32, -2.4, pureGoldMat, group);
      box(0.36, 0.12, 0.36, px, 0.46, -2.4, antiqueBrassMat, group);
      // Fluted rings on pillar
      cyl(0.16, 0.16, 0.04, px, 1.2, -2.4, pureGoldMat, group, 16);
      cyl(0.16, 0.16, 0.04, px, 2.2, -2.4, pureGoldMat, group, 16);
      // Carved lotus capital
      box(0.38, 0.16, 0.38, px, 3.26, -2.4, pureGoldMat, group);
      box(0.46, 0.12, 0.46, px, 3.38, -2.4, antiqueBrassMat, group);
    });

    // Ornate Carved Temple Lintel Beam (Toran) spanning pillars
    box(4.8, 0.26, 0.36, 0, 3.48, -2.4, teakWoodMat, group);
    box(4.84, 0.04, 0.38, 0, 3.62, -2.4, pureGoldMat, group);

    // Multi-tiered Architectural Temple Vimana / Roof Crest
    box(3.2, 0.20, 0.30, 0, 3.72, -2.4, teakWoodMat, group);
    box(1.8, 0.16, 0.24, 0, 3.88, -2.4, teakWoodMat, group);
    // Three Polished Brass Sacred Kalash Finials on roof crest
    [0, -1.2, 1.2].forEach(kx => {
      cyl(0.09, 0.06, 0.22, kx, 4.04, -2.4, pureGoldMat, group, 20);
      cyl(0.02, 0.05, 0.12, kx, 4.18, -2.4, pureGoldMat, group, 16);
    });

    // ── 7. Sacred Temple Bells (Ghanta) on Brass Chains ──
    const bellConfigs = [
      { x: -1.4, z: -2.0, len: 1.1, size: 0.16 },
      { x: -0.7, z: -2.2, len: 1.3, size: 0.13 },
      { x: 0.7, z: -2.2, len: 1.3, size: 0.13 },
      { x: 1.4, z: -2.0, len: 1.1, size: 0.16 }
    ];

    bellConfigs.forEach(b => {
      // Brass chain link
      cyl(0.012, 0.012, b.len, b.x, 3.48 - b.len / 2, b.z, pureGoldMat, group, 10);
      // Bell body with flared skirt
      const bellY = 3.48 - b.len;
      cyl(b.size * 0.3, b.size * 0.7, b.size * 0.9, b.x, bellY - b.size * 0.4, b.z, pureGoldMat, group, 24);
      cyl(b.size * 0.7, b.size * 0.9, b.size * 0.3, b.x, bellY - b.size * 0.85, b.z, pureGoldMat, group, 24);
      // Bell clapper
      cyl(0.015, 0.025, b.size * 0.5, b.x, bellY - b.size * 1.0, b.z, antiqueBrassMat, group, 12);
    });

    // ── 8. Traditional Brass Kuthu Vilakku (Samai Floor Lamps) ──
    [-1.6, 1.6].forEach((lampX, lIdx) => {
      // Stepped circular base
      cyl(0.24, 0.28, 0.08, lampX, 0.08, -1.8, pureGoldMat, group, 24);
      cyl(0.18, 0.22, 0.06, lampX, 0.14, -1.8, antiqueBrassMat, group, 24);
      // Tall fluted central stem with ornate brass nodes
      cyl(0.038, 0.048, 1.0, lampX, 0.66, -1.8, pureGoldMat, group, 20);
      cyl(0.07, 0.07, 0.04, lampX, 0.45, -1.8, pureGoldMat, group, 16);
      cyl(0.07, 0.07, 0.04, lampX, 0.85, -1.8, pureGoldMat, group, 16);
      // Tier 1 Oil Cup (Thalika)
      cyl(0.22, 0.12, 0.06, lampX, 1.18, -1.8, pureGoldMat, group, 24);
      // Tier 2 Upper Oil Cup
      cyl(0.15, 0.09, 0.05, lampX, 1.34, -1.8, pureGoldMat, group, 24);
      // Brass Bird / Hamsa Finial on top
      cyl(0.03, 0.015, 0.14, lampX, 1.44, -1.8, pureGoldMat, group, 16);

      // Glowing flame cones in oil cups
      const flame1 = new THREE.Mesh(new THREE.ConeGeometry(0.025, 0.07, 8), flameMat);
      flame1.position.set(lampX, 1.23, -1.8);
      group.add(flame1);
      const flame2 = new THREE.Mesh(new THREE.ConeGeometry(0.022, 0.06, 8), flameMat);
      flame2.position.set(lampX, 1.39, -1.8);
      group.add(flame2);
    });

    // ── 9. Sacred Aarti Thali, Kalash & Floral Offerings ──
    // Sacred Brass Kalash atop Tier 3 Simhasan
    cyl(0.12, 0.08, 0.18, 0, 0.86, -3.15, pureGoldMat, group, 24);
    cyl(0.06, 0.12, 0.08, 0, 0.98, -3.15, pureGoldMat, group, 24);
    // Green mango leaves tucked in Kalash
    for (let mi = 0; mi < 5; mi++) {
      const mAngle = (mi / 5) * Math.PI * 2;
      const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.18, 4), freshGreenLeaf);
      leaf.position.set(Math.sin(mAngle) * 0.06, 1.05, -3.15 + Math.cos(mAngle) * 0.06);
      leaf.rotation.x = Math.sin(mAngle) * 0.6;
      leaf.rotation.z = -Math.cos(mAngle) * 0.6;
      group.add(leaf);
    }
    // Sacred Coconut atop Kalash
    const coconut = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 12), M('#4e341f', 0.85));
    coconut.scale.set(1.0, 1.3, 1.0);
    coconut.position.set(0, 1.12, -3.15);
    group.add(coconut);

    // Polished Brass Aarti Thali (Offering Plate) on Tier 2 step
    cyl(0.24, 0.22, 0.025, 0, 0.57, -2.65, pureGoldMat, group, 32);
    // Center Diya on Thali
    cyl(0.04, 0.02, 0.03, 0, 0.59, -2.65, pureGoldMat, group, 16);
    const thaliFlame = new THREE.Mesh(new THREE.ConeGeometry(0.016, 0.05, 8), flameMat);
    thaliFlame.position.set(0, 0.62, -2.65);
    group.add(thaliFlame);
    // Kumkum & Chandan bowls on thali
    cyl(0.025, 0.015, 0.02, -0.12, 0.59, -2.65, M('#bb1a24', 0.6), group, 12); // Red Kumkum
    cyl(0.025, 0.015, 0.02, 0.12, 0.59, -2.65, M('#f0d468', 0.7), group, 12);  // Yellow Chandan

    // Fresh Marigold Flower Garlands draped across altar step
    for (let gi = 0; gi < 20; gi++) {
      const gMat = gi % 2 === 0 ? marigoldOrange : marigoldYellow;
      const flower = new THREE.Mesh(new THREE.SphereGeometry(0.036, 8, 8), gMat);
      flower.position.set(-1.4 + gi * 0.145, 0.57, -2.52 + Math.sin(gi * 0.35) * 0.04);
      group.add(flower);
    }

    // Sacred Tulsi Planter Urn on Right Corner
    cyl(0.25, 0.18, 0.55, 2.6, 0.28, -1.4, pureGoldMat, group, 24);
    // Tulsi holy basil foliage
    for (let ti = 0; ti < 12; ti++) {
      const tAngle = (ti / 12) * Math.PI * 2;
      const tLeaf = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.45, 5), freshGreenLeaf);
      tLeaf.position.set(2.6 + Math.sin(tAngle) * 0.12, 0.72 + (ti % 3) * 0.08, -1.4 + Math.cos(tAngle) * 0.12);
      tLeaf.rotation.x = Math.sin(tAngle) * 0.4;
      tLeaf.rotation.z = Math.cos(tAngle) * 0.4;
      tLeaf.castShadow = true;
      group.add(tLeaf);
    }

    // Traditional Velvet & Silk Pooja Asana (Meditation Floor Cushion)
    const asana = sbox(0.9, 0.06, 0.9, 0, 0.05, -0.6, M('#8f1722', 0.7), group);
    box(0.94, 0.02, 0.94, 0, 0.04, -0.6, pureGoldMat, group); // gold brocade border

    // ── 10. Surface Registration (All 4 Customizable Stone Surfaces) ──
    // Surface 1: Sanctuary Marble Floor (Pristine Statuario / Calacatta / Makrana with brass inlays)
    reg('pooja', 'pooja_floor', 'Sanctuary Marble Floor', poojaFloor, null, 8.2, 7.8);
    // Surface 2: Backlit Sacred Altar Backdrop Wall (Translucent Onyx, Bookmatched Marble)
    reg('pooja', 'pooja_altar_wall', 'Sacred Mandir Altar Wall', poojaAltarWall, null, 4.6, 2.9);
    // Surface 3: Tiered Sacred Deity Pedestal (Monolithic stepped stone altar)
    reg('pooja', 'pooja_pedestals', 'Sanctum Deity Pedestals', poojaPedestal1, null, 4.4, 1.8);
    reg('pooja', 'pooja_pedestals', 'Sanctum Deity Pedestals', poojaPedestal2, null, 3.4, 1.2);
    reg('pooja', 'pooja_pedestals', 'Sanctum Deity Pedestals', poojaPedestalTop, null, 2.0, 0.7);
    // Surface 4: Carved Marble Mandir Pillars (Fluted classical stone pillars)
    reg('pooja', 'pooja_mandir_pillars', 'Carved Mandir Pillars', leftPillar, null, 0.28, 3.2);
    reg('pooja', 'pooja_mandir_pillars', 'Carved Mandir Pillars', rightPillar, null, 0.28, 3.2);

    // ── 11. Five Cinematic Spiritual Camera Presets ──
    ROOM_CAMERAS.pooja = {
      type: 'three',
      title: 'Pooja Room & Sacred Mandir Sanctuary (3D WebGL)',
      subtitle: '• Divine Statuario Marble, Hand-Carved Altar & Brass Vilakku',
      hint: '<span class="text-[#E7C887] font-semibold">💡 Sacred Mandir Studio:</span> Customize <b>Sanctuary Marble Floor</b>, <b>Altar Backdrop Wall</b>, <b>Deity Pedestals</b>, or <b>Carved Mandir Pillars</b> with authentic Italian marbles and translucent onyx in real-time 3D.',
      defaultCam: 'pooja_front',
      cameras: [
        { id: 'pooja_front', label: '🪔 Mandir Sanctum Overview', azimuth: 0.0, elevation: 0.22, distance: 6.4, target: [0, 1.3, -2.4] },
        { id: 'altar', label: '🕉️ Deity Pedestal & Altar', azimuth: Math.PI * 0.10, elevation: 0.26, distance: 4.2, target: [0, 1.0, -2.9] },
        { id: 'diya', label: '🕯️ Brass Samai & Offerings', azimuth: Math.PI * 1.74, elevation: 0.20, distance: 3.0, target: [1.45, 0.9, -1.8] },
        { id: 'bells', label: '🔔 Sacred Hanging Bells', azimuth: Math.PI * 0.24, elevation: 0.28, distance: 3.8, target: [-0.9, 2.2, -1.8] },
        { id: 'floor', label: '🧱 Pristine Floor & Inlay', azimuth: Math.PI * 0.06, elevation: 0.12, distance: 5.4, target: [0, 0.2, -1.0] }
      ]
    };

    // ── 12. Default Showroom Slabs Setup ──
    const pFloorStone = showroomSlabs.find(s => s.name === 'Statuario') || showroomSlabs.find(s => s.name === 'Calacatta White') || presets[0];
    const pAltarStone = showroomSlabs.find(s => s.name === 'Emerald Onyx Marble') || showroomSlabs.find(s => s.name === 'Calacatta Gold PGVT Tile') || presets[0];
    const pPedStone = showroomSlabs.find(s => s.name === 'Banswara Marble') || showroomSlabs.find(s => s.name === 'Alaska White') || presets[0];
    const pPillarStone = showroomSlabs.find(s => s.name === 'River White') || showroomSlabs.find(s => s.name === 'Statuario') || presets[0];

    if (roomDefs.pooja) {
      if (roomDefs.pooja.surfaces.pooja_floor) {
        roomDefs.pooja.surfaces.pooja_floor.src = pFloorStone;
        roomDefs.pooja.surfaces.pooja_floor.set = { struct: 'slab', mode: 'mirror', size: 2.4, rot: 0, gloss: 0.96, grout: 1.0 };
      }
      if (roomDefs.pooja.surfaces.pooja_altar_wall) {
        roomDefs.pooja.surfaces.pooja_altar_wall.src = pAltarStone;
        roomDefs.pooja.surfaces.pooja_altar_wall.set = { struct: 'slab', mode: 'mirror', size: 2.4, rot: 0, gloss: 0.94, grout: 1.0 };
      }
      if (roomDefs.pooja.surfaces.pooja_pedestals) {
        roomDefs.pooja.surfaces.pooja_pedestals.src = pPedStone;
        roomDefs.pooja.surfaces.pooja_pedestals.set = { struct: 'slab', mode: 'mirror', size: 2.0, rot: 0, gloss: 0.92, grout: 1.0 };
      }
      if (roomDefs.pooja.surfaces.pooja_mandir_pillars) {
        roomDefs.pooja.surfaces.pooja_mandir_pillars.src = pPillarStone;
        roomDefs.pooja.surfaces.pooja_mandir_pillars.set = { struct: 'slab', mode: 'mirror', size: 2.0, rot: 0, gloss: 0.90, grout: 1.0 };
      }
    }

    // Real-time spiritual diya flicker & flame breathing animation
    window.WebGlAnimators = window.WebGlAnimators || [];
    window.WebGlAnimators.push(() => {
      const t = Date.now() * 0.003;
      if (poojaDiyaGlow1 && poojaDiyaGlow2) {
        const flicker1 = 2.4 + Math.sin(t * 3.1) * 0.25 + Math.cos(t * 7.7) * 0.15;
        const flicker2 = 2.4 + Math.cos(t * 2.8) * 0.25 + Math.sin(t * 6.9) * 0.15;
        poojaDiyaGlow1.intensity = flicker1;
        poojaDiyaGlow2.intensity = flicker2;
      }
      if (thaliFlame) {
        thaliFlame.scale.y = 1.0 + Math.sin(t * 4.5) * 0.12;
      }
    });
  };

})(window);
