/**
 * Murali Granites & Marbles — 3D Architectural Showroom Studio (Visualizer 3.0)
 * Real-time Stone Slabs, Custom Client Photo Upload & Tile Grid Engine with Anti-Glare PBR Calibration
 */
(function () {
  'use strict';

  // Helper to resolve asset paths reliably whether inside iframe or standalone
  function getStoneImageUrl(stone) {
    if (!stone) return '';
    const raw = stone.imageUrl || stone.url || stone.thumbUrl || '';
    if (!raw) return '';
    // Blob or data URLs (from custom uploaded photos) or absolute URLs
    if (/^(blob:|data:|https?:|\/\/)/i.test(raw)) {
      return raw;
    }
    const clean = raw.replace(/^\/+/, '');
    // Because this script runs inside V1/, relative assets/ must always be prefixed with ../
    if (clean.indexOf('assets/') === 0) {
      return '../' + clean;
    }
    return clean;
  }

  // 48 Showroom Stones with authentic product images & top 12 Signature badging
  const SHOWROOM_STONES = [
  {
    "slug": "river-black",
    "name": "River Black",
    "cat": "Granite",
    "sig": true,
    "color": "Black",
    "finish": "Polished",
    "imageUrl": "assets/images/products/product-1783138465-6a4888a145274.webp"
  },
  {
    "slug": "black-pearl",
    "name": "Black Pearl",
    "cat": "Granite",
    "sig": true,
    "color": "Black",
    "finish": "Polished",
    "imageUrl": "assets/images/products/product-1783138424-6a488878abc22.webp"
  },
  {
    "slug": "marie-gold",
    "name": "Marie Gold",
    "cat": "Granite",
    "sig": true,
    "color": "Gold",
    "finish": "Polished",
    "imageUrl": "assets/images/products/product-1783085317-6a47b9058f71e.webp"
  },
  {
    "slug": "blue-in-the-night",
    "name": "Blue in the Night",
    "cat": "Imported Granite",
    "sig": true,
    "color": "Black",
    "finish": "Polished",
    "imageUrl": "assets/images/products/product-1783085244-6a47b8bcd330d.webp"
  },
  {
    "slug": "banswara-marble",
    "name": "Banswara Marble",
    "cat": "Marble",
    "sig": true,
    "color": "White",
    "finish": "Polished",
    "imageUrl": "assets/images/products/product-1783085208-6a47b8986af97.webp"
  },
  {
    "slug": "emerald-onyx-marble",
    "name": "Emerald Onyx Marble",
    "cat": "Onyx Marble",
    "sig": true,
    "color": "Green",
    "finish": "Polished",
    "imageUrl": "assets/images/products/product-1783085161-6a47b869e0448.webp"
  },
  {
    "slug": "scorpio",
    "name": "Scorpio",
    "cat": "Marble",
    "sig": false,
    "color": "Brown",
    "finish": "Hydro",
    "imageUrl": "assets/images/products/product-1783084912-6a47b7700c180.webp"
  },
  {
    "slug": "alaska-white",
    "name": "Alaska White",
    "cat": "Granite",
    "sig": false,
    "color": "White",
    "finish": "Polished",
    "imageUrl": "assets/images/products/product-1783084356-6a47b5441b767.webp"
  },
  {
    "slug": "alaska-pink",
    "name": "Alaska Pink",
    "cat": "Granite",
    "sig": false,
    "color": "White",
    "finish": "Polished",
    "imageUrl": "assets/images/products/product-1783084260-6a47b4e40ca25.webp"
  },
  {
    "slug": "tan-brown",
    "name": "Tan Brown",
    "cat": "Granite",
    "sig": true,
    "color": "Brown",
    "finish": "Polished",
    "imageUrl": "assets/images/products/product-1783084011-6a47b3eb20cf0.webp"
  },
  {
    "slug": "mountain-brown",
    "name": "Mountain Brown",
    "cat": "Granite",
    "sig": false,
    "color": "Brown",
    "finish": "Polished",
    "imageUrl": "assets/images/products/product-1783083965-6a47b3bd9408e.webp"
  },
  {
    "slug": "red-purpory",
    "name": "Red Purpory",
    "cat": "Granite",
    "sig": false,
    "color": "Red",
    "finish": "Polished",
    "imageUrl": "assets/images/products/product-1783083937-6a47b3a1ec35b.webp"
  },
  {
    "slug": "colombo-jubrana",
    "name": "Colombo Jubrana",
    "cat": "Granite",
    "sig": false,
    "color": "Beige",
    "finish": "Polished",
    "imageUrl": "assets/images/products/product-1783083902-6a47b37e26547.webp"
  },
  {
    "slug": "lakha-red",
    "name": "Lakha Red",
    "cat": "Granite",
    "sig": true,
    "color": "Red",
    "finish": "Polished",
    "imageUrl": "assets/images/products/product-1783083869-6a47b35dab1cb.webp"
  },
  {
    "slug": "wooden",
    "name": "Wooden",
    "cat": "Sandstone",
    "sig": false,
    "color": "Brown",
    "finish": "Honed",
    "imageUrl": "assets/images/products/product-1783083830-6a47b3366d3c3.webp"
  },
  {
    "slug": "cats-eye",
    "name": "Cats Eye",
    "cat": "Granite",
    "sig": false,
    "color": "Red",
    "finish": "Polished",
    "imageUrl": "assets/images/products/product-1783083788-6a47b30cde49f.webp"
  },
  {
    "slug": "coin-black",
    "name": "Coin Black",
    "cat": "Granite",
    "sig": false,
    "color": "Black",
    "finish": "Polished",
    "imageUrl": "assets/images/products/product-1783083744-6a47b2e0d4304.webp"
  },
  {
    "slug": "impala-black",
    "name": "Impala Black",
    "cat": "Granite",
    "sig": false,
    "color": "Black",
    "finish": "Polished",
    "imageUrl": "assets/images/products/product-1783083696-6a47b2b0cbb16.webp"
  },
  {
    "slug": "black-forrest",
    "name": "Black Forrest",
    "cat": "Granite",
    "sig": true,
    "color": "Black",
    "finish": "Polished",
    "imageUrl": "assets/images/products/product-1783083657-6a47b289a4a40.webp"
  },
  {
    "slug": "black-swan",
    "name": "Black Swan",
    "cat": "Granite",
    "sig": false,
    "color": "Black",
    "finish": "Polished",
    "imageUrl": "assets/images/products/product-1783083605-6a47b25571850.webp"
  },
  {
    "slug": "titanium-black",
    "name": "Titanium Black",
    "cat": "Granite",
    "sig": true,
    "color": "Black",
    "finish": "Polished",
    "imageUrl": "assets/images/products/product-1783083560-6a47b228132ac.webp"
  },
  {
    "slug": "steel-grey",
    "name": "Steel Grey",
    "cat": "Granite",
    "sig": false,
    "color": "Black",
    "finish": "Polished",
    "imageUrl": "assets/images/products/product-1783083531-6a47b20b6691a.webp"
  },
  {
    "slug": "galaxy",
    "name": "Galaxy",
    "cat": "Granite",
    "sig": true,
    "color": "",
    "finish": "Polished",
    "imageUrl": "assets/images/products/product-1783083490-6a47b1e260326.webp"
  },
  {
    "slug": "pista-green",
    "name": "Pista Green",
    "cat": "Granite",
    "sig": false,
    "color": "Green",
    "finish": "Polished",
    "imageUrl": "assets/images/products/product-1783083351-6a47b1575ccdd.webp"
  },
  {
    "slug": "flash-green",
    "name": "Flash Green",
    "cat": "Granite",
    "sig": false,
    "color": "Green",
    "finish": "Polished",
    "imageUrl": "assets/images/products/product-1783083136-6a47b0804c4ee.webp"
  },
  {
    "slug": "bassi-lapatro",
    "name": "Bassi Lapatro",
    "cat": "Granite",
    "sig": false,
    "color": "Green",
    "finish": "Lapatro",
    "imageUrl": "assets/images/products/product-1783081478-6a47aa06b6e30.webp"
  },
  {
    "slug": "hassan-green",
    "name": "Hassan Green",
    "cat": "Granite",
    "sig": true,
    "color": "Green",
    "finish": "Polished",
    "imageUrl": "assets/images/products/product-1783081328-6a47a9703a0ea.webp"
  },
  {
    "slug": "3d-rock-look",
    "name": "3D Rock Look",
    "cat": "Granite",
    "sig": false,
    "color": "Grey",
    "finish": "Hydro",
    "imageUrl": "assets/images/products/product-1783081135-6a47a8af74f0b.webp"
  },
  {
    "slug": "green-marble",
    "name": "Green Marble",
    "cat": "Marble",
    "sig": false,
    "color": "Green",
    "finish": "Polished",
    "imageUrl": "assets/images/products/product-1783081066-6a47a86a5d5e2.webp"
  },
  {
    "slug": "forrest-green",
    "name": "Forrest Green",
    "cat": "Marble",
    "sig": false,
    "color": "Green",
    "finish": "Hydro",
    "imageUrl": "assets/images/products/product-1783080973-6a47a80d4a3d5.webp"
  },
  {
    "slug": "asian-green",
    "name": "Asian Green",
    "cat": "Granite",
    "sig": false,
    "color": "Green",
    "finish": "Polished",
    "imageUrl": "assets/images/products/product-1783080897-6a47a7c1ec5ed.webp"
  },
  {
    "slug": "shiffon-pink",
    "name": "Shiffon Pink",
    "cat": "Granite",
    "sig": false,
    "color": "Pink",
    "finish": "Polished",
    "imageUrl": "assets/images/products/product-1783080746-6a47a72a44742.webp"
  },
  {
    "slug": "shiva-gold",
    "name": "Shiva Gold",
    "cat": "Granite",
    "sig": false,
    "color": "Gold",
    "finish": "Polished",
    "imageUrl": "assets/images/products/product-1783080607-6a47a69f485d0.webp"
  },
  {
    "slug": "strawberry-pink",
    "name": "Strawberry Pink",
    "cat": "Granite",
    "sig": false,
    "color": "Pink",
    "finish": "Polished",
    "imageUrl": "assets/images/products/product-1783080527-6a47a64f53214.webp"
  },
  {
    "slug": "forrest-gold",
    "name": "Forrest Gold",
    "cat": "Sand Stone",
    "sig": false,
    "color": "Gold",
    "finish": "Hydro",
    "imageUrl": "assets/images/products/product-1783080383-6a47a5bf9a4a3.webp"
  },
  {
    "slug": "astoria-gold",
    "name": "Astoria Gold",
    "cat": "Granite",
    "sig": false,
    "color": "Gold",
    "finish": "Polished",
    "imageUrl": "assets/images/products/product-1783080299-6a47a56b99b00.webp"
  },
  {
    "slug": "romantic-blue",
    "name": "Romantic Blue",
    "cat": "Granite",
    "sig": false,
    "color": "Blue",
    "finish": "Polished",
    "imageUrl": "assets/images/products/product-1783080196-6a47a504c714c.webp"
  },
  {
    "slug": "sky-blue",
    "name": "SKY Blue",
    "cat": "Granite",
    "sig": false,
    "color": "Blue",
    "finish": "Polished",
    "imageUrl": "assets/images/products/product-1783080092-6a47a49c1e7b7.webp"
  },
  {
    "slug": "lavender-blue",
    "name": "Lavender Blue",
    "cat": "Granite",
    "sig": false,
    "color": "Blue",
    "finish": "Polished",
    "imageUrl": "assets/images/products/product-1783079927-6a47a3f7bc726.webp"
  },
  {
    "slug": "kingfisher-blue",
    "name": "Kingfisher Blue",
    "cat": "Granite",
    "sig": false,
    "color": "Blue",
    "finish": "Polished",
    "imageUrl": "assets/images/products/product-1783079826-6a47a39205007.webp"
  },
  {
    "slug": "safari-blue",
    "name": "Safari Blue",
    "cat": "Granite",
    "sig": false,
    "color": "Blue",
    "finish": "Polished",
    "imageUrl": "assets/images/products/product-1783079748-6a47a34440dc7.webp"
  },
  {
    "slug": "crystal-blue",
    "name": "Crystal Blue",
    "cat": "Granite",
    "sig": false,
    "color": "Blue",
    "finish": "Polished",
    "imageUrl": "assets/images/products/product-1783079633-6a47a2d18815c.webp"
  },
  {
    "slug": "ice-white",
    "name": "Ice White",
    "cat": "Granite",
    "sig": false,
    "color": "White",
    "finish": "Polished",
    "imageUrl": "assets/images/products/product-1783079501-6a47a24d9fa78.webp"
  },
  {
    "slug": "moon-white",
    "name": "Moon White",
    "cat": "Granite",
    "sig": false,
    "color": "White",
    "finish": "Polished",
    "imageUrl": "assets/images/products/product-1783079448-6a47a218632fd.webp"
  },
  {
    "slug": "china-white",
    "name": "China White",
    "cat": "Granite",
    "sig": false,
    "color": "White",
    "finish": "Polished",
    "imageUrl": "assets/images/products/product-1783078937-6a47a0192a9b3.webp"
  },
  {
    "slug": "river-white",
    "name": "River White",
    "cat": "Granite",
    "sig": false,
    "color": "White",
    "finish": "Polished",
    "imageUrl": "assets/images/products/product-1783078831-6a479faf4fcbd.webp"
  },
  {
    "slug": "gelatic-white",
    "name": "Gelatic White",
    "cat": "Granite",
    "sig": false,
    "color": "White",
    "finish": "Polished",
    "imageUrl": "assets/images/products/product-1783078626-6a479ee25bd3e.webp"
  },
  {
    "slug": "galaxy-white",
    "name": "Galaxy White",
    "cat": "Granite",
    "sig": false,
    "color": "White",
    "finish": "Polished",
    "imageUrl": "assets/images/products/product-1783078566-6a479ea6bfc0b.webp"
  }
];

  // Custom User Uploaded Stone Photos
  const customStones = [];
  let customUid = 0;

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
   * Load stone texture via native THREE.TextureLoader with automatic caching and path fallback
   */
  function loadStoneTexture(url, callback) {
    if (!url) {
      createFallbackTexture('', callback);
      return;
    }
    if (textureCache.has(url)) {
      callback(textureCache.get(url));
      return;
    }

    const loader = getTextureLoader();
    function tryLoad(attemptUrl, isRetry) {
      if (!loader) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = function () {
          const tex = new THREE.Texture(img);
          tex.wrapS = THREE.RepeatWrapping;
          tex.wrapT = THREE.RepeatWrapping;
          tex.generateMipmaps = true;
          tex.needsUpdate = true;
          textureCache.set(url, tex);
          callback(tex);
        };
        img.onerror = function () {
          if (!isRetry && attemptUrl.indexOf('assets/') === 0) {
            tryLoad('../' + attemptUrl, true);
          } else if (!isRetry && attemptUrl.indexOf('../assets/') === 0) {
            tryLoad(attemptUrl.substring(3), true);
          } else {
            createFallbackTexture(url, callback);
          }
        };
        img.src = attemptUrl;
        return;
      }

      loader.load(
        attemptUrl,
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
          if (!isRetry && attemptUrl.indexOf('assets/') === 0) {
            tryLoad('../' + attemptUrl, true);
          } else if (!isRetry && attemptUrl.indexOf('../assets/') === 0) {
            tryLoad(attemptUrl.substring(3), true);
          } else {
            createFallbackTexture(url, callback);
          }
        }
      );
    }

    tryLoad(url, false);
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
      <div id="murali-control-bar" class="murali-control-bar">
        <button id="murali-toggle-studio" class="murali-ctrl-btn" title="Open Stone Customizer Studio">
          <span class="murali-ctrl-icon">❖</span>
          <span class="murali-ctrl-text">Stone Studio</span>
          <span class="murali-ctrl-badge" id="murali-active-badge">Living Floor</span>
        </button>
        <div class="murali-quick-chips">
          <button class="murali-chip active" data-surface="floor" title="Living Floor">Floor</button>
          <button class="murali-chip" data-surface="wall_accent" title="Accent Wall">Accent Wall</button>
          <button class="murali-chip" data-surface="wall_main" title="Main Walls">Walls</button>
        </div>
      </div>

      <!-- Slide-Out Architectural Customization Drawer -->
      <aside id="murali-studio-drawer" class="murali-drawer" aria-label="Murali Stone Customization Studio">
        <div class="msd-header">
          <div class="msd-brand">
            <span class="msd-brand-badge">Visualizer 3.0</span>
            <h2 class="msd-title">Stone &amp; Tile Studio</h2>
          </div>
          <button id="msd-close-btn" class="msd-close" aria-label="Close Studio">&times;</button>
        </div>

        <div class="msd-scroll-body">
          <!-- Architectural Surface Tabs -->
          <div class="msd-section-label">Select Architectural Surface</div>
          <div class="msd-surface-tabs">
            <button class="msd-s-tab active" data-surface="floor">
              <span class="msd-s-icon">⬛</span>
              <span>Living Floor</span>
            </button>
            <button class="msd-s-tab" data-surface="wall_accent">
              <span class="msd-s-icon">▮</span>
              <span>Accent Wall</span>
            </button>
            <button class="msd-s-tab" data-surface="wall_main">
              <span class="msd-s-icon">▤</span>
              <span>Main Walls</span>
            </button>
          </div>

          <!-- Custom Photo & Tile Upload Section (Feature from 2.0) -->
          <div class="msd-upload-section">
            <button id="msd-btn-upload" class="msd-btn-upload" title="Upload client tile photo or slab picture">
              <span class="msd-upload-icon">📷</span>
              <span>Upload Custom Slab / Tile Photo</span>
            </button>
            <input type="file" id="msd-file-input" accept="image/*" multiple style="display:none;" />
            <div id="msd-upload-drop" class="msd-upload-drop" title="Click or drop custom tile photo">
              Tap or Drop Tile Photos Here to Apply
            </div>
          </div>

          <!-- Calibrated Anti-Glare Mobile Finishes -->
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
            <button class="msd-pill" data-cat="custom">📁 My Photos (<span id="msd-custom-count">0</span>)</button>
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
   * Process custom uploaded photo files into stone objects
   */
  function handleUploadedFiles(files) {
    const validFiles = Array.from(files).filter(f => f.type.startsWith('image/') || /\.(jpe?g|png|webp|avif|heic)$/i.test(f.name));
    if (validFiles.length === 0) {
      showToast('Please select valid stone images (JPG, PNG, WEBP)');
      return;
    }

    showToast('Loading ' + validFiles.length + ' custom photo(s)...');

    let processed = 0;
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = function (e) {
        const dataUrl = e.target.result;
        const img = new Image();
        img.onload = function () {
          const c = document.createElement('canvas');
          c.width = 256;
          c.height = 256;
          const ctx = c.getContext('2d');
          const s = Math.min(img.width, img.height);
          ctx.drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, 256, 256);
          const thumbUrl = c.toDataURL('image/jpeg', 0.85);

          const stone = {
            slug: 'custom_' + (++customUid),
            name: file.name.replace(/\.[^.]+$/, '').substring(0, 20),
            cat: 'Custom',
            finish: 'Honed / Polished',
            sig: false,
            isCustom: true,
            imageUrl: dataUrl,
            thumbUrl: thumbUrl,
            color: '#282830'
          };

          customStones.unshift(stone);
          processed++;

          if (processed === validFiles.length) {
            // Auto switch to custom category pill
            state.filterCat = 'custom';
            document.querySelectorAll('.msd-pill').forEach(p => {
              p.classList.toggle('active', p.dataset.cat === 'custom');
            });

            // Update custom count
            const countEl = document.getElementById('msd-custom-count');
            if (countEl) countEl.textContent = customStones.length;

            // Auto apply the first uploaded photo to active surface
            state.activeStone = customStones[0];
            setSurfaceChoice(state.activeSurface, { stone: customStones[0] });
            applyCurrentStoneToSurface(state.activeSurface, true);
            renderStoneGrid();
            showToast('Applied ' + stone.name + ' to ' + getSurfaceLabel(state.activeSurface));
          }
        };
        img.src = dataUrl;
      };
      reader.readAsDataURL(file);
    });
  }

  function removeCustomStone(stoneToRemove) {
    const idx = customStones.indexOf(stoneToRemove);
    if (idx !== -1) {
      customStones.splice(idx, 1);
    }
    const countEl = document.getElementById('msd-custom-count');
    if (countEl) countEl.textContent = customStones.length;

    // If currently selected on any surface, reset to default stone
    ['floor', 'wall_accent', 'wall_main'].forEach(k => {
      if (state.surfaces[k] && state.surfaces[k].stone && state.surfaces[k].stone.slug === stoneToRemove.slug) {
        state.surfaces[k].stone = SHOWROOM_STONES[0];
        if (state.activeSurface === k) {
          state.activeStone = SHOWROOM_STONES[0];
          applyCurrentStoneToSurface(k, false);
        }
      }
    });

    renderStoneGrid();
    showToast('Removed custom photo');
  }

  /**
   * Render stone cards with verified images, fallback paths, and custom photos
   */
  function renderStoneGrid() {
    const grid = document.getElementById('msd-stone-grid');
    if (!grid) return;

    grid.innerHTML = '';
    const pool = customStones.concat(SHOWROOM_STONES);
    const filtered = pool.filter(s => {
      const matchCat = (state.filterCat === 'all') ||
        (state.filterCat === 'custom' && s.isCustom) ||
        (state.filterCat === 'sig' && s.sig) ||
        (s.cat && s.cat.toLowerCase().includes(state.filterCat.toLowerCase()));
      const matchSearch = !state.searchQuery || s.name.toLowerCase().includes(state.searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    const countEl = document.getElementById('msd-count');
    if (countEl) countEl.textContent = filtered.length + ' stones';

    filtered.forEach(stone => {
      const card = document.createElement('div');
      const isCur = (state.activeStone && state.activeStone.slug === stone.slug);
      card.className = 'msd-card ' + (isCur ? 'selected' : '') + (stone.isCustom ? ' is-custom-card' : '');
      card.dataset.slug = stone.slug;

      const thumbUrl = stone.thumbUrl || getStoneImageUrl(stone);

      card.innerHTML = `
        <div class="msd-card-thumb" style="background-color: ${stone.color || '#202025'};">
          <img src="${thumbUrl}" alt="${stone.name}" loading="lazy" data-raw="${stone.imageUrl || ''}" onerror="if(!this.dataset.retried){this.dataset.retried='1';var r=this.getAttribute('data-raw');if(r){this.src=(r.indexOf('assets/')===0?'../'+r:(r.indexOf('../assets/')===0?r.substring(3):r));}}" />
          ${stone.sig ? '<span class="msd-sig-badge">★ Sig</span>' : ''}
          ${stone.isCustom ? '<span class="msd-custom-badge">📁 Photo</span>' : ''}
        </div>
        <div class="msd-card-info">
          <div class="msd-card-name">${stone.name}</div>
          <div class="msd-card-meta">${stone.cat} • ${stone.finish ? stone.finish.split('/')[0].trim() : 'Custom'}</div>
        </div>
      `;

      if (stone.isCustom) {
        const delBtn = document.createElement('button');
        delBtn.className = 'msd-card-del';
        delBtn.title = 'Remove custom photo';
        delBtn.innerHTML = '×';
        delBtn.onclick = function (e) {
          e.stopPropagation();
          removeCustomStone(stone);
        };
        card.appendChild(delBtn);
      }

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

    // Custom File Upload Trigger
    const uploadBtn = document.getElementById('msd-btn-upload');
    const fileInput = document.getElementById('msd-file-input');
    if (uploadBtn && fileInput) {
      uploadBtn.addEventListener('click', () => {
        fileInput.click();
      });
      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length > 0) {
          handleUploadedFiles(e.target.files);
          e.target.value = '';
        }
      });
    }

    // Drag and drop onto upload dropzone
    const dropArea = document.getElementById('msd-upload-drop');
    if (dropArea) {
      dropArea.addEventListener('click', () => {
        if (fileInput) fileInput.click();
      });
      ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, (e) => {
          e.preventDefault();
          dropArea.classList.add('drag-active');
        });
      });
      ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, (e) => {
          e.preventDefault();
          dropArea.classList.remove('drag-active');
        });
      });
      dropArea.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        if (dt && dt.files && dt.files.length > 0) {
          handleUploadedFiles(dt.files);
        }
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
    const badge = document.getElementById('murali-active-badge');
    if (badge) {
      badge.textContent = getSurfaceLabel(state.activeSurface);
    }
  }

  function updateStatusHUD(stoneName, surfaceKey, finishLabel, formatLabel) {
    const hud = document.getElementById('msd-status-hud');
    if (hud) {
      hud.textContent = 'Applied: ' + stoneName + ' • ' + getSurfaceLabel(surfaceKey) + ' • ' + finishLabel + ' • ' + formatLabel;
    }
    updateCtrlBadge();
  }

  function showToast(msg) {
    const toast = document.getElementById('msd-toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('visible');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove('visible');
    }, 2800);
  }

  /**
   * Inject Studio Styles
   */
  function injectStudioStyles() {
    if (document.getElementById('murali-studio-styles')) return;

    const style = document.createElement('style');
    style.id = 'murali-studio-styles';
    style.textContent = `
      /* ── Top Floating Glass Control Pill (Zero Screen Clutter) ── */
      .murali-control-bar {
        position: fixed;
        top: 14px;
        left: 14px;
        z-index: 100;
        display: flex;
        align-items: center;
        gap: 8px;
        background: rgba(14, 14, 18, 0.88);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid rgba(197, 160, 89, 0.35);
        padding: 5px 8px;
        border-radius: 40px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
        pointer-events: auto;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      }
      .murali-ctrl-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        background: linear-gradient(135deg, #C5A059, #FFD700);
        color: #0E0E10;
        border: none;
        padding: 7px 14px;
        border-radius: 30px;
        font-size: 0.78rem;
        font-weight: 800;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      .murali-ctrl-btn:hover {
        transform: scale(1.03);
        box-shadow: 0 0 16px rgba(197, 160, 89, 0.6);
      }
      .murali-ctrl-btn.active {
        background: #F5F0E8;
        color: #0E0E10;
      }
      .murali-ctrl-icon {
        font-size: 0.95rem;
      }
      .murali-ctrl-badge {
        background: rgba(14, 14, 16, 0.85);
        color: #FFD700;
        font-size: 0.65rem;
        padding: 2px 7px;
        border-radius: 12px;
        font-weight: 700;
      }
      .murali-quick-chips {
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .murali-chip {
        background: rgba(255, 255, 255, 0.06);
        color: #D5CEC3;
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 5px 10px;
        border-radius: 20px;
        font-size: 0.68rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
      }
      .murali-chip:hover {
        background: rgba(197, 160, 89, 0.2);
        color: #FFF;
        border-color: #C5A059;
      }
      .murali-chip.active {
        background: #C5A059;
        color: #0E0E10;
        border-color: #C5A059;
        font-weight: 700;
      }

      /* ── Slide-Out Customizer Drawer ── */
      .murali-drawer {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        width: 380px;
        max-width: 90vw;
        background: rgba(16, 16, 20, 0.97);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        border-right: 1px solid rgba(197, 160, 89, 0.35);
        box-shadow: 12px 0 48px rgba(0, 0, 0, 0.85);
        transform: translateX(-105%);
        transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 9999;
        display: flex;
        flex-direction: column;
        color: #F5F0E8;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      }
      .murali-drawer.open {
        transform: translateX(0);
      }
      .msd-header {
        padding: 16px 18px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgba(197, 160, 89, 0.2);
        background: rgba(10, 10, 13, 0.6);
      }
      .msd-brand-badge {
        display: inline-block;
        background: linear-gradient(135deg, #C5A059, #FFD700);
        color: #0E0E10;
        font-size: 0.62rem;
        font-weight: 900;
        padding: 2px 6px;
        border-radius: 4px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: 3px;
      }
      .msd-title {
        font-size: 1.15rem;
        font-weight: 700;
        margin: 0;
        color: #F5F0E8;
        letter-spacing: 0.02em;
      }
      .msd-close {
        background: transparent;
        border: none;
        color: #A1A1AA;
        font-size: 1.6rem;
        cursor: pointer;
        padding: 4px 8px;
        line-height: 1;
        transition: color 0.2s;
      }
      .msd-close:hover {
        color: #FFF;
      }
      .msd-scroll-body {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      .msd-section-label {
        font-size: 0.72rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: #C5A059;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      /* Surface Tabs */
      .msd-surface-tabs {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 6px;
      }
      .msd-s-tab {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
        color: #D5CEC3;
        padding: 9px 4px;
        border-radius: 8px;
        font-size: 0.72rem;
        font-weight: 600;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3px;
        cursor: pointer;
        transition: all 0.2s;
      }
      .msd-s-tab:hover {
        background: rgba(197, 160, 89, 0.15);
        border-color: #C5A059;
        color: #FFF;
      }
      .msd-s-tab.active {
        background: linear-gradient(135deg, rgba(197, 160, 89, 0.3), rgba(255, 215, 0, 0.15));
        border-color: #C5A059;
        color: #FFD700;
        font-weight: 700;
        box-shadow: 0 0 12px rgba(197, 160, 89, 0.25);
      }
      .msd-s-icon {
        font-size: 0.85rem;
      }

      /* Custom Upload Section */
      .msd-btn-upload {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        background: linear-gradient(135deg, rgba(197, 160, 89, 0.25), rgba(255, 215, 0, 0.15));
        border: 1px dashed rgba(197, 160, 89, 0.7);
        border-radius: 8px;
        color: #F5F0E8;
        font-family: inherit;
        font-size: 0.76rem;
        font-weight: 700;
        letter-spacing: 0.04em;
        padding: 10px 14px;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .msd-btn-upload:hover {
        background: linear-gradient(135deg, rgba(197, 160, 89, 0.4), rgba(255, 215, 0, 0.25));
        border-color: #FFD700;
        color: #FFFFFF;
        transform: translateY(-1px);
      }
      .msd-upload-icon {
        font-size: 1rem;
      }
      .msd-upload-drop {
        border: 1px dashed rgba(255, 255, 255, 0.15);
        border-radius: 6px;
        padding: 7px;
        text-align: center;
        background: rgba(255, 255, 255, 0.02);
        cursor: pointer;
        margin-top: 6px;
        transition: all 0.2s;
        color: #A1A1AA;
        font-size: 0.68rem;
      }
      .msd-upload-drop:hover, .msd-upload-drop.drag-active {
        background: rgba(197, 160, 89, 0.15);
        border-color: #C5A059;
        color: #FFD700;
      }

      /* Finish Tabs */
      .msd-finish-tabs {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 6px;
      }
      .msd-f-tab {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
        color: #D5CEC3;
        padding: 8px 4px;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        cursor: pointer;
        transition: all 0.2s;
      }
      .msd-f-tab:hover {
        background: rgba(197, 160, 89, 0.15);
        border-color: #C5A059;
      }
      .msd-f-tab.active {
        background: rgba(197, 160, 89, 0.25);
        border-color: #C5A059;
        color: #FFF;
      }
      .msd-f-title {
        font-size: 0.72rem;
        font-weight: 700;
      }
      .msd-f-tag {
        font-size: 0.55rem;
        color: #C5A059;
        letter-spacing: 0.02em;
      }

      /* Slider */
      .msd-slider-group {
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 8px;
        padding: 10px 12px;
      }
      .msd-slider-header {
        display: flex;
        justify-content: space-between;
        font-size: 0.7rem;
        font-weight: 600;
        color: #D5CEC3;
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
        color: #D5CEC3;
        padding: 8px 10px;
        border-radius: 8px;
        font-size: 0.72rem;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        transition: all 0.2s;
      }
      .msd-fmt-tab:hover {
        background: rgba(197, 160, 89, 0.15);
        border-color: #C5A059;
        color: #FFF;
      }
      .msd-fmt-tab.active {
        background: rgba(197, 160, 89, 0.25);
        border-color: #C5A059;
        color: #FFD700;
      }

      /* Filter & Grid */
      .msd-filter-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 4px;
      }
      .msd-filter-count {
        font-size: 0.68rem;
        color: #A1A1AA;
      }
      .msd-cat-pills {
        display: flex;
        gap: 5px;
        flex-wrap: wrap;
      }
      .msd-pill {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.08);
        color: #A1A1AA;
        padding: 4px 9px;
        border-radius: 14px;
        font-size: 0.68rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
      }
      .msd-pill:hover {
        color: #FFF;
        border-color: rgba(197, 160, 89, 0.4);
      }
      .msd-pill.active {
        background: #C5A059;
        color: #0E0E10;
        border-color: #C5A059;
        font-weight: 700;
      }
      .msd-search-box input {
        width: 100%;
        background: rgba(0, 0, 0, 0.4);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 6px;
        padding: 8px 12px;
        color: #F5F0E8;
        font-size: 0.74rem;
        outline: none;
        box-sizing: border-box;
      }
      .msd-search-box input:focus {
        border-color: #C5A059;
      }

      /* Stone Grid */
      .msd-stone-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
        margin-top: 4px;
      }
      .msd-card {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.07);
        border-radius: 8px;
        overflow: hidden;
        cursor: pointer;
        transition: all 0.22s ease;
        display: flex;
        flex-direction: column;
        position: relative;
      }
      .msd-card:hover {
        border-color: rgba(197, 160, 89, 0.6);
        transform: translateY(-2px);
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.5);
      }
      .msd-card.selected {
        border-color: #FFD700;
        box-shadow: 0 0 14px rgba(197, 160, 89, 0.45);
        background: rgba(197, 160, 89, 0.12);
      }
      .msd-card-thumb {
        position: relative;
        aspect-ratio: 16 / 11;
        overflow: hidden;
        background: #141418;
      }
      .msd-card-thumb img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 0.3s ease;
      }
      .msd-card:hover .msd-card-thumb img {
        transform: scale(1.06);
      }
      .msd-sig-badge {
        position: absolute;
        top: 5px;
        right: 5px;
        background: linear-gradient(135deg, #C5A059, #FFD700);
        color: #0E0E10;
        font-size: 8px;
        font-weight: 900;
        padding: 2px 5px;
        border-radius: 3px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .msd-custom-badge {
        position: absolute;
        top: 5px;
        left: 5px;
        background: linear-gradient(135deg, #2563eb, #3b82f6);
        color: #fff;
        font-size: 8px;
        font-weight: 800;
        padding: 2px 5px;
        border-radius: 3px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .msd-card-del {
        position: absolute;
        top: 4px;
        right: 4px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: rgba(220, 38, 38, 0.85);
        color: #fff;
        border: none;
        font-size: 13px;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 6;
        transition: transform 0.15s;
      }
      .msd-card-del:hover {
        transform: scale(1.2);
        background: #ef4444;
      }
      .msd-card-info {
        padding: 7px 8px;
      }
      .msd-card-name {
        font-size: 0.72rem;
        font-weight: 600;
        color: #F5F0E8;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .msd-card-meta {
        font-size: 0.6rem;
        color: #A1A1AA;
        margin-top: 2px;
      }

      /* Footer */
      .msd-footer {
        padding: 12px 16px;
        border-top: 1px solid rgba(197, 160, 89, 0.2);
        background: rgba(10, 10, 13, 0.7);
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .msd-quick-buttons {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 8px;
      }
      .msd-btn-action {
        background: linear-gradient(135deg, #C5A059, #E8C98A);
        color: #0E0E10;
        border: none;
        border-radius: 6px;
        padding: 8px 12px;
        font-size: 0.74rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s;
      }
      .msd-btn-action:hover {
        box-shadow: 0 0 14px rgba(197, 160, 89, 0.5);
      }
      .msd-btn-action-ghost {
        background: rgba(255, 255, 255, 0.05);
        color: #D5CEC3;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 6px;
        padding: 8px 12px;
        font-size: 0.74rem;
        cursor: pointer;
        transition: all 0.2s;
      }
      .msd-btn-action-ghost:hover {
        background: rgba(255, 255, 255, 0.1);
        color: #FFF;
      }
      .msd-status-hud {
        font-size: 0.62rem;
        color: #9E9689;
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
        transform: translateX(-50%) translateY(20px);
        background: rgba(14, 14, 18, 0.94);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        color: #FFD700;
        border: 1px solid rgba(197, 160, 89, 0.4);
        padding: 8px 18px;
        border-radius: 30px;
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.03em;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s, transform 0.3s;
        z-index: 10001;
        box-shadow: 0 6px 24px rgba(0, 0, 0, 0.7);
      }
      .msd-toast.visible {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }

      @media (max-width: 600px) {
        .murali-control-bar {
          top: 8px;
          left: 8px;
          right: 8px;
          justify-content: space-between;
        }
        .murali-drawer {
          width: 100vw;
          max-width: 100vw;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ── Showroom Initialization ──
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
