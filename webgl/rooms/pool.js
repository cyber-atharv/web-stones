/**
 * Murali Granites & Marbles — Ultra-Realistic Luxury Resort Swimming Pool Deck & Sunken Lounge
 * High-Fidelity PBR Architecture with Animated Caustic Water, Submerged Baja Shelf & Fire Pit Lounge
 */
(function (window) {
  'use strict';

  window.WebGlRooms = window.WebGlRooms || {};
  window.WebGlAnimators = window.WebGlAnimators || [];

  window.WebGlRooms.pool = function (ctx) {
    const { THREE, group, reg, roomDefs, ROOM_CAMERAS, core, showroomSlabs, presets } = ctx;
    const { M, box, cyl, sbox } = core;

    const texLoader = new THREE.TextureLoader();
    const maxAni = 4;

    function loadTex(url, repeatX = 1, repeatY = 1) {
      const t = texLoader.load(url);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(repeatX, repeatY);
      t.anisotropy = maxAni;
      return t;
    }

    // ── High-Resolution Architectural PBR Textures ──
    const waterNormals = loadTex('V1/textures/waternormals.jpg', 4, 6);
    const graniteWallAlbedo = loadTex('V1/assets/exterior2/maps/exterior/granite_wall/tile_AlbedoTransparency.jpg', 3, 2);
    const graniteWallNormal = loadTex('V1/assets/exterior2/maps/exterior/granite_wall/tile_Normal.jpg', 3, 2);
    const concreteTileAlbedo = loadTex('V1/assets/exterior2/maps/exterior/concrete_tile/tile_AlbedoTransparency.jpg', 4, 4);
    const concreteTileNormal = loadTex('V1/assets/exterior2/maps/exterior/concrete_tile/tile_Normal.jpg', 4, 4);
    const planksAlbedo = loadTex('V1/assets/exterior2/maps/exterior/planks/tile_AlbedoTransparency.jpg', 3, 3);
    const plantBlockAlbedo = loadTex('V1/assets/exterior2/maps/exterior/plant_block/plant_block_AlbedoTransparency.jpg', 2, 2);
    const transatAlbedo = loadTex('V1/assets/exterior2/maps/transat/transat_AlbedoTransparency.jpg', 1, 1);
    const sansevieriaAlbedo = loadTex('V1/assets/exterior2/maps/sansevieria/pbr/sansevieria_AlbedoTransparency.png', 1, 1);

    // Procedural High-Definition Mosaic Tile for Deep Pool Basin
    function createMosaicTexture() {
      const c = document.createElement('canvas');
      c.width = 512; c.height = 512;
      const x = c.getContext('2d');
      x.fillStyle = '#053447';
      x.fillRect(0, 0, 512, 512);
      const s = 16, g = 1.2;
      const blues = ['#08516d', '#0a6485', '#0e7e9e', '#1399b8', '#0b4a63', '#16b2cf', '#1dc7e4'];
      for (let y = 0; y < 512; y += s) {
        for (let px = 0; px < 512; px += s) {
          x.fillStyle = blues[Math.floor(Math.random() * blues.length)];
          x.fillRect(px + g, y + g, s - g * 2, s - g * 2);
        }
      }
      const t = new THREE.CanvasTexture(c);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(6, 10);
      t.anisotropy = maxAni;
      return t;
    }
    const mosaicTex = createMosaicTexture();

    // ── Architectural PBR Materials ──
    const mosaicBasinMat = new THREE.MeshStandardMaterial({
      map: mosaicTex,
      roughness: 0.12,
      metalness: 0.08
    });

    const deckDefaultMat = new THREE.MeshStandardMaterial({
      map: concreteTileAlbedo,
      normalMap: concreteTileNormal,
      roughness: 0.55,
      metalness: 0.04
    });

    const copingDefaultMat = new THREE.MeshStandardMaterial({
      map: graniteWallAlbedo,
      normalMap: graniteWallNormal,
      roughness: 0.38,
      metalness: 0.05
    });

    const waterwallDefaultMat = new THREE.MeshStandardMaterial({
      map: graniteWallAlbedo,
      normalMap: graniteWallNormal,
      roughness: 0.35,
      metalness: 0.05
    });

    const teakDeckMat = new THREE.MeshStandardMaterial({
      map: planksAlbedo,
      roughness: 0.42,
      metalness: 0.02
    });

    const hedgeMat = new THREE.MeshStandardMaterial({
      map: plantBlockAlbedo,
      roughness: 0.85,
      color: 0x224822
    });

    const loungerMat = new THREE.MeshStandardMaterial({
      map: transatAlbedo,
      roughness: 0.45
    });

    const darkGraniteMat = new THREE.MeshStandardMaterial({
      color: 0x161618,
      roughness: 0.28,
      metalness: 0.45
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xf5f5f7,
      metalness: 0.98,
      roughness: 0.04
    });

    const outdoorFabricMat = new THREE.MeshStandardMaterial({
      color: 0xede6dc,
      roughness: 0.88
    });

    const cushionTealMat = new THREE.MeshStandardMaterial({
      color: 0x1d515a,
      roughness: 0.85
    });

    const cushionGoldMat = new THREE.MeshStandardMaterial({
      color: 0xc49b56,
      roughness: 0.82
    });

    const warmLedMat = new THREE.MeshStandardMaterial({
      color: 0xfff2e0,
      emissive: new THREE.Color(0xffbf66),
      emissiveIntensity: 1.1,
      roughness: 0.4
    });

    const fireGlowMat = new THREE.MeshStandardMaterial({
      color: 0xff4400,
      emissive: new THREE.Color(0xff6600),
      emissiveIntensity: 2.8,
      roughness: 0.6
    });

    const fireFlamesMat = new THREE.MeshStandardMaterial({
      color: 0xffbb22,
      emissive: new THREE.Color(0xff8800),
      emissiveIntensity: 3.5,
      transparent: true,
      opacity: 0.92,
      roughness: 0.2
    });

    const glassBalustradeMat = new THREE.MeshStandardMaterial({
      color: 0xcbeef7,
      transparent: true,
      opacity: 0.34,
      roughness: 0.03,
      metalness: 0.15
    });

    // ── 1. Lighting: Golden Resort Mediterranean Sun & Pool Glow ──
    const poolSun = new THREE.DirectionalLight(0xfffaea, 3.6);
    poolSun.position.set(-8, 15, 9);
    poolSun.castShadow = true;
    poolSun.shadow.mapSize.set(2048, 2048);
    poolSun.shadow.bias = -0.0003;
    poolSun.shadow.radius = 2.0;
    group.add(poolSun);

    const poolSky = new THREE.DirectionalLight(0xbbe3ff, 1.45);
    poolSky.position.set(7, 9, -5);
    group.add(poolSky);

    // Submerged Underwater LED Spotlights
    const poolAquaLight1 = new THREE.PointLight(0x00f0ff, 2.8, 9.0);
    poolAquaLight1.position.set(-1.8, -0.4, -2.5);
    group.add(poolAquaLight1);

    const poolAquaLight2 = new THREE.PointLight(0x00f0ff, 2.8, 9.0);
    poolAquaLight2.position.set(-1.8, -0.4, 2.5);
    group.add(poolAquaLight2);

    // Sunken Fire Pit Dynamic Warm Flickering Light
    const fireLight = new THREE.PointLight(0xff7722, 2.6, 7.5);
    fireLight.position.set(5.2, 0.55, 0);
    group.add(fireLight);

    // ── 2. Deep Submerged Pool Basin with Mosaic Tiles ──
    // Deep Basin Floor (1.30m below deck)
    const basinFloor = new THREE.Mesh(new THREE.PlaneGeometry(6.6, 10.6), mosaicBasinMat);
    basinFloor.rotation.x = -Math.PI / 2;
    basinFloor.position.set(-1.8, -1.30, 0);
    basinFloor.receiveShadow = true;
    group.add(basinFloor);

    // Basin Interior Walls
    sbox(6.6, 1.40, 0.1, -1.8, -0.60, -5.3, mosaicBasinMat, group);
    sbox(6.6, 1.40, 0.1, -1.8, -0.60, 5.3, mosaicBasinMat, group);
    sbox(0.1, 1.40, 10.6, -5.05, -0.60, 0, mosaicBasinMat, group);
    sbox(0.1, 1.40, 10.6, 1.45, -0.60, 0, mosaicBasinMat, group);

    // Submerged Main Drains at Deep End
    cyl(0.24, 0.24, 0.04, -1.8, -1.28, -3.2, darkGraniteMat, group);
    cyl(0.24, 0.24, 0.04, -1.8, -1.28, -2.2, darkGraniteMat, group);

    // Baja Sun Shelf (Shallow Tanning Ledge at South End, water is 15cm deep)
    sbox(6.5, 1.10, 2.6, -1.8, -0.75, 3.9, mosaicBasinMat, group);
    // Submerged Steps Leading from Shelf into Deep Water
    sbox(6.5, 0.35, 0.6, -1.8, -1.10, 2.3, mosaicBasinMat, group);
    sbox(6.5, 0.35, 0.6, -1.8, -0.75, 1.7, mosaicBasinMat, group);

    // Underwater Step Edge Non-Slip Accent Trims
    box(6.45, 0.02, 0.08, -1.8, -0.92, 2.02, darkGraniteMat, group);
    box(6.45, 0.02, 0.08, -1.8, -0.57, 1.42, darkGraniteMat, group);

    // Submerged Underwater Wall Return Jets (Chrome Nozzles)
    for (let rz of [-4.0, -1.5, 1.0]) {
      cyl(0.06, 0.06, 0.08, 1.40, -0.45, rz, chromeMat, group).rotation.z = Math.PI / 2;
    }

    // ── 3. Photorealistic Animated Water Surface ──
    const poolWaterMat = new THREE.MeshStandardMaterial({
      color: 0x0ea5c2,
      normalMap: waterNormals,
      normalScale: new THREE.Vector2(0.9, 0.9),
      roughness: 0.03,
      metalness: 0.10,
      transparent: true,
      opacity: 0.78
    });
    const poolWater = new THREE.Mesh(new THREE.PlaneGeometry(6.5, 10.5), poolWaterMat);
    poolWater.rotation.x = -Math.PI / 2;
    poolWater.position.set(-1.8, 0.02, 0);
    group.add(poolWater);

    // Secondary Shimmer Reflection Layer for Depth & Sparkle
    const waterShimmerMat = new THREE.MeshStandardMaterial({
      color: 0x48d6ed,
      roughness: 0.08,
      metalness: 0.25,
      transparent: true,
      opacity: 0.22
    });
    const waterShimmer = new THREE.Mesh(new THREE.PlaneGeometry(6.48, 10.48), waterShimmerMat);
    waterShimmer.rotation.x = -Math.PI / 2;
    waterShimmer.position.set(-1.8, 0.015, 0);
    group.add(waterShimmer);

    // ── 4. Main Anti-Slip Deck Paving & Teak Sun Deck ──
    // Stone Paving Around Pool (Customizable in 3D: pool_deck)
    const poolDeck = new THREE.Mesh(new THREE.PlaneGeometry(16, 14), deckDefaultMat);
    poolDeck.rotation.x = -Math.PI / 2;
    poolDeck.position.set(0, 0.005, 0);
    poolDeck.receiveShadow = true;
    group.add(poolDeck);

    // Natural Teak Sun Deck Platform (Adjacent to Pool)
    sbox(4.4, 0.04, 8.8, 4.9, 0.025, 0, teakDeckMat, group);

    // Perimeter Infinity Slot Drain (Dark Flamed Granite Channel)
    sbox(0.18, 0.04, 11.2, 1.62, 0.02, 0, darkGraniteMat, group);
    sbox(0.18, 0.04, 11.2, -5.22, 0.02, 0, darkGraniteMat, group);
    sbox(7.0, 0.04, 0.18, -1.8, 0.02, 5.52, darkGraniteMat, group);
    sbox(7.0, 0.04, 0.18, -1.8, 0.02, -5.52, darkGraniteMat, group);

    // ── 5. Perimeter Bullnose Pool Coping Stones (Customizable in 3D: pool_coping) ──
    const poolCopingE = sbox(0.52, 0.10, 10.8, 1.48, 0.06, 0, copingDefaultMat, group);
    const poolCopingW = sbox(0.52, 0.10, 10.8, -5.08, 0.06, 0, copingDefaultMat, group);
    const poolCopingN = sbox(7.08, 0.10, 0.52, -1.8, 0.06, -5.38, copingDefaultMat, group);
    const poolCopingS = sbox(7.08, 0.10, 0.52, -1.8, 0.06, 5.38, copingDefaultMat, group);

    // ── 6. Marine Grade 304 Stainless Steel Pool Entry Ladder ──
    function createPoolLadder(lx, lz) {
      // Chrome Handrails
      const rail1 = cyl(0.025, 0.025, 1.25, lx, 0.40, lz - 0.25, chromeMat, group);
      const rail2 = cyl(0.025, 0.025, 1.25, lx, 0.40, lz + 0.25, chromeMat, group);
      // Curved top handles
      const arch1 = cyl(0.025, 0.025, 0.35, lx + 0.12, 0.95, lz - 0.25, chromeMat, group);
      arch1.rotation.z = Math.PI / 4;
      const arch2 = cyl(0.025, 0.025, 0.35, lx + 0.12, 0.95, lz + 0.25, chromeMat, group);
      arch2.rotation.z = Math.PI / 4;
      // Steps
      box(0.08, 0.025, 0.46, lx, 0.15, lz, chromeMat, group);
      box(0.08, 0.025, 0.46, lx, -0.15, lz, chromeMat, group);
      box(0.08, 0.025, 0.46, lx, -0.45, lz, chromeMat, group);
    }
    createPoolLadder(-4.95, -3.2);

    // ── 7. Cascading Waterfall Feature Wall & Spillway (Customizable in 3D: pool_waterwall) ──
    const poolWaterWall = sbox(6.8, 3.4, 0.45, -1.8, 1.7, -6.6, waterwallDefaultMat, group);
    // Boundary Privacy Wall
    sbox(0.35, 3.4, 14, -7.85, 1.7, 0, waterwallDefaultMat, group);

    // Sheer Descent Stainless Steel Waterfall Blade Spillway
    box(3.4, 0.06, 0.35, -1.8, 2.2, -6.32, chromeMat, group);

    // Translucent Cascading Water Curtain Sheet
    const waterfallCurtainMat = new THREE.MeshStandardMaterial({
      color: 0x9be8f5,
      transparent: true,
      opacity: 0.65,
      roughness: 0.08,
      metalness: 0.15
    });
    const waterfallCurtain = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 2.15), waterfallCurtainMat);
    waterfallCurtain.position.set(-1.8, 1.1, -6.15);
    group.add(waterfallCurtain);

    // Water Splash Froth at Waterfall Impact
    sbox(3.4, 0.08, 0.45, -1.8, 0.04, -5.95, new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.72,
      roughness: 0.3
    }), group);

    // Planter Box on Top of Waterfall Wall
    box(6.8, 0.35, 0.6, -1.8, 3.55, -6.6, darkGraniteMat, group);
    // Planter Sansevieria Greenery
    for (let pi = 0; pi < 8; pi++) {
      const px = -4.5 + pi * 0.9;
      cyl(0.12, 0.05, 0.65, px, 3.85, -6.6, M('#1e4827', 0.4), group);
    }

    // ── 8. Sunken Fire Pit & Conversation Lounge (Customizable in 3D: pool_bench) ──
    const poolLoungeBench = sbox(4.8, 0.48, 4.8, 5.2, 0.24, 0, copingDefaultMat, group);
    // Recessed Floating Bench Golden Warm LED Strip
    box(4.6, 0.03, 4.6, 5.2, 0.46, 0, warmLedMat, group);

    // Stone Architectural Backrest Support Walls (Customizable with pool_bench)
    const benchBackN = sbox(4.4, 0.75, 0.28, 5.2, 0.65, -2.15, copingDefaultMat, group);
    const benchBackS = sbox(4.4, 0.75, 0.28, 5.2, 0.65, 2.15, copingDefaultMat, group);
    const benchBackE = sbox(0.28, 0.75, 4.4, 7.35, 0.65, 0, copingDefaultMat, group);

    // Sunken Lounge Entry Steps (Customizable with pool_bench)
    const poolStep1 = sbox(0.75, 0.16, 1.6, 2.6, 0.08, 0, copingDefaultMat, group);
    const poolStep2 = sbox(0.75, 0.16, 1.6, 3.2, 0.22, 0, copingDefaultMat, group);

    // U-Shaped Modular Plush Waterproof Seat Cushions
    box(4.0, 0.18, 0.95, 5.2, 0.57, -1.55, outdoorFabricMat, group);
    box(4.0, 0.18, 0.95, 5.2, 0.57, 1.55, outdoorFabricMat, group);
    box(0.95, 0.18, 2.2, 6.75, 0.57, 0, outdoorFabricMat, group);

    // Backrest Cushions
    box(4.0, 0.42, 0.18, 5.2, 0.88, -1.95, outdoorFabricMat, group);
    box(4.0, 0.42, 0.18, 5.2, 0.88, 1.95, outdoorFabricMat, group);
    box(0.18, 0.42, 2.2, 7.15, 0.88, 0, outdoorFabricMat, group);

    // Designer Teal & Gold Throw Pillows
    box(0.42, 0.38, 0.15, 3.9, 0.76, -1.8, cushionTealMat, group);
    box(0.42, 0.38, 0.15, 4.8, 0.76, -1.8, cushionGoldMat, group);
    box(0.42, 0.38, 0.15, 6.3, 0.76, -1.8, cushionTealMat, group);
    box(0.42, 0.38, 0.15, 3.9, 0.76, 1.8, cushionGoldMat, group);
    box(0.42, 0.38, 0.15, 4.8, 0.76, 1.8, cushionTealMat, group);
    box(0.42, 0.38, 0.15, 6.3, 0.76, 1.8, cushionGoldMat, group);

    // Central Monolithic Circular Granite Fire Pit Bowl
    cyl(0.72, 0.82, 0.38, 5.2, 0.67, 0, darkGraniteMat, group);
    // Glowing Ember Bed & Volcanic Rocks
    cyl(0.56, 0.56, 0.08, 5.2, 0.84, 0, fireGlowMat, group);
    // Dynamic Fire Flame Cone Geometry
    const fireCone1 = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.42, 6), fireFlamesMat);
    fireCone1.position.set(5.2, 1.05, 0);
    group.add(fireCone1);
    const fireCone2 = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.32, 5), fireFlamesMat);
    fireCone2.position.set(5.12, 1.00, 0.10);
    group.add(fireCone2);
    const fireCone3 = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.28, 5), fireFlamesMat);
    fireCone3.position.set(5.28, 0.98, -0.08);
    group.add(fireCone3);

    // Fire Pit Tempered Glass Wind Guard Ring
    cyl(0.60, 0.60, 0.24, 5.2, 0.98, 0, glassBalustradeMat, group);

    // ── 9. Resort Teak Sun Loungers & Side Cocktail Tables ──
    function createSunLounger(lx, lz) {
      // Teak Lounger Slatted Frame
      box(0.85, 0.22, 2.1, lx, 0.12, lz, teakDeckMat, group);
      // Wheels
      cyl(0.12, 0.12, 0.04, lx - 0.44, 0.12, lz - 0.9, darkGraniteMat, group);
      cyl(0.12, 0.12, 0.04, lx + 0.44, 0.12, lz - 0.9, darkGraniteMat, group);
      // Plush Off-White Reclining Mattress
      box(0.78, 0.12, 1.4, lx, 0.28, lz + 0.3, loungerMat, group);
      // Angled Backrest & Pillow
      const backrest = box(0.78, 0.10, 0.65, lx, 0.42, lz - 0.68, loungerMat, group);
      backrest.rotation.x = -0.38;
      box(0.55, 0.08, 0.22, lx, 0.54, lz - 0.82, cushionTealMat, group);

      // Low Drink Side Table
      cyl(0.24, 0.24, 0.38, lx + 0.75, 0.19, lz - 0.2, darkGraniteMat, group);
      // Frosted Cocktail Glass & Bottle
      cyl(0.04, 0.03, 0.12, lx + 0.72, 0.44, lz - 0.16, glassBalustradeMat, group);
      cyl(0.035, 0.035, 0.22, lx + 0.78, 0.49, lz - 0.24, M('#1a4030', 0.2), group);
    }
    createSunLounger(2.8, -3.2);
    createSunLounger(2.8, 3.2);

    // Submerged In-Pool Baja Ledge Loungers (in shallow water)
    function createBajaLounger(lx, lz) {
      const bLounger = box(0.70, 0.14, 1.7, lx, -0.68, lz, new THREE.MeshStandardMaterial({
        color: 0xf5f7fa,
        roughness: 0.2,
        metalness: 0.05
      }), group);
      // Headrest above water
      const head = box(0.70, 0.16, 0.45, lx, -0.56, lz + 0.62, new THREE.MeshStandardMaterial({
        color: 0xf5f7fa,
        roughness: 0.2
      }), group);
      head.rotation.x = 0.35;
    }
    createBajaLounger(-0.8, 3.8);
    createBajaLounger(-2.8, 3.8);

    // ── 10. Modern Minimalist Louvered Pergola Over Teak Deck ──
    // Four Matte Black Steel Upright Columns
    box(0.16, 3.4, 0.16, 3.0, 1.7, -4.2, darkGraniteMat, group);
    box(0.16, 3.4, 0.16, 7.0, 1.7, -4.2, darkGraniteMat, group);
    box(0.16, 3.4, 0.16, 3.0, 1.7, 4.2, darkGraniteMat, group);
    box(0.16, 3.4, 0.16, 7.0, 1.7, 4.2, darkGraniteMat, group);
    // Roof Perimeter Support Beams
    box(4.2, 0.16, 0.16, 5.0, 3.4, -4.2, darkGraniteMat, group);
    box(4.2, 0.16, 0.16, 5.0, 3.4, 4.2, darkGraniteMat, group);
    box(0.16, 0.16, 8.6, 3.0, 3.4, 0, darkGraniteMat, group);
    box(0.16, 0.16, 8.6, 7.0, 3.4, 0, darkGraniteMat, group);
    // Natural Wood Louver Slats (Angle-cast shadows)
    for (let li = 0; li < 15; li++) {
      const louver = box(4.0, 0.06, 0.16, 5.0, 3.52, -3.8 + li * 0.54, teakDeckMat, group);
      louver.rotation.x = 0.32;
    }

    // ── 11. Landscape Greenery: Cypress Trees & Manicured Hedge ──
    // Clipped Boxwood Hedge Along Privacy Boundary Wall
    sbox(0.40, 1.8, 13.8, -7.50, 0.90, 0, hedgeMat, group);

    // Italian Pencil Cypress Trees in Flamed Granite Cube Planters
    for (let ti = 0; ti < 5; ti++) {
      const z = -4.5 + ti * 2.25;
      // Cube Planter
      sbox(0.65, 0.55, 0.65, -6.6, 0.275, z, darkGraniteMat, group);
      // Soil
      box(0.55, 0.05, 0.55, -6.6, 0.55, z, M('#2b2015', 0.9), group);
      // Slender Cypress Foliage Cone
      const cypress = new THREE.Mesh(new THREE.ConeGeometry(0.38, 2.9, 8), M('#1e3d23', 0.65));
      cypress.position.set(-6.6, 1.95, z);
      cypress.castShadow = true;
      group.add(cypress);
      // Architectural Uplight Spot
      cyl(0.06, 0.06, 0.08, -6.6, 0.58, z + 0.22, chromeMat, group);
    }

    // Horizon Frameless Structural Glass Balustrade at Far Edge
    box(16.0, 1.05, 0.04, 0, 0.52, 6.8, glassBalustradeMat, group);
    box(16.0, 0.04, 0.06, 0, 1.06, 6.8, chromeMat, group);

    // Modern Pathway Bollard Lights Around Deck
    for (let bz of [-4.5, -1.5, 1.5, 4.5]) {
      // West Bollards
      cyl(0.04, 0.04, 0.65, -5.6, 0.325, bz, darkGraniteMat, group);
      cyl(0.038, 0.038, 0.06, -5.6, 0.62, bz, warmLedMat, group);
      // East Bollards
      cyl(0.04, 0.04, 0.65, 7.4, 0.325, bz, darkGraniteMat, group);
      cyl(0.038, 0.038, 0.06, 7.4, 0.62, bz, warmLedMat, group);
    }

    // ── 12. Real-Time Animation Loop (Water Ripples, Flame Dance, Caustic Sparkle) ──
    let animClock = 0;
    window.WebGlAnimators.push(() => {
      animClock += 0.016;
      // Fluid Water Ripple Drift
      waterNormals.offset.x = (waterNormals.offset.x + 0.00040) % 1;
      waterNormals.offset.y = (waterNormals.offset.y + 0.00030) % 1;

      // Realistic Dancing Fire Pit Flames
      const fScale = 1.0 + Math.sin(animClock * 14) * 0.12 + Math.cos(animClock * 22) * 0.08;
      fireCone1.scale.set(fScale, fScale * (1 + Math.sin(animClock * 18) * 0.15), fScale);
      fireCone2.scale.set(1 + Math.cos(animClock * 16) * 0.15, 1 + Math.sin(animClock * 12) * 0.18, 1);
      fireCone3.scale.set(1 + Math.sin(animClock * 20) * 0.18, 1 + Math.cos(animClock * 15) * 0.14, 1);

      // Warm Fire Flickering Radiance
      fireLight.intensity = 2.5 + Math.sin(animClock * 15) * 0.32 + Math.cos(animClock * 27) * 0.18;
    });

    // ── Surface Registrations (Integrated with Visualizer Stone Palette) ──
    reg('pool', 'pool_deck', 'Pool Deck Paving', poolDeck, null, 16, 14);
    reg('pool', 'pool_coping', 'Perimeter Coping Slabs', poolCopingE, null, 0.52, 10.8);
    reg('pool', 'pool_coping', 'Perimeter Coping Slabs', poolCopingW, null, 0.52, 10.8);
    reg('pool', 'pool_coping', 'Perimeter Coping Slabs', poolCopingN, null, 7.08, 0.52);
    reg('pool', 'pool_coping', 'Perimeter Coping Slabs', poolCopingS, null, 7.08, 0.52);
    reg('pool', 'pool_waterwall', 'Cascading Water Wall', poolWaterWall, null, 6.8, 3.4);
    reg('pool', 'pool_bench', 'Sunken Lounge Bench', poolLoungeBench, null, 4.8, 4.8);
    reg('pool', 'pool_bench', 'Sunken Lounge Bench', benchBackN, null, 4.4, 0.75);
    reg('pool', 'pool_bench', 'Sunken Lounge Bench', benchBackS, null, 4.4, 0.75);
    reg('pool', 'pool_bench', 'Sunken Lounge Bench', benchBackE, null, 0.28, 4.4);
    reg('pool', 'pool_bench', 'Sunken Lounge Bench', poolStep1, null, 0.75, 1.6);
    reg('pool', 'pool_bench', 'Sunken Lounge Bench', poolStep2, null, 0.75, 1.6);

    // ── Camera Views & Presets ──
    ROOM_CAMERAS.pool = {
      type: 'three',
      title: 'Swimming Pool Deck & Sunken Lounge (3D WebGL)',
      subtitle: '• Resort Paving & Coping Slabs',
      hint: '<span class="text-[#E7C887] font-semibold">💡 Swimming Pool Studio:</span> Customize <b>Pool Deck Paving</b>, <b>Coping Slabs</b>, <b>Water Feature Wall</b>, or <b>Sunken Lounge Bench</b> with anti-slip pavers & granite.',
      defaultCam: 'pool_wide',
      cameras: [
        { id: 'pool_wide', label: '🏊 Resort Overview', azimuth: Math.PI * 0.25, elevation: 0.36, distance: 17.5, target: [0.2, 0.6, 0] },
        { id: 'lounge', label: '🔥 Sunken Fire Pit Lounge', azimuth: Math.PI * 0.74, elevation: 0.28, distance: 7.2, target: [5.2, 0.65, 0] },
        { id: 'waterwall', label: '🌊 Waterfall Feature Wall', azimuth: Math.PI * 0.05, elevation: 0.24, distance: 9.2, target: [-1.8, 1.6, -4.5] },
        { id: 'baja', label: '🏖️ Baja Shelf & Sun Loungers', azimuth: Math.PI * 0.44, elevation: 0.22, distance: 7.8, target: [1.2, 0.4, 2.5] },
        { id: 'waterline', label: '💧 Waterline Reflection', azimuth: Math.PI * 0.18, elevation: 0.12, distance: 6.8, target: [-1.8, 0.15, 0] }
      ]
    };

    // ── Default Showroom Stones ──
    const poolDeckStone = showroomSlabs.find(s => s.name === 'Sahara Beige Heavy-Duty Parking Tile') || showroomSlabs.find(s => s.name === 'Steel Grey') || presets[0];
    const poolCopingStone = showroomSlabs.find(s => s.name === 'Absolute Black Flamed') || showroomSlabs.find(s => s.name === 'Titanium Black') || presets[0];
    const poolWallStone = showroomSlabs.find(s => s.name === 'Calacatta Gold PGVT Tile') || presets[0];
    const poolBenchStone = showroomSlabs.find(s => s.name === 'Alaska White') || presets[0];

    if (roomDefs.pool) {
      roomDefs.pool.camera = { azimuth: Math.PI * 0.25, elevation: 0.36, distance: 17.5, target: new THREE.Vector3(0.2, 0.6, 0) };
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
