/**
 * Murali Granites & Marbles — Utility Suite & Scullery 3D WebGL Room
 * Ultra-Realistic Architectural Scullery, Heavy-Duty Granite Worktop,
 * Undermount Double-Bowl Wash Station & Luxury Laundry Suite.
 */
(function (window) {
  'use strict';

  window.WebGlRooms = window.WebGlRooms || {};

  window.WebGlRooms.utility = function (ctx) {
    const { THREE, group, reg, roomDefs, ROOM_CAMERAS, core, showroomSlabs, presets } = ctx;
    const { M, box, cyl, sbox, plant, createPlasterTexture, createWoodTexture } = core;

    const maxAni = 4;
    const plasterTex = createPlasterTexture(maxAni);
    const woodTex = createWoodTexture ? createWoodTexture(maxAni, '#3c2c20') : null;

    // Materials Palette
    const wallMat = new THREE.MeshStandardMaterial({ map: plasterTex, roughness: 0.88 });
    const anthracite = new THREE.MeshStandardMaterial({ color: 0x202226, roughness: 0.35, metalness: 0.10 });
    const darkWood = woodTex ? new THREE.MeshStandardMaterial({ map: woodTex, roughness: 0.42, metalness: 0.05 }) : anthracite;
    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xf4f6f8, metalness: 0.96, roughness: 0.08 });
    const brushedSteel = new THREE.MeshStandardMaterial({ color: 0xc8cbcf, metalness: 0.90, roughness: 0.20 });
    const matteBlack = new THREE.MeshStandardMaterial({ color: 0x141517, roughness: 0.38, metalness: 0.65 });
    const applianceTitanium = new THREE.MeshStandardMaterial({ color: 0x32363d, metalness: 0.82, roughness: 0.25 });
    const applianceBezel = new THREE.MeshStandardMaterial({ color: 0xebf0f6, metalness: 0.98, roughness: 0.06 });
    const drumInterior = new THREE.MeshStandardMaterial({ color: 0x8a929d, metalness: 0.88, roughness: 0.28 });
    const glassDark = new THREE.MeshStandardMaterial({ color: 0x080a0c, roughness: 0.08, metalness: 0.85, transparent: true, opacity: 0.82 });
    const glassClear = new THREE.MeshStandardMaterial({ color: 0xd6ebf2, roughness: 0.05, metalness: 0.15, transparent: true, opacity: 0.32 });
    const ledWarm = new THREE.MeshStandardMaterial({ color: 0xffe2b0, emissive: 0xffcf80, emissiveIntensity: 2.2, roughness: 0.2 });
    const ledDisplayCyan = new THREE.MeshStandardMaterial({ color: 0x00f0ff, emissive: 0x00d8ff, emissiveIntensity: 2.2, roughness: 0.1 });
    const ledDisplayAmber = new THREE.MeshStandardMaterial({ color: 0xffaa00, emissive: 0xff9900, emissiveIntensity: 2.0, roughness: 0.1 });
    const waterMat = new THREE.MeshStandardMaterial({ color: 0x3d82a1, roughness: 0.05, metalness: 0.25, transparent: true, opacity: 0.70 });
    const linenWhite = new THREE.MeshStandardMaterial({ color: 0xedebe8, roughness: 0.92 });
    const linenTaupe = new THREE.MeshStandardMaterial({ color: 0xb5aa9c, roughness: 0.90 });
    const amberGlass = new THREE.MeshStandardMaterial({ color: 0xa86025, roughness: 0.15, metalness: 0.2, transparent: true, opacity: 0.78 });
    const copperMat = new THREE.MeshStandardMaterial({ color: 0xc87d55, metalness: 0.92, roughness: 0.25 });

    // Helper for front-facing (+Z) circular discs (e.g. appliance porthole doors, dials)
    function discZ(radius, thickness, x, y, z, mat, grp, segs = 32) {
      const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, thickness, segs), mat);
      mesh.rotation.x = Math.PI / 2;
      mesh.position.set(x, y, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      if (grp) grp.add(mesh);
      return mesh;
    }

    // ═════════════════════════════════════════════════════════════════════════
    // 1. LIGHTING SETUP (Architectural Task, Perimeter Sconces & Sun Grazing)
    // ═════════════════════════════════════════════════════════════════════════
    const utilitySun = new THREE.DirectionalLight(0xfff5ea, 3.2);
    utilitySun.position.set(7, 8, 2);
    utilitySun.castShadow = true;
    utilitySun.shadow.mapSize.set(2048, 2048);
    utilitySun.shadow.bias = -0.0003;
    utilitySun.shadow.radius = 2.0;
    group.add(utilitySun);

    const utilityFill = new THREE.DirectionalLight(0xd4e2f2, 1.25);
    utilityFill.position.set(-6, 6, 3);
    group.add(utilityFill);

    // Warm Grazing LED for Splashback Task Lighting
    const taskLight1 = new THREE.PointLight(0xffdfa8, 1.9, 4.8);
    taskLight1.position.set(-2.0, 2.15, -3.2);
    group.add(taskLight1);

    const taskLight2 = new THREE.PointLight(0xffdfa8, 1.7, 4.8);
    taskLight2.position.set(1.2, 2.15, -3.2);
    group.add(taskLight2);

    // Downlights
    const downlight1 = new THREE.SpotLight(0xfff4e6, 2.2, 10, Math.PI * 0.28, 0.4, 1.2);
    downlight1.position.set(-2.0, 3.7, -1.8);
    downlight1.target.position.set(-2.0, 0.9, -3.2);
    group.add(downlight1);
    group.add(downlight1.target);

    const downlight2 = new THREE.SpotLight(0xfff4e6, 2.0, 10, Math.PI * 0.28, 0.4, 1.2);
    downlight2.position.set(1.2, 3.7, -1.8);
    downlight2.target.position.set(1.2, 0.9, -3.2);
    group.add(downlight2);
    group.add(downlight2.target);

    // ═════════════════════════════════════════════════════════════════════════
    // 2. FLOOR & PERIMETER WALLS (Open-Top Soffit to prevent camera occlusion)
    // ═════════════════════════════════════════════════════════════════════════
    // Anti-Skid Heavy-Duty Flooring (Customizable: utility_floor)
    const floorGeo = new THREE.PlaneGeometry(10.5, 9.5);
    const utilityFloor = new THREE.Mesh(floorGeo, M('#2c2824', 0.65));
    utilityFloor.rotation.x = -Math.PI / 2;
    utilityFloor.position.set(0, 0.02, -0.2);
    utilityFloor.receiveShadow = true;
    group.add(utilityFloor);

    // Stainless Linear Floor Trench Drain in front of Scullery Worktop
    box(3.2, 0.02, 0.12, -1.6, 0.025, -2.0, brushedSteel, group);
    for (let di = 0; di < 28; di++) {
      box(0.04, 0.025, 0.08, -3.1 + di * 0.11, 0.026, -2.0, matteBlack, group);
    }

    // Main Scullery Back Wall
    sbox(10.5, 4.0, 0.22, 0, 2.0, -4.1, wallMat, group);
    // Left Wall
    sbox(0.22, 4.0, 9.5, -5.2, 2.0, -0.2, wallMat, group);
    // Right Wall with Window Cutout
    sbox(0.22, 4.0, 2.6, 5.2, 2.0, -3.65, wallMat, group);
    sbox(0.22, 4.0, 2.6, 5.2, 2.0, 3.25, wallMat, group);
    sbox(0.22, 0.9, 4.3, 5.2, 0.45, -0.2, wallMat, group); // window sill wall
    sbox(0.22, 0.7, 4.3, 5.2, 3.65, -0.2, wallMat, group); // window header wall

    // Architectural Perimeter Soffit Beams (Leaves camera open from front/top)
    box(10.5, 0.35, 0.85, 0, 3.82, -3.67, wallMat, group); // Back soffit
    box(0.85, 0.35, 9.5, -4.77, 3.82, -0.2, wallMat, group); // Left soffit
    box(0.85, 0.35, 9.5, 4.77, 3.82, -0.2, wallMat, group);  // Right soffit
    // Recessed Warm LED Cove Light Strip on Back Soffit
    box(9.2, 0.04, 0.04, 0, 3.65, -3.3, ledWarm, group);

    // ═════════════════════════════════════════════════════════════════════════
    // 3. SERVICE BALCONY / DRYING COURTYARD WINDOW & OUTDOOR VIEW
    // ═════════════════════════════════════════════════════════════════════════
    // Window Outer Frame (Black Aluminum)
    box(0.14, 2.4, 0.08, 5.18, 2.1, -2.35, matteBlack, group);
    box(0.14, 2.4, 0.08, 5.18, 2.1, 1.95, matteBlack, group);
    box(0.14, 0.08, 4.38, 5.18, 0.94, -0.2, matteBlack, group);
    box(0.14, 0.08, 4.38, 5.18, 3.26, -0.2, matteBlack, group);
    // Vertical Mullions
    box(0.12, 2.32, 0.06, 5.18, 2.1, -0.92, matteBlack, group);
    box(0.12, 2.32, 0.06, 5.18, 2.1, 0.52, matteBlack, group);
    // Clear Glazing Panes
    box(0.02, 2.24, 4.22, 5.18, 2.1, -0.2, glassClear, group);

    // Exterior Planter & Foliage outside the window
    box(0.6, 0.65, 4.8, 5.75, 0.32, -0.2, M('#383530', 0.8), group);
    const plantPotMat = M('#2a2824');
    const plantLeafMat = M('#284525', 0.4);
    const plantFn = (window.WebGlCore && window.WebGlCore.plant) || plant;
    plantFn(5.65, -1.6, 1.35, plantPotMat, plantLeafMat, group);
    plantFn(5.72, -0.5, 1.45, plantPotMat, plantLeafMat, group);
    plantFn(5.65, 0.6, 1.25, plantPotMat, plantLeafMat, group);
    plantFn(5.72, 1.5, 1.4, plantPotMat, plantLeafMat, group);

    // ═════════════════════════════════════════════════════════════════════════
    // 4. SCULLERY BASE CABINETS & CONTINUOUS MONOLITHIC COUNTERTOP SLAB
    // ═════════════════════════════════════════════════════════════════════════
    // Base Cabinetry (Spans from x = -4.9 to x = 0.0, leaving x = 0.0 to 2.1 open for appliances)
    box(4.9, 0.1, 0.74, -2.45, 0.05, -3.5, anthracite, group);

    // Anthracite Base Cabinets (Sink & Prep storage with recessed black J-pulls)
    box(4.9, 0.76, 0.82, -2.45, 0.48, -3.52, anthracite, group);
    for (let c = 0; c < 5; c++) {
      const cx = -4.4 + c * 0.98;
      box(0.015, 0.74, 0.02, cx, 0.48, -3.1, matteBlack, group);
      box(0.94, 0.035, 0.03, cx + 0.49, 0.84, -3.11, matteBlack, group);
    }

    // Heavy-Duty Monolithic Scullery Countertop Slab (Customizable: utility_counter)
    // Seamlessly spans 7.15m over cabinets AND laundry appliances
    const utilityCounter = sbox(7.15, 0.08, 0.88, -1.325, 0.90, -3.52, wallMat, group);
    // Waterfall Leg on Left Flank (Customizable: cascades down to floor)
    sbox(0.08, 0.88, 0.88, -4.9, 0.46, -3.52, wallMat, group);

    // Tall Pantry & Linen Storage Tower at the right end (x = 2.25 to 3.55)
    box(1.3, 3.8, 0.78, 2.9, 1.9, -3.57, darkWood, group);
    for (let t = 0; t < 2; t++) {
      box(0.015, 3.76, 0.02, 2.3 + t * 0.65, 1.9, -3.17, matteBlack, group);
      box(0.02, 0.9, 0.03, 2.3 + t * 0.65 + 0.32, 1.8, -3.16, chromeMat, group);
    }

    // ═════════════════════════════════════════════════════════════════════════
    // 5. UNDERMOUNT DOUBLE-BOWL SINK & COMMERCIAL HIGH-ARC SPRING FAUCET
    // ═════════════════════════════════════════════════════════════════════════
    // Sink Basin Cutout Recess Collar
    box(1.5, 0.02, 0.62, -2.1, 0.935, -3.48, brushedSteel, group);
    // Left Bowl (Commercial Deep Prep Basin)
    box(0.68, 0.36, 0.54, -2.48, 0.74, -3.48, brushedSteel, group);
    // Right Bowl (Soaking / Rinsing Basin)
    box(0.68, 0.36, 0.54, -1.72, 0.74, -3.48, brushedSteel, group);
    // Water surface inside right basin
    const sinkWater = box(0.66, 0.01, 0.52, -1.72, 0.76, -3.48, waterMat, group);
    // Dual Basket Strainer Drains
    cyl(0.065, 0.065, 0.015, -2.48, 0.57, -3.48, matteBlack, group);
    cyl(0.065, 0.065, 0.015, -1.72, 0.57, -3.48, matteBlack, group);
    // Stainless wire dish-drying rack over left bowl
    for (let r = 0; r < 7; r++) {
      box(0.008, 0.008, 0.52, -2.75 + r * 0.09, 0.938, -3.48, chromeMat, group);
    }

    // Commercial High-Arc Spring Spray Pre-Rinse Faucet
    cyl(0.042, 0.048, 0.12, -2.1, 0.98, -3.82, matteBlack, group);
    cyl(0.022, 0.022, 0.42, -2.1, 1.24, -3.82, chromeMat, group);
    cyl(0.034, 0.034, 0.32, -2.1, 1.56, -3.74, chromeMat, group);
    for (let sp = 0; sp < 6; sp++) {
      cyl(0.038, 0.038, 0.015, -2.1, 1.44 + sp * 0.045, -3.74, matteBlack, group);
    }
    box(0.024, 0.024, 0.28, -2.1, 1.28, -3.64, chromeMat, group);
    cyl(0.018, 0.014, 0.06, -2.1, 1.24, -3.50, chromeMat, group);
    cyl(0.028, 0.022, 0.16, -2.1, 1.40, -3.56, matteBlack, group);
    cyl(0.014, 0.014, 0.08, -2.26, 0.98, -3.82, chromeMat, group);
    cyl(0.014, 0.014, 0.08, -1.94, 0.98, -3.82, chromeMat, group);
    cyl(0.022, 0.026, 0.09, -1.66, 0.98, -3.82, matteBlack, group);

    // ═════════════════════════════════════════════════════════════════════════
    // 6. FULL-HEIGHT SPLASHBACK CLADDING WALL & UPPER STORAGE RUN
    // ═════════════════════════════════════════════════════════════════════════
    // Monolithic Splashback Dado Wall (Customizable: utility_backsplash)
    const utilityBacksplash = sbox(7.15, 1.32, 0.12, -1.325, 1.60, -3.98, wallMat, group);

    // Continuous Recessed Under-Cabinet Linear Warm LED Light
    box(7.1, 0.03, 0.03, -1.35, 2.25, -3.65, ledWarm, group);

    // Upper Heavy-Duty Storage Cabinetry
    box(7.1, 0.98, 0.44, -1.35, 2.76, -3.74, darkWood, group);
    for (let u = 0; u < 7; u++) {
      const ux = -4.35 + u * 1.01;
      box(0.015, 0.96, 0.02, ux, 2.76, -3.51, matteBlack, group);
    }

    // Brushed Stainless Hanging Utensil Rail with S-Hooks (Flush on splashback)
    cyl(0.010, 0.010, 2.4, -2.1, 1.76, -3.90, brushedSteel, group, 12);
    box(0.025, 0.025, 0.08, -3.2, 1.76, -3.94, matteBlack, group);
    box(0.025, 0.025, 0.08, -1.0, 1.76, -3.94, matteBlack, group);
    // Hanging tools
    box(0.035, 0.16, 0.02, -2.8, 1.65, -3.89, darkWood, group);
    box(0.045, 0.22, 0.02, -2.4, 1.62, -3.89, copperMat, group);
    box(0.040, 0.20, 0.02, -2.0, 1.63, -3.89, chromeMat, group);
    box(0.090, 0.28, 0.02, -1.4, 1.58, -3.89, linenTaupe, group);

    // ═════════════════════════════════════════════════════════════════════════
    // 7. DEDICATED LAUNDRY APPLIANCE SUITE & TALL NICHE CLADDING
    // ═════════════════════════════════════════════════════════════════════════
    // Stone Feature Return Cladding framing the right tall tower (Customizable: utility_accent_wall)
    const utilityAccentWall = sbox(0.12, 3.8, 0.88, 2.22, 1.9, -3.52, wallMat, group);

    // Twin High-End Commercial-Grade Front-Load Washer & Dryer (Miele / LG Signature Style)
    // 1. High-Performance Front-Load Washing Machine (Left Unit)
    const washerGrp = new THREE.Group();
    washerGrp.position.set(0.52, 0, -3.42);
    box(0.72, 0.85, 0.74, 0, 0.43, 0, applianceTitanium, washerGrp);
    // Circular Door Assemblies using front-facing discZ
    discZ(0.28, 0.035, 0, 0.44, 0.38, applianceBezel, washerGrp, 36);
    discZ(0.24, 0.040, 0, 0.44, 0.39, glassDark, washerGrp, 36);
    discZ(0.19, 0.015, 0, 0.44, 0.395, drumInterior, washerGrp, 24);
    // Handle
    box(0.03, 0.12, 0.025, 0.22, 0.44, 0.41, chromeMat, washerGrp);
    // Top Digital Display & Control Panel
    box(0.70, 0.14, 0.025, 0, 0.77, 0.375, matteBlack, washerGrp);
    const washerDisp = box(0.24, 0.055, 0.005, -0.16, 0.77, 0.39, ledDisplayCyan, washerGrp);
    discZ(0.038, 0.025, 0.12, 0.77, 0.39, chromeMat, washerGrp, 24);
    box(0.20, 0.07, 0.015, -0.22, 0.77, 0.382, applianceTitanium, washerGrp);
    group.add(washerGrp);

    // 2. High-Performance Heat-Pump Condenser Dryer (Right Unit)
    const dryerGrp = new THREE.Group();
    dryerGrp.position.set(1.42, 0, -3.42);
    box(0.72, 0.85, 0.74, 0, 0.43, 0, applianceTitanium, dryerGrp);
    discZ(0.28, 0.035, 0, 0.44, 0.38, applianceBezel, dryerGrp, 36);
    discZ(0.24, 0.040, 0, 0.44, 0.39, glassDark, dryerGrp, 36);
    discZ(0.19, 0.015, 0, 0.44, 0.395, drumInterior, dryerGrp, 24);
    box(0.03, 0.12, 0.025, -0.22, 0.44, 0.41, chromeMat, dryerGrp);
    // Top Digital Display & Control Panel
    box(0.70, 0.14, 0.025, 0, 0.77, 0.375, matteBlack, dryerGrp);
    const dryerDisp = box(0.24, 0.055, 0.005, 0.16, 0.77, 0.39, ledDisplayAmber, dryerGrp);
    discZ(0.038, 0.025, -0.12, 0.77, 0.39, chromeMat, dryerGrp, 24);
    group.add(dryerGrp);

    // Amber Apothecary Soap Dispensers on Counter
    cyl(0.042, 0.042, 0.16, -0.88, 0.99, -3.65, amberGlass, group);
    cyl(0.012, 0.012, 0.04, -0.88, 1.09, -3.65, matteBlack, group);
    cyl(0.042, 0.042, 0.16, -0.72, 0.99, -3.65, amberGlass, group);
    cyl(0.012, 0.012, 0.04, -0.72, 1.09, -3.65, matteBlack, group);

    // Stacked Folded Service Linens on Counter above Washer
    box(0.38, 0.12, 0.32, 0.52, 0.98, -3.55, linenWhite, group);
    box(0.36, 0.10, 0.30, 0.52, 1.08, -3.55, linenTaupe, group);

    // Glass Laundry Canisters on Counter above Dryer
    cyl(0.07, 0.07, 0.18, 1.30, 1.02, -3.68, glassClear, group);
    cyl(0.075, 0.075, 0.025, 1.30, 1.12, -3.68, darkWood, group);
    cyl(0.07, 0.07, 0.18, 1.55, 1.02, -3.68, amberGlass, group);
    cyl(0.075, 0.075, 0.025, 1.55, 1.12, -3.68, darkWood, group);

    // ═════════════════════════════════════════════════════════════════════════
    // 8. DYNAMIC ANIMATION LOOP (Subtle Appliance Pulse & Water Glisten)
    // ═════════════════════════════════════════════════════════════════════════
    window.WebGlAnimators = window.WebGlAnimators || [];
    window.WebGlAnimators.push(function animateUtility() {
      const t = performance.now() * 0.002;
      // Gentle breathing pulse for the appliance digital displays
      const pulse1 = 1.6 + 0.35 * Math.sin(t * 2.2);
      const pulse2 = 1.6 + 0.35 * Math.cos(t * 2.2);
      if (washerDisp && washerDisp.material) {
        washerDisp.material.emissiveIntensity = pulse1;
      }
      if (dryerDisp && dryerDisp.material) {
        dryerDisp.material.emissiveIntensity = pulse2;
      }
      // Subtle water shimmer in wash sink
      if (sinkWater) {
        sinkWater.position.y = 0.76 + 0.0015 * Math.sin(t * 3.0);
      }
    });

    // ═════════════════════════════════════════════════════════════════════════
    // 9. REGISTER 4 ARCHITECTURAL CUSTOMIZABLE SURFACES
    // ═════════════════════════════════════════════════════════════════════════
    reg('utility', 'utility_floor', 'Anti-Skid Utility Floor', utilityFloor, null, 10.5, 9.5);
    reg('utility', 'utility_counter', 'Heavy-Duty Scullery Countertop', utilityCounter, 2, 7.15, 0.88);
    reg('utility', 'utility_backsplash', 'Wash Dado Splashback Wall', utilityBacksplash, 4, 7.15, 1.32);
    reg('utility', 'utility_accent_wall', 'Service Tower Feature Cladding', utilityAccentWall, 1, 0.88, 3.8);

    // ═════════════════════════════════════════════════════════════════════════
    // 10. 5 CINEMATIC CAMERA PRESETS
    // ═════════════════════════════════════════════════════════════════════════
    ROOM_CAMERAS.utility = {
      type: 'three',
      title: 'Utility & Scullery Service Suite (3D WebGL)',
      subtitle: '• Heavy-Duty Granite Worktop & Laundry Station',
      hint: '<span class="text-[#E7C887] font-semibold">💡 Utility Suite Material Studio:</span> Select <b>Anti-Skid Floor</b>, <b>Scullery Countertop</b>, <b>Splashback Dado Wall</b>, or <b>Service Tower Cladding</b> to customize with showroom slabs in real-time.',
      defaultCam: 'util_front',
      cameras: [
        { id: 'util_front', label: '🧺 Scullery & Laundry Suite', azimuth: 0.10, elevation: 0.28, distance: 7.0, target: [-0.6, 1.25, -2.3] },
        { id: 'counter', label: '🚰 Prep Sink & Faucet', azimuth: 0.26, elevation: 0.24, distance: 4.5, target: [-2.0, 1.1, -3.3] },
        { id: 'appliances', label: '🧼 Washer & Dryer Station', azimuth: -0.16, elevation: 0.22, distance: 4.3, target: [1.0, 1.0, -3.2] },
        { id: 'backsplash', label: '🧱 Splashback & LED Dado', azimuth: 0.05, elevation: 0.18, distance: 4.0, target: [-1.0, 1.55, -3.6] },
        { id: 'floor', label: '📐 Anti-Skid Floor & Drains', azimuth: 0.35, elevation: 0.48, distance: 6.5, target: [0, 0.2, -1.2] }
      ]
    };

    // ═════════════════════════════════════════════════════════════════════════
    // 11. SHOWROOM DEFAULT STONES INITIALIZATION
    // ═════════════════════════════════════════════════════════════════════════
    const uFloorStone = showroomSlabs.find(s => s.name === 'Steel Grey') || showroomSlabs.find(s => s.name === 'River Black') || presets[0];
    const uCounterStone = showroomSlabs.find(s => s.name === 'Titanium Black') || showroomSlabs.find(s => s.name === 'Black Galaxy') || presets[0];
    const uSplashStone = showroomSlabs.find(s => s.name === 'Calacatta Gold PGVT Tile') || showroomSlabs.find(s => s.name === 'Statuario') || presets[0];
    const uAccentStone = showroomSlabs.find(s => s.name === 'Armani Grey PGVT Tile') || showroomSlabs.find(s => s.name === 'Alaska White') || presets[0];

    if (roomDefs.utility) {
      if (roomDefs.utility.surfaces.utility_floor) {
        roomDefs.utility.surfaces.utility_floor.src = uFloorStone;
        roomDefs.utility.surfaces.utility_floor.set = { struct: 'tile60', mode: 'repeat', size: 0.6, rot: 0, gloss: 0.40, grout: 2 };
      }
      if (roomDefs.utility.surfaces.utility_counter) {
        roomDefs.utility.surfaces.utility_counter.src = uCounterStone;
        roomDefs.utility.surfaces.utility_counter.set = { struct: 'slab', mode: 'mirror', size: 2.4, rot: 0, gloss: 0.94, grout: 1 };
      }
      if (roomDefs.utility.surfaces.utility_backsplash) {
        roomDefs.utility.surfaces.utility_backsplash.src = uSplashStone;
        roomDefs.utility.surfaces.utility_backsplash.set = { struct: 'slab', mode: 'mirror', size: 2.4, rot: 0, gloss: 0.92, grout: 1 };
      }
      if (roomDefs.utility.surfaces.utility_accent_wall) {
        roomDefs.utility.surfaces.utility_accent_wall.src = uAccentStone;
        roomDefs.utility.surfaces.utility_accent_wall.set = { struct: 'tile120', mode: 'repeat', size: 1.2, rot: 0, gloss: 0.75, grout: 2 };
      }
    }
  };
})(window);
