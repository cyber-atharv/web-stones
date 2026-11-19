/**
 * Murali Granites & Marbles — Executive Home Bar & Cigar Lounge 3D WebGL Room
 * Modular Architectural Lounge with Monolithic Waterfall Island, Backlit Onyx Wall,
 * Floating Glass Liquor Shelving, Leather Stools, Cigar Station, and 4 Customizable Surfaces.
 */
(function (window) {
  'use strict';

  window.WebGlRooms = window.WebGlRooms || {};

  window.WebGlRooms.bar = function (ctx) {
    const { THREE, group, reg, roomDefs, ROOM_CAMERAS, core, showroomSlabs, presets } = ctx;
    const { M, box, cyl, sbox, plant, createWoodTexture } = core;

    // ── Architectural & Speakeasy Lounge Materials ──
    const satinBrassMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.92,
      roughness: 0.16
    });

    const antiqueBronzeMat = new THREE.MeshStandardMaterial({
      color: 0x5a442a,
      metalness: 0.85,
      roughness: 0.32
    });

    const walnutWoodMat = createWoodTexture
      ? new THREE.MeshStandardMaterial({ map: createWoodTexture(4, '#2c1e14'), roughness: 0.35, metalness: 0.04 })
      : new THREE.MeshStandardMaterial({ color: 0x22170f, roughness: 0.38 });

    const flutedCharcoalWood = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.55,
      metalness: 0.08
    });

    const saddleBrownLeather = new THREE.MeshStandardMaterial({
      color: 0x54321c,
      roughness: 0.42,
      metalness: 0.05
    });

    const smokedMirrorMat = new THREE.MeshStandardMaterial({
      color: 0x222226,
      metalness: 0.96,
      roughness: 0.04
    });

    const crystalGlassMat = new THREE.MeshStandardMaterial({
      color: 0xd8eaf4,
      transparent: true,
      opacity: 0.34,
      roughness: 0.03,
      metalness: 0.15
    });

    const backlitOnyxGlow = new THREE.MeshStandardMaterial({
      color: 0xffe4b5,
      emissive: new THREE.Color(0xffa834),
      emissiveIntensity: 1.6,
      roughness: 0.35
    });

    const warmShelfLed = new THREE.MeshStandardMaterial({
      color: 0xffeed4,
      emissive: new THREE.Color(0xffc566),
      emissiveIntensity: 2.2,
      roughness: 0.2
    });

    const amberSpiritsLiquid = new THREE.MeshStandardMaterial({
      color: 0xa85c18,
      transparent: true,
      opacity: 0.85,
      roughness: 0.1
    });

    const emeraldGinLiquid = new THREE.MeshStandardMaterial({
      color: 0x1c4e36,
      transparent: true,
      opacity: 0.85,
      roughness: 0.1
    });

    const softPlasterWall = new THREE.MeshStandardMaterial({
      color: 0x242428,
      roughness: 0.90,
      metalness: 0.04
    });

    // ── 1. Architectural Lighting Setup (Moody Speakeasy Illumination) ──
    const mainSun = new THREE.DirectionalLight(0xffdfb8, 2.4);
    mainSun.position.set(-5, 9.5, 5);
    mainSun.castShadow = true;
    mainSun.shadow.mapSize.set(2048, 2048);
    mainSun.shadow.bias = -0.0003;
    mainSun.shadow.radius = 2.0;
    group.add(mainSun);

    const warmAmbientFill = new THREE.DirectionalLight(0xffbe7a, 1.2);
    warmAmbientFill.position.set(5, 7.0, -2);
    group.add(warmAmbientFill);

    // Dynamic Back-Bar glowing point lights
    const barShelfGlow1 = new THREE.PointLight(0xffb048, 2.2, 5.5, 1.4);
    barShelfGlow1.position.set(0, 1.85, -3.8);
    group.add(barShelfGlow1);

    const barShelfGlow2 = new THREE.PointLight(0xffb048, 2.2, 5.5, 1.4);
    barShelfGlow2.position.set(0, 2.65, -3.8);
    group.add(barShelfGlow2);

    const barCounterGlow = new THREE.PointLight(0xffd280, 1.8, 5.0, 1.3);
    barCounterGlow.position.set(0, 0.95, 0.4);
    group.add(barCounterGlow);

    const islandSpotCenter = new THREE.SpotLight(0xffeedd, 2.4, 8, Math.PI / 4, 0.35, 1.2);
    islandSpotCenter.position.set(0, 3.8, 0.0);
    islandSpotCenter.target.position.set(0, 1.0, 0.0);
    group.add(islandSpotCenter);
    group.add(islandSpotCenter.target);

    // ── 2. Lounge Room Shell (Perimeter Soffits, Dark Walnut Paneling) ──
    // Perimeter Ceiling Soffit Frame (Open center so camera never gets occluded)
    box(11.2, 0.28, 1.3, 0, 3.88, -3.85, softPlasterWall, group); // Back soffit
    box(1.3, 0.28, 8.4, -4.95, 3.88, 0, softPlasterWall, group);  // Left soffit
    box(1.3, 0.28, 8.4, 4.95, 3.88, 0, softPlasterWall, group);   // Right soffit
    // Perimeter warm golden LED cove lighting
    box(9.2, 0.04, 0.04, 0, 3.74, -3.22, warmShelfLed, group);
    box(0.04, 0.04, 7.4, -4.32, 3.74, 0, warmShelfLed, group);
    box(0.04, 0.04, 7.4, 4.32, 3.74, 0, warmShelfLed, group);

    // Back Main Wall
    box(11.2, 3.9, 0.25, 0, 1.95, -4.45, softPlasterWall, group);

    // Left & Right Lounge Walls with Acoustic Walnut Fluted Slats
    box(0.25, 3.9, 9.6, -5.45, 1.95, 0, softPlasterWall, group);
    box(0.25, 3.9, 9.6, 5.45, 1.95, 0, softPlasterWall, group);
    // Vertical fluted acoustic walnut slats on side walls
    [-5.3, 5.3].forEach(wx => {
      for (let si = 0; si < 22; si++) {
        box(0.03, 3.6, 0.08, wx, 1.9, -3.8 + si * 0.36, walnutWoodMat, group);
      }
    });

    // ── 3. SURFACE 1: High-Gloss Dark Marble Lounge Floor (`bar_floor`) ──
    const barFloorGeo = new THREE.PlaneGeometry(10.8, 9.6);
    const barFloorMat = M('#19181a', 0.16, 0.08);
    const barFloor = new THREE.Mesh(barFloorGeo, barFloorMat);
    barFloor.rotation.x = -Math.PI / 2;
    barFloor.position.set(0, 0.02, 0);
    barFloor.receiveShadow = true;
    group.add(barFloor);

    // Laser-Cut Satin Brass Dividing Grid Stringlines on Floor
    box(10.0, 0.005, 0.035, 0, 0.025, -4.1, satinBrassMat, group);
    box(10.0, 0.005, 0.035, 0, 0.025, 4.1, satinBrassMat, group);
    box(0.035, 0.005, 8.2, -4.9, 0.025, 0, satinBrassMat, group);
    box(0.035, 0.005, 8.2, 4.9, 0.025, 0, satinBrassMat, group);
    // Transverse brass accent stringline in front of barstools
    box(8.4, 0.004, 0.02, 0, 0.026, 2.2, satinBrassMat, group);

    // ── 4. SURFACE 2: Back-Bar Feature Cladding Wall (`bar_back_slab`) ──
    // Monumental 6.8m x 3.3m Bookmatched Stone Feature Wall
    const backSlabGeo = new THREE.BoxGeometry(6.8, 3.3, 0.16);
    const backSlabMat = M('#1e2024', 0.14, 0.06);
    const barBackSlab = new THREE.Mesh(backSlabGeo, [
      backSlabMat, backSlabMat, backSlabMat, backSlabMat, backSlabMat, backSlabMat
    ]);
    barBackSlab.position.set(0, 2.15, -4.3);
    barBackSlab.castShadow = true;
    barBackSlab.receiveShadow = true;
    group.add(barBackSlab);

    // Smoked Mirror Pilasters flanking the Back-Bar
    box(1.2, 3.4, 0.08, -3.9, 2.15, -4.26, smokedMirrorMat, group);
    box(1.2, 3.4, 0.08, 3.9, 2.15, -4.26, smokedMirrorMat, group);
    // Satin Brass Vertical Accent Trim
    box(0.04, 3.4, 0.08, -3.3, 2.15, -4.22, satinBrassMat, group);
    box(0.04, 3.4, 0.08, 3.3, 2.15, -4.22, satinBrassMat, group);

    // ── 5. SURFACE 3: Back-Bar Prep Countertop / Credenza (`bar_prep_counter`) ──
    // Lower back-bar cabinetry carcass in dark smoked walnut
    box(6.4, 0.88, 0.72, 0, 0.44, -3.94, flutedCharcoalWood, group);
    // Satin brass kick-plate and shadowline reveals
    box(6.42, 0.08, 0.74, 0, 0.04, -3.94, satinBrassMat, group);
    box(6.42, 0.025, 0.74, 0, 0.88, -3.94, satinBrassMat, group);

    // Solid Stone Back-Bar Prep Worktop
    const prepTopGeo = new THREE.BoxGeometry(6.5, 0.08, 0.76);
    const prepTopMat = M('#202226', 0.15, 0.05);
    const barPrepCounter = new THREE.Mesh(prepTopGeo, [
      prepTopMat, prepTopMat, prepTopMat, prepTopMat, prepTopMat, prepTopMat
    ]);
    barPrepCounter.position.set(0, 0.92, -3.94);
    barPrepCounter.castShadow = true;
    barPrepCounter.receiveShadow = true;
    group.add(barPrepCounter);

    // Undercounter Dual-Zone Wine Refrigerator (Center section with tinted glass doors)
    box(1.8, 0.82, 0.04, 0, 0.44, -3.56, crystalGlassMat, group);
    box(0.03, 0.82, 0.04, 0, 0.44, -3.55, satinBrassMat, group);
    // Interior illuminated wine bottle racks
    for (let wi = 0; wi < 3; wi++) {
      box(1.6, 0.02, 0.45, 0, 0.22 + wi * 0.24, -3.8, satinBrassMat, group);
      box(1.5, 0.015, 0.02, 0, 0.23 + wi * 0.24, -3.6, warmShelfLed, group);
    }

    // ── 6. Floating Glass & Brass Liquor Shelving Suite ──
    const shelfHeights = [1.55, 2.15, 2.75];
    shelfHeights.forEach(sy => {
      // Tempered heavy architectural glass shelf
      box(6.2, 0.025, 0.38, 0, sy, -4.05, crystalGlassMat, group);
      // Front satin brass channel with concealed warm LED strip
      box(6.22, 0.04, 0.04, 0, sy, -3.86, satinBrassMat, group);
      box(6.18, 0.015, 0.015, 0, sy - 0.015, -3.88, warmShelfLed, group);
      // Wall mounting brass brackets
      [-2.6, -1.2, 0, 1.2, 2.6].forEach(bx => {
        box(0.04, 0.08, 0.38, bx, sy - 0.03, -4.05, satinBrassMat, group);
      });
    });

    // Top-Shelf Curated Spirits Collection & Crystal Decanters
    const liquorPositions = [
      { x: -2.4, y: 1.6, color: amberSpiritsLiquid, shape: 'decanter' },
      { x: -2.0, y: 1.6, color: amberSpiritsLiquid, shape: 'bottle' },
      { x: -1.6, y: 1.6, color: emeraldGinLiquid, shape: 'gin' },
      { x: -1.1, y: 1.6, color: crystalGlassMat, shape: 'vodka' },
      { x: 1.1, y: 1.6, color: amberSpiritsLiquid, shape: 'bottle' },
      { x: 1.6, y: 1.6, color: emeraldGinLiquid, shape: 'gin' },
      { x: 2.0, y: 1.6, color: amberSpiritsLiquid, shape: 'decanter' },
      { x: 2.4, y: 1.6, color: amberSpiritsLiquid, shape: 'bottle' },

      { x: -2.2, y: 2.2, color: amberSpiritsLiquid, shape: 'bottle' },
      { x: -1.8, y: 2.2, color: amberSpiritsLiquid, shape: 'decanter' },
      { x: -1.3, y: 2.2, color: emeraldGinLiquid, shape: 'gin' },
      { x: 1.3, y: 2.2, color: crystalGlassMat, shape: 'vodka' },
      { x: 1.8, y: 2.2, color: amberSpiritsLiquid, shape: 'decanter' },
      { x: 2.2, y: 2.2, color: amberSpiritsLiquid, shape: 'bottle' },

      { x: -1.5, y: 2.8, color: crystalGlassMat, shape: 'vodka' },
      { x: -1.0, y: 2.8, color: amberSpiritsLiquid, shape: 'decanter' },
      { x: 1.0, y: 2.8, color: amberSpiritsLiquid, shape: 'decanter' },
      { x: 1.5, y: 2.8, color: emeraldGinLiquid, shape: 'gin' }
    ];

    liquorPositions.forEach(liq => {
      if (liq.shape === 'decanter') {
        // Heavy square crystal whiskey decanter
        box(0.12, 0.22, 0.12, liq.x, liq.y + 0.12, -4.05, liq.color, group);
        cyl(0.035, 0.035, 0.05, liq.x, liq.y + 0.25, -4.05, crystalGlassMat, group, 16);
        // Crystal faceted stopper
        cyl(0.045, 0.02, 0.05, liq.x, liq.y + 0.29, -4.05, crystalGlassMat, group, 12);
      } else if (liq.shape === 'gin') {
        // Emerald tall rectangular gin bottle
        box(0.11, 0.26, 0.09, liq.x, liq.y + 0.14, -4.05, liq.color, group);
        cyl(0.02, 0.02, 0.06, liq.x, liq.y + 0.29, -4.05, satinBrassMat, group, 16);
      } else {
        // Cylindrical bourbon / scotch bottle
        cyl(0.05, 0.05, 0.26, liq.x, liq.y + 0.14, -4.05, liq.color, group, 18);
        cyl(0.02, 0.02, 0.07, liq.x, liq.y + 0.29, -4.05, satinBrassMat, group, 16);
      }
    });

    // ── 7. Floating Ceiling Stemware Rack with Crystal Wine Glasses ──
    const stemwareFrame = new THREE.Group();
    stemwareFrame.position.set(0, 3.2, -1.2);
    // Suspended brass frame rods from ceiling
    [-1.8, 1.8].forEach(sx => {
      [-0.25, 0.25].forEach(sz => {
        cyl(0.012, 0.012, 0.65, sx, 0.35, sz, satinBrassMat, stemwareFrame, 12);
      });
    });
    // Horizontal brass rack rails
    box(3.8, 0.03, 0.6, 0, 0.0, 0, satinBrassMat, stemwareFrame);
    // Inverted suspended crystal wine glasses
    for (let gi = 0; gi < 8; gi++) {
      const gx = -1.4 + gi * 0.4;
      cyl(0.045, 0.01, 0.12, gx, -0.06, 0, crystalGlassMat, stemwareFrame, 16);
      cyl(0.005, 0.005, 0.08, gx, 0.02, 0, crystalGlassMat, stemwareFrame, 8);
    }
    group.add(stemwareFrame);

    // ── 8. SURFACE 4: Monolithic Waterfall Bar Island (`bar_island_top`) ──
    // Fluted dark smoked walnut carcass
    box(4.5, 0.94, 1.35, 0, 0.47, 0.0, flutedCharcoalWood, group);
    // Backlit Translucent Onyx Front Fascia Panel with warm internal glow
    const onyxFront = box(4.4, 0.72, 0.03, 0, 0.48, 0.7, backlitOnyxGlow, group);
    box(4.44, 0.03, 0.04, 0, 0.85, 0.71, satinBrassMat, group);
    box(4.44, 0.03, 0.04, 0, 0.11, 0.71, satinBrassMat, group);

    // Monolithic Stone Bar Island Top Slab (Customizable in 3D)
    const barTopGeo = new THREE.BoxGeometry(4.88, 0.09, 1.58);
    const barTopMat = M('#1c1c1f', 0.14, 0.06);
    const barIslandTop = new THREE.Mesh(barTopGeo, [
      barTopMat, barTopMat, barTopMat, barTopMat, barTopMat, barTopMat
    ]);
    barIslandTop.position.set(0, 0.98, 0.0);
    barIslandTop.castShadow = true;
    barIslandTop.receiveShadow = true;
    group.add(barIslandTop);

    // Left Waterfall Drop Leg (Continuity of the slab dropping to floor)
    const dropGeo = new THREE.BoxGeometry(0.09, 0.98, 1.58);
    const barIslandLeftDrop = new THREE.Mesh(dropGeo, [
      barTopMat, barTopMat, barTopMat, barTopMat, barTopMat, barTopMat
    ]);
    barIslandLeftDrop.position.set(-2.44, 0.49, 0.0);
    barIslandLeftDrop.castShadow = true;
    barIslandLeftDrop.receiveShadow = true;
    group.add(barIslandLeftDrop);

    // Right Waterfall Drop Leg
    const barIslandRightDrop = new THREE.Mesh(dropGeo, [
      barTopMat, barTopMat, barTopMat, barTopMat, barTopMat, barTopMat
    ]);
    barIslandRightDrop.position.set(2.44, 0.49, 0.0);
    barIslandRightDrop.castShadow = true;
    barIslandRightDrop.receiveShadow = true;
    group.add(barIslandRightDrop);

    // Integrated Cocktail Prep Station (Sunken brass ice well & speed rail)
    box(0.72, 0.22, 0.48, -1.2, 0.92, -0.22, satinBrassMat, group);
    // Gooseneck satin brass cocktail mixer tap
    cyl(0.016, 0.016, 0.32, -1.2, 1.15, -0.42, satinBrassMat, group, 16);
    box(0.18, 0.025, 0.025, -1.2, 1.3, -0.34, satinBrassMat, group);
    cyl(0.012, 0.012, 0.06, -1.2, 1.26, -0.26, satinBrassMat, group, 12);
    // Cocktail Boston shaker & strainer
    cyl(0.042, 0.035, 0.18, -0.75, 1.08, -0.2, satinBrassMat, group, 16);
    cyl(0.038, 0.032, 0.14, -0.62, 1.06, -0.2, antiqueBronzeMat, group, 16);

    // Heavy-Duty Polished Brass Footrail along front of bar island
    const barFootrail = cyl(0.028, 0.028, 4.4, 0, 0.18, 0.96, satinBrassMat, group, 20);
    barFootrail.rotation.z = Math.PI / 2;
    // Heavy brass wall mounting brackets
    [-1.9, -0.95, 0, 0.95, 1.9].forEach(bx => {
      box(0.04, 0.04, 0.22, bx, 0.18, 0.85, satinBrassMat, group);
    });

    // ── 9. Designer Leather & Brass High Barstools ──
    for (let bsi = 0; bsi < 4; bsi++) {
      const bx = -1.65 + bsi * 1.1;
      const bz = 1.48;
      // Heavy circular brass base
      cyl(0.24, 0.24, 0.025, bx, 0.02, bz, satinBrassMat, group, 24);
      // Central brass column
      cyl(0.028, 0.028, 0.68, bx, 0.36, bz, satinBrassMat, group, 16);
      // Stool circular foot ring
      const footRing = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.014, 12, 24), satinBrassMat);
      footRing.rotation.x = Math.PI / 2;
      footRing.position.set(bx, 0.28, bz);
      group.add(footRing);
      // Plush Saddle Brown Leather Swivel Seat
      const seat = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.22, 0.10, 24), saddleBrownLeather);
      seat.position.set(bx, 0.73, bz);
      seat.castShadow = true;
      group.add(seat);
      // Curved low-profile leather lumbar backrest
      const backrest = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.14, 24, 1, true, 0, Math.PI), saddleBrownLeather);
      backrest.position.set(bx, 0.84, bz + 0.06);
      backrest.rotation.y = -Math.PI / 2;
      group.add(backrest);
      // Brass backrest support bracket
      box(0.04, 0.18, 0.03, bx, 0.78, bz + 0.18, satinBrassMat, group);
    }

    // ── 10. Cigar Tasting Station & Accessories on Island Top ──
    // Spanish Cedar Cigar Humidor Box
    box(0.38, 0.14, 0.26, 1.6, 1.06, -0.05, walnutWoodMat, group);
    box(0.39, 0.02, 0.27, 1.6, 1.14, -0.05, satinBrassMat, group); // gold trim lid
    // Crystal cut-glass rock tumblers with amber whiskey
    cyl(0.04, 0.038, 0.09, 1.15, 1.04, 0.15, crystalGlassMat, group, 16);
    cyl(0.035, 0.035, 0.04, 1.15, 1.02, 0.15, amberSpiritsLiquid, group, 16);
    cyl(0.04, 0.038, 0.09, 0.85, 1.04, 0.10, crystalGlassMat, group, 16);
    cyl(0.035, 0.035, 0.04, 0.85, 1.02, 0.10, amberSpiritsLiquid, group, 16);
    // Polished Brass Ashtray with Cuban Cigar
    cyl(0.09, 0.09, 0.025, 1.25, 1.02, -0.15, satinBrassMat, group, 20);
    cyl(0.012, 0.012, 0.14, 1.22, 1.04, -0.15, M('#3b2314', 0.6), group, 12); // cigar

    // ── 11. Trio of Smoked Fluted Glass Pendant Chandelier Lights ──
    for (let pi = 0; pi < 3; pi++) {
      const px = -1.5 + pi * 1.5;
      // Woven suspension cable
      cyl(0.005, 0.005, 1.3, px, 3.2, 0.0, flutedCharcoalWood, group, 8);
      // Brass fixture canopy & cap
      cyl(0.05, 0.05, 0.04, px, 2.58, 0.0, satinBrassMat, group, 16);
      // Fluted smoked glass cylinder shade
      const shade = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.36, 24), crystalGlassMat);
      shade.position.set(px, 2.38, 0.0);
      group.add(shade);
      // Internal warm filament bulb
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 12), warmShelfLed);
      bulb.position.set(px, 2.38, 0.0);
      group.add(bulb);
    }

    // ── 12. Cast Bronze Planter with Architectural Greenery ──
    cyl(0.28, 0.22, 0.65, -3.8, 0.34, 1.8, antiqueBronzeMat, group, 24);
    // Tall Sansevieria snake plant upright leaves
    for (let li = 0; li < 9; li++) {
      const lAngle = (li / 9) * Math.PI * 2;
      const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.08, 1.1, 4), M('#243d22', 0.35));
      leaf.position.set(-3.8 + Math.sin(lAngle) * 0.12, 0.9 + (li % 3) * 0.1, 1.8 + Math.cos(lAngle) * 0.12);
      leaf.rotation.x = Math.sin(lAngle) * 0.18;
      leaf.rotation.z = Math.cos(lAngle) * 0.18;
      leaf.castShadow = true;
      group.add(leaf);
    }

    // ── 13. Surface Registration (All 4 Customizable Stone Surfaces) ──
    // Surface 1: Waterfall Bar Island (Monolithic top and both waterfall side drop legs)
    reg('bar', 'bar_island_top', 'Waterfall Bar Island Top', barIslandTop, null, 4.88, 1.58);
    reg('bar', 'bar_island_top', 'Waterfall Bar Island Top', barIslandLeftDrop, null, 1.58, 0.98);
    reg('bar', 'bar_island_top', 'Waterfall Bar Island Top', barIslandRightDrop, null, 1.58, 0.98);
    // Surface 2: Back-Bar Feature Cladding Wall (Monumental bookmatched granite / onyx slab)
    reg('bar', 'bar_back_slab', 'Back-Bar Feature Cladding', barBackSlab, null, 6.8, 3.3);
    // Surface 3: Back-Bar Prep Countertop (Credenza worktop)
    reg('bar', 'bar_prep_counter', 'Back-Bar Prep Countertop', barPrepCounter, null, 6.5, 0.76);
    // Surface 4: Lounge Marble Floor (Dark high-gloss marble / granite with brass inlays)
    reg('bar', 'bar_floor', 'Lounge Marble Floor', barFloor, null, 10.8, 9.6);

    // ── 14. Five Cinematic Camera Presets ──
    ROOM_CAMERAS.bar = {
      type: 'three',
      title: 'Executive Bar & Cigar Lounge (3D WebGL)',
      subtitle: '• Monolithic Waterfall Island, Backlit Onyx & Stools',
      hint: '<span class="text-[#E7C887] font-semibold">💡 Executive Bar Studio:</span> Customize <b>Waterfall Bar Island</b>, <b>Back-Bar Feature Cladding</b>, <b>Prep Countertop</b>, or <b>Lounge Marble Floor</b> with Titanium Black, Blue in the Night & Emerald Onyx in real-time 3D.',
      defaultCam: 'bar_front',
      cameras: [
        { id: 'bar_front', label: '🍸 Waterfall Bar Overview', azimuth: Math.PI * 0.14, elevation: 0.24, distance: 7.8, target: [0, 1.1, 0.0] },
        { id: 'island', label: '🥃 Bar Counter & Stools', azimuth: Math.PI * 0.34, elevation: 0.22, distance: 5.2, target: [0.2, 0.95, 0.6] },
        { id: 'backbar', label: '🍾 Back-Bar Showcase', azimuth: Math.PI * 0.05, elevation: 0.26, distance: 5.8, target: [0, 1.8, -3.2] },
        { id: 'cigar', label: '🍷 Spirits & Cigar Station', azimuth: Math.PI * 1.64, elevation: 0.22, distance: 3.2, target: [1.3, 1.05, 0.0] },
        { id: 'floor', label: '🧱 Lounge Floor & Inlay', azimuth: Math.PI * 0.10, elevation: 0.12, distance: 6.4, target: [0, 0.2, 0.4] }
      ]
    };

    // ── 15. Default Showroom Slabs Setup ──
    const barIslandStone = showroomSlabs.find(s => s.name === 'Titanium Black') || showroomSlabs.find(s => s.name === 'Black Pearl') || presets[0];
    const barBackStone = showroomSlabs.find(s => s.name === 'Emerald Onyx Marble') || showroomSlabs.find(s => s.name === 'Blue in the Night') || presets[0];
    const barPrepStone = showroomSlabs.find(s => s.name === 'Black Forrest') || showroomSlabs.find(s => s.name === 'Steel Grey') || presets[0];
    const barFloorStone = showroomSlabs.find(s => s.name === 'Armani Gris GVT Matte Tile') || showroomSlabs.find(s => s.name === 'Black Forrest') || presets[0];

    if (roomDefs.bar) {
      if (roomDefs.bar.surfaces.bar_island_top) {
        roomDefs.bar.surfaces.bar_island_top.src = barIslandStone;
        roomDefs.bar.surfaces.bar_island_top.set = { struct: 'slab', mode: 'mirror', size: 2.4, rot: 0, gloss: 0.96, grout: 1.0 };
      }
      if (roomDefs.bar.surfaces.bar_back_slab) {
        roomDefs.bar.surfaces.bar_back_slab.src = barBackStone;
        roomDefs.bar.surfaces.bar_back_slab.set = { struct: 'slab', mode: 'mirror', size: 2.4, rot: 0, gloss: 0.94, grout: 1.0 };
      }
      if (roomDefs.bar.surfaces.bar_prep_counter) {
        roomDefs.bar.surfaces.bar_prep_counter.src = barPrepStone;
        roomDefs.bar.surfaces.bar_prep_counter.set = { struct: 'slab', mode: 'mirror', size: 2.2, rot: 0, gloss: 0.92, grout: 1.0 };
      }
      if (roomDefs.bar.surfaces.bar_floor) {
        roomDefs.bar.surfaces.bar_floor.src = barFloorStone;
        roomDefs.bar.surfaces.bar_floor.set = { struct: 'tile120', mode: 'repeat', size: 1.2, rot: 0, gloss: 0.88, grout: 2.0 };
      }
    }

    // Real-time warm lounge light breathing animation
    window.WebGlAnimators = window.WebGlAnimators || [];
    window.WebGlAnimators.push(() => {
      const t = Date.now() * 0.0018;
      if (barShelfGlow1 && barShelfGlow2) {
        const pulse = 2.2 + Math.sin(t * 1.5) * 0.15;
        barShelfGlow1.intensity = pulse;
        barShelfGlow2.intensity = pulse;
      }
      if (onyxFront && onyxFront.material) {
        onyxFront.material.emissiveIntensity = 1.6 + Math.sin(t * 1.2) * 0.12;
      }
    });
  };

})(window);
