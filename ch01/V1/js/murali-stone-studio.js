/**
 * Murali Granites & Marbles — 3D Architectural Showroom Studio (Visualizer 3.0)
 * Real-time Stone Slabs & Tile Grid Engine with Anti-Glare PBR Calibration
 */
(function () {
  'use strict';

  // Helper to resolve asset paths reliably whether inside iframe or standalone
  function getStoneImageUrl(stone) {
    if (!stone || !stone.imageUrl) return '';
    const isInsideV1 = window.location.pathname.includes('/V1/') || window.location.pathname.endsWith('/V1');
    const prefix = isInsideV1 ? '../' : '';
    return prefix + stone.imageUrl;
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

  // Anti-glare finish configurations (specifically calibrated for mobile reflection control)
  const FINISH_CONFIGS = {
    'honed': {
      label: 'Honed Satin',
      desc: 'Soft architectural diffusion, subtle sheen, zero harsh glare (Recommended for Mobile)',
      gloss: 0.38,
      f0: 0.038,
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

  // Application State
  const state = {
    activeSurface: 'floor', // 'floor', 'wall_accent', 'wall_main', 'table_top'
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
      'wall_main': { stone: null, finish: 'matte', format: 'slab' },
      'table_top': { stone: SHOWROOM_STONES[3], finish: 'polished', format: 'slab' }
    }
  };

  // Caches
  const textureCache = new Map();
  const normalCache = new Map();

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
   * Robust mesh finder across scene graph
   */
  function getSurfaceMesh(surfaceKey) {
    const scene = getShowroomInteriorScene();
    if (!scene) return null;

    let targetName = 'floor';
    if (surfaceKey === 'floor') targetName = 'floor';
    else if (surfaceKey === 'wall_accent') targetName = 'walls.001';
    else if (surfaceKey === 'wall_main') targetName = 'walls';
    else if (surfaceKey === 'table_top') targetName = 'table_top';
    else if (surfaceKey === 'coffee_table') targetName = 'board';

    let found = scene.getObjectByName(targetName);
    if (!found) {
      scene.traverse(function (obj) {
        if (!found && obj.name === targetName) found = obj;
      });
    }
    return found;
  }

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
      ctx.drawImage(img, 0, 0, size, size);
      return canvas;
    }

    let cols = 2, rows = 2, isStaggered = false;
    if (format === 'tile-60') { cols = 2; rows = 2; }
    else if (format === 'tile-120') { cols = 2; rows = 4; }
    else if (format === 'brick') { cols = 3; rows = 6; isStaggered = true; }

    const tileW = size / cols;
    const tileH = size / rows;
    const groutW = 3; // 3px mortar grout line

    // Dark architectural mortar grout base
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
          ctx.drawImage(img, 0, 0, size, size);

          // Subtle inner tile bevel shadow
          ctx.strokeStyle = 'rgba(0,0,0,0.32)';
          ctx.lineWidth = 2;
          ctx.strokeRect(x, y, w, h);
          ctx.restore();
        }
      }
    }

    return canvas;
  }

  /**
   * Generate normal bump map from albedo canvas
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

    const bumpStrength = (format === 'slab') ? 1.5 : 3.2;

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
  function applyCurrentStoneToSurface(surfaceKey, showToastMsg) {
    if (typeof showToastMsg === 'undefined') showToastMsg = true;

    const mesh = getSurfaceMesh(surfaceKey);
    if (!mesh || !mesh.material) {
      console.warn('[MuraliStudio] Target mesh for ' + surfaceKey + ' not found in active scene. Will retry once scene loads.');
      return;
    }

    const surfaceState = state.surfaces[surfaceKey] || {};
    const stone = surfaceState.stone || state.activeStone;
    const finishKey = surfaceState.finish || state.activeFinish;
    const formatKey = surfaceState.format || state.activeFormat;
    const finishCfg = FINISH_CONFIGS[finishKey] || FINISH_CONFIGS['honed'];
    const formatCfg = FORMAT_CONFIGS[formatKey] || FORMAT_CONFIGS['slab'];

    state.surfaces[surfaceKey] = { stone: stone, finish: finishKey, format: formatKey };

    const imgUrl = getStoneImageUrl(stone);
    const cacheKey = stone.slug + '_' + formatKey;

    const applyMaterialTextures = (albedoTex, normalTex) => {
      const mat = mesh.material;
      if (!mat || !mat.uniforms) return;

      let repeat = formatCfg.repeatFloor;
      if (surfaceKey === 'wall_accent' || surfaceKey === 'wall_main') {
        repeat = formatCfg.repeatWall;
      } else if (surfaceKey === 'table_top' || surfaceKey === 'coffee_table') {
        repeat = formatCfg.repeatTable;
      }

      albedoTex.wrapS = THREE.RepeatWrapping;
      albedoTex.wrapT = THREE.RepeatWrapping;
      albedoTex.needsUpdate = true;

      normalTex.wrapS = THREE.RepeatWrapping;
      normalTex.wrapT = THREE.RepeatWrapping;
      normalTex.needsUpdate = true;

      mat.uniforms.sTextureAlbedoMap.value = albedoTex;
      mat.sTextureAlbedoMap = albedoTex;

      mat.uniforms.sTextureNormalMap.value = normalTex;
      mat.sTextureNormalMap = normalTex;

      if (mat.uniforms.offsetRepeat) {
        mat.uniforms.offsetRepeat.value.set(0, 0, repeat[0], repeat[1]);
      }

      // Dielectric stone: 0.0 metalness eliminates blinding sky reflection
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
      console.warn('[MuraliStudio] Image load fallback for: ' + imgUrl);
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
          <button class="murali-chip" data-surface="table_top" title="Customize Dining Table Top">Table Top</button>
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
          <!-- Surface Tabs -->
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
            <button class="msd-s-tab" data-surface="table_top">
              <span class="msd-s-icon">▭</span>
              <span class="msd-s-name">Dining Table</span>
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
            <button id="msd-btn-autofill" class="msd-btn-action" title="Harmonize floor, wall, and table simultaneously">
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
      card.className = 'msd-card ' + (state.activeStone.slug === stone.slug ? 'selected' : '');
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

    // Top pill quick surface chips
    document.querySelectorAll('.murali-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.murali-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        state.activeSurface = chip.dataset.surface;

        // Synchronize drawer tabs
        document.querySelectorAll('.msd-s-tab').forEach(tab => {
          tab.classList.toggle('active', tab.dataset.surface === state.activeSurface);
        });

        updateCtrlBadge();
        showToast('Surface switched to ' + getSurfaceLabel(state.activeSurface));
      });
    });

    // Drawer Surface tabs
    document.querySelectorAll('.msd-s-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.msd-s-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        state.activeSurface = tab.dataset.surface;

        // Synchronize top chips
        document.querySelectorAll('.murali-chip').forEach(chip => {
          chip.classList.toggle('active', chip.dataset.surface === state.activeSurface);
        });

        updateCtrlBadge();
        showToast('Surface switched to ' + getSurfaceLabel(state.activeSurface));
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
        applyCurrentStoneToSurface('floor', false);
        state.activeSurface = 'wall_accent';
        applyCurrentStoneToSurface('wall_accent', false);
        state.activeSurface = 'table_top';
        applyCurrentStoneToSurface('table_top', false);
        state.activeSurface = 'floor';
        showToast('Auto-themed room with ' + state.activeStone.name + '!');
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

      /* Surface Tabs */
      .msd-surface-tabs {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 6px;
      }
      .msd-s-tab {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 8px;
        padding: 8px 10px;
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        color: #C5BFB5;
        font-size: 0.74rem;
        font-weight: 600;
        transition: all 0.2s;
      }
      .msd-s-tab:hover {
        background: rgba(197, 160, 89, 0.15);
        border-color: rgba(197, 160, 89, 0.35);
      }
      .msd-s-tab.active {
        background: rgba(197, 160, 89, 0.25);
        border-color: #C5A059;
        color: #FFD700;
      }
      .msd-s-icon {
        font-size: 14px;
        color: #C5A059;
      }

      /* Finish Tabs (Anti-Glare) */
      .msd-finish-tabs {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 6px;
      }
      .msd-f-tab {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 8px;
        padding: 8px 6px;
        text-align: center;
        cursor: pointer;
        transition: all 0.2s;
      }
      .msd-f-tab:hover {
        background: rgba(197, 160, 89, 0.12);
        border-color: rgba(197, 160, 89, 0.3);
      }
      .msd-f-tab.active {
        background: rgba(197, 160, 89, 0.25);
        border-color: #C5A059;
      }
      .msd-f-title {
        display: block;
        font-size: 0.72rem;
        font-weight: 700;
        color: #F5F0E8;
      }
      .msd-f-tab.active .msd-f-title {
        color: #FFD700;
      }
      .msd-f-tag {
        display: block;
        font-size: 0.55rem;
        color: #A0988A;
        margin-top: 2px;
        letter-spacing: 0.04em;
      }
      .msd-f-tab.active .msd-f-tag {
        color: #C5A059;
      }

      /* Slider */
      .msd-slider-group {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 8px;
        padding: 8px 12px;
      }
      .msd-slider-header {
        display: flex;
        justify-content: space-between;
        font-size: 0.70rem;
        color: #A0988A;
        margin-bottom: 6px;
        font-weight: 600;
      }
      .msd-slider-val {
        color: #C5A059;
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
    if (initDone) return;
    const scene = getShowroomInteriorScene();
    if (scene && getSurfaceMesh('floor')) {
      initDone = true;
      mountStudioUI();
      // Apply initial floor stone
      setTimeout(() => applyCurrentStoneToSurface('floor', false), 200);
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
    // Re-apply to ensure interiorScene is primed
    setTimeout(() => applyCurrentStoneToSurface(state.activeSurface, false), 400);
  });

  // Fallback poller
  let pollCount = 0;
  const timer = setInterval(function () {
    pollCount++;
    tryInitStudio();
    if (initDone || pollCount > 100) clearInterval(timer);
  }, 400);

})();
