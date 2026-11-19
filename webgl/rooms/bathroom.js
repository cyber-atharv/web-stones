/**
 * Murali Granites & Marbles — Master Bathroom Suite & Luxury Spa 3D WebGL Room
 * Modular Architectural Room Definition with PBR Shading, Freestanding Tub,
 * Walk-In Frameless Rain Shower, Double Vanity, and 4 Customizable Stone Surfaces.
 */
(function (window) {
  'use strict';

  window.WebGlRooms = window.WebGlRooms || {};

  window.WebGlRooms.bathroom = function (ctx) {
    const { THREE, group, reg, roomDefs, ROOM_CAMERAS, core, showroomSlabs, presets } = ctx;
    const { M, box, cyl, sbox, plant, createWoodTexture } = core;

    // ── Architectural Materials ──
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xf0f0f2,
      metalness: 0.98,
      roughness: 0.04
    });

    const brushedGoldMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.88,
      roughness: 0.18
    });

    const darkOakMat = createWoodTexture
      ? new THREE.MeshStandardMaterial({ map: createWoodTexture(4, '#241a14'), roughness: 0.35, metalness: 0.05 })
      : new THREE.MeshStandardMaterial({ color: 0x1f1915, roughness: 0.4 });

    const matteWhiteCeramic = new THREE.MeshStandardMaterial({
      color: 0xfcfcff,
      roughness: 0.12,
      metalness: 0.02
    });

    const softPlasterWall = new THREE.MeshStandardMaterial({
      color: 0xdfdcd5,
      roughness: 0.92,
      metalness: 0.02
    });

    const darkBasalt = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.65,
      metalness: 0.15
    });

    const riverPebbleMat = new THREE.MeshStandardMaterial({
      color: 0x222225,
      roughness: 0.85,
      metalness: 0.1
    });

    const clearGlassMat = new THREE.MeshStandardMaterial({
      color: 0xe6f4f8,
      transparent: true,
      opacity: 0.32,
      roughness: 0.04,
      metalness: 0.15
    });

    const frostedGlassMat = new THREE.MeshStandardMaterial({
      color: 0xdae6eb,
      transparent: true,
      opacity: 0.55,
      roughness: 0.45,
      metalness: 0.1
    });

    const warmLedCove = new THREE.MeshStandardMaterial({
      color: 0xfff6e5,
      emissive: new THREE.Color(0xffcf88),
      emissiveIntensity: 1.8,
      roughness: 0.2
    });

    const mirrorReflectiveMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.98,
      roughness: 0.02
    });

    const linenTowelWhite = new THREE.MeshStandardMaterial({
      color: 0xf7f5f0,
      roughness: 0.95
    });

    const linenTowelCharcoal = new THREE.MeshStandardMaterial({
      color: 0x2c2c30,
      roughness: 0.92
    });

    const lushGreenLeaf = new THREE.MeshStandardMaterial({
      color: 0x244226,
      roughness: 0.28,
      metalness: 0.04
    });

    // ── 1. Architectural Lighting Setup ──
    const mainSun = new THREE.DirectionalLight(0xfff6e8, 2.6);
    mainSun.position.set(-6, 9.5, 3.5);
    mainSun.castShadow = true;
    mainSun.shadow.mapSize.set(2048, 2048);
    mainSun.shadow.bias = -0.0003;
    mainSun.shadow.radius = 2.0;
    group.add(mainSun);

    const softFillLight = new THREE.DirectionalLight(0xd4e2ee, 1.4);
    softFillLight.position.set(5.5, 7.0, -2.5);
    group.add(softFillLight);

    const tubAccentSpot = new THREE.SpotLight(0xffeed0, 2.2, 12, Math.PI / 4, 0.4, 1.2);
    tubAccentSpot.position.set(-0.8, 4.2, -2.6);
    tubAccentSpot.target.position.set(-0.8, 0.6, -2.6);
    group.add(tubAccentSpot);
    group.add(tubAccentSpot.target);

    const vanitySconceLeft = new THREE.PointLight(0xffe2b0, 1.4, 5.0, 1.6);
    vanitySconceLeft.position.set(4.0, 2.3, 0.1);
    group.add(vanitySconceLeft);

    const vanitySconceRight = new THREE.PointLight(0xffe2b0, 1.4, 5.0, 1.6);
    vanitySconceRight.position.set(4.0, 2.3, 1.7);
    group.add(vanitySconceRight);

    const showerDownlight = new THREE.SpotLight(0xfff4e0, 1.8, 8, Math.PI / 3, 0.3, 1.4);
    showerDownlight.position.set(-3.8, 3.8, -2.2);
    showerDownlight.target.position.set(-3.8, 0, -2.2);
    group.add(showerDownlight);
    group.add(showerDownlight.target);

    // ── 2. Room Shell (Ceiling Soffit Frame, Walls & Courtyard Glass) ──
    // Perimeter Architectural Soffit Beams (open center so camera never gets occluded)
    box(10.2, 0.28, 1.2, 0, 3.88, -3.85, softPlasterWall, group); // Back soffit
    box(1.2, 0.28, 7.8, -4.35, 3.88, 0, softPlasterWall, group);  // Left soffit
    box(1.2, 0.28, 7.8, 4.35, 3.88, 0, softPlasterWall, group);   // Right soffit
    // Perimeter LED light coves
    box(8.2, 0.04, 0.04, 0, 3.74, -3.25, warmLedCove, group);
    box(0.04, 0.04, 6.8, -3.75, 3.74, 0, warmLedCove, group);
    box(0.04, 0.04, 6.8, 3.75, 3.74, 0, warmLedCove, group);

    // Back Main Wall
    box(10.2, 3.9, 0.3, 0, 1.95, -4.45, softPlasterWall, group);

    // Right Side Wall (behind Vanity)
    box(0.3, 3.9, 9.0, 4.95, 1.95, 0, softPlasterWall, group);

    // Left Side Wall (Window Wall to Private Tropical Courtyard)
    // Partial wall returns
    box(0.3, 3.9, 2.2, -4.95, 1.95, 3.35, softPlasterWall, group);
    box(0.3, 3.9, 1.6, -4.95, 1.95, -3.65, softPlasterWall, group);
    // Floor-to-ceiling glass frame and window panes
    box(0.08, 3.7, 0.06, -4.95, 1.95, -2.85, darkBasalt, group);
    box(0.08, 3.7, 0.06, -4.95, 1.95, 2.25, darkBasalt, group);
    box(0.08, 0.06, 5.1, -4.95, 3.75, -0.3, darkBasalt, group);
    box(0.08, 0.06, 5.1, -4.95, 0.05, -0.3, darkBasalt, group);
    // Vertical mullions
    box(0.06, 3.7, 0.05, -4.95, 1.95, -1.15, darkBasalt, group);
    box(0.06, 3.7, 0.05, -4.95, 1.95, 0.55, darkBasalt, group);
    // Courtyard Glass Panes
    box(0.02, 3.65, 5.0, -4.95, 1.92, -0.3, clearGlassMat, group);

    // Exterior Tropical Courtyard (Beyond the glass)
    box(2.8, 0.1, 7.0, -6.45, -0.05, -0.3, riverPebbleMat, group);
    box(0.2, 3.8, 7.2, -7.85, 1.9, -0.3, softPlasterWall, group);
    // Bamboo / tropical courtyard plants
    for (let bi = 0; bi < 8; bi++) {
      cyl(0.04, 0.04, 3.4, -6.6 + (bi % 2) * 0.45, 1.7, -2.6 + bi * 0.72, M('#435732', 0.5), group, 12);
      for (let bl = 0; bl < 4; bl++) {
        const bLeaf = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.6, 5), lushGreenLeaf);
        bLeaf.position.set(-6.6 + (bi % 2) * 0.45, 1.5 + bl * 0.55, -2.6 + bi * 0.72);
        bLeaf.rotation.x = 0.5 * Math.sin(bi + bl);
        bLeaf.rotation.z = 0.6 * Math.cos(bi + bl);
        group.add(bLeaf);
      }
    }

    // ── 3. SURFACE 1: Grand Spa Bathroom Floor (`bath_floor`) ──
    const bathFloorGeo = new THREE.PlaneGeometry(10.0, 8.8);
    const bathFloorMat = M('#ded4c5', 0.18, 0.05);
    const bathFloor = new THREE.Mesh(bathFloorGeo, bathFloorMat);
    bathFloor.rotation.x = -Math.PI / 2;
    bathFloor.position.set(0, 0.02, 0);
    bathFloor.receiveShadow = true;
    group.add(bathFloor);

    // Polished Brass perimeter border stringline
    box(9.6, 0.005, 0.03, 0, 0.025, -4.2, brushedGoldMat, group);
    box(9.6, 0.005, 0.03, 0, 0.025, 4.2, brushedGoldMat, group);
    box(0.03, 0.005, 8.4, -4.75, 0.025, 0, brushedGoldMat, group);
    box(0.03, 0.005, 8.4, 4.75, 0.025, 0, brushedGoldMat, group);

    // ── 4. SURFACE 4: Freestanding Bathtub Podium & Surround (`bath_tub_deck`) ──
    // Raised monolithic stone podium platform for soaking tub
    const tubPodiumGeo = new THREE.BoxGeometry(3.1, 0.14, 2.3);
    const tubPodiumMat = M('#e5dfd5', 0.2, 0.04);
    const bathTubDeck = new THREE.Mesh(tubPodiumGeo, [tubPodiumMat, tubPodiumMat, tubPodiumMat, tubPodiumMat, tubPodiumMat, tubPodiumMat]);
    bathTubDeck.position.set(-0.7, 0.08, -2.6);
    bathTubDeck.castShadow = true;
    bathTubDeck.receiveShadow = true;
    group.add(bathTubDeck);

    // Recessed pebble drainage border around tub podium
    box(3.5, 0.02, 0.22, -0.7, 0.022, -1.35, riverPebbleMat, group);
    box(3.5, 0.02, 0.22, -0.7, 0.022, -3.85, riverPebbleMat, group);
    box(0.22, 0.02, 2.7, -2.35, 0.022, -2.6, riverPebbleMat, group);
    box(0.22, 0.02, 2.7, 0.95, 0.022, -2.6, riverPebbleMat, group);
    // Subtle warm LED step-lighting underneath the floating podium lip
    box(3.0, 0.02, 0.02, -0.7, 0.02, -1.46, warmLedCove, group);
    box(0.02, 0.02, 2.2, 0.84, 0.02, -2.6, warmLedCove, group);

    // Sculptural Freestanding Bathtub (Mineral Composite White)
    const tubGroup = new THREE.Group();
    tubGroup.position.set(-0.7, 0.52, -2.6);
    // Outer ergonomic shell
    const tubOuter = new THREE.Mesh(new THREE.CylinderGeometry(0.96, 0.76, 0.74, 48), matteWhiteCeramic);
    tubOuter.scale.set(1.48, 1.0, 0.92);
    tubOuter.castShadow = tubOuter.receiveShadow = true;
    tubGroup.add(tubOuter);
    // Inner tub basin with water line
    const tubInner = new THREE.Mesh(new THREE.CylinderGeometry(0.88, 0.68, 0.72, 48), M('#f4f6f8', 0.08));
    tubInner.scale.set(1.42, 1.0, 0.86);
    tubInner.position.y = 0.03;
    tubGroup.add(tubInner);
    // Shimmering bath water surface
    const tubWater = new THREE.Mesh(new THREE.CylinderGeometry(0.84, 0.84, 0.02, 32), new THREE.MeshStandardMaterial({
      color: 0x98d4e4,
      transparent: true,
      opacity: 0.65,
      roughness: 0.02,
      metalness: 0.2
    }));
    tubWater.scale.set(1.38, 1.0, 0.82);
    tubWater.position.y = 0.22;
    tubGroup.add(tubWater);
    // Tub chrome clicker drain
    cyl(0.05, 0.05, 0.015, 0, -0.32, 0, chromeMat, tubGroup, 16);
    group.add(tubGroup);

    // Freestanding Floor-Mounted Tub Mixer Tap (Brushed Champagne Gold)
    cyl(0.025, 0.035, 0.98, 0.72, 0.56, -2.6, brushedGoldMat, group, 24);
    box(0.32, 0.04, 0.04, 0.58, 1.04, -2.6, brushedGoldMat, group);
    cyl(0.02, 0.02, 0.12, 0.44, 0.98, -2.6, brushedGoldMat, group, 16);
    // Hot / Cold cross knobs
    cyl(0.035, 0.035, 0.02, 0.72, 0.82, -2.52, brushedGoldMat, group, 16);
    cyl(0.035, 0.035, 0.02, 0.72, 0.82, -2.68, brushedGoldMat, group, 16);
    // Cylindrical Hand Shower Wand on side cradle
    cyl(0.014, 0.014, 0.22, 0.78, 0.88, -2.6, brushedGoldMat, group, 16);

    // Luxury Teak / Stone Tub Caddy Bridge
    box(0.24, 0.025, 0.98, -0.7, 0.92, -2.6, darkOakMat, group);
    // Bath accessories on caddy: rolled face towel, amber bottle, wine glass
    cyl(0.04, 0.04, 0.18, -0.65, 0.96, -2.85, linenTowelWhite, group, 16);
    cyl(0.03, 0.03, 0.12, -0.7, 0.99, -2.4, M('#6b431e', 0.1), group, 16); // amber glass
    cyl(0.035, 0.01, 0.14, -0.7, 1.0, -2.6, clearGlassMat, group, 16); // goblet

    // Wall Niche above tub with warm concealed LED uplight
    box(3.2, 0.7, 0.22, -0.7, 2.1, -4.34, darkBasalt, group);
    box(3.1, 0.03, 0.12, -0.7, 2.42, -4.3, warmLedCove, group);
    // Luxury apothecary bottles in niche
    cyl(0.045, 0.045, 0.26, -1.8, 1.88, -4.3, M('#754a2a', 0.1), group, 16);
    cyl(0.05, 0.05, 0.3, -1.55, 1.9, -4.3, M('#2b3d30', 0.1), group, 16);
    cyl(0.04, 0.04, 0.2, -1.3, 1.85, -4.3, matteWhiteCeramic, group, 16);
    box(0.18, 0.14, 0.18, 0.2, 1.84, -4.3, linenTowelWhite, group);

    // ── 5. SURFACE 2: Bookmatched Shower Feature Wall (`bath_shower_wall`) ──
    const showerWallGeo = new THREE.BoxGeometry(0.22, 3.85, 4.4);
    const showerWallMat = M('#f0eae1', 0.15, 0.05);
    const bathShowerWall = new THREE.Mesh(showerWallGeo, [
      showerWallMat, showerWallMat, showerWallMat, showerWallMat, showerWallMat, showerWallMat
    ]);
    bathShowerWall.position.set(-4.88, 1.95, -2.15);
    bathShowerWall.castShadow = true;
    bathShowerWall.receiveShadow = true;
    group.add(bathShowerWall);

    // Recessed vertical warm LED channel in shower wall
    box(0.04, 3.6, 0.04, -4.75, 1.95, -0.1, warmLedCove, group);
    box(0.04, 3.6, 0.04, -4.75, 1.95, -4.1, warmLedCove, group);

    // Walk-in Shower Floor (Recessed stone shower pan)
    box(2.2, 0.04, 4.1, -3.75, 0.022, -2.15, M('#25272a', 0.55), group);
    // Polished Brass linear shower trench drain
    box(0.1, 0.015, 1.8, -4.6, 0.045, -2.15, brushedGoldMat, group);

    // Frameless Glass Enclosure & Brushed Gold Structural Hardware
    // Fixed glass panel
    box(0.02, 2.8, 2.6, -2.65, 1.42, -2.45, clearGlassMat, group);
    // Brushed gold header stabilizing bar & wall clamps
    box(0.035, 0.035, 2.6, -2.65, 2.82, -2.45, brushedGoldMat, group);
    box(2.2, 0.035, 0.035, -3.75, 2.82, -1.15, brushedGoldMat, group);
    box(0.04, 0.08, 0.04, -2.65, 0.08, -1.2, brushedGoldMat, group);
    box(0.04, 0.08, 0.04, -2.65, 0.08, -3.7, brushedGoldMat, group);

    // Ceiling-Mounted Oversized 400mm Rain Shower Head (Brushed Gold)
    cyl(0.02, 0.02, 0.45, -3.8, 3.6, -2.2, brushedGoldMat, group, 16);
    cyl(0.22, 0.22, 0.025, -3.8, 3.38, -2.2, brushedGoldMat, group, 32);
    // Thermostatic valve panel on shower feature wall
    box(0.02, 0.65, 0.16, -4.75, 1.25, -2.2, brushedGoldMat, group);
    cyl(0.03, 0.03, 0.04, -4.72, 1.45, -2.2, brushedGoldMat, group, 16);
    cyl(0.03, 0.03, 0.04, -4.72, 1.25, -2.2, brushedGoldMat, group, 16);
    cyl(0.03, 0.03, 0.04, -4.72, 1.05, -2.2, brushedGoldMat, group, 16);
    // Handheld shower wand on hose
    cyl(0.014, 0.014, 0.24, -4.72, 1.35, -1.95, brushedGoldMat, group, 16);

    // Floating Teak Shower Bench inside enclosure
    box(0.48, 0.06, 1.2, -4.5, 0.46, -3.5, darkOakMat, group);
    cyl(0.025, 0.025, 0.44, -4.3, 0.23, -3.0, brushedGoldMat, group, 16);
    cyl(0.025, 0.025, 0.44, -4.3, 0.23, -4.0, brushedGoldMat, group, 16);

    // ── 6. SURFACE 3: Floating Double Vanity Countertop (`bath_vanity`) ──
    // Fluted dark smoked oak vanity carcass
    box(0.88, 0.54, 3.6, 4.35, 0.58, 0.9, darkOakMat, group);
    // Vertical fluted slats across vanity front
    for (let si = 0; si < 24; si++) {
      box(0.018, 0.52, 0.03, 3.9, 0.58, -0.8 + si * 0.145, darkOakMat, group);
    }
    // Brushed gold shadowline spacer reveal between drawers & top
    box(0.84, 0.025, 3.56, 4.35, 0.86, 0.9, brushedGoldMat, group);
    // Floating LED under-vanity floor glow
    box(0.7, 0.02, 3.4, 4.35, 0.28, 0.9, warmLedCove, group);

    // Monolithic Stone Vanity Countertop with bullnose edge
    const vanityTopGeo = new THREE.BoxGeometry(0.96, 0.09, 3.75);
    const vanityTopMat = M('#f2eee7', 0.14, 0.04);
    const bathVanity = new THREE.Mesh(vanityTopGeo, [
      vanityTopMat, vanityTopMat, vanityTopMat, vanityTopMat, vanityTopMat, vanityTopMat
    ]);
    bathVanity.position.set(4.35, 0.91, 0.9);
    bathVanity.castShadow = true;
    bathVanity.receiveShadow = true;
    group.add(bathVanity);

    // Dual Undermount White Ceramic Rectangular Basins
    [-0.05, 1.75].forEach(zPos => {
      // Basin rim & bowl
      box(0.56, 0.16, 0.82, 4.35, 0.91, zPos, matteWhiteCeramic, group);
      const basinInner = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.15, 0.74), M('#ffffff', 0.06));
      basinInner.position.set(4.35, 0.93, zPos);
      group.add(basinInner);
      // Gold pop-up clicker drain
      cyl(0.035, 0.035, 0.01, 4.35, 0.87, zPos, brushedGoldMat, group, 16);

      // Deck-Mounted Brushed Gold Gooseneck Faucets
      cyl(0.022, 0.022, 0.36, 4.68, 1.14, zPos, brushedGoldMat, group, 18);
      // Faucet spout curve
      box(0.24, 0.03, 0.03, 4.54, 1.31, zPos, brushedGoldMat, group);
      cyl(0.018, 0.018, 0.08, 4.42, 1.26, zPos, brushedGoldMat, group, 16);
      // Dual minimal cross control handles
      cyl(0.025, 0.025, 0.06, 4.68, 1.0, zPos - 0.18, brushedGoldMat, group, 16);
      cyl(0.025, 0.025, 0.06, 4.68, 1.0, zPos + 0.18, brushedGoldMat, group, 16);

      // Giant Illuminated Halo Mirror above each basin
      const mirrorGlass = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.58, 0.02, 48), mirrorReflectiveMat);
      mirrorGlass.rotation.z = Math.PI / 2;
      mirrorGlass.position.set(4.78, 2.2, zPos);
      group.add(mirrorGlass);
      // Brushed gold mirror frame rim
      const mirrorRim = new THREE.Mesh(new THREE.CylinderGeometry(0.60, 0.60, 0.025, 48), brushedGoldMat);
      mirrorRim.rotation.z = Math.PI / 2;
      mirrorRim.position.set(4.79, 2.2, zPos);
      group.add(mirrorRim);
      // Warm backlit LED halo ring
      const haloLight = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.012, 48), warmLedCove);
      haloLight.rotation.z = Math.PI / 2;
      haloLight.position.set(4.81, 2.2, zPos);
      group.add(haloLight);
    });

    // Vanity Countertop Luxury Accessories
    // Amber glass pump soap dispensers
    cyl(0.032, 0.032, 0.16, 4.62, 1.04, 0.55, M('#754a2a', 0.1), group, 16);
    cyl(0.032, 0.032, 0.16, 4.62, 1.04, 1.15, M('#754a2a', 0.1), group, 16);
    // Rolled linen guest towels in a brushed gold tray
    box(0.24, 0.03, 0.36, 4.4, 0.97, 0.85, brushedGoldMat, group);
    cyl(0.03, 0.03, 0.3, 4.4, 1.01, 0.8, linenTowelWhite, group, 16);
    cyl(0.03, 0.03, 0.3, 4.4, 1.01, 0.9, linenTowelCharcoal, group, 16);

    // ── 7. Architectural Accents: WC Partition, Heated Towel Ladder, Planter ──
    // Frosted Fluted Glass WC Privacy Partition Wall
    box(0.04, 2.9, 1.8, 3.8, 1.45, -2.8, frostedGlassMat, group);
    box(0.06, 2.95, 0.04, 3.8, 1.48, -1.9, darkBasalt, group);
    box(0.06, 0.04, 1.8, 3.8, 2.92, -2.8, darkBasalt, group);

    // Matte White Wall-Hung Rimless Toilet (behind partition)
    box(0.38, 0.38, 0.56, 4.45, 0.42, -2.8, matteWhiteCeramic, group);
    // Toilet lid with soft contour
    box(0.36, 0.03, 0.54, 4.45, 0.62, -2.8, matteWhiteCeramic, group);
    // Brushed gold dual-flush actuator plate on wall
    box(0.015, 0.16, 0.24, 4.78, 1.1, -2.8, brushedGoldMat, group);
    cyl(0.025, 0.025, 0.01, 4.77, 1.1, -2.84, brushedGoldMat, group, 16);
    cyl(0.018, 0.018, 0.01, 4.77, 1.1, -2.76, brushedGoldMat, group, 16);

    // Architectural Heated Towel Ladder (Brushed Gold)
    cyl(0.018, 0.018, 1.9, 4.65, 1.5, -1.5, brushedGoldMat, group, 16);
    cyl(0.018, 0.018, 1.9, 4.65, 1.5, -0.9, brushedGoldMat, group, 16);
    for (let ri = 0; ri < 6; ri++) {
      cyl(0.012, 0.012, 0.6, 4.65, 0.75 + ri * 0.3, -1.2, brushedGoldMat, group, 16);
      if (ri === 3) {
        // Draped plush bath sheet
        box(0.12, 0.52, 0.48, 4.6, 1.5, -1.2, linenTowelWhite, group);
      }
    }

    // Fluted Cast Stone Planter with Lush Tropical Plant
    cyl(0.28, 0.22, 0.65, -2.5, 0.34, 2.6, M('#d8d4cb', 0.5), group, 24);
    // Tall architectural plant leaves
    for (let li = 0; li < 9; li++) {
      const angle = (li / 9) * Math.PI * 2;
      const leafMesh = new THREE.Mesh(new THREE.ConeGeometry(0.16, 1.1, 7), lushGreenLeaf);
      leafMesh.position.set(-2.5 + Math.sin(angle) * 0.14, 0.9 + (li % 3) * 0.12, 2.6 + Math.cos(angle) * 0.14);
      leafMesh.rotation.x = Math.sin(angle) * 0.35;
      leafMesh.rotation.z = Math.cos(angle) * 0.35;
      leafMesh.castShadow = true;
      group.add(leafMesh);
    }
    // Planter ground uplight
    const planterLight = new THREE.PointLight(0xffeedd, 0.9, 3.5);
    planterLight.position.set(-2.5, 0.7, 2.6);
    group.add(planterLight);

    // ── 8. Surface Registration (All 4 Customizable Surfaces) ──
    // Surface 1: Bathroom Floor (Multi-tile large format or grand slab)
    reg('bathroom', 'bath_floor', 'Bathroom Floor', bathFloor, null, 10.0, 8.8);
    // Surface 2: Shower Feature Wall (Monolithic bookmatched stone or slab)
    reg('bathroom', 'bath_shower_wall', 'Shower Wall', bathShowerWall, null, 4.4, 3.85);
    // Surface 3: Vanity Countertop (Floating stone slab with bullnose edge)
    reg('bathroom', 'bath_vanity', 'Vanity Countertop', bathVanity, null, 3.75, 0.96);
    // Surface 4: Bathtub Podium Surround (Raised stone spa platform)
    reg('bathroom', 'bath_tub_deck', 'Tub Podium Surround', bathTubDeck, null, 3.1, 2.3);

    // ── 9. Five Cinematic Camera Presets ──
    ROOM_CAMERAS.bathroom = {
      type: 'three',
      title: 'Master Bathroom Suite & Spa (3D WebGL)',
      subtitle: '• Monolithic Stone Vanity, Soaking Tub & Walk-In Rain Shower',
      hint: '<span class="text-[#E7C887] font-semibold">💡 Master Spa Studio:</span> Customize <b>Bathroom Floor</b>, <b>Shower Feature Wall</b>, <b>Vanity Countertop</b>, or <b>Tub Podium</b> with natural marble, granite & PGVT tiles in real-time 3D.',
      defaultCam: 'bath_front',
      cameras: [
        { id: 'bath_front', label: '🛁 Spa Overview', azimuth: 0.05, elevation: 0.22, distance: 7.2, target: [0, 1.3, -1.0] },
        { id: 'vanity', label: '🪞 Double Vanity Suite', azimuth: Math.PI * 1.55, elevation: 0.18, distance: 3.6, target: [4.35, 1.3, 0.9] },
        { id: 'shower', label: '🚿 Walk-In Rain Shower', azimuth: Math.PI * 0.26, elevation: 0.20, distance: 3.9, target: [-3.8, 1.6, -2.2] },
        { id: 'tub', label: '🫧 Sculptural Soaking Tub', azimuth: Math.PI * 0.03, elevation: 0.28, distance: 3.4, target: [-0.7, 0.7, -2.6] },
        { id: 'floor', label: '🧱 Grand Floor & Reflection', azimuth: Math.PI * 0.10, elevation: 0.14, distance: 6.2, target: [-0.2, 0.2, -1.2] }
      ]
    };

    // ── 10. Default Showroom Stone Slabs Setup ──
    const bathFloorStone = showroomSlabs.find(s => s.name === 'River White') || showroomSlabs.find(s => s.name === 'Alaska White') || presets[0];
    const bathShowerStone = showroomSlabs.find(s => s.name === 'Emerald Onyx Marble') || showroomSlabs.find(s => s.name === 'Calacatta White') || presets[0];
    const bathVanityStone = showroomSlabs.find(s => s.name === 'Titanium Black') || showroomSlabs.find(s => s.name === 'Black Pearl') || presets[1] || presets[0];
    const bathTubDeckStone = showroomSlabs.find(s => s.name === 'Statuario') || showroomSlabs.find(s => s.name === 'Banswara Marble') || presets[0];

    if (roomDefs.bathroom) {
      if (roomDefs.bathroom.surfaces.bath_floor) {
        roomDefs.bathroom.surfaces.bath_floor.src = bathFloorStone;
        roomDefs.bathroom.surfaces.bath_floor.set = { struct: 'tile120', mode: 'repeat', size: 1.2, rot: 0, gloss: 0.88, grout: 1.5 };
      }
      if (roomDefs.bathroom.surfaces.bath_shower_wall) {
        roomDefs.bathroom.surfaces.bath_shower_wall.src = bathShowerStone;
        roomDefs.bathroom.surfaces.bath_shower_wall.set = { struct: 'slab', mode: 'mirror', size: 2.4, rot: 0, gloss: 0.95, grout: 1.0 };
      }
      if (roomDefs.bathroom.surfaces.bath_vanity) {
        roomDefs.bathroom.surfaces.bath_vanity.src = bathVanityStone;
        roomDefs.bathroom.surfaces.bath_vanity.set = { struct: 'slab', mode: 'mirror', size: 2.2, rot: 0, gloss: 0.94, grout: 1.0 };
      }
      if (roomDefs.bathroom.surfaces.bath_tub_deck) {
        roomDefs.bathroom.surfaces.bath_tub_deck.src = bathTubDeckStone;
        roomDefs.bathroom.surfaces.bath_tub_deck.set = { struct: 'slab', mode: 'mirror', size: 2.0, rot: 0, gloss: 0.92, grout: 1.0 };
      }
    }

    // Real-time subtle light breathing animator
    window.WebGlAnimators = window.WebGlAnimators || [];
    window.WebGlAnimators.push(() => {
      const t = Date.now() * 0.0015;
      if (vanitySconceLeft && vanitySconceRight) {
        const pulse = 1.35 + Math.sin(t * 1.8) * 0.08;
        vanitySconceLeft.intensity = pulse;
        vanitySconceRight.intensity = pulse;
      }
      if (tubWater) {
        tubWater.position.y = 0.22 + Math.sin(t * 2.2) * 0.003;
      }
    });
  };

})(window);
