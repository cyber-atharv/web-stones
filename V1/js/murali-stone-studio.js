/**
 * Murali Granites & Marbles — 3D Architectural Showroom Studio (Visualizer 3.0)
 * Real-time Stone Slabs & Tile Grid Engine with Anti-Glare PBR Calibration
 */
(function () {
  'use strict';

  // Determine asset paths based on page location
  const isInsideV1 = window.location.pathname.includes('/V1/') || window.location.pathname.endsWith('/V1');
  const ASSET_PREFIX = isInsideV1 ? '../assets/' : 'assets/';
  const API_PREFIX = isInsideV1 ? '../api/' : 'api/';

  // 48 Showroom Stones with top 12 Signature badging
  const SHOWROOM_STONES = [
    { slug: 'black-forest', name: 'Black Forest', cat: 'Granite', sig: true, color: '#1a1a1a', finish: 'Polished / Leather' },
    { slug: 'statuario-marble', name: 'Statuario Marble', cat: 'Marble', sig: true, color: '#eef0f2', finish: 'Bookmatched Polish' },
    { slug: 'lakha-red', name: 'Lakha Red', cat: 'Granite', sig: true, color: '#8b2522', finish: 'High Gloss' },
    { slug: 'river-black', name: 'River Black', cat: 'Granite', sig: true, color: '#222326', finish: 'Honed / Flamed' },
    { slug: 'carrara-marble', name: 'Carrara Marble', cat: 'Marble', sig: true, color: '#e8eaec', finish: 'Polished' },
    { slug: 'titanium-gold', name: 'Titanium Gold', cat: 'Granite', sig: true, color: '#3d3428', finish: 'Polished Luxury' },
    { slug: 'kashmir-white', name: 'Kashmir White', cat: 'Granite', sig: true, color: '#dcd9d4', finish: 'Polished' },
    { slug: 'blue-in-the-night', name: 'Blue in the Night', cat: 'Granite', sig: true, color: '#161d2d', finish: 'Specular Sparkle' },
    { slug: 'emerald-onyx', name: 'Emerald Onyx', cat: 'Onyx', sig: true, color: '#2d5a43', finish: 'Translucent Backlit' },
    { slug: 'tan-brown', name: 'Tan Brown', cat: 'Granite', sig: true, color: '#4a2e24', finish: 'High Polish' },
    { slug: 'hassan-green', name: 'Hassan Green', cat: 'Granite', sig: true, color: '#22382e', finish: 'Polished' },
    { slug: 'paradiso', name: 'Paradiso Granite', cat: 'Granite', sig: true, color: '#543d4c', finish: 'Multi-Color Veined' },
    { slug: 'black-pearl', name: 'Black Pearl', cat: 'Granite', sig: false, color: '#1f2022', finish: 'Polished' },
    { slug: 'marie-gold', name: 'Marie Gold', cat: 'Granite', sig: false, color: '#c49a45', finish: 'Polished' },
    { slug: 'banswara-marble', name: 'Banswara Marble', cat: 'Marble', sig: false, color: '#edece8', finish: 'Polished' },
    { slug: 'chima-pink', name: 'Chima Pink', cat: 'Granite', sig: false, color: '#d99b9b', finish: 'Polished' },
    { slug: 'viscon-white', name: 'Viscon White', cat: 'Granite', sig: false, color: '#d8d7d4', finish: 'Wavy Polished' },
    { slug: 'steel-grey', name: 'Steel Grey', cat: 'Granite', sig: false, color: '#4a4d52', finish: 'Leathered / Polished' },
    { slug: 'colonial-white', name: 'Colonial White', cat: 'Granite', sig: false, color: '#e3dfd7', finish: 'Polished' },
    { slug: 'alaska-white', name: 'Alaska White', cat: 'Granite', sig: false, color: '#e5e3de', finish: 'Exotic Polish' },
    { slug: 'red-granite', name: 'Jhansi Red', cat: 'Granite', sig: false, color: '#962b29', finish: 'Polished' },
    { slug: 'black-galaxy', name: 'Black Galaxy', cat: 'Granite', sig: false, color: '#151517', finish: 'Golden Fleck' },
    { slug: 'makrana-white', name: 'Makrana Pure White', cat: 'Marble', sig: false, color: '#f7f6f2', finish: 'Traditional Polish' },
    { slug: 'toronto-marble', name: 'Toronto Marble', cat: 'Marble', sig: false, color: '#cfcbc4', finish: 'Polished' },
    { slug: 'spider-green', name: 'Spider Green Marble', cat: 'Marble', sig: false, color: '#1b4d3e', finish: 'Polished Vein' },
    { slug: 'rainforest-brown', name: 'Rainforest Brown', cat: 'Marble', sig: false, color: '#614638', finish: 'Antiqued' },
    { slug: 'crystal-yellow', name: 'Crystal Yellow', cat: 'Granite', sig: false, color: '#d8b86d', finish: 'Polished' },
    { slug: 'vizag-blue', name: 'Vizag Blue', cat: 'Granite', sig: false, color: '#2c3e50', finish: 'Polished' },
    { slug: 'rosy-pink', name: 'Rosy Pink Granite', cat: 'Granite', sig: false, color: '#d18c94', finish: 'Polished' },
    { slug: 'desert-brown', name: 'Desert Brown', cat: 'Granite', sig: false, color: '#7a5a43', finish: 'Polished' },
    { slug: 'sliver-white', name: 'Silver White', cat: 'Granite', sig: false, color: '#e2e2e0', finish: 'Polished' },
    { slug: 'moon-white', name: 'Moon White', cat: 'Granite', sig: false, color: '#dddcd8', finish: 'Polished' }
  ];

  // Anti-glare finish configurations (specifically calibrated for mobile reflection control)
  const FINISH_CONFIGS = {
    'honed': {
      label: 'Honed Satin',
      desc: 'Soft architectural diffusion, subtle sheen, zero harsh glare (Recommended for Mobile)',
      gloss: 0.38,
      f0: 0.035,
      normalScale: 0.70
    },
    'polished': {
      label: 'Polished High Gloss',
      desc: 'Deep mirror reflection with calibrated non-metallic dielectric Fresnel',
      gloss: 0.68,
      f0: 0.055,
      normalScale: 0.45
    },
    'matte': {
      label: 'Natural Matte',
      desc: 'Raw quarried stone texture, zero specular reflections, ultra-tactile',
      gloss: 0.15,
      f0: 0.020,
      normalScale: 0.85
    }
  };

  // Tile format configurations
  const FORMAT_CONFIGS = {
    'slab': {
      label: 'Grand Slab',
      desc: 'Monolithic continuous bookmatched surface (Zero grout line)',
      grout: 0,
      repeatFloor: [2, 2],
      repeatWall: [2, 1.5],
      repeatTable: [1, 1]
    },
    'tile-60': {
      label: 'Tile 60×60',
      desc: 'Classic square tile grid with recessed 3D grout channels',
      grout: 2,
      repeatFloor: [6, 6],
      repeatWall: [4, 3],
      repeatTable: [3, 2]
    },
    'tile-120': {
      label: 'Tile 120×60',
      desc: 'Contemporary grand format rectangular slab grid',
      grout: 2,
      repeatFloor: [3, 6],
      repeatWall: [2, 3],
      repeatTable: [1, 2]
    },
    'brick': {
      label: 'Subway Brick',
      desc: 'Staggered architectural running bond pattern',
      grout: 2,
      repeatFloor: [8, 8],
      repeatWall: [6, 4],
      repeatTable: [4, 3]
    }
  };

  // State
  const state = {
    activeSurface: 'floor', // 'floor', 'wall_accent', 'wall_main', 'table_top'
    activeStone: SHOWROOM_STONES[0],
    activeFinish: 'honed',  // Default to honed to prevent mobile white glare!
    activeFormat: 'slab',
    reflectivityPercent: 40,
    isOpen: true,
    filterCat: 'all',
    searchQuery: '',
    surfaces: {
      'floor': { stone: SHOWROOM_STONES[0], finish: 'honed', format: 'slab' },
      'wall_accent': { stone: SHOWROOM_STONES[1], finish: 'honed', format: 'slab' },
      'wall_main': { stone: null, finish: 'matte', format: 'slab' },
      'table_top': { stone: SHOWROOM_STONES[5], finish: 'polished', format: 'slab' }
    }
  };

  // Texture caches
  const textureCache = new Map();
  const normalCache = new Map();

  // Reference to 3D scene objects
  let showroomScene = null;
  let showroomApp = null;
  const surfaceMeshes = {};

  /**
   * Initialize Studio when showroom scene is ready
   */
  function initStudio(app, scene) {
    showroomApp = app || window.showroomApp;
    showroomScene = scene || (showroomApp && (showroomApp.scene || showroomApp.scenes[2]));

    if (!showroomScene) {
      console.warn('[MuraliStudio] Waiting for showroom scene...');
      return;
    }

    // Locate target meshes in interior2 scene
    surfaceMeshes['floor'] = showroomScene.getObjectByName('floor');
    surfaceMeshes['wall_accent'] = showroomScene.getObjectByName('walls.001');
    surfaceMeshes['wall_main'] = showroomScene.getObjectByName('walls');
    surfaceMeshes['table_top'] = showroomScene.getObjectByName('table_top');
    surfaceMeshes['coffee_table'] = showroomScene.getObjectByName('board');

    console.log('[MuraliStudio] Surface meshes identified:', {
      floor: !!surfaceMeshes['floor'],
      wall_accent: !!surfaceMeshes['wall_accent'],
      wall_main: !!surfaceMeshes['wall_main'],
      table_top: !!surfaceMeshes['table_top']
    });

    // Mount UI and apply initial honed finish to floor
    mountStudioUI();
    applyCurrentStoneToSurface('floor', false);
  }

  // Listen for custom showroom ready events or poll briefly
  window.addEventListener('showroomReady', function (e) {
    console.log('[MuraliStudio] Received showroomReady event!');
    setTimeout(() => initStudio(e.detail.app, e.detail.scene), 200);
  });

  window.addEventListener('showroomStarted', function (e) {
    console.log('[MuraliStudio] Received showroomStarted event!');
    setTimeout(() => initStudio(e.detail.app, e.detail.scene), 200);
  });

  // Fallback poll
  let pollAttempts = 0;
  const pollTimer = setInterval(function () {
    pollAttempts++;
    if (window.showroomApp && (window.showroomApp.scene || (window.showroomApp.scenes && window.showroomApp.scenes[2]))) {
      clearInterval(pollTimer);
      initStudio(window.showroomApp, window.showroomApp.scene || window.showroomApp.scenes[2]);
    } else if (pollAttempts > 60) {
      clearInterval(pollTimer);
    }
  }, 500);

  /**
   * Generate tile albedo canvas with grout channels
   */
  function createTileCanvas(img, format) {
    const size = 1024;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    if (!img) {
      ctx.fillStyle = '#1e1e24';
      ctx.fillRect(0, 0, size, size);
      return canvas;
    }

    if (format === 'slab') {
      // Full continuous grand slab
      ctx.drawImage(img, 0, 0, size, size);
      return canvas;
    }

    let cols = 2, rows = 2, isStaggered = false;
    if (format === 'tile-60') { cols = 2; rows = 2; }
    else if (format === 'tile-120') { cols = 2; rows = 4; }
    else if (format === 'brick') { cols = 3; rows = 6; isStaggered = true; }

    const tileW = size / cols;
    const tileH = size / rows;
    const groutW = 4; // 4px grout line

    // Fill background with dark mortar grout color
    ctx.fillStyle = '#22201e';
    ctx.fillRect(0, 0, size, size);

    for (let r = 0; r < rows; r++) {
      const offsetX = (isStaggered && (r % 2 === 1)) ? tileW / 2 : 0;
      for (let c = -1; c <= cols; c++) {
        const x = c * tileW + offsetX + groutW;
        const y = r * tileH + groutW;
        const w = tileW - groutW * 2;
        const h = tileH - groutW * 2;

        if (x + w > 0 && x < size && y + h > 0 && y < size) {
          ctx.save();
          ctx.beginPath();
          ctx.rect(Math.max(0, x), Math.max(0, y), Math.min(w, size - x), Math.min(h, size - y));
          ctx.clip();
          // Draw rotated / shifted natural stone slice for realistic variation
          ctx.drawImage(img, 0, 0, size, size);
          
          // Subtle bevel shadow inside tile edge
          ctx.strokeStyle = 'rgba(0,0,0,0.35)';
          ctx.lineWidth = 2;
          ctx.strokeRect(x, y, w, h);
          ctx.restore();
        }
      }
    }

    return canvas;
  }

  /**
   * Generate normal bump map from canvas
   */
  function createNormalMap(albedoCanvas, format) {
    const w = albedoCanvas.width;
    const h = albedoCanvas.height;
    const nCanvas = document.createElement('canvas');
    nCanvas.width = w;
    nCanvas.height = h;
    const nCtx = nCanvas.getContext('2d');

    const srcCtx = albedoCanvas.getContext('2d');
    const srcData = srcCtx.getImageData(0, 0, w, h).data;
    const outImg = nCtx.createImageData(w, h);
    const outData = outImg.data;

    // Sobel normal generation with grout line depth
    const bumpStrength = (format === 'slab') ? 1.5 : 3.0;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4;
        const xLeft = (x > 0 ? x - 1 : w - 1);
        const xRight = (x < w - 1 ? x + 1 : 0);
        const yUp = (y > 0 ? y - 1 : h - 1);
        const yDown = (y < h - 1 ? y + 1 : 0);

        const leftIdx = (y * w + xLeft) * 4;
        const rightIdx = (y * w + xRight) * 4;
        const upIdx = (yUp * w + x) * 4;
        const downIdx = (yDown * w + x) * 4;

        const leftVal = (srcData[leftIdx] * 0.299 + srcData[leftIdx + 1] * 0.587 + srcData[leftIdx + 2] * 0.114);
        const rightVal = (srcData[rightIdx] * 0.299 + srcData[rightIdx + 1] * 0.587 + srcData[rightIdx + 2] * 0.114);
        const upVal = (srcData[upIdx] * 0.299 + srcData[upIdx + 1] * 0.587 + srcData[upIdx + 2] * 0.114);
        const downVal = (srcData[downIdx] * 0.299 + srcData[downIdx + 1] * 0.587 + srcData[downIdx + 2] * 0.114);

        const dx = (leftVal - rightVal) * bumpStrength / 255.0;
        const dy = (upVal - downVal) * bumpStrength / 255.0;
        const dz = 1.0;

        const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
        const nx = (dx / len) * 0.5 + 0.5;
        const ny = (dy / len) * 0.5 + 0.5;
        const nz = (dz / len) * 0.5 + 0.5;

        outData[idx] = Math.round(nx * 255);
        outData[idx + 1] = Math.round(ny * 255);
        outData[idx + 2] = Math.round(nz * 255);
        outData[idx + 3] = 255;
      }
    }

    nCtx.putImageData(outImg, 0, 0);
    return nCanvas;
  }

  /**
   * Apply selected stone, finish, and format to target architectural surface
   */
  function applyCurrentStoneToSurface(surfaceKey, showToastMsg = true) {
    const mesh = surfaceMeshes[surfaceKey];
    if (!mesh || !mesh.material) {
      console.warn(`[MuraliStudio] Mesh for ${surfaceKey} not found in scene!`);
      return;
    }

    const stone = state.surfaces[surfaceKey].stone || state.activeStone;
    const finishKey = state.surfaces[surfaceKey].finish || state.activeFinish;
    const formatKey = state.surfaces[surfaceKey].format || state.activeFormat;
    const finishCfg = FINISH_CONFIGS[finishKey] || FINISH_CONFIGS['honed'];
    const formatCfg = FORMAT_CONFIGS[formatKey] || FORMAT_CONFIGS['slab'];

    // Update surface state
    state.surfaces[surfaceKey].stone = stone;
    state.surfaces[surfaceKey].finish = finishKey;
    state.surfaces[surfaceKey].format = formatKey;

    updateStatusHUD(`Applying ${stone.name}...`);

    // Load stone image
    const imgUrl = `${ASSET_PREFIX}images/products/${stone.slug}.webp`;
    const cacheKey = `${stone.slug}_${formatKey}`;

    const applyMaterialTextures = (albedoTex, normalTex) => {
      const mat = mesh.material;
      if (!mat || !mat.uniforms) return;

      // Repeat scale based on surface
      let repeat = formatCfg.repeatFloor;
      if (surfaceKey === 'wall_accent' || surfaceKey === 'wall_main') {
        repeat = formatCfg.repeatWall;
      } else if (surfaceKey === 'table_top' || surfaceKey === 'coffee_table') {
        repeat = formatCfg.repeatTable;
      }

      // Configure Three.js Texture wrapping
      albedoTex.wrapS = THREE.RepeatWrapping;
      albedoTex.wrapT = THREE.RepeatWrapping;
      albedoTex.needsUpdate = true;

      normalTex.wrapS = THREE.RepeatWrapping;
      normalTex.wrapT = THREE.RepeatWrapping;
      normalTex.needsUpdate = true;

      // Assign PBR uniforms
      mat.uniforms.sTextureAlbedoMap.value = albedoTex;
      mat.uniforms.sTextureNormalMap.value = normalTex;
      mat.uniforms.offsetRepeat.value.set(0, 0, repeat[0], repeat[1]);

      // ─── CRITICAL MOBILE ANTI-GLARE CALIBRATION ───
      // Turn off metallic conduction on stone (strictly dielectric!)
      mat.uniforms.uMetalnessPBRFactor.value = 0.0;
      
      // Calibrated specular Fresnel (0.035 - 0.06) prevents blinding white sky reflections
      mat.uniforms.uSpecularF0Factor.value = finishCfg.f0;

      // Glossiness factor (0.15 for matte, 0.38 for honed, 0.68 for polished)
      const userGlossRatio = (state.reflectivityPercent / 100);
      mat.uniforms.uGlossinessPBRFactor.value = finishCfg.gloss * (0.5 + userGlossRatio * 0.7);

      // Normal map bump relief intensity
      mat.uniforms.uNormalMapFactor.value = finishCfg.normalScale;

      // Ensure material defines normal mapping
      mat.defines = mat.defines || {};
      mat.defines.USE_ALBEDOMAP = !0;
      mat.defines.USE_NORMALMAP = !0;
      mat.needsUpdate = true;

      console.log(`[MuraliStudio] Applied ${stone.name} (${formatCfg.label}, ${finishCfg.label}) to ${surfaceKey}`);

      if (showToastMsg) {
        showToast(`${stone.name} applied to ${getSurfaceLabel(surfaceKey)} (${finishCfg.label})`);
      }
      updateStatusHUD(`${stone.name} • ${getSurfaceLabel(surfaceKey)} • ${finishCfg.label} • ${formatCfg.label}`);
    };

    if (textureCache.has(cacheKey) && normalCache.has(cacheKey)) {
      applyMaterialTextures(textureCache.get(cacheKey), normalCache.get(cacheKey));
      return;
    }

    const img = new Image();
    if (location.protocol.startsWith('http')) {
      img.crossOrigin = 'anonymous';
    }
    img.onload = function () {
      const tileCanvas = createTileCanvas(img, formatKey);
      const normalCanvas = createNormalMap(tileCanvas, formatKey);

      const albedoTex = new THREE.CanvasTexture(tileCanvas);
      const normalTex = new THREE.CanvasTexture(normalCanvas);

      textureCache.set(cacheKey, albedoTex);
      normalCache.set(cacheKey, normalTex);

      applyMaterialTextures(albedoTex, normalTex);
    };
    img.onerror = function () {
      console.warn(`[MuraliStudio] Could not load image from ${imgUrl}, falling back to color procedural...`);
      const fallbackCanvas = document.createElement('canvas');
      fallbackCanvas.width = 512;
      fallbackCanvas.height = 512;
      const fCtx = fallbackCanvas.getContext('2d');
      fCtx.fillStyle = stone.color || '#2c2d30';
      fCtx.fillRect(0, 0, 512, 512);

      const albedoTex = new THREE.CanvasTexture(fallbackCanvas);
      const normalTex = new THREE.CanvasTexture(createNormalMap(fallbackCanvas, formatKey));
      applyMaterialTextures(albedoTex, normalTex);
    };
    img.src = imgUrl;
  }

  function getSurfaceLabel(key) {
    switch (key) {
      case 'floor': return 'Living Floor';
      case 'wall_accent': return 'Accent Wall';
      case 'wall_main': return 'Main Walls';
      case 'table_top': return 'Dining Table';
      case 'coffee_table': return 'Coffee Table';
      default: return key;
    }
  }

  /**
   * Mount Luxury Floating Studio UI
   */
  function mountStudioUI() {
    if (document.getElementById('murali-stone-studio-root')) return;

    const root = document.createElement('div');
    root.id = 'murali-stone-studio-root';
    root.innerHTML = `
      <!-- Top Site Navigation Header -->
      <header class="murali-studio-nav">
        <div class="msn-brand">
          <a href="index.html" class="msn-logo-link" title="Murali Granites & Marbles Home">
            <span class="msn-gold-gem">◆</span>
            <span class="msn-brand-name">Murali <small>Granites &amp; Marbles</small></span>
          </a>
          <span class="msn-badge-v3">Visualizer 3.0</span>
          <span class="msn-tag-sub">3D Architectural Showroom</span>
        </div>

        <nav class="msn-menu">
          <a href="index.html" class="msn-link">Home</a>
          <a href="visualizer.html" class="msn-link">1.0 Photos</a>
          <a href="visualizer-2.html" class="msn-link">2.0 Studio</a>
          <a href="visualizer-3.html" class="msn-link active">3.0 Showroom</a>
          <a href="products.html" class="msn-link">Collection</a>
          <a href="contact.html" class="msn-link">Contact</a>
        </nav>

        <div class="msn-actions">
          <button id="msn-toggle-studio" class="msn-btn-gold" title="Open Stone Customization Studio">
            <span>💎 Stone Studio</span>
          </button>
        </div>
      </header>

      <!-- Floating Stone Studio Deck (Right Drawer) -->
      <aside id="murali-studio-drawer" class="msd-drawer open">
        <div class="msd-header">
          <div>
            <div class="msd-eyebrow">Murali Natural Stone Lab</div>
            <h2 class="msd-title">Surface &amp; Tile Studio</h2>
          </div>
          <button id="msd-close-btn" class="msd-close-btn" title="Minimize Panel">✕</button>
        </div>

        <!-- Surface Selector Tabs -->
        <div class="msd-section">
          <div class="msd-sec-label">Select Architectural Surface</div>
          <div class="msd-surface-tabs">
            <button class="msd-s-tab active" data-surface="floor">
              <span class="msd-icon">🏛️</span>
              <span>Living Floor</span>
            </button>
            <button class="msd-s-tab" data-surface="wall_accent">
              <span class="msd-icon">🧱</span>
              <span>Accent Wall</span>
            </button>
            <button class="msd-s-tab" data-surface="wall_main">
              <span class="msd-icon">🏢</span>
              <span>Main Walls</span>
            </button>
            <button class="msd-s-tab" data-surface="table_top">
              <span class="msd-icon">🍽️</span>
              <span>Dining Table</span>
            </button>
          </div>
        </div>

        <!-- Finish & Mobile Anti-Glare Calibration -->
        <div class="msd-section msd-glare-card">
          <div class="msd-flex-between">
            <div class="msd-sec-label">Finish &amp; Specular Glare</div>
            <span class="msd-rec-badge">Mobile Calibrated</span>
          </div>
          <div class="msd-finish-tabs">
            <button class="msd-f-tab active" data-finish="honed" title="Soft diffuse sheen with zero harsh mobile glare">
              <span class="f-dot"></span> Honed Satin
            </button>
            <button class="msd-f-tab" data-finish="polished" title="Deep high-gloss reflection">
              <span class="f-dot"></span> Polished Gloss
            </button>
            <button class="msd-f-tab" data-finish="matte" title="Tactile natural stone, zero reflections">
              <span class="f-dot"></span> Natural Matte
            </button>
          </div>
          
          <div class="msd-slider-wrap">
            <div class="msd-slider-header">
              <span>Reflectivity Intensity</span>
              <span id="msd-gloss-val">40%</span>
            </div>
            <input type="range" id="msd-gloss-slider" min="5" max="100" value="40" class="msd-slider"/>
            <div class="msd-slider-hint">Fine-tune to eliminate harsh window/sky glare on mobile screens</div>
          </div>
        </div>

        <!-- Tile Structure Format -->
        <div class="msd-section">
          <div class="msd-sec-label">Tile Format &amp; Grout Joint</div>
          <div class="msd-format-tabs">
            <button class="msd-fmt-tab active" data-format="slab">
              <span>🔲 Grand Slab</span>
              <small>Seamless 2.4m</small>
            </button>
            <button class="msd-fmt-tab" data-format="tile-60">
              <span>▦ Tile 60×60</span>
              <small>Square Grid</small>
            </button>
            <button class="msd-fmt-tab" data-format="tile-120">
              <span>▤ Tile 120×60</span>
              <small>Modern Rect</small>
            </button>
            <button class="msd-fmt-tab" data-format="brick">
              <span>🧱 Brick</span>
              <small>Staggered Bond</small>
            </button>
          </div>
        </div>

        <!-- Stone Collection Selector -->
        <div class="msd-section msd-stones-section">
          <div class="msd-flex-between">
            <div class="msd-sec-label">Murali Showroom Stone Slabs (48)</div>
            <span class="msd-filter-count" id="msd-count">32 stones</span>
          </div>

          <!-- Category Filter Pills -->
          <div class="msd-cat-pills">
            <button class="msd-pill active" data-cat="all">All Stones</button>
            <button class="msd-pill" data-cat="sig">★ Signature</button>
            <button class="msd-pill" data-cat="Marble">Marble</button>
            <button class="msd-pill" data-cat="Granite">Granite</button>
            <button class="msd-pill" data-cat="Onyx">Onyx</button>
          </div>

          <!-- Search Filter -->
          <div class="msd-search-box">
            <input type="text" id="msd-search" placeholder="Search stone (e.g. Statuario, Black Forest, Lakha)..." />
          </div>

          <!-- Stone Grid -->
          <div class="msd-stone-grid" id="msd-stone-grid">
            <!-- Populated dynamically -->
          </div>
        </div>

        <!-- Bottom Quick Actions & Status -->
        <div class="msd-footer">
          <div class="msd-quick-buttons">
            <button id="msd-btn-autofill" class="msd-btn-action" title="Apply matching stones across floor, wall, and table">
              ⚡ Auto-Theme Room
            </button>
            <button id="msd-btn-reset" class="msd-btn-action-ghost" title="Reset all surfaces to default">
              ↺ Reset
            </button>
          </div>
          <div class="msd-status-hud" id="msd-status-hud">
            Ready • Black Forest • Living Floor • Honed Satin
          </div>
        </div>
      </aside>

      <!-- Quick Toast Notification -->
      <div id="msd-toast" class="msd-toast"></div>
    `;

    document.body.appendChild(root);

    injectStudioStyles();
    bindStudioEvents();
    renderStoneGrid();
  }

  /**
   * Render stone cards into drawer grid
   */
  function renderStoneGrid() {
    const grid = document.getElementById('msd-stone-grid');
    if (!grid) return;

    grid.innerHTML = '';
    const filtered = SHOWROOM_STONES.filter(s => {
      const matchCat = (state.filterCat === 'all') ||
        (state.filterCat === 'sig' && s.sig) ||
        (s.cat && s.cat.toLowerCase().includes(state.filterCat.toLowerCase()));
      const matchSearch = !state.searchQuery || s.name.toLowerCase().includes(state.searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    const countEl = document.getElementById('msd-count');
    if (countEl) countEl.textContent = `${filtered.length} stones`;

    filtered.forEach(stone => {
      const card = document.createElement('div');
      card.className = `msd-card ${state.activeStone.slug === stone.slug ? 'selected' : ''}`;
      card.dataset.slug = stone.slug;

      const thumbUrl = `${ASSET_PREFIX}images/products/${stone.slug}.webp`;

      card.innerHTML = `
        <div class="msd-card-thumb" style="background-color: ${stone.color};">
          <img src="${thumbUrl}" alt="${stone.name}" loading="lazy" onerror="this.style.display='none'" />
          ${stone.sig ? '<span class="msd-sig-badge">★ Sig</span>' : ''}
        </div>
        <div class="msd-card-info">
          <div class="msd-card-name">${stone.name}</div>
          <div class="msd-card-meta">${stone.cat} • ${stone.finish.split('/')[0].trim()}</div>
        </div>
      `;

      card.addEventListener('click', () => {
        document.querySelectorAll('.msd-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        state.activeStone = stone;
        applyCurrentStoneToSurface(state.activeSurface, true);
      });

      grid.appendChild(card);
    });
  }

  /**
   * Bind all Studio interactive events
   */
  function bindStudioEvents() {
    // Drawer open/close toggle
    const toggleBtn = document.getElementById('msn-toggle-studio');
    const closeBtn = document.getElementById('msd-close-btn');
    const drawer = document.getElementById('murali-studio-drawer');

    if (toggleBtn && drawer) {
      toggleBtn.addEventListener('click', () => {
        state.isOpen = !state.isOpen;
        drawer.classList.toggle('open', state.isOpen);
      });
    }
    if (closeBtn && drawer) {
      closeBtn.addEventListener('click', () => {
        state.isOpen = false;
        drawer.classList.remove('open');
      });
    }

    // Surface tabs
    document.querySelectorAll('.msd-s-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.msd-s-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        state.activeSurface = tab.dataset.surface;
        showToast(`Surface switched to ${getSurfaceLabel(state.activeSurface)}`);
      });
    });

    // Finish tabs (Mobile Anti-Glare)
    document.querySelectorAll('.msd-f-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.msd-f-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        state.activeFinish = tab.dataset.finish;
        applyCurrentStoneToSurface(state.activeSurface, true);
      });
    });

    // Gloss / Reflectivity slider
    const slider = document.getElementById('msd-gloss-slider');
    const glossVal = document.getElementById('msd-gloss-val');
    if (slider && glossVal) {
      slider.addEventListener('input', (e) => {
        state.reflectivityPercent = parseInt(e.target.value, 10);
        glossVal.textContent = `${state.reflectivityPercent}%`;
        applyCurrentStoneToSurface(state.activeSurface, false);
      });
    }

    // Format tabs
    document.querySelectorAll('.msd-fmt-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.msd-fmt-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        state.activeFormat = tab.dataset.format;
        applyCurrentStoneToSurface(state.activeSurface, true);
      });
    });

    // Category pills
    document.querySelectorAll('.msd-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.msd-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.filterCat = pill.dataset.cat;
        renderStoneGrid();
      });
    });

    // Search input
    const searchInput = document.getElementById('msd-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        renderStoneGrid();
      });
    }

    // Auto-fill button
    const autofillBtn = document.getElementById('msd-btn-autofill');
    if (autofillBtn) {
      autofillBtn.addEventListener('click', () => {
        // Harmonious pairing: Active stone on floor, complementary on accent wall, dining table polish
        applyCurrentStoneToSurface('floor', false);
        state.activeSurface = 'wall_accent';
        applyCurrentStoneToSurface('wall_accent', false);
        state.activeSurface = 'table_top';
        applyCurrentStoneToSurface('table_top', false);
        state.activeSurface = 'floor';
        showToast(`Auto-themed room with ${state.activeStone.name}!`);
      });
    }

    // Reset button
    const resetBtn = document.getElementById('msd-btn-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        state.activeStone = SHOWROOM_STONES[0];
        state.activeFinish = 'honed';
        state.activeFormat = 'slab';
        state.reflectivityPercent = 40;
        if (slider) slider.value = 40;
        if (glossVal) glossVal.textContent = '40%';
        applyCurrentStoneToSurface('floor', true);
      });
    }
  }

  function showToast(msg) {
    const toast = document.getElementById('msd-toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2800);
  }

  function updateStatusHUD(msg) {
    const hud = document.getElementById('msd-status-hud');
    if (hud) hud.textContent = msg;
  }

  /**
   * Inject Modern Luxury Obsidian & Champagne Gold Styles
   */
  function injectStudioStyles() {
    const css = `
      /* ── Murali Visualizer 3.0 Header ── */
      .murali-studio-nav {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 56px;
        z-index: 10005;
        background: rgba(14, 14, 16, 0.88);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border-bottom: 1px solid rgba(197, 160, 89, 0.25);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        box-sizing: border-box;
        font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif;
      }
      .msn-brand {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .msn-logo-link {
        display: flex;
        align-items: center;
        gap: 8px;
        text-decoration: none;
        color: #F5F0E8;
      }
      .msn-gold-gem {
        color: #C5A059;
        font-size: 14px;
      }
      .msn-brand-name {
        font-family: 'Cormorant Garamond', Georgia, serif;
        font-size: 1.25rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        line-height: 1;
      }
      .msn-brand-name small {
        display: block;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 0.55rem;
        letter-spacing: 0.25em;
        text-transform: uppercase;
        color: #C5A059;
        margin-top: 2px;
      }
      .msn-badge-v3 {
        background: linear-gradient(135deg, #C5A059, #FFD700);
        color: #0E0E10;
        font-size: 10px;
        font-weight: 900;
        padding: 2px 7px;
        border-radius: 4px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .msn-tag-sub {
        font-size: 0.72rem;
        color: #A1A1AA;
        margin-left: 4px;
      }
      .msn-menu {
        display: flex;
        align-items: center;
        gap: 18px;
      }
      .msn-link {
        color: #A1A1AA;
        text-decoration: none;
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-weight: 600;
        transition: color 0.2s ease;
      }
      .msn-link:hover, .msn-link.active {
        color: #C5A059;
      }
      .msn-btn-gold {
        background: linear-gradient(135deg, #C5A059, #E8C98A);
        color: #0E0E10;
        border: 0;
        border-radius: 6px;
        padding: 6px 14px;
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        cursor: pointer;
        box-shadow: 0 4px 14px rgba(197, 160, 89, 0.35);
        transition: transform 0.2s, box-shadow 0.2s;
      }
      .msn-btn-gold:hover {
        transform: translateY(-1px);
        box-shadow: 0 6px 18px rgba(197, 160, 89, 0.5);
      }

      /* ── Floating Studio Drawer ── */
      .msd-drawer {
        position: fixed;
        top: 68px;
        right: 16px;
        width: 360px;
        max-width: calc(100vw - 32px);
        max-height: calc(100vh - 84px);
        background: rgba(16, 16, 20, 0.94);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(197, 160, 89, 0.3);
        border-radius: 14px;
        z-index: 10004;
        display: flex;
        flex-direction: column;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(197, 160, 89, 0.15);
        color: #F5F0E8;
        font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
        box-sizing: border-box;
        overflow: hidden;
        transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s;
        transform: translateX(390px);
        opacity: 0;
        pointer-events: none;
      }
      .msd-drawer.open {
        transform: translateX(0);
        opacity: 1;
        pointer-events: auto;
      }
      .msd-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 16px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }
      .msd-eyebrow {
        font-size: 0.6rem;
        text-transform: uppercase;
        letter-spacing: 0.2em;
        color: #C5A059;
        font-weight: 700;
      }
      .msd-title {
        font-family: 'Cormorant Garamond', Georgia, serif;
        font-size: 1.25rem;
        font-weight: 600;
        margin: 2px 0 0 0;
        color: #F5F0E8;
      }
      .msd-close-btn {
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.12);
        color: #A1A1AA;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        transition: 0.2s;
      }
      .msd-close-btn:hover {
        background: rgba(197, 160, 89, 0.2);
        color: #FFD700;
      }
      .msd-section {
        padding: 10px 16px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      }
      .msd-sec-label {
        font-size: 0.68rem;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: #A1A1AA;
        font-weight: 600;
        margin-bottom: 8px;
      }
      .msd-flex-between {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .msd-rec-badge {
        font-size: 9px;
        color: #34D399;
        background: rgba(52, 211, 153, 0.12);
        border: 1px solid rgba(52, 211, 153, 0.3);
        padding: 2px 6px;
        border-radius: 10px;
        font-weight: 700;
        text-transform: uppercase;
      }

      /* Surface Tabs */
      .msd-surface-tabs {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 6px;
      }
      .msd-s-tab {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 6px;
        color: #D4D4D8;
        padding: 7px 8px;
        font-size: 0.72rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
        transition: 0.2s;
      }
      .msd-s-tab:hover {
        background: rgba(197, 160, 89, 0.12);
        border-color: rgba(197, 160, 89, 0.4);
      }
      .msd-s-tab.active {
        background: linear-gradient(135deg, rgba(197, 160, 89, 0.28), rgba(20, 20, 24, 0.8));
        border-color: #C5A059;
        color: #FFD700;
        font-weight: 700;
        box-shadow: 0 0 12px rgba(197, 160, 89, 0.25);
      }
      .msd-icon { font-size: 13px; }

      /* Finish Tabs (Anti-Glare) */
      .msd-glare-card {
        background: rgba(20, 20, 28, 0.5);
      }
      .msd-finish-tabs {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 6px;
        margin-bottom: 10px;
      }
      .msd-f-tab {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 6px;
        color: #A1A1AA;
        padding: 6px 4px;
        font-size: 0.68rem;
        cursor: pointer;
        text-align: center;
        transition: 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
      }
      .msd-f-tab .f-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #71717A;
      }
      .msd-f-tab:hover {
        border-color: rgba(197, 160, 89, 0.4);
      }
      .msd-f-tab.active {
        background: rgba(197, 160, 89, 0.2);
        border-color: #C5A059;
        color: #F5F0E8;
        font-weight: 700;
      }
      .msd-f-tab.active .f-dot {
        background: #C5A059;
        box-shadow: 0 0 8px #C5A059;
      }

      /* Slider */
      .msd-slider-wrap {
        margin-top: 4px;
      }
      .msd-slider-header {
        display: flex;
        justify-content: space-between;
        font-size: 0.65rem;
        color: #A1A1AA;
        margin-bottom: 4px;
      }
      .msd-slider {
        width: 100%;
        height: 4px;
        background: #27272A;
        border-radius: 2px;
        outline: none;
        -webkit-appearance: none;
        accent-color: #C5A059;
      }
      .msd-slider-hint {
        font-size: 9px;
        color: #71717A;
        margin-top: 4px;
        line-height: 1.2;
      }

      /* Format Tabs */
      .msd-format-tabs {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 5px;
      }
      .msd-fmt-tab {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 6px;
        color: #D4D4D8;
        padding: 6px 2px;
        font-size: 0.65rem;
        cursor: pointer;
        text-align: center;
        transition: 0.2s;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
      }
      .msd-fmt-tab small {
        font-size: 8px;
        color: #71717A;
      }
      .msd-fmt-tab.active {
        border-color: #C5A059;
        background: rgba(197, 160, 89, 0.2);
        color: #FFD700;
      }
      .msd-fmt-tab.active small {
        color: #C5A059;
      }

      /* Stone Grid Section */
      .msd-stones-section {
        flex: 1;
        overflow-y: auto;
        min-height: 200px;
        max-height: 380px;
      }
      .msd-filter-count {
        font-size: 10px;
        color: #C5A059;
      }
      .msd-cat-pills {
        display: flex;
        gap: 4px;
        margin-bottom: 8px;
        overflow-x: auto;
        padding-bottom: 4px;
      }
      .msd-pill {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        color: #A1A1AA;
        font-size: 10px;
        padding: 3px 8px;
        cursor: pointer;
        white-space: nowrap;
        transition: 0.2s;
      }
      .msd-pill:hover, .msd-pill.active {
        background: #C5A059;
        color: #0E0E10;
        font-weight: 700;
        border-color: #C5A059;
      }
      .msd-search-box {
        margin-bottom: 8px;
      }
      .msd-search-box input {
        width: 100%;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 6px;
        padding: 6px 10px;
        font-size: 0.72rem;
        color: #F5F0E8;
        outline: none;
        box-sizing: border-box;
      }
      .msd-search-box input:focus {
        border-color: #C5A059;
      }
      .msd-stone-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 6px;
      }
      .msd-card {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 6px;
        overflow: hidden;
        cursor: pointer;
        transition: transform 0.2s, border-color 0.2s;
        text-align: left;
      }
      .msd-card:hover {
        transform: translateY(-2px);
        border-color: rgba(197, 160, 89, 0.5);
      }
      .msd-card.selected {
        border-color: #C5A059;
        box-shadow: 0 0 12px rgba(197, 160, 89, 0.35);
        background: rgba(197, 160, 89, 0.1);
      }
      .msd-card-thumb {
        position: relative;
        aspect-ratio: 4/3;
        overflow: hidden;
        background: #18181b;
      }
      .msd-card-thumb img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .msd-sig-badge {
        position: absolute;
        top: 3px;
        right: 3px;
        background: linear-gradient(135deg, #C5A059, #FFD700);
        color: #0E0E10;
        font-size: 8px;
        font-weight: 900;
        padding: 1px 4px;
        border-radius: 3px;
      }
      .msd-card-info {
        padding: 4px 6px;
      }
      .msd-card-name {
        font-size: 0.65rem;
        font-weight: 700;
        color: #F5F0E8;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .msd-card-meta {
        font-size: 8px;
        color: #71717A;
      }

      /* Footer */
      .msd-footer {
        padding: 10px 16px;
        background: rgba(10, 10, 12, 0.8);
        border-top: 1px solid rgba(255, 255, 255, 0.06);
      }
      .msd-quick-buttons {
        display: flex;
        gap: 6px;
        margin-bottom: 6px;
      }
      .msd-btn-action {
        flex: 2;
        background: linear-gradient(135deg, #C5A059, #E8C98A);
        color: #0E0E10;
        border: 0;
        border-radius: 5px;
        padding: 7px;
        font-size: 0.7rem;
        font-weight: 700;
        cursor: pointer;
        transition: 0.2s;
      }
      .msd-btn-action:hover {
        box-shadow: 0 4px 12px rgba(197, 160, 89, 0.4);
      }
      .msd-btn-action-ghost {
        flex: 1;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.12);
        color: #D4D4D8;
        border-radius: 5px;
        padding: 7px;
        font-size: 0.7rem;
        cursor: pointer;
        transition: 0.2s;
      }
      .msd-btn-action-ghost:hover {
        background: rgba(255, 255, 255, 0.12);
      }
      .msd-status-hud {
        font-size: 9px;
        color: #A1A1AA;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      /* Toast */
      .msd-toast {
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%) translateY(30px);
        background: rgba(14, 14, 16, 0.95);
        border: 1px solid rgba(197, 160, 89, 0.4);
        color: #FFD700;
        padding: 8px 18px;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 600;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
        z-index: 10010;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      }
      .msd-toast.show {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }

      @media (max-width: 768px) {
        .msn-tag-sub, .msn-menu { display: none; }
        .msd-drawer {
          width: calc(100vw - 20px);
          right: 10px;
          top: 60px;
          max-height: 75vh;
        }
      }
    `;

    const styleEl = document.createElement('style');
    styleEl.id = 'murali-stone-studio-styles';
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
  }

  // Expose global controller
  window.MuraliStoneStudio = {
    init: initStudio,
    applyStone: applyCurrentStoneToSurface,
    stones: SHOWROOM_STONES,
    state: state
  };
})();
