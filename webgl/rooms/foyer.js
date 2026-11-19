/**
 * Murali Granites & Marbles — Ultra-Realistic Grand Entrance Foyer & Luxury Vestibule
 * High-Fidelity PBR Architecture with Bookmatched Marble Wall, Waterjet Medallion & Crystal Chandelier
 */
(function (window) {
  'use strict';

  window.WebGlRooms = window.WebGlRooms || {};
  window.WebGlAnimators = window.WebGlAnimators || [];

  window.WebGlRooms.foyer = function (ctx) {
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

    // ── High-Resolution Architectural Textures ──
    const planksAlbedo = loadTex('V1/assets/exterior2/maps/exterior/planks/tile_AlbedoTransparency.jpg', 3, 3);
    const graniteWallAlbedo = loadTex('V1/assets/exterior2/maps/exterior/granite_wall/tile_AlbedoTransparency.jpg', 3, 2);
    const graniteWallNormal = loadTex('V1/assets/exterior2/maps/exterior/granite_wall/tile_Normal.jpg', 3, 2);
    const doorAlbedo = loadTex('V1/assets/interior2/maps/door/front/tile_AlbedoTransparency.jpg', 1, 1);
    const doorNormal = loadTex('V1/assets/interior2/maps/door/front/tile_Normal.jpg', 1, 1);

    // ── Architectural PBR Materials ──
    // High-Gloss Grand Entry Marble Floor (Reflective clearcoat)
    const floorDefaultMat = new THREE.MeshStandardMaterial({
      color: 0xf5f3ee,
      roughness: 0.04,
      metalness: 0.02
    });

    // Bookmatched Feature Wall Marble
    const wallDefaultMat = new THREE.MeshStandardMaterial({
      map: graniteWallAlbedo,
      normalMap: graniteWallNormal,
      roughness: 0.08,
      metalness: 0.04
    });

    // Central Stone Medallion Inlay
    const medallionDefaultMat = new THREE.MeshStandardMaterial({
      color: 0x181a1d,
      roughness: 0.06,
      metalness: 0.15
    });

    // Floating Console Table Stone
    const consoleDefaultMat = new THREE.MeshStandardMaterial({
      color: 0x141619,
      roughness: 0.05,
      metalness: 0.20
    });

    // Architectural Wall Perimeter Plaster
    const perimeterWallMat = new THREE.MeshStandardMaterial({
      color: 0xf2ece4,
      roughness: 0.82
    });

    // Acoustic Walnut Timber Slats
    const walnutSlatMat = new THREE.MeshStandardMaterial({
      map: planksAlbedo,
      color: 0x3d2617,
      roughness: 0.45,
      metalness: 0.02
    });

    // Brushed Satin Brass & Gold Hardware
    const satinBrassMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.92,
      roughness: 0.18
    });

    const polishedChromeMat = new THREE.MeshStandardMaterial({
      color: 0xf5f5f7,
      metalness: 0.98,
      roughness: 0.04
    });

    const darkGraniteMat = new THREE.MeshStandardMaterial({
      color: 0x141416,
      roughness: 0.22,
      metalness: 0.35
    });

    // Warm Architectural LED Ribbon & Cove Lighting
    const warmCoveLedMat = new THREE.MeshStandardMaterial({
      color: 0xfff0d8,
      emissive: new THREE.Color(0xffbf66),
      emissiveIntensity: 1.4,
      roughness: 0.3
    });

    // Grand Backlit Statement Mirror (Smoky Bronze Tint)
    const mirrorGlassMat = new THREE.MeshStandardMaterial({
      color: 0xd8c8b0,
      metalness: 0.96,
      roughness: 0.02
    });

    // Chandelier Refractive Crystals
    const crystalGlassMat = new THREE.MeshStandardMaterial({
      color: 0xfffcf7,
      transparent: true,
      opacity: 0.78,
      roughness: 0.02,
      metalness: 0.15
    });

    // Pivot Entrance Door (Chevron Dark Oak)
    const pivotDoorMat = new THREE.MeshStandardMaterial({
      map: doorAlbedo,
      normalMap: doorNormal,
      color: 0x482d18,
      roughness: 0.36,
      metalness: 0.02
    });

    // Reeded / Fluted Sidelight Glass
    const reededGlassMat = new THREE.MeshStandardMaterial({
      color: 0xe0eef5,
      transparent: true,
      opacity: 0.55,
      roughness: 0.25,
      metalness: 0.10
    });

    // ── 1. Lighting: Grand Chandelier & Perimeter Warm Sconces ──
    const foyerSun = new THREE.DirectionalLight(0xfff5ea, 2.8);
    foyerSun.position.set(-7, 12, 6);
    foyerSun.castShadow = true;
    foyerSun.shadow.mapSize.set(2048, 2048);
    foyerSun.shadow.bias = -0.0004;
    foyerSun.shadow.radius = 2.0;
    group.add(foyerSun);

    // Warm Central Chandelier Point Light (Suspended at ceiling)
    const chandelierLight = new THREE.PointLight(0xffe1b2, 2.9, 9.5);
    chandelierLight.position.set(0, 3.2, 0);
    group.add(chandelierLight);

    // Feature Wall Grazing Spotlights
    const wallSpotL = new THREE.SpotLight(0xffecd0, 2.0, 7.0, Math.PI / 4, 0.4);
    wallSpotL.position.set(-2.2, 4.1, -2.5);
    wallSpotL.target.position.set(-2.2, 2.0, -4.8);
    group.add(wallSpotL); group.add(wallSpotL.target);

    const wallSpotR = new THREE.SpotLight(0xffecd0, 2.0, 7.0, Math.PI / 4, 0.4);
    wallSpotR.position.set(2.2, 4.1, -2.5);
    wallSpotR.target.position.set(2.2, 2.0, -4.8);
    group.add(wallSpotR); group.add(wallSpotR.target);

    // ── 2. Grand Entry Marble Floor (Customizable: foyer_floor) ──
    const foyerFloor = new THREE.Mesh(new THREE.PlaneGeometry(12, 10), floorDefaultMat);
    foyerFloor.rotation.x = -Math.PI / 2;
    foyerFloor.position.set(0, 0.005, 0);
    foyerFloor.receiveShadow = true;
    group.add(foyerFloor);

    // Perimeter Dark Granite Floor Border Band (Frames the room)
    sbox(12.0, 0.015, 0.35, 0, 0.01, -4.75, darkGraniteMat, group);
    sbox(12.0, 0.015, 0.35, 0, 0.01, 4.75, darkGraniteMat, group);
    sbox(0.35, 0.015, 9.5, -5.75, 0.01, 0, darkGraniteMat, group);
    sbox(0.35, 0.015, 9.5, 5.75, 0.01, 0, darkGraniteMat, group);

    // Brass Inlay Separation Strip (0.02m gold stringline)
    box(11.3, 0.018, 0.02, 0, 0.012, -4.56, satinBrassMat, group);
    box(11.3, 0.018, 0.02, 0, 0.012, 4.56, satinBrassMat, group);
    box(0.02, 0.018, 9.14, -5.56, 0.012, 0, satinBrassMat, group);
    box(0.02, 0.018, 9.14, 5.56, 0.012, 0, satinBrassMat, group);

    // ── 3. Central Waterjet Geometric Stone Medallion (Customizable: foyer_medallion) ──
    // Outer Octagonal Medallion Frame
    const foyerMedallionOuter = sbox(4.8, 0.02, 4.8, 0, 0.016, 0, darkGraniteMat, group);
    // Polished Brass Inlay Octagon Ring
    box(4.84, 0.022, 0.04, 0, 0.018, -2.4, satinBrassMat, group);
    box(4.84, 0.022, 0.04, 0, 0.018, 2.4, satinBrassMat, group);
    box(0.04, 0.022, 4.84, -2.4, 0.018, 0, satinBrassMat, group);
    box(0.04, 0.022, 4.84, 2.4, 0.018, 0, satinBrassMat, group);

    // Inner Geometric 8-Point Diamond Star Medallion (Customizable with foyer_medallion)
    const foyerMedallion = sbox(4.2, 0.022, 4.2, 0, 0.02, 0, medallionDefaultMat, group);
    // 45-Degree Rotated Diamond Overlay Star
    const medallionDiamond = sbox(3.0, 0.024, 3.0, 0, 0.022, 0, medallionDefaultMat, group);
    medallionDiamond.rotation.y = Math.PI / 4;

    // Central Polished Brass Medallion Boss & Star
    cyl(0.38, 0.38, 0.026, 0, 0.024, 0, satinBrassMat, group);
    const centerStar = box(0.55, 0.028, 0.55, 0, 0.025, 0, satinBrassMat, group);
    centerStar.rotation.y = Math.PI / 4;

    // ── 4. Double-Height Ceiling & Multi-Tier Crystal Chandelier ──
    // Ceiling Base
    const ceiling = sbox(12, 0.15, 10, 0, 4.35, 0, perimeterWallMat, group);
    // Recessed Tray Ceiling Well
    sbox(7.2, 0.25, 6.4, 0, 4.35, 0, perimeterWallMat, group);
    // Concealed Tray Cove LED Light Ribbon
    box(7.0, 0.04, 0.04, 0, 4.22, -3.1, warmCoveLedMat, group);
    box(7.0, 0.04, 0.04, 0, 4.22, 3.1, warmCoveLedMat, group);
    box(0.04, 0.04, 6.2, -3.45, 4.22, 0, warmCoveLedMat, group);
    box(0.04, 0.04, 6.2, 3.45, 4.22, 0, warmCoveLedMat, group);

    // Chandelier Brass Canopy Mount
    cyl(0.32, 0.32, 0.06, 0, 4.30, 0, satinBrassMat, group);
    // Suspended Brass Center Rod
    cyl(0.025, 0.025, 0.95, 0, 3.80, 0, satinBrassMat, group);

    // Multi-Tier Concentric Crystal Chandelier Rings
    // Tier 1 (Top Ring: 1.6m diameter)
    cyl(0.80, 0.80, 0.05, 0, 3.40, 0, satinBrassMat, group);
    for (let ci = 0; ci < 24; ci++) {
      const ca = (ci / 24) * Math.PI * 2;
      const prism = box(0.05, 0.45, 0.05, Math.sin(ca) * 0.78, 3.15, Math.cos(ca) * 0.78, crystalGlassMat, group);
      prism.rotation.y = ca;
    }

    // Tier 2 (Middle Ring: 1.1m diameter)
    cyl(0.55, 0.55, 0.05, 0, 3.10, 0, satinBrassMat, group);
    for (let ci = 0; ci < 18; ci++) {
      const ca = (ci / 18) * Math.PI * 2;
      const prism = box(0.05, 0.50, 0.05, Math.sin(ca) * 0.53, 2.80, Math.cos(ca) * 0.53, crystalGlassMat, group);
      prism.rotation.y = ca;
    }

    // Tier 3 (Bottom Ring: 0.65m diameter)
    cyl(0.32, 0.32, 0.05, 0, 2.75, 0, satinBrassMat, group);
    for (let ci = 0; ci < 12; ci++) {
      const ca = (ci / 12) * Math.PI * 2;
      const prism = box(0.05, 0.40, 0.05, Math.sin(ca) * 0.30, 2.50, Math.cos(ca) * 0.30, crystalGlassMat, group);
      prism.rotation.y = ca;
    }

    // ── 5. Bookmatched Feature Accent Wall & Acoustic Wood Slats (Customizable: foyer_accent_wall) ──
    // Perimeter Back Wall
    sbox(12, 4.4, 0.25, 0, 2.2, -4.95, perimeterWallMat, group);
    // Left & Right Walls
    sbox(0.25, 4.4, 10, -5.95, 2.2, 0, perimeterWallMat, group);
    sbox(0.25, 4.4, 10, 5.95, 2.2, 0, perimeterWallMat, group);

    // Central Monolithic Bookmatched Feature Wall (Customizable in 3D: foyer_accent_wall)
    const foyerAccentWall = sbox(6.4, 4.1, 0.22, 0, 2.05, -4.80, wallDefaultMat, group);

    // Left & Right Fluted Acoustic Walnut Wall Paneling (Framing the marble wall)
    for (let si = 0; si < 16; si++) {
      // Left Fluted Slats
      box(0.065, 4.1, 0.065, -3.85 - si * 0.11, 2.05, -4.78, walnutSlatMat, group);
      // Right Fluted Slats
      box(0.065, 4.1, 0.065, 3.85 + si * 0.11, 2.05, -4.78, walnutSlatMat, group);
    }
    // Concealed Vertical Warm LED Light Strips Between Slats & Marble
    box(0.03, 4.0, 0.04, -3.25, 2.05, -4.74, warmCoveLedMat, group);
    box(0.03, 4.0, 0.04, 3.25, 2.05, -4.74, warmCoveLedMat, group);

    // ── 6. Cantilevered Floating Stone Waterfall Console Table (Customizable: foyer_console) ──
    // Console Main Top Slab (Floating at 0.88m)
    const foyerConsole = sbox(3.4, 0.14, 0.55, 0, 0.88, -4.35, consoleDefaultMat, group);
    // Waterfall Side Slabs (Grounded to floor)
    const consoleLegL = sbox(0.14, 0.88, 0.55, -1.63, 0.44, -4.35, consoleDefaultMat, group);
    const consoleLegR = sbox(0.14, 0.88, 0.55, 1.63, 0.44, -4.35, consoleDefaultMat, group);
    // Brushed Brass Trim Under Top Edge
    box(3.2, 0.025, 0.50, 0, 0.80, -4.35, satinBrassMat, group);

    // Grand Backlit Statement Mirror (1.8m diameter circular bronze mirror)
    // Halo LED Backlight
    cyl(0.92, 0.92, 0.02, 0, 2.35, -4.71, warmCoveLedMat, group);
    // Satin Brass Mirror Frame Ring
    cyl(0.90, 0.90, 0.035, 0, 2.35, -4.70, satinBrassMat, group);
    // Smoky Bronze Mirror Reflective Surface
    cyl(0.85, 0.85, 0.04, 0, 2.35, -4.68, mirrorGlassMat, group);

    // Console Luxury Decor: Hand-blown glass vase, florals, and key tray
    // Fluted Glass Flower Vase
    cyl(0.10, 0.06, 0.45, -0.95, 1.18, -4.35, crystalGlassMat, group);
    // Fresh Magnolia / Lily Stems
    cyl(0.015, 0.015, 0.65, -0.95, 1.45, -4.35, M('#354a28', 0.6), group);
    cyl(0.12, 0.04, 0.22, -0.92, 1.75, -4.32, M('#faf8f5', 0.2), group);
    cyl(0.12, 0.04, 0.22, -0.98, 1.68, -4.38, M('#faf8f5', 0.2), group);

    // Satin Brass Sculptural Key & Object Tray
    cyl(0.24, 0.20, 0.04, 0.85, 0.97, -4.35, satinBrassMat, group);
    // Luxury Art Coffee-Table Hardcover Books Stacked
    box(0.34, 0.04, 0.26, 0, 0.97, -4.35, M('#1a1a1c', 0.3), group);
    box(0.30, 0.04, 0.24, 0.02, 1.01, -4.34, M('#8c6d46', 0.4), group);

    // ── 7. Villa Grand Entrance Pivot Double Door ──
    // Door Opening Frame in Matte Anthracite
    box(0.16, 3.4, 2.6, -5.85, 1.70, 0.8, darkGraniteMat, group);
    // Pivot Double Doors in Chevron Dark Oak
    const doorLeaf1 = box(0.08, 3.2, 1.15, -5.80, 1.60, 0.25, pivotDoorMat, group);
    const doorLeaf2 = box(0.08, 3.2, 1.15, -5.80, 1.60, 1.45, pivotDoorMat, group);

    // Full-Height Vertical Satin Brass Pull Bars (2.2m tall)
    cyl(0.022, 0.022, 2.2, -5.72, 1.60, 0.75, satinBrassMat, group);
    cyl(0.022, 0.022, 2.2, -5.72, 1.60, 0.95, satinBrassMat, group);

    // Floor-to-Ceiling Reeded Sidelight Glass Panels (Filtered daylight)
    box(0.04, 3.2, 0.45, -5.85, 1.60, -0.60, reededGlassMat, group);
    box(0.04, 3.2, 0.45, -5.85, 1.60, 2.30, reededGlassMat, group);

    // ── 8. Architectural Greenery: Flamed Granite Planter Urns ──
    for (let pz of [-3.8, 3.8]) {
      // Fluted Cylindrical Stone Urn
      cyl(0.38, 0.32, 0.75, -4.8, 0.375, pz, darkGraniteMat, group);
      // Soil
      cyl(0.30, 0.30, 0.05, -4.8, 0.75, pz, M('#201a14', 0.95), group);
      // Tall Fiddle Leaf Fig Tree Trunk & Foliage
      cyl(0.04, 0.03, 1.5, -4.8, 1.45, pz, M('#483424', 0.6), group);
      for (let li = 0; li < 6; li++) {
        const la = (li / 6) * Math.PI * 2;
        const leaf = box(0.28, 0.02, 0.45, -4.8 + Math.sin(la) * 0.22, 1.8 + li * 0.14, pz + Math.cos(la) * 0.22, M('#1e3d23', 0.4), group);
        leaf.rotation.y = la;
        leaf.rotation.x = 0.25;
      }
      // Architectural Uplight Spot
      cyl(0.05, 0.05, 0.06, -4.8, 0.78, pz + 0.16, polishedChromeMat, group);
    }

    // ── Surface Registrations (Integrated with Visualizer Stone Palette) ──
    reg('foyer', 'foyer_floor', 'Grand Entry Floor', foyerFloor, null, 12, 10);
    reg('foyer', 'foyer_medallion', 'Waterjet Medallion Accent', foyerMedallion, null, 4.2, 4.2);
    reg('foyer', 'foyer_medallion', 'Waterjet Medallion Accent', medallionDiamond, null, 3.0, 3.0);
    reg('foyer', 'foyer_accent_wall', 'Bookmatched Accent Wall', foyerAccentWall, null, 6.4, 4.1);
    reg('foyer', 'foyer_console', 'Console Table Top', foyerConsole, null, 3.4, 0.55);
    reg('foyer', 'foyer_console', 'Console Table Top', consoleLegL, null, 0.14, 0.88);
    reg('foyer', 'foyer_console', 'Console Table Top', consoleLegR, null, 0.14, 0.88);

    // ── Camera Views & Presets ──
    ROOM_CAMERAS.foyer = {
      type: 'three',
      title: 'Grand Entrance Foyer Suite (3D WebGL)',
      subtitle: '• Waterjet Medallions & Bookmatched Marble Entry',
      hint: '<span class="text-[#E7C887] font-semibold">💡 Foyer Material Studio:</span> Select <b>Grand Entry Floor</b>, <b>Medallion Accent</b>, <b>Bookmatched Wall</b>, or <b>Console Table</b>.',
      defaultCam: 'foyer_front',
      cameras: [
        { id: 'foyer_front', label: '🏛️ Grand Foyer View', azimuth: Math.PI * 0.02, elevation: 0.26, distance: 9.8, target: [0, 1.6, -1.8] },
        { id: 'medallion', label: '⚜️ Floor Medallion Inlay', azimuth: Math.PI * 0.22, elevation: 0.58, distance: 6.8, target: [0, 0.05, 0] },
        { id: 'console', label: '🪞 Accent Wall & Console', azimuth: Math.PI * 0.04, elevation: 0.22, distance: 5.8, target: [0, 1.6, -4.2] },
        { id: 'door', label: '🚪 Grand Pivot Entrance Door', azimuth: Math.PI * 0.68, elevation: 0.20, distance: 6.5, target: [-5.2, 1.6, 0.8] },
        { id: 'chandelier', label: '💎 Chandelier & Ceiling Cove', azimuth: Math.PI * 0.05, elevation: 0.08, distance: 5.2, target: [0, 3.2, 0] }
      ]
    };

    // ── Default Showroom Stones ──
    const fFloorStone = showroomSlabs.find(s => s.name === 'Calacatta Gold PGVT Tile') || showroomSlabs.find(s => s.name === 'Banswara Marble') || presets[0];
    const fMedallionStone = showroomSlabs.find(s => s.name === 'River Black') || showroomSlabs.find(s => s.name === 'Black Forrest') || presets[0];
    const fAccentStone = showroomSlabs.find(s => s.name === 'Emerald Onyx Marble') || showroomSlabs.find(s => s.name === 'Calacatta White') || presets[0];
    const fConsoleStone = showroomSlabs.find(s => s.name === 'Titanium Black') || showroomSlabs.find(s => s.name === 'Black Pearl') || presets[0];

    if (roomDefs.foyer) {
      roomDefs.foyer.camera = { azimuth: Math.PI * 0.02, elevation: 0.26, distance: 9.8, target: new THREE.Vector3(0, 1.6, -1.8) };
      if (roomDefs.foyer.surfaces.foyer_floor) {
        roomDefs.foyer.surfaces.foyer_floor.src = fFloorStone;
        roomDefs.foyer.surfaces.foyer_floor.set = { struct: 'tile120', mode: 'repeat', size: 1.2, rot: 0, gloss: 0.95, grout: 1.5 };
      }
      if (roomDefs.foyer.surfaces.foyer_medallion) {
        roomDefs.foyer.surfaces.foyer_medallion.src = fMedallionStone;
        roomDefs.foyer.surfaces.foyer_medallion.set = { struct: 'slab', mode: 'mirror', size: 2.4, rot: 0, gloss: 0.96, grout: 1 };
      }
      if (roomDefs.foyer.surfaces.foyer_accent_wall) {
        roomDefs.foyer.surfaces.foyer_accent_wall.src = fAccentStone;
        roomDefs.foyer.surfaces.foyer_accent_wall.set = { struct: 'slab', mode: 'mirror', size: 2.4, rot: 0, gloss: 0.94, grout: 1.5 };
      }
      if (roomDefs.foyer.surfaces.foyer_console) {
        roomDefs.foyer.surfaces.foyer_console.src = fConsoleStone;
        roomDefs.foyer.surfaces.foyer_console.set = { struct: 'slab', mode: 'mirror', size: 2.4, rot: 0, gloss: 0.96, grout: 1 };
      }
    }
  };
})(window);
