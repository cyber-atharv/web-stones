/**
 * Murali Granites & Marbles — Ultra-Realistic Luxury Villa Driveway & Executive Parking Suite
 * High-Fidelity PBR Architecture with Heavy-Duty Pavers, Grand Porch, Carport Pergola & SUV
 */
(function (window) {
  'use strict';

  window.WebGlRooms = window.WebGlRooms || {};
  window.WebGlAnimators = window.WebGlAnimators || [];

  window.WebGlRooms.parking = function (ctx) {
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
    const concreteTileAlbedo = loadTex('V1/assets/exterior2/maps/exterior/concrete_tile/tile_AlbedoTransparency.jpg', 6, 6);
    const concreteTileNormal = loadTex('V1/assets/exterior2/maps/exterior/concrete_tile/tile_Normal.jpg', 6, 6);
    const graniteWallAlbedo = loadTex('V1/assets/exterior2/maps/exterior/granite_wall/tile_AlbedoTransparency.jpg', 4, 2);
    const graniteWallNormal = loadTex('V1/assets/exterior2/maps/exterior/granite_wall/tile_Normal.jpg', 4, 2);
    const planksAlbedo = loadTex('V1/assets/exterior2/maps/exterior/planks/tile_AlbedoTransparency.jpg', 3, 3);
    const plantBlockAlbedo = loadTex('V1/assets/exterior2/maps/exterior/plant_block/plant_block_AlbedoTransparency.jpg', 2, 2);
    const sansevieriaAlbedo = loadTex('V1/assets/exterior2/maps/sansevieria/pbr/sansevieria_AlbedoTransparency.png', 1, 1);

    // ── Architectural PBR Materials ──
    const drivewayDefaultMat = new THREE.MeshStandardMaterial({
      map: concreteTileAlbedo,
      normalMap: concreteTileNormal,
      roughness: 0.58,
      metalness: 0.04
    });

    const wallDefaultMat = new THREE.MeshStandardMaterial({
      map: graniteWallAlbedo,
      normalMap: graniteWallNormal,
      roughness: 0.40,
      metalness: 0.05
    });

    const kerbDefaultMat = new THREE.MeshStandardMaterial({
      map: graniteWallAlbedo,
      normalMap: graniteWallNormal,
      roughness: 0.45,
      metalness: 0.04
    });

    const porchDefaultMat = new THREE.MeshStandardMaterial({
      map: graniteWallAlbedo,
      normalMap: graniteWallNormal,
      roughness: 0.32,
      metalness: 0.06
    });

    const teakSoffitMat = new THREE.MeshStandardMaterial({
      map: planksAlbedo,
      roughness: 0.42,
      metalness: 0.02
    });

    const hedgeMat = new THREE.MeshStandardMaterial({
      map: plantBlockAlbedo,
      roughness: 0.85,
      color: 0x224822
    });

    const steelAnthraciteMat = new THREE.MeshStandardMaterial({
      color: 0x18181c,
      roughness: 0.28,
      metalness: 0.65
    });

    const chromeTrimMat = new THREE.MeshStandardMaterial({
      color: 0xf5f5f7,
      metalness: 0.98,
      roughness: 0.04
    });

    const darkGraniteMat = new THREE.MeshStandardMaterial({
      color: 0x141416,
      roughness: 0.30,
      metalness: 0.45
    });

    // Deep Metallic Obsidian SUV Car Paint
    const carPaintMat = new THREE.MeshStandardMaterial({
      color: 0x0d0f12,
      roughness: 0.12,
      metalness: 0.82
    });

    // Tinted Privacy Glass
    const carGlassMat = new THREE.MeshStandardMaterial({
      color: 0x121b22,
      transparent: true,
      opacity: 0.85,
      roughness: 0.04,
      metalness: 0.25
    });

    // High-Output LED Headlights
    const carHeadlightMat = new THREE.MeshStandardMaterial({
      color: 0xf0faff,
      emissive: new THREE.Color(0xd0eaff),
      emissiveIntensity: 3.2,
      roughness: 0.1
    });

    // Rear OLED Lightbar
    const carTailLightMat = new THREE.MeshStandardMaterial({
      color: 0xff1500,
      emissive: new THREE.Color(0xff2200),
      emissiveIntensity: 3.0,
      roughness: 0.2
    });

    const carTireRubberMat = new THREE.MeshStandardMaterial({
      color: 0x151517,
      roughness: 0.80,
      metalness: 0.02
    });

    const carAlloyRimMat = new THREE.MeshStandardMaterial({
      color: 0xd2d5da,
      metalness: 0.94,
      roughness: 0.12
    });

    const brakeCaliperMat = new THREE.MeshStandardMaterial({
      color: 0xd62828,
      roughness: 0.35,
      metalness: 0.4
    });

    const warmLedMat = new THREE.MeshStandardMaterial({
      color: 0xfff2e0,
      emissive: new THREE.Color(0xffbf66),
      emissiveIntensity: 1.2,
      roughness: 0.4
    });

    const doorOakMat = new THREE.MeshStandardMaterial({
      map: planksAlbedo,
      color: 0x5a3518,
      roughness: 0.38,
      metalness: 0.02
    });

    const brassHandleMat = new THREE.MeshStandardMaterial({
      color: 0xe5c275,
      metalness: 0.92,
      roughness: 0.15
    });

    // ── 1. Lighting: Golden Hour Villa Sun & Architectural Fixtures ──
    const parkingSun = new THREE.DirectionalLight(0xfffaea, 3.5);
    parkingSun.position.set(-8, 15, 10);
    parkingSun.castShadow = true;
    parkingSun.shadow.mapSize.set(2048, 2048);
    parkingSun.shadow.bias = -0.0004;
    parkingSun.shadow.radius = 2.0;
    group.add(parkingSun);

    const parkingSkyFill = new THREE.DirectionalLight(0xbdd7ee, 1.4);
    parkingSkyFill.position.set(8, 10, -6);
    group.add(parkingSkyFill);

    // Warm Architectural Porch Sconce
    const porchGlow = new THREE.PointLight(0xffeedd, 1.6, 8.5);
    porchGlow.position.set(6.25, 3.1, -1.2);
    group.add(porchGlow);

    // Carport Bay Downlight
    const carportGlow = new THREE.PointLight(0xffeedd, 1.4, 7.5);
    carportGlow.position.set(1.5, 3.2, -1.2);
    group.add(carportGlow);

    // ── 2. Heavy-Duty Driveway Floor & Parking Apron (Customizable: parking_floor) ──
    const parkingFloor = new THREE.Mesh(new THREE.PlaneGeometry(16, 14), drivewayDefaultMat);
    parkingFloor.rotation.x = -Math.PI / 2;
    parkingFloor.position.set(0, 0.005, 0);
    parkingFloor.receiveShadow = true;
    group.add(parkingFloor);

    // Central Vehicle Parking Apron Inset Band (Darker border framing car bay)
    sbox(5.8, 0.02, 6.6, 1.5, 0.015, -1.2, darkGraniteMat, group);
    // Perimeter Drainage Slot Grate Channel (Along kerbs)
    sbox(0.16, 0.03, 13.8, -5.62, 0.018, 0, steelAnthraciteMat, group);
    sbox(12.6, 0.03, 0.16, 0.60, 0.018, -4.62, steelAnthraciteMat, group);

    // ── 3. Perimeter Compound Boundary Walls & Monumental Gate Piers (Customizable: parking_wall) ──
    // Main North Boundary Wall
    const parkingBackWall = sbox(16, 3.2, 0.35, 0, 1.6, -6.85, wallDefaultMat, group);
    // West Privacy Wall
    const parkingLeftWall = sbox(0.35, 3.2, 14, -7.85, 1.6, 0, wallDefaultMat, group);

    // Compound Wall Stone Coping Capstones with Drip Edges
    box(16.4, 0.12, 0.48, 0, 3.26, -6.85, darkGraniteMat, group);
    box(0.48, 0.12, 14.4, -7.85, 3.26, 0, darkGraniteMat, group);

    // Monumental Stone Wall Piers (Architectural columns breaking up wall)
    const pier1 = sbox(0.70, 3.5, 0.70, -7.85, 1.75, -6.85, wallDefaultMat, group);
    const pier2 = sbox(0.70, 3.5, 0.70, -7.85, 1.75, 0, wallDefaultMat, group);
    const pier3 = sbox(0.70, 3.5, 0.70, 0, 1.75, -6.85, wallDefaultMat, group);
    // Pier Stone Capstone Pyramids
    box(0.80, 0.15, 0.80, -7.85, 3.57, -6.85, darkGraniteMat, group);
    box(0.80, 0.15, 0.80, -7.85, 3.57, 0, darkGraniteMat, group);
    box(0.80, 0.15, 0.80, 0, 3.57, -6.85, darkGraniteMat, group);

    // Architectural Sconce Fixtures on Piers (Up-Down Warm LED)
    for (let pz of [-6.85, 0]) {
      box(0.12, 0.35, 0.12, -7.45, 2.0, pz, steelAnthraciteMat, group);
      box(0.10, 0.05, 0.10, -7.45, 2.15, pz, warmLedMat, group);
      box(0.10, 0.05, 0.10, -7.45, 1.85, pz, warmLedMat, group);
      const scPoint = new THREE.PointLight(0xffdfaa, 0.8, 4.0);
      scPoint.position.set(-7.35, 2.0, pz);
      group.add(scPoint);
    }

    // Modern Laser-Cut Dark Horizontal Metal Privacy Slat Panels
    for (let si = 0; si < 8; si++) {
      box(6.8, 0.05, 0.04, -3.8, 1.2 + si * 0.24, -6.65, steelAnthraciteMat, group);
    }

    // ── 4. Flamed Granite Kerb Stones & Raised Planter Beds (Customizable: parking_kerb) ──
    const parkingKerbLeft = sbox(0.38, 0.28, 13.6, -5.8, 0.14, 0, kerbDefaultMat, group);
    const parkingKerbBack = sbox(12.4, 0.28, 0.38, 0.4, 0.14, -4.8, kerbDefaultMat, group);

    // Raised Garden Planter Bed with Dark Organic Soil
    box(1.7, 0.24, 13.6, -6.85, 0.12, 0, M('#201a14', 0.95), group);

    // Manicured Clipped Boxwood Hedge Wall Behind Kerb
    sbox(0.45, 1.2, 13.4, -7.40, 0.60, 0, hedgeMat, group);

    // Italian Pencil Cypress Trees in Flamed Granite Planter Urns
    for (let pi = 0; pi < 6; pi++) {
      const z = -4.2 + pi * 1.75;
      // Cube Planter
      sbox(0.55, 0.45, 0.55, -6.6, 0.225, z, darkGraniteMat, group);
      // Slender Cypress Foliage
      const cypress = new THREE.Mesh(new THREE.ConeGeometry(0.36, 2.6, 8), M('#1e3d23', 0.65));
      cypress.position.set(-6.6, 1.65, z);
      cypress.castShadow = true;
      group.add(cypress);
      // Ground Uplight Spot
      cyl(0.05, 0.05, 0.06, -6.6, 0.47, z + 0.18, chromeTrimMat, group);
    }

    // ── 5. Architectural Steel & Teak Carport Pergola ──
    // Four Matte Black Steel Upright Columns
    box(0.18, 3.4, 0.18, 4.8, 1.7, -4.2, steelAnthraciteMat, group);
    box(0.18, 3.4, 0.18, 4.8, 1.7, 1.8, steelAnthraciteMat, group);
    box(0.18, 3.4, 0.18, -1.8, 1.7, -4.2, steelAnthraciteMat, group);
    box(0.18, 3.4, 0.18, -1.8, 1.7, 1.8, steelAnthraciteMat, group);
    // Roof Support Girders
    box(7.0, 0.18, 0.18, 1.5, 3.4, -4.2, steelAnthraciteMat, group);
    box(7.0, 0.18, 0.18, 1.5, 3.4, 1.8, steelAnthraciteMat, group);
    box(0.18, 0.18, 6.4, -1.8, 3.4, -1.2, steelAnthraciteMat, group);
    box(0.18, 0.18, 6.4, 4.8, 3.4, -1.2, steelAnthraciteMat, group);

    // Angled Natural Teak Louvers (Cast sharp diagonal architectural shadows)
    for (let li = 0; li < 16; li++) {
      const louver = box(6.8, 0.06, 0.15, 1.5, 3.52, -3.9 + li * 0.38, teakSoffitMat, group);
      louver.rotation.x = 0.28;
    }

    // ── 6. Villa Grand Entrance Porch, Steps & Double Door (Customizable: parking_porch) ──
    // Grand Entrance Porch Landing
    const parkingPorch = sbox(3.4, 0.38, 6.2, 6.35, 0.19, -1.2, porchDefaultMat, group);
    // Welcoming Dual Entrance Steps
    const parkingStep1 = sbox(0.70, 0.18, 5.8, 4.30, 0.09, -1.2, porchDefaultMat, group);
    const parkingStep2 = sbox(0.70, 0.18, 5.8, 4.85, 0.20, -1.2, porchDefaultMat, group);

    // Villa Modern Facade Wall
    sbox(0.30, 4.4, 8.2, 7.95, 2.2, -1.2, wallDefaultMat, group);

    // Grand Entrance Pivot Double Door
    box(0.08, 3.0, 1.8, 7.78, 1.70, -1.2, doorOakMat, group);
    // Satin Brass Full-Height Pull Handles
    cyl(0.02, 0.02, 1.8, 7.70, 1.70, -1.35, brassHandleMat, group);
    cyl(0.02, 0.02, 1.8, 7.70, 1.70, -1.05, brassHandleMat, group);
    // Sidelight Glass Panels
    box(0.04, 3.0, 0.40, 7.78, 1.70, -2.35, carGlassMat, group);
    box(0.04, 3.0, 0.40, 7.78, 1.70, -0.05, carGlassMat, group);

    // Cantilevered Entrance Portico Canopy
    box(3.6, 0.18, 6.4, 6.35, 3.5, -1.2, steelAnthraciteMat, group);
    // Teak Soffit Under Porch Canopy
    box(3.4, 0.04, 6.2, 6.35, 3.39, -1.2, teakSoffitMat, group);
    // Recessed Porch Downlight Fixture
    cyl(0.12, 0.12, 0.03, 6.35, 3.37, -1.2, warmLedMat, group);

    // Flamed Granite Entrance Planter Urns Flanking Door
    sbox(0.65, 0.75, 0.65, 6.2, 0.55, -3.2, darkGraniteMat, group);
    cyl(0.20, 0.12, 0.85, 6.2, 1.25, -3.2, M('#1e4225', 0.5), group);
    sbox(0.65, 0.75, 0.65, 6.2, 0.55, 0.8, darkGraniteMat, group);
    cyl(0.20, 0.12, 0.85, 6.2, 1.25, 0.8, M('#1e4225', 0.5), group);

    // ── 7. High-Fidelity Executive Luxury SUV ──
    const suvX = 1.5, suvZ = -1.2;

    // Chassis Underbody & Front/Rear Splitters
    box(2.05, 0.22, 4.45, suvX, 0.28, suvZ, steelAnthraciteMat, group);
    box(1.85, 0.08, 0.25, suvX, 0.24, suvZ - 2.25, chromeTrimMat, group);
    box(1.85, 0.12, 0.25, suvX, 0.28, suvZ + 2.25, steelAnthraciteMat, group);
    // Quad Chrome Exhaust Tips
    cyl(0.05, 0.05, 0.12, suvX - 0.65, 0.26, suvZ + 2.38, chromeTrimMat, group).rotation.x = Math.PI / 2;
    cyl(0.05, 0.05, 0.12, suvX - 0.50, 0.26, suvZ + 2.38, chromeTrimMat, group).rotation.x = Math.PI / 2;
    cyl(0.05, 0.05, 0.12, suvX + 0.50, 0.26, suvZ + 2.38, chromeTrimMat, group).rotation.x = Math.PI / 2;
    cyl(0.05, 0.05, 0.12, suvX + 0.65, 0.26, suvZ + 2.38, chromeTrimMat, group).rotation.x = Math.PI / 2;

    // Main Sculpted Body & Hood
    const carHood = box(2.10, 0.45, 1.75, suvX, 0.62, suvZ - 1.35, carPaintMat, group);
    const carCabin = box(1.82, 0.58, 2.40, suvX, 1.18, suvZ + 0.05, carGlassMat, group);
    const carRoof = box(1.78, 0.08, 2.15, suvX, 1.49, suvZ + 0.10, carPaintMat, group);
    const carTrunk = box(2.08, 0.55, 0.85, suvX, 0.68, suvZ + 1.80, carPaintMat, group);

    // Front Honeycomb Grille & Chrome Surround
    box(1.10, 0.32, 0.06, suvX, 0.54, suvZ - 2.24, steelAnthraciteMat, group);
    box(1.16, 0.36, 0.04, suvX, 0.54, suvZ - 2.22, chromeTrimMat, group);

    // High-Tech LED Matrix Headlights & DRL Lightbars
    box(0.42, 0.12, 0.06, suvX - 0.78, 0.64, suvZ - 2.22, carHeadlightMat, group);
    box(0.42, 0.12, 0.06, suvX + 0.78, 0.64, suvZ - 2.22, carHeadlightMat, group);

    // Full-Width Rear OLED Tail Lightbar
    box(1.92, 0.08, 0.06, suvX, 0.85, suvZ + 2.24, carTailLightMat, group);

    // Aerodynamic Side Mirrors
    box(0.24, 0.10, 0.14, suvX - 1.12, 0.98, suvZ - 0.85, carPaintMat, group);
    box(0.24, 0.10, 0.14, suvX + 1.12, 0.98, suvZ - 0.85, carPaintMat, group);

    // 4 High-Detail Turbine Alloy Wheels with Performance Tires
    function createWheel(wx, wz) {
      // Tire Rubber
      const tire = cyl(0.38, 0.38, 0.26, wx, 0.38, wz, carTireRubberMat, group);
      tire.rotation.z = Math.PI / 2;
      // Gunmetal Turbine Alloy Rim
      const rim = cyl(0.28, 0.28, 0.27, wx, 0.38, wz, carAlloyRimMat, group);
      rim.rotation.z = Math.PI / 2;
      // Red Sport Brake Caliper
      const caliper = box(0.08, 0.14, 0.10, wx + (wx > suvX ? -0.06 : 0.06), 0.44, wz, brakeCaliperMat, group);
      // Chrome Center Hubcap
      const hub = cyl(0.08, 0.08, 0.28, wx, 0.38, wz, chromeTrimMat, group);
      hub.rotation.z = Math.PI / 2;
    }
    createWheel(suvX - 1.02, suvZ - 1.40); // Front Left
    createWheel(suvX + 1.02, suvZ - 1.40); // Front Right
    createWheel(suvX - 1.02, suvZ + 1.40); // Rear Left
    createWheel(suvX + 1.02, suvZ + 1.40); // Rear Right

    // ── 8. Driveway Pathway Bollards ──
    for (let bi = 0; bi < 4; bi++) {
      const bz = -4.0 + bi * 2.75;
      cyl(0.055, 0.055, 0.72, -5.5, 0.36, bz, steelAnthraciteMat, group);
      cyl(0.058, 0.058, 0.08, -5.5, 0.68, bz, warmLedMat, group);
      // East Bollards
      cyl(0.055, 0.055, 0.72, 7.2, 0.36, bz, steelAnthraciteMat, group);
      cyl(0.058, 0.058, 0.08, 7.2, 0.68, bz, warmLedMat, group);
    }

    // ── Surface Registrations (Integrated with Visualizer Stone Palette) ──
    reg('parking', 'parking_floor', 'Heavy-Duty Driveway Floor', parkingFloor, null, 16, 14);
    reg('parking', 'parking_wall', 'Compound Boundary Wall', parkingBackWall, null, 16, 3.2);
    reg('parking', 'parking_wall', 'Compound Boundary Wall', parkingLeftWall, null, 0.35, 14);
    reg('parking', 'parking_wall', 'Compound Boundary Wall', pier1, null, 0.70, 3.5);
    reg('parking', 'parking_wall', 'Compound Boundary Wall', pier2, null, 0.70, 3.5);
    reg('parking', 'parking_wall', 'Compound Boundary Wall', pier3, null, 0.70, 3.5);
    reg('parking', 'parking_kerb', 'Flamed Granite Kerb', parkingKerbLeft, null, 0.38, 13.6);
    reg('parking', 'parking_kerb', 'Flamed Granite Kerb', parkingKerbBack, null, 12.4, 0.38);
    reg('parking', 'parking_porch', 'Entry Porch & Steps', parkingPorch, null, 3.4, 6.2);
    reg('parking', 'parking_porch', 'Entry Porch & Steps', parkingStep1, null, 0.70, 5.8);
    reg('parking', 'parking_porch', 'Entry Porch & Steps', parkingStep2, null, 0.70, 5.8);

    // ── Camera Views & Presets ──
    ROOM_CAMERAS.parking = {
      type: 'three',
      title: 'Luxury Villa Driveway & Parking Suite (3D WebGL)',
      subtitle: '• Heavy-Duty Granite Pavers & Compound Wall Cladding',
      hint: '<span class="text-[#E7C887] font-semibold">💡 Driveway Material Studio:</span> Customize <b>Heavy-Duty Driveway Floor</b>, <b>Boundary Wall Cladding</b>, <b>Kerb Stones</b>, or <b>Entry Porch &amp; Steps</b>.',
      defaultCam: 'drive_wide',
      cameras: [
        { id: 'drive_wide', label: '🚗 Driveway Overview', azimuth: Math.PI * 0.28, elevation: 0.38, distance: 18.5, target: [0.5, 0.8, -0.5] },
        { id: 'porch', label: '🏛️ Entrance Porch & Steps', azimuth: Math.PI * 1.66, elevation: 0.18, distance: 7.2, target: [6.35, 1.2, -1.2] },
        { id: 'wall', label: '🧱 Compound Wall & Landscaping', azimuth: Math.PI * 0.12, elevation: 0.24, distance: 10.5, target: [-4.5, 1.2, -2.5] },
        { id: 'carport', label: '🏎️ Executive Carport & SUV', azimuth: Math.PI * 0.65, elevation: 0.20, distance: 7.5, target: [1.5, 0.85, -1.2] },
        { id: 'detail', label: '📐 Paving Texture Detail', azimuth: Math.PI * 0.25, elevation: 0.14, distance: 5.5, target: [0.5, 0.1, 0.5] }
      ]
    };

    // ── Default Showroom Stones ──
    const pFloorStone = showroomSlabs.find(s => s.name === 'Sahara Beige Heavy-Duty Parking Tile') || showroomSlabs.find(s => s.name === 'Steel Grey') || presets[0];
    const pWallStone = showroomSlabs.find(s => s.name === 'Tan Brown') || showroomSlabs.find(s => s.name === 'Armani Gris GVT Matte Tile') || presets[0];
    const pKerbStone = showroomSlabs.find(s => s.name === 'Black Pearl') || showroomSlabs.find(s => s.name === 'Steel Grey') || presets[0];
    const pPorchStone = showroomSlabs.find(s => s.name === 'River White') || showroomSlabs.find(s => s.name === 'Calacatta Gold PGVT Tile') || presets[0];

    if (roomDefs.parking) {
      roomDefs.parking.camera = { azimuth: Math.PI * 0.28, elevation: 0.38, distance: 18.5, target: new THREE.Vector3(0.5, 0.8, -0.5) };
      if (roomDefs.parking.surfaces.parking_floor) {
        roomDefs.parking.surfaces.parking_floor.src = pFloorStone;
        roomDefs.parking.surfaces.parking_floor.set = { struct: 'tile60', mode: 'repeat', size: 0.6, rot: 0, gloss: 0.45, grout: 2.5 };
      }
      if (roomDefs.parking.surfaces.parking_wall) {
        roomDefs.parking.surfaces.parking_wall.src = pWallStone;
        roomDefs.parking.surfaces.parking_wall.set = { struct: 'slab', mode: 'repeat', size: 2.0, rot: 0, gloss: 0.75, grout: 2 };
      }
      if (roomDefs.parking.surfaces.parking_kerb) {
        roomDefs.parking.surfaces.parking_kerb.src = pKerbStone;
        roomDefs.parking.surfaces.parking_kerb.set = { struct: 'slab', mode: 'mirror', size: 1.8, rot: 0, gloss: 0.70, grout: 2 };
      }
      if (roomDefs.parking.surfaces.parking_porch) {
        roomDefs.parking.surfaces.parking_porch.src = pPorchStone;
        roomDefs.parking.surfaces.parking_porch.set = { struct: 'slab', mode: 'mirror', size: 2.4, rot: 0, gloss: 0.88, grout: 2 };
      }
    }
  };
})(window);
