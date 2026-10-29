import json, os

stones_json = json.load(open('d:/projects/Web-Dev/chirag/ch01/scratch_stones.json'))

script = '''/**
 * Murali Granites & Marbles — 3D Architectural Showroom Studio (Visualizer 3.0)
 * Real-time Stone Slabs & Tile Grid Engine with Anti-Glare PBR Calibration
 */
(function () {
  'use strict';

  // Helper to resolve asset paths reliably whether inside iframe or standalone
  function getStoneImageUrl(stone) {
    if (!stone || !stone.imageUrl) return '';
    return stone.imageUrl;
  }

  // 48 Showroom Stones with authentic product images & top 12 Signature badging
  const SHOWROOM_STONES = ''' + json.dumps(stones_json, indent=2) + ''';

  // Anti-glare finish configurations (specifically calibrated for mobile reflection control)
  const FINISH_CONFIGS = {
    'honed': {
      label: 'Honed Satin',
      desc: 'Soft architectural diffusion, subtle sheen, zero harsh glare (Recommended for Mobile)',
      gloss: 0.38,
      f0: 0.038,
      normalScale: 0.50
    },
    'polished': {
      label: 'Polished High Gloss',
      desc: 'Deep mirror reflection with calibrated non-metallic dielectric Fresnel',
      gloss: 0.70,
      f0: 0.055,
      normalScale: 0.25
    },
    'matte': {
      label: 'Natural Matte',
      desc: 'Raw quarried stone texture, zero specular reflections, ultra-tactile',
      gloss: 0.12,
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
      repeatWall: [2, 1.5]
    },
    'tile-60': {
      label: 'Tile 60×60',
      desc: 'Classic square tile grid with recessed 3D grout channels',
      grout: 2,
      repeatFloor: [6, 6],
      repeatWall: [4, 3]
    },
    'tile-120': {
      label: 'Tile 120×60',
      desc: 'Contemporary grand format rectangular slab grid',
      grout: 2,
      repeatFloor: [3, 6],
      repeatWall: [2, 3]
    },
    'brick': {
      label: 'Subway Brick',
      desc: 'Staggered architectural running bond pattern',
      grout: 2,
      repeatFloor: [8, 8],
      repeatWall: [6, 4]
    }
  };

  // Application State
  const state = {
    activeSurface: 'floor', // 'floor', 'wall_accent', 'wall_main'
    activeStone: SHOWROOM_STONES[0],
    activeFinish: 'honed',  // Default to honed to prevent mobile white glare!
    activeFormat: 'slab',
    reflectivityPercent: 40,
    isOpen: false,
    filterCat: 'all',
    searchQuery: '',
    surfaces: {
      'floor': { stone: SHOWROOM_STONES[0], finish: 'honed', format: 'slab' },
      'wall_accent': { stone: SHOWROOM_STONES[5], finish: 'honed', format: 'slab' },
      'wall_main': { stone: null, finish: 'matte', format: 'slab' }
    }
  };

  /**
   * Save a choice (stone / finish / format) into the per-surface state.
   */
  function setSurfaceChoice(surfaceKey, patch) {
    const prev = state.surfaces[surfaceKey] || { stone: null, finish: 'honed', format: 'slab' };
    state.surfaces[surfaceKey] = Object.assign({}, prev, patch);
  }

  // Dedicated surface material instances
  const customMaterials = {};

  // Texture Cache
  const textureCache = new Map();

  // Three.js TextureLoader instance
  let textureLoader = null;
  function getTextureLoader() {
    if (!textureLoader && window.THREE && window.THREE.TextureLoader) {
      textureLoader = new THREE.TextureLoader();
      textureLoader.crossOrigin = 'anonymous';
    }
    return textureLoader;
  }

  /**
   * Robust dynamic lookup for the Little Workshop interior2 scene
   */
  function getShowroomInteriorScene() {
    const app = window.showroomApp;
    if (!app) return null;
    if (app.interiorScene && app.interiorScene.children && app.interiorScene.children.length > 0) {
      return app.interiorScene;
    }
    if (app.scenes && app.scenes.length >= 3 && app.scenes[2].children && app.scenes[2].children.length > 0) {
      return app.scenes[2];
    }
    if (app.scene && app.scene.getObjectByName('floor')) {
      return app.scene;
    }
    return null;
  }

  /**
   * Minimalist Architectural Showroom Room Layout:
   * Removes dining table, dining chairs, rugs/mats, coffee table, and armchairs
   * leaving only the luxury lounge sofa in the expansive stone floor space.
   */
  function applyRoomFurnishingLayout(scene) {
    if (!scene) return;

    const objectsToHide = [
      'TableParent',  // Dining table & tabletop
      'Chairs',       // Dining chairs
      'rug',          // Living area floor mat
      'rug (1)',      // Dining area floor mat
      'coffee_table', // Coffee table
      'armchairs',    // Armchairs
      'table_objects_baker'
    ];

    objectsToHide.forEach(name => {
      const obj = scene.getObjectByName(name);
      if (obj) {
        obj.visible = false;
        obj.traverse(child => {
          child.visible = false;
        });
      }
    });

    // Also hide corresponding selection strokes
    const strokeGroup = scene.getObjectByName('stroke_objects');
    if (strokeGroup) {
      ['table_stroke', 'coffee_table_stroke', 'fauteuil_stroke', 'fauteuil2_stroke'].forEach(sName => {
        const stroke = strokeGroup.getObjectByName(sName);
        if (stroke) stroke.visible = false;
      });
    }

    // Disable table & armchair pickers from scenePicker if present
    const app = window.showroomApp;
    if (app && app.scenePicker && app.scenePicker.objects) {
      app.scenePicker.objects = app.scenePicker.objects.filter(o => {
        let cur = o;
        while (cur) {
          if (objectsToHide.includes(cur.name)) return false;
          cur = cur.parent;
        }
        return true;
      });
    }
  }

  /**
   * Find base PBR material template from the loaded interior scene
   * 'woodfloor2' has USE_ALBEDOMAP, USE_NORMALMAP, USE_LIGHTMAP compiled into its shader
   */
  function getBasePbrTemplate(scene) {
    if (!scene) return null;
    const floorMesh = scene.getObjectByName('floor');
    if (floorMesh && floorMesh.material && floorMesh.material.defines && floorMesh.material.defines.USE_ALBEDOMAP) {
      return floorMesh.material;
    }
    if (scene.materials) {
      for (const k in scene.materials) {
        const m = scene.materials[k];
        if (m && m.pbr && m.defines && m.defines.USE_ALBEDOMAP && m.defines.USE_LIGHTMAP) {
          return m;
        }
      }
    }
    return null;
  }

  /**
   * Robust mesh finder across scene graph
   */
  function getSurfaceMesh(surfaceKey) {
    const scene = getShowroomInteriorScene();
    if (!scene) return null;

    let targetName = 'floor';
    if (surfaceKey === 'floor') targetName = 'floor';
    else if (surfaceKey === 'wall_accent') targetName = 'walls.001';
    else if (surfaceKey === 'wall_main') targetName = 'walls';

    let found = scene.getObjectByName(targetName);
    if (!found) {
      scene.traverse(function (obj) {
        if (!found && obj.name === targetName) found = obj;
      });
    }
    return found;
  }

  /**
   * Get or create a dedicated PBR material for the target surface
   */
  function getOrCreateSurfaceMaterial(surfaceKey, targetMesh, scene) {
    if (customMaterials[surfaceKey]) {
      return customMaterials[surfaceKey];
    }

    const baseTemplate = getBasePbrTemplate(scene);
    if (!baseTemplate) {
      console.warn('[MuraliStudio] Base PBR template (woodfloor2) not ready yet.');
      return targetMesh.material;
    }

    // Clone the base template so target mesh gets a fully-compiled PBR shader with albedo & normal support
    const newMat = baseTemplate.clone();
    newMat.name = 'murali_' + surfaceKey;

    // Transfer target object's pre-baked lightmaps for realistic contact shadows
    const origMat = targetMesh.material;
    if (origMat && origMat.uniforms) {
      if (origMat.uniforms.sTextureLightMap && origMat.uniforms.sTextureLightMap.value) {
        newMat.uniforms.sTextureLightMap.value = origMat.uniforms.sTextureLightMap.value;
        newMat.sTextureLightMap = origMat.uniforms.sTextureLightMap.value;
      }
      if (origMat.uniforms.sTextureLightMapM && origMat.uniforms.sTextureLightMapM.value) {
        newMat.uniforms.sTextureLightMapM.value = origMat.uniforms.sTextureLightMapM.value;
        newMat.sTextureLightMapM = origMat.uniforms.sTextureLightMapM.value;
      }
    }

    // Register in scene.materials so Little Workshop's updateCustomMaterials updates reflection probes
    if (scene.materials) {
      scene.materials[newMat.uuid] = newMat;
    }

    customMaterials[surfaceKey] = newMat;
    targetMesh.material = newMat;
    newMat.needsUpdate = true;

    // Special handling for accent wall: hide outer shell mesh walls.001 (1) if present
    if (surfaceKey === 'wall_accent') {
      const shell = scene.getObjectByName('walls.001 (1)');
      if (shell) {
        shell.visible = false;
      }
    }

    return newMat;
  }

  /**
   * Load stone texture via native THREE.TextureLoader with automatic caching
   */
  function loadStoneTexture(url, callback) {
    if (textureCache.has(url)) {
      callback(textureCache.get(url));
      return;
    }

    const loader = getTextureLoader();
    if (!loader) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = function () {
        const tex = new THREE.Texture(img);
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.needsUpdate = true;
        textureCache.set(url, tex);
        callback(tex);
      };
      img.onerror = function () {
        createFallbackTexture(url, callback);
      };
      img.src = url;
      return;
    }

    loader.load(
      url,
      function (tex) {
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.generateMipmaps = true;
        tex.needsUpdate = true;
        textureCache.set(url, tex);
        callback(tex);
      },
      undefined,
      function () {
        createFallbackTexture(url, callback);
      }
    );
  }

  function createFallbackTexture(url, callback) {
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = 512;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#26272c';
    ctx.fillRect(0, 0, 512, 512);
    const fbTex = new THREE.CanvasTexture(c);
    fbTex.wrapS = THREE.RepeatWrapping;
    fbTex.wrapT = THREE.RepeatWrapping;
    textureCache.set(url, fbTex);
    callback(fbTex);
  }

  /**
   * Apply selected stone, finish, and format to target architectural surface
   */
  function applyCurrentStoneToSurface(surfaceKey, showToastMsg) {
    if (typeof showToastMsg === 'undefined') showToastMsg = true;

    const scene = getShowroomInteriorScene();
    if (!scene) {
      console.warn('[MuraliStudio] 3D Interior scene not ready. Will retry on showroom load.');
      return;
    }

    // Enforce clean room furnishing layout
    applyRoomFurnishingLayout(scene);

    const mesh = getSurfaceMesh(surfaceKey);
    if (!mesh) {
      console.warn('[MuraliStudio] Target mesh for ' + surfaceKey + ' not found in active scene.');
      return;
    }

    const surfaceState = state.surfaces[surfaceKey] || {};
    const stone = surfaceState.stone || state.activeStone;
    const finishKey = surfaceState.finish || state.activeFinish;
    const formatKey = surfaceState.format || state.activeFormat;
    const finishCfg = FINISH_CONFIGS[finishKey] || FINISH_CONFIGS['honed'];
    const formatCfg = FORMAT_CONFIGS[formatKey] || FORMAT_CONFIGS['slab'];

    state.surfaces[surfaceKey] = { stone: stone, finish: finishKey, format: formatKey };

    // Get or create dedicated PBR material
    const mat = getOrCreateSurfaceMaterial(surfaceKey, mesh, scene);
    if (!mat || !mat.uniforms) return;

    let repeat = formatCfg.repeatFloor;
    if (surfaceKey === 'wall_accent' || surfaceKey === 'wall_main') {
      repeat = formatCfg.repeatWall;
    }

    const imgUrl = getStoneImageUrl(stone);

    loadStoneTexture(imgUrl, function (tex) {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      if (tex.repeat) {
        tex.repeat.set(repeat[0], repeat[1]);
      }
      tex.needsUpdate = true;

      // Assign to PBR shader uniforms
      mat.uniforms.sTextureAlbedoMap.value = tex;
      mat.sTextureAlbedoMap = tex;

      if (mat.uniforms.offsetRepeat) {
        mat.uniforms.offsetRepeat.value.set(0, 0, repeat[0], repeat[1]);
      }

      // Dielectric stone: 0.0 metalness eliminates harsh mobile glare
      if (mat.uniforms.uMetalnessPBRFactor) {
        mat.uniforms.uMetalnessPBRFactor.value = 0.0;
      }
      if (mat.uniforms.uSpecularF0Factor) {
        mat.uniforms.uSpecularF0Factor.value = finishCfg.f0;
      }
      const userGlossRatio = (state.reflectivityPercent / 100);
      if (mat.uniforms.uGlossinessPBRFactor) {
        mat.uniforms.uGlossinessPBRFactor.value = finishCfg.gloss * (0.5 + userGlossRatio * 0.7);
      }
      if (mat.uniforms.uNormalMapFactor) {
        mat.uniforms.uNormalMapFactor.value = finishCfg.normalScale;
      }
      if (mat.uniforms.uAlbedoPBRFactor) {
        mat.uniforms.uAlbedoPBRFactor.value = 1.0;
      }
      if (mat.uniforms.uColor) {
        mat.uniforms.uColor.value.setRGB(1, 1, 1);
      }

      mat.defines = mat.defines || {};
      mat.defines.USE_ALBEDOMAP = true;
      mat.defines.USE_NORMALMAP = true;
      mat.defines.USE_LIGHTMAP = true;
      mat.needsUpdate = true;

      updateStatusHUD(stone.name, surfaceKey, finishCfg.label, formatCfg.label);

      if (showToastMsg) {
        showToast(stone.name + ' applied to ' + getSurfaceLabel(surfaceKey) + ' (' + finishCfg.label + ')');
      }
    });
  }

  function getSurfaceLabel(key) {
    switch (key) {
      case 'floor': return 'Living Floor';
      case 'wall_accent': return 'Accent Wall';
      case 'wall_main': return 'Main Walls';
      default: return key;
    }
  }

  /**
   * Mount Clean, Non-Colliding Floating Studio UI
   */
  function mountStudioUI() {
    if (document.getElementById('murali-stone-studio-root')) return;

    const root = document.createElement('div');
    root.id = 'murali-stone-studio-root';
    root.innerHTML = `
      <!-- Sleek Floating Control Bar (Non-Colliding Glass Pill) -->
      <div id="murali-control-bar" class="murali-ctrl-bar">
        <button id="murali-toggle-studio" class="murali-ctrl-toggle" title="Open Natural Stone & Tile Studio">
          <span class="murali-ctrl-icon">🏛️</span>
          <span class="murali-ctrl-label">Stone Studio</span>
          <span class="murali-ctrl-badge" id="murali-ctrl-badge">Floor: River Black</span>
        </button>

        <div class="murali-ctrl-chips">
          <button class="murali-chip active" data-surface="floor" title="Customize Living Room Floor">Floor</button>
          <button class="murali-chip" data-surface="wall_accent" title="Customize Feature Accent Wall">Accent Wall</button>
          <button class="murali-chip" data-surface="wall_main" title="Customize Architectural Room Walls">Main Walls</button>
        </div>
      </div>

      <!-- Floating Stone Studio Deck (Left Drawer) -->
      <aside id="murali-studio-drawer" class="murali-drawer">
        <!-- Drawer Header -->
        <div class="msd-header">
          <div class="msd-title-group">
            <div class="msd-badge-row">
              <span class="msd-badge-gold">Murali Studio 3.0</span>
              <span class="msd-badge-pbr">Calibrated PBR</span>
            </div>
            <h3 class="msd-title">Natural Stone &amp; Tiles</h3>
          </div>
          <button id="msd-close-btn" class="msd-close" title="Close Panel">✕</button>
        </div>

        <!-- Scrollable Content -->
        <div class="msd-body">
          <!-- Surface Tabs (Clean 3-Tab Architecture) -->
          <div class="msd-section-label">Target Architectural Surface</div>
          <div class="msd-surface-tabs">
            <button class="msd-s-tab active" data-surface="floor">
              <span class="msd-s-icon">▦</span>
              <span class="msd-s-name">Living Floor</span>
            </button>
            <button class="msd-s-tab" data-surface="wall_accent">
              <span class="msd-s-icon">▥</span>
              <span class="msd-s-name">Accent Wall</span>
            </button>
            <button class="msd-s-tab" data-surface="wall_main">
              <span class="msd-s-icon">▤</span>
              <span class="msd-s-name">Main Walls</span>
            </button>
          </div>

          <!-- Mobile Anti-Glare Finish Selector -->
          <div class="msd-section-label">
            <span>Anti-Glare Finish</span>
            <small style="color:#C5A059; font-size:0.7rem; font-weight:600;">Calibrated for Phone Displays</small>
          </div>
          <div class="msd-finish-tabs">
            <button class="msd-f-tab active" data-finish="honed" title="Soft architectural sheen, zero mobile sky glare">
              <span class="msd-f-title">Honed Satin</span>
              <span class="msd-f-tag">★ Recommended</span>
            </button>
            <button class="msd-f-tab" data-finish="polished" title="Deep luxury mirror polish with dielectric Fresnel">
              <span class="msd-f-title">Polished Gloss</span>
              <span class="msd-f-tag">High Sheen</span>
            </button>
            <button class="msd-f-tab" data-finish="matte" title="Raw quarried stone texture, zero glare">
              <span class="msd-f-title">Natural Matte</span>
              <span class="msd-f-tag">Pure Texture</span>
            </button>
          </div>

          <!-- Live Reflectivity Fine-Tuning Slider -->
          <div class="msd-slider-group">
            <div class="msd-slider-header">
              <span>Surface Reflectivity</span>
              <span id="msd-gloss-val" class="msd-slider-val">40%</span>
            </div>
            <input type="range" id="msd-gloss-slider" class="msd-range" min="0" max="100" value="40" />
          </div>

          <!-- Tile Grid & Format Selector -->
          <div class="msd-section-label">Tile Layout &amp; Size</div>
          <div class="msd-format-tabs">
            <button class="msd-fmt-tab active" data-format="slab" title="Continuous monolithic bookmatched slab">
              <span class="msd-fmt-icon">▫</span>
              <span>Grand Slab (2.4m)</span>
            </button>
            <button class="msd-fmt-tab" data-format="tile-60" title="Classic 60x60 square residential tile grid">
              <span class="msd-fmt-icon">⚏</span>
              <span>Tile 60×60</span>
            </button>
            <button class="msd-fmt-tab" data-format="tile-120" title="Contemporary 120x60 rectangular architectural tile">
              <span class="msd-fmt-icon">▭</span>
              <span>Tile 120×60</span>
            </button>
            <button class="msd-fmt-tab" data-format="brick" title="Offset subway running bond wall pattern">
              <span class="msd-fmt-icon">🧱</span>
              <span>Subway Brick</span>
            </button>
          </div>

          <!-- Catalog Filter Header -->
          <div class="msd-filter-header">
            <div class="msd-section-label" style="margin:0;">Showroom Stone Catalog</div>
            <span class="msd-filter-count" id="msd-count">48 stones</span>
          </div>

          <!-- Category Filter Pills -->
          <div class="msd-cat-pills">
            <button class="msd-pill active" data-cat="all">All (48)</button>
            <button class="msd-pill" data-cat="sig">★ Signature</button>
            <button class="msd-pill" data-cat="Granite">Granite</button>
            <button class="msd-pill" data-cat="Marble">Marble</button>
            <button class="msd-pill" data-cat="Onyx">Onyx</button>
          </div>

          <!-- Search Filter -->
          <div class="msd-search-box">
            <input type="text" id="msd-search" placeholder="Search stone (e.g. River Black, Statuario, Lakha Red)..." />
          </div>

          <!-- Stone Grid -->
          <div class="msd-stone-grid" id="msd-stone-grid"></div>
        </div>

        <!-- Bottom Quick Actions & Status -->
        <div class="msd-footer">
          <div class="msd-quick-buttons">
            <button id="msd-btn-autofill" class="msd-btn-action" title="Harmonize floor and walls simultaneously">
              ✨ Auto-Theme Room
            </button>
            <button id="msd-btn-reset" class="msd-btn-action-ghost" title="Reset all surfaces to default">
              ↺ Reset
            </button>
          </div>
          <div class="msd-status-hud" id="msd-status-hud">
            Ready • River Black • Living Floor • Honed Satin
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
   * Render stone cards with verified images
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
    if (countEl) countEl.textContent = filtered.length + ' stones';

    filtered.forEach(stone => {
      const card = document.createElement('div');
      const isCur = (state.activeStone.slug === stone.slug);
      card.className = 'msd-card ' + (isCur ? 'selected' : '');
      card.dataset.slug = stone.slug;

      const thumbUrl = getStoneImageUrl(stone);

      card.innerHTML = `
        <div class="msd-card-thumb" style="background-color: ${stone.color || '#202025'};">
          <img src="${thumbUrl}" alt="${stone.name}" loading="lazy" />
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
        setSurfaceChoice(state.activeSurface, { stone: stone });
        applyCurrentStoneToSurface(state.activeSurface, true);
      });

      grid.appendChild(card);
    });
  }

  /**
   * Bind interactive events
   */
  function bindStudioEvents() {
    const toggleBtn = document.getElementById('murali-toggle-studio');
    const closeBtn = document.getElementById('msd-close-btn');
    const drawer = document.getElementById('murali-studio-drawer');

    if (toggleBtn && drawer) {
      toggleBtn.addEventListener('click', () => {
        state.isOpen = !state.isOpen;
        drawer.classList.toggle('open', state.isOpen);
        toggleBtn.classList.toggle('active', state.isOpen);
      });
    }
    if (closeBtn && drawer) {
      closeBtn.addEventListener('click', () => {
        state.isOpen = false;
        drawer.classList.remove('open');
        if (toggleBtn) toggleBtn.classList.remove('active');
      });
    }

    function syncSurfaceUI(newSurface) {
      state.activeSurface = newSurface;

      document.querySelectorAll('.murali-chip').forEach(c => {
        c.classList.toggle('active', c.dataset.surface === newSurface);
      });
      document.querySelectorAll('.msd-s-tab').forEach(t => {
        t.classList.toggle('active', t.dataset.surface === newSurface);
      });

      const curChoice = state.surfaces[newSurface] || {};
      if (curChoice.stone) {
        state.activeStone = curChoice.stone;
        document.querySelectorAll('.msd-card').forEach(c => {
          c.classList.toggle('selected', c.dataset.slug === curChoice.stone.slug);
        });
      }
      if (curChoice.finish) {
        state.activeFinish = curChoice.finish;
        document.querySelectorAll('.msd-f-tab').forEach(t => {
          t.classList.toggle('active', t.dataset.finish === curChoice.finish);
        });
      }
      if (curChoice.format) {
        state.activeFormat = curChoice.format;
        document.querySelectorAll('.msd-fmt-tab').forEach(t => {
          t.classList.toggle('active', t.dataset.format === curChoice.format);
        });
      }

      updateCtrlBadge();
      showToast('Switched surface to ' + getSurfaceLabel(newSurface));
    }

    // Top pill quick surface chips
    document.querySelectorAll('.murali-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        syncSurfaceUI(chip.dataset.surface);
      });
    });

    // Drawer Surface tabs
    document.querySelectorAll('.msd-s-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        syncSurfaceUI(tab.dataset.surface);
      });
    });

    // Finish tabs (Mobile Anti-Glare)
    document.querySelectorAll('.msd-f-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.msd-f-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        state.activeFinish = tab.dataset.finish;
        setSurfaceChoice(state.activeSurface, { finish: tab.dataset.finish });
        applyCurrentStoneToSurface(state.activeSurface, true);
      });
    });

    // Reflectivity slider
    const slider = document.getElementById('msd-gloss-slider');
    const glossVal = document.getElementById('msd-gloss-val');
    if (slider && glossVal) {
      slider.addEventListener('input', (e) => {
        state.reflectivityPercent = parseInt(e.target.value, 10);
        glossVal.textContent = state.reflectivityPercent + '%';
        applyCurrentStoneToSurface(state.activeSurface, false);
      });
    }

    // Format tabs
    document.querySelectorAll('.msd-fmt-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.msd-fmt-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        state.activeFormat = tab.dataset.format;
        setSurfaceChoice(state.activeSurface, { format: tab.dataset.format });
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

    // Auto-fill button (Harmonize floor and walls)
    const autofillBtn = document.getElementById('msd-btn-autofill');
    if (autofillBtn) {
      autofillBtn.addEventListener('click', () => {
        ['floor', 'wall_accent'].forEach(k => {
          setSurfaceChoice(k, { stone: state.activeStone, finish: state.activeFinish, format: state.activeFormat });
        });
        applyCurrentStoneToSurface('floor', false);
        setTimeout(() => applyCurrentStoneToSurface('wall_accent', false), 100);
        showToast('Room harmonized with ' + state.activeStone.name + '!');
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
        setSurfaceChoice('floor', { stone: SHOWROOM_STONES[0], finish: 'honed', format: 'slab' });
        applyCurrentStoneToSurface('floor', true);
      });
    }
  }

  function updateCtrlBadge() {
    const badge = document.getElementById('murali-ctrl-badge');
    if (!badge) return;
    const curStone = state.surfaces[state.activeSurface]?.stone || state.activeStone;
    badge.textContent = getSurfaceLabel(state.activeSurface).split(' ')[0] + ': ' + curStone.name;
  }

  function updateStatusHUD(stoneName, surfaceKey, finishLabel, formatLabel) {
    const hud = document.getElementById('msd-status-hud');
    if (hud) {
      hud.textContent = stoneName + ' • ' + getSurfaceLabel(surfaceKey) + ' • ' + finishLabel + ' • ' + formatLabel;
    }
    updateCtrlBadge();
  }

  function showToast(msg) {
    const toast = document.getElementById('msd-toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2800);
  }

  /**
   * Non-colliding, elegant Luxury CSS
   */
  function injectStudioStyles() {
    const css = `
      /* Floating Control Bar (Never overlaps parent navbar) */
      .murali-ctrl-bar {
        position: fixed;
        top: 14px;
        left: 14px;
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 8px;
        background: rgba(14, 14, 16, 0.90);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        padding: 6px 10px;
        border-radius: 30px;
        border: 1px solid rgba(197, 160, 89, 0.35);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.65);
        font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif;
      }
      .murali-ctrl-toggle {
        display: flex;
        align-items: center;
        gap: 8px;
        background: linear-gradient(135deg, #C5A059, #8C6A2E);
        color: #0E0E10;
        border: none;
        padding: 6px 14px;
        border-radius: 20px;
        font-weight: 700;
        font-size: 0.76rem;
        cursor: pointer;
        transition: all 0.25s ease;
        box-shadow: 0 2px 10px rgba(197, 160, 89, 0.3);
      }
      .murali-ctrl-toggle:hover, .murali-ctrl-toggle.active {
        background: linear-gradient(135deg, #FFD700, #C5A059);
        transform: translateY(-1px);
        box-shadow: 0 4px 14px rgba(255, 215, 0, 0.45);
      }
      .murali-ctrl-icon {
        font-size: 13px;
      }
      .murali-ctrl-label {
        letter-spacing: 0.04em;
      }
      .murali-ctrl-badge {
        font-size: 0.65rem;
        background: rgba(14, 14, 16, 0.8);
        color: #E8C98A;
        padding: 2px 7px;
        border-radius: 10px;
        font-weight: 600;
      }
      .murali-ctrl-chips {
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .murali-chip {
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.12);
        color: #D5CEC3;
        padding: 5px 10px;
        border-radius: 14px;
        font-size: 0.70rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
      }
      .murali-chip:hover {
        background: rgba(197, 160, 89, 0.2);
        color: #F5F0E8;
        border-color: rgba(197, 160, 89, 0.4);
      }
      .murali-chip.active {
        background: rgba(197, 160, 89, 0.3);
        border-color: #C5A059;
        color: #FFD700;
      }

      /* Floating Drawer */
      .murali-drawer {
        position: fixed;
        top: 64px;
        left: 14px;
        bottom: 14px;
        width: 375px;
        max-width: calc(100vw - 28px);
        background: rgba(14, 14, 16, 0.95);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(197, 160, 89, 0.3);
        border-radius: 16px;
        box-shadow: 0 16px 48px rgba(0, 0, 0, 0.85);
        display: flex;
        flex-direction: column;
        z-index: 9998;
        transform: translateX(-120%);
        opacity: 0;
        transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
        overflow: hidden;
        font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif;
      }
      .murali-drawer.open {
        transform: translateX(0);
        opacity: 1;
      }
      .msd-header {
        padding: 14px 16px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: rgba(20, 20, 24, 0.8);
      }
      .msd-badge-row {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-bottom: 4px;
      }
      .msd-badge-gold {
        font-size: 0.62rem;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #C5A059;
      }
      .msd-badge-pbr {
        font-size: 0.58rem;
        background: rgba(197, 160, 89, 0.15);
        border: 1px solid rgba(197, 160, 89, 0.35);
        color: #E8C98A;
        padding: 1px 6px;
        border-radius: 4px;
        font-weight: 700;
      }
      .msd-title {
        font-family: 'Cormorant Garamond', Georgia, serif;
        font-size: 1.25rem;
        font-weight: 600;
        color: #F5F0E8;
        margin: 0;
        letter-spacing: 0.02em;
      }
      .msd-close {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 1px solid rgba(255, 255, 255, 0.12);
        background: rgba(255, 255, 255, 0.05);
        color: #A0988A;
        font-size: 14px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
      }
      .msd-close:hover {
        color: #FFF;
        background: rgba(255, 255, 255, 0.15);
      }

      .msd-body {
        flex: 1;
        overflow-y: auto;
        padding: 14px 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .msd-body::-webkit-scrollbar {
        width: 5px;
      }
      .msd-body::-webkit-scrollbar-thumb {
        background: rgba(197, 160, 89, 0.3);
        border-radius: 4px;
      }

      .msd-section-label {
        font-size: 0.68rem;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-weight: 700;
        color: #A0988A;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      /* Surface Tabs (Clean 3-Tab Architecture) */
      .msd-surface-tabs {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 6px;
      }
      .msd-s-tab {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 8px;
        padding: 8px 6px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        cursor: pointer;
        color: #C5BFB5;
        font-size: 0.68rem;
        font-weight: 600;
        transition: all 0.2s;
        text-align: center;
      }
      .msd-s-tab:hover {
        background: rgba(197, 160, 89, 0.15);
        border-color: rgba(197, 160, 89, 0.35);
        color: #F5F0E8;
      }
      .msd-s-tab.active {
        background: rgba(197, 160, 89, 0.25);
        border-color: #C5A059;
        color: #FFD700;
      }
      .msd-s-icon {
        font-size: 15px;
        color: #C5A059;
      }

      /* Finish Tabs */
      .msd-finish-tabs {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .msd-f-tab {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 8px;
        padding: 8px 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        transition: all 0.2s;
        text-align: left;
      }
      .msd-f-tab:hover {
        background: rgba(255, 255, 255, 0.07);
        border-color: rgba(197, 160, 89, 0.3);
      }
      .msd-f-tab.active {
        background: rgba(197, 160, 89, 0.20);
        border-color: #C5A059;
      }
      .msd-f-title {
        font-size: 0.76rem;
        font-weight: 700;
        color: #F5F0E8;
      }
      .msd-f-tag {
        font-size: 0.62rem;
        color: #C5A059;
        font-weight: 600;
      }

      /* Slider Group */
      .msd-slider-group {
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 8px;
        padding: 10px 12px;
      }
      .msd-slider-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.70rem;
        color: #C5BFB5;
        font-weight: 600;
        margin-bottom: 6px;
      }
      .msd-slider-val {
        color: #FFD700;
        font-weight: 700;
      }
      .msd-range {
        width: 100%;
        accent-color: #C5A059;
        cursor: pointer;
      }

      /* Format Tabs */
      .msd-format-tabs {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 6px;
      }
      .msd-fmt-tab {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 8px;
        padding: 8px 10px;
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        color: #C5BFB5;
        font-size: 0.72rem;
        font-weight: 600;
        transition: all 0.2s;
      }
      .msd-fmt-tab:hover {
        background: rgba(197, 160, 89, 0.15);
        border-color: rgba(197, 160, 89, 0.35);
      }
      .msd-fmt-tab.active {
        background: rgba(197, 160, 89, 0.25);
        border-color: #C5A059;
        color: #FFD700;
      }

      /* Filter Header & Pills */
      .msd-filter-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 4px;
      }
      .msd-filter-count {
        font-size: 0.65rem;
        color: #C5A059;
        font-weight: 700;
      }
      .msd-cat-pills {
        display: flex;
        gap: 4px;
        overflow-x: auto;
        padding-bottom: 2px;
      }
      .msd-cat-pills::-webkit-scrollbar {
        height: 3px;
      }
      .msd-pill {
        white-space: nowrap;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.08);
        color: #A0988A;
        font-size: 0.66rem;
        font-weight: 600;
        padding: 4px 9px;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.2s;
      }
      .msd-pill:hover {
        color: #FFF;
        background: rgba(255, 255, 255, 0.12);
      }
      .msd-pill.active {
        background: #C5A059;
        color: #0E0E10;
        border-color: #C5A059;
        font-weight: 700;
      }

      /* Search Box */
      .msd-search-box input {
        width: 100%;
        background: rgba(0, 0, 0, 0.4);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        color: #F5F0E8;
        padding: 8px 12px;
        font-size: 0.74rem;
        box-sizing: border-box;
        outline: none;
        transition: border-color 0.2s;
      }
      .msd-search-box input:focus {
        border-color: #C5A059;
      }

      /* Stone Grid */
      .msd-stone-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
      }
      .msd-card {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 8px;
        overflow: hidden;
        cursor: pointer;
        transition: all 0.25s ease;
      }
      .msd-card:hover {
        transform: translateY(-2px);
        border-color: rgba(197, 160, 89, 0.5);
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.5);
      }
      .msd-card.selected {
        border-color: #C5A059;
        box-shadow: 0 0 0 1px #C5A059, 0 4px 16px rgba(197, 160, 89, 0.3);
        background: rgba(197, 160, 89, 0.12);
      }
      .msd-card-thumb {
        width: 100%;
        height: 72px;
        position: relative;
        overflow: hidden;
        background-size: cover;
        background-position: center;
      }
      .msd-card-thumb img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 0.3s ease;
      }
      .msd-card:hover .msd-card-thumb img {
        transform: scale(1.05);
      }
      .msd-sig-badge {
        position: absolute;
        top: 4px;
        right: 4px;
        background: #FFD700;
        color: #0E0E10;
        font-size: 0.52rem;
        font-weight: 900;
        padding: 2px 5px;
        border-radius: 3px;
        letter-spacing: 0.04em;
        box-shadow: 0 2px 6px rgba(0,0,0,0.5);
      }
      .msd-card-info {
        padding: 6px 8px;
      }
      .msd-card-name {
        font-size: 0.72rem;
        font-weight: 700;
        color: #F5F0E8;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .msd-card-meta {
        font-size: 0.60rem;
        color: #A0988A;
        margin-top: 2px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      /* Footer */
      .msd-footer {
        padding: 10px 14px;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(20, 20, 24, 0.9);
      }
      .msd-quick-buttons {
        display: flex;
        gap: 6px;
        margin-bottom: 6px;
      }
      .msd-btn-action {
        flex: 1;
        background: linear-gradient(135deg, #C5A059, #8C6A2E);
        color: #0E0E10;
        border: none;
        padding: 8px 10px;
        border-radius: 8px;
        font-weight: 700;
        font-size: 0.70rem;
        cursor: pointer;
        transition: all 0.2s;
      }
      .msd-btn-action:hover {
        background: linear-gradient(135deg, #FFD700, #C5A059);
      }
      .msd-btn-action-ghost {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: #C5BFB5;
        padding: 8px 12px;
        border-radius: 8px;
        font-weight: 600;
        font-size: 0.70rem;
        cursor: pointer;
        transition: all 0.2s;
      }
      .msd-btn-action-ghost:hover {
        background: rgba(255, 255, 255, 0.12);
        color: #FFF;
      }
      .msd-status-hud {
        font-size: 0.60rem;
        color: #A0988A;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
      }

      /* Toast */
      .msd-toast {
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: rgba(14, 14, 16, 0.95);
        border: 1px solid #C5A059;
        color: #F5F0E8;
        padding: 8px 18px;
        border-radius: 24px;
        font-size: 0.76rem;
        font-weight: 600;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.8);
        z-index: 10002;
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
      }
      .msd-toast.show {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }

      @media (max-width: 600px) {
        .murali-ctrl-bar {
          top: 10px;
          left: 10px;
          right: 10px;
          justify-content: space-between;
        }
        .murali-ctrl-chips {
          display: none;
        }
        .murali-drawer {
          top: 60px;
          left: 10px;
          right: 10px;
          bottom: 10px;
          width: auto;
        }
      }
    `;

    const styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
  }

  /**
   * Continuous Polling & Hook to initialize studio once 3D assets load
   */
  let initDone = false;
  function tryInitStudio() {
    const scene = getShowroomInteriorScene();
    if (scene) {
      applyRoomFurnishingLayout(scene);
      if (!initDone && getSurfaceMesh('floor')) {
        initDone = true;
        mountStudioUI();
        setTimeout(() => applyCurrentStoneToSurface('floor', false), 200);
      }
    }
  }

  // Mount UI immediately so controls are always available
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountStudioUI);
  } else {
    mountStudioUI();
  }

  // Hook into showroom events
  window.addEventListener('showroomReady', function () {
    tryInitStudio();
  });
  window.addEventListener('showroomStarted', function () {
    tryInitStudio();
    const scene = getShowroomInteriorScene();
    if (scene) applyRoomFurnishingLayout(scene);
    setTimeout(() => applyCurrentStoneToSurface(state.activeSurface, false), 400);
  });

  // Fallback poller
  let pollCount = 0;
  const timer = setInterval(function () {
    pollCount++;
    tryInitStudio();
    if (initDone && pollCount > 30) clearInterval(timer);
  }, 400);

})();
'''

out_path = 'd:/projects/Web-Dev/chirag/ch01/V1/js/murali-stone-studio.js'
with open(out_path, 'w', encoding='utf-8') as f:
    f.write(script)
print(f'Successfully wrote {len(script)} bytes to {out_path}')
