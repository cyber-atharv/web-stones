#!/usr/bin/env python3
"""
Full updater for visualizer.html
"""

import os
import json

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HTML_PATH = os.path.join(BASE_DIR, 'visualizer.html')
MANIFEST_PATH = os.path.join(BASE_DIR, 'assets', 'data', 'visualizer-manifest.json')

with open(MANIFEST_PATH, 'r', encoding='utf-8') as f:
    manifest_data = json.load(f)

manifest_json_str = json.dumps(manifest_data, indent=2)

with open(HTML_PATH, 'r', encoding='utf-8') as f:
    original_html = f.read()

# Let's write the complete, clean visualizer.html
# We preserve everything above the stage and everything below the main section (footer, nav, etc.)

head_and_header = original_html[:original_html.find('<main class="max-w-7xl')]

# Fix head styles to force strict 16:9 on all screens
head_and_header = head_and_header.replace(
"""    .room-stage {
      aspect-ratio: 16 / 9;
      max-height: 580px;
    }
    @media (max-width: 768px) {
      .room-stage {
        aspect-ratio: 4 / 3;
      }
    }""",
"""    .room-stage {
      aspect-ratio: 16 / 9;
      width: 100%;
      max-height: 580px;
    }
    @media (max-width: 768px) {
      .room-stage {
        aspect-ratio: 16 / 9;
      }
    }"""
)

# Footer and scripts ending
footer_start = original_html.find('<!-- Footer -->')
footer_and_closing = original_html[footer_start:]

# Inside footer_and_closing, replace the script block with the clean, honest visualizer engine
script_start = footer_and_closing.find('<script>')
footer_html_only = footer_and_closing[:script_start]

new_script = f"""<script>
    // 1. Authenticated Room Configurations (Strictly Pre-Rendered, No Overlays)
    const roomConfigs = {{
      'kitchen': {{
        name: 'Kitchen',
        image: 'assets/images/rooms/kitchen.jpg',
        defaultSurface: 'countertop',
        designs: [
          {{ id: 'design-1', name: 'Design 1: Obsidian Island', image: 'assets/images/rooms/kitchen.jpg', rendersCount: 12 }}
        ],
        surfaces: {{
          'countertop': {{
            key: 'countertop',
            label: 'Countertop & Island'
          }}
          // Note: Kitchen flooring has 0 pre-renders and is excluded from the UI until assets exist
        }}
      }},

      'living-room': {{
        name: 'Living Room',
        image: 'assets/images/rooms/living-room.jpg',
        defaultSurface: 'floor',
        designs: [
          {{ id: 'design-1', name: 'Design 1: Contemporary Villa Hall', image: 'assets/images/rooms/living-room.jpg', rendersCount: 24 }}
        ],
        surfaces: {{
          'floor': {{
            key: 'floor',
            label: 'Flooring'
          }},
          'wall': {{
            key: 'wall',
            label: 'Accent Wall'
          }}
        }}
      }},

      'bathroom': {{
        name: 'Bathroom',
        image: 'assets/images/rooms/bathroom.jpg',
        defaultSurface: 'floor',
        surfaces: {{
          'floor': {{
            key: 'floor',
            label: 'Bathroom Flooring'
          }},
          'wall': {{
            key: 'wall',
            label: 'Feature Wall'
          }}
        }}
      }},

      'bedroom': {{
        name: 'Bedroom',
        image: 'assets/images/rooms/bedroom.jpg',
        defaultSurface: 'floor',
        surfaces: {{
          'floor': {{
            key: 'floor',
            label: 'Bedroom Flooring'
          }}
        }}
      }},

      'staircase': {{
        name: 'Staircase',
        image: 'assets/images/rooms/staircase.jpg',
        defaultSurface: 'stairs',
        designs: [
          {{ id: 'design-1', name: 'Design 1: Grand Architectural Foyer', image: 'assets/images/rooms/staircase.jpg', rendersCount: 12 }}
        ],
        surfaces: {{
          'stairs': {{
            key: 'stairs',
            label: 'Stair Treads & Risers'
          }}
        }}
      }},

      'dining-room': {{
        name: 'Dining Room',
        image: 'assets/images/rooms/dining-room.jpg',
        defaultSurface: 'floor',
        designs: [
          {{ id: 'design-1', name: 'Design 1: Banquet Grand Hall', image: 'assets/images/rooms/dining-room.jpg', rendersCount: 12 }}
        ],
        surfaces: {{
          'floor': {{
            key: 'floor',
            label: 'Dining Room Flooring'
          }}
        }}
      }},

      'parking': {{
        name: 'Outdoor Parking',
        image: 'assets/images/rooms/parking.webp',
        defaultSurface: 'paving',
        designs: [
          {{ id: 'design-1', name: 'Design 1: Luxury Villa Driveway & Porch', image: 'assets/images/rooms/parking.webp', rendersCount: 12 }}
        ],
        surfaces: {{
          'paving': {{
            key: 'paving',
            label: 'Driveway & Porch Paving'
          }}
        }}
      }},

      'balcony': {{
        name: 'Balcony',
        image: 'assets/images/rooms/balcony.webp',
        defaultSurface: 'flooring',
        designs: [
          {{ id: 'design-1', name: 'Design 1: Contemporary Covered Balcony', image: 'assets/images/rooms/balcony.webp', rendersCount: 4 }}
        ],
        surfaces: {{
          'flooring': {{
            key: 'flooring',
            label: 'Balcony Flooring'
          }}
        }}
      }}
    }};

    // 2. Verified Authentic Stone Materials Catalog (12 Canonical Stones)
    const visualizerMaterials = [
      {{
        id: 'river-black',
        name: 'River Black',
        category: 'Granite',
        origin: 'India / Rajasthan',
        finish: 'Polished',
        thickness: '16mm - 18mm',
        usage: 'Kitchen Countertops, High-Traffic Flooring, Wall Cladding',
        image: 'assets/images/products/product-1783138465-6a4888a145274.jpg',
        description: 'Deep jet black granite with crystalline wave patterns and high density. Highly resilient against heat, stains, and scratches.'
      }},
      {{
        id: 'black-pearl',
        name: 'Black Pearl',
        category: 'Granite',
        origin: 'India / Andhra Pradesh',
        finish: 'Polished',
        thickness: '16mm - 18mm',
        usage: 'Kitchen Countertops, Bathroom Vanities, Interior Flooring',
        image: 'assets/images/products/product-1783138424-6a488878abc22.jpg',
        description: 'Semi-solid dark granite with uniform speckles of black, silver, and gold minerals. Uniform and exceptionally durable.'
      }},
      {{
        id: 'tan-brown',
        name: 'Tan Brown',
        category: 'Granite',
        origin: 'India / Telangana',
        finish: 'Polished',
        thickness: '18mm',
        usage: 'Kitchen Islands, Exterior Steps, Grand Hall Flooring',
        image: 'assets/images/products/product-1783084011-6a47b3eb20cf0.jpg',
        description: 'Rich dark granite characterized by warm brown, chocolate, and copper floral mineral clusters. Highly resistant to staining.'
      }},
      {{
        id: 'statuario-marble',
        name: 'Statuario / Banswara Marble',
        category: 'Marble',
        origin: 'India / Rajasthan',
        finish: 'Mirror Polished',
        thickness: '16mm - 18mm',
        usage: 'Living Room Flooring, Master Bedroom Suites, Luxury Bathrooms',
        image: 'assets/images/products/product-1783085208-6a47b8986af97.png',
        description: 'Classic white marble accented by delicate grey and subtle gold veins. Creates an opulent, luminous atmosphere.'
      }},
      {{
        id: 'kashmir-white',
        name: 'Kashmir / Alaska White',
        category: 'Granite',
        origin: 'India / Rajasthan',
        finish: 'Polished',
        thickness: '18mm',
        usage: 'Kitchen Worktops, Wide Format Flooring, Backsplashes',
        image: 'assets/images/products/product-1783084356-6a47b5441b767.jpg',
        description: 'Luminous pale backdrop enriched with neutral grey veins and garnet flecks. Brightens large interior spaces.'
      }},
      {{
        id: 'emerald-onyx',
        name: 'Emerald Onyx Marble',
        category: 'Onyx',
        origin: 'India / Imported',
        finish: 'Polished / Backlit',
        thickness: '16mm - 18mm',
        usage: 'Feature Accent Walls, Backlit Vanity Walls, Bar Counters',
        image: 'assets/images/products/product-1783085161-6a47b869e0448.jpg',
        description: 'Translucent banded onyx featuring crystalline jade green and amber honey veining. Striking when backlit.'
      }},
      {{
        id: 'marie-gold',
        name: 'Marie Gold',
        category: 'Granite',
        origin: 'India / Tamil Nadu',
        finish: 'Polished',
        thickness: '18mm',
        usage: 'Living Flooring, Stair Treads, Dining Room Flooring',
        image: 'assets/images/products/product-1783085317-6a47b9058f71e.jpg',
        description: 'Warm golden-beige mineral background with fine brown and caramel grains. Adds natural warmth and light.'
      }},
      {{
        id: 'blue-night',
        name: 'Blue in the Night',
        category: 'Granite',
        origin: 'Imported / Norway',
        finish: 'Polished',
        thickness: '18mm',
        usage: 'Statement Countertops, Luxury Vanities, Accent Inlays',
        image: 'assets/images/products/product-1783085244-6a47b8bcd330d.png',
        description: 'Exotic midnight black granite studded with iridescent blue labradorite crystals that gleam in light.'
      }},
      {{
        id: 'moon-white',
        name: 'Moon White',
        category: 'Granite',
        origin: 'India / Odisha',
        finish: 'Polished',
        thickness: '16mm - 18mm',
        usage: 'Modern Kitchen Counters, Vanity Tops, Hallway Flooring',
        image: 'assets/images/products/product-1783079448-6a47a218632fd.jpg',
        description: 'Fine-grained ivory and pale grey granite with miniature burgundy mineral specks. Crisp, clean contemporary look.'
      }},
      {{
        id: 'river-white',
        name: 'River White',
        category: 'Granite',
        origin: 'India / Odisha',
        finish: 'Polished',
        thickness: '18mm',
        usage: 'Kitchen Islands, Waterfall Countertops, Living Flooring',
        image: 'assets/images/products/product-1783078831-6a479faf4fcbd.jpg',
        description: 'Crisp white base with flowing grey rivers and small deep red mineral crystals. Elegant movement across slabs.'
      }},
      {{
        id: 'black-forest',
        name: 'Black Forest',
        category: 'Granite',
        origin: 'India / Rajasthan',
        finish: 'Polished / Leathered',
        thickness: '18mm - 20mm',
        usage: 'Feature Walls, Kitchen Countertops, Staircase Treads',
        image: 'assets/images/products/product-1783083657-6a47b289a4a40.jpg',
        description: 'Dramatic black granite intersected by bold white and silver streaks resembling forest branches.'
      }},
      {{
        id: 'titanium-black',
        name: 'Titanium Black',
        category: 'Granite',
        origin: 'India / Rajasthan',
        finish: 'Polished / Honed',
        thickness: '18mm',
        usage: 'Luxury Countertops, Backsplashes, Accent Flooring',
        image: 'assets/images/products/product-1783083560-6a47b228132ac.jpg',
        description: 'Deep charcoal black with undulating cream and quartz veins creating dramatic organic patterns.'
      }}
    ];

    // Incorporate custom stones added via Admin Dashboard
    try {{
      const customProducts = JSON.parse(localStorage.getItem('murali_custom_products') || '[]');
      if (Array.isArray(customProducts)) {{
        customProducts.forEach(cp => {{
          visualizerMaterials.unshift({{
            id: cp.id || cp.slug || cp.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            name: cp.name,
            color: cp.color || 'Black',
            category: cp.category || 'Granite',
            origin: cp.origin || 'India',
            finish: cp.finish || 'Polished',
            thickness: cp.thickness || '18mm',
            usage: cp.usage_area || 'Flooring, Feature Walls',
            image: cp.image_url,
            description: cp.description || `${{cp.name}} - Premium natural stone slab.`
          }});
        }});
      }}
    }} catch (e) {{}}

    // 3. Central Application State
    let currentRoomKey = 'kitchen';
    let currentSurfaceKey = 'countertop';
    let selectedMaterial = visualizerMaterials[0];
    let isComparingOriginal = false;

    // DOM Elements
    const baseRoomImg = document.getElementById('baseRoomImg');
    const afterBaseRoomImg = document.getElementById('afterBaseRoomImg');
    const afterLayer = document.getElementById('afterLayer');
    const stageViewport = document.getElementById('stageViewport');
    const currentRoomBadge = document.getElementById('currentRoomBadge');
    const currentSurfaceBadge = document.getElementById('currentSurfaceBadge');
    const surfaceContextLabel = document.getElementById('surfaceContextLabel');
    const activeStoneThumb = document.getElementById('activeStoneThumb');
    const activeMaterialTitle = document.getElementById('activeMaterialTitle');
    const activeCategoryLabel = document.getElementById('activeCategoryLabel');
    const originalRoomIndicator = document.getElementById('originalRoomIndicator');
    const compareModeText = document.getElementById('compareModeText');
    const materialsGrid = document.getElementById('materialsGrid');
    const surfaceSelectorContainer = document.getElementById('surfaceSelectorContainer');
    const enquireQuoteBtn = document.getElementById('enquireQuoteBtn');
    const whatsappShareBtn = document.getElementById('whatsappShareBtn');

    // 4. Manifest Data Engine (Script-Generated Previews)
    let GENERATED_PREVIEWS_MANIFEST = {manifest_json_str};

    // Load visualizer-manifest.json at runtime (keeping admin custom entries taking priority)
    fetch('assets/data/visualizer-manifest.json')
      .then(res => res.json())
      .then(data => {{
        if (Array.isArray(data) && data.length > 0) {{
          GENERATED_PREVIEWS_MANIFEST = data;
          renderSurfaceButtons();
          const activeCat = document.querySelector('.mat-tab.active')?.getAttribute('data-cat') || 'all';
          renderMaterialsList(activeCat);
          updateStage();
        }}
      }})
      .catch(err => {{
        console.log('Manifest loaded from embedded store.');
      }});

    // Exact Match Resolver - STRICTLY HONEST, NO PROXYING, NO FAKING
    function findGeneratedPreview(roomId, matId, surfaceId) {{
      const rKey = (roomId || '').toLowerCase().trim();
      const mKey = (matId || '').toLowerCase().trim();
      const sKey = (surfaceId || '').toLowerCase().trim();

      // Check custom visualizers uploaded via Admin Dashboard first
      try {{
        const customVis = JSON.parse(localStorage.getItem('murali_custom_visualizers') || '[]');
        if (Array.isArray(customVis)) {{
          const customMatch = customVis.find(item => {{
            const matchRoom = (item.room_id || '').toLowerCase().trim() === rKey;
            const matchSurface = (item.surface_id || '').toLowerCase().trim() === sKey;
            const matchProd = (item.product_id || '').toLowerCase().trim() === mKey || 
                              (item.product_name || '').toLowerCase().trim() === mKey;
            return matchRoom && matchSurface && matchProd;
          }});
          if (customMatch && customMatch.generated_preview) {{
            return customMatch;
          }}
        }}
      }} catch (e) {{}}

      // Direct manifest exact match only
      return GENERATED_PREVIEWS_MANIFEST.find(item => {{
        return item.room_id === rKey && 
               item.product_id === mKey && 
               item.surface_id === sKey;
      }}) || null;
    }}

    // Find alternative room where this stone has a verified render
    function findAlternativeRoomForMaterial(matId, currentRoom) {{
      const mKey = (matId || '').toLowerCase().trim();
      return GENERATED_PREVIEWS_MANIFEST.find(item => {{
        return item.product_id === mKey && item.room_id !== currentRoom;
      }}) || null;
    }}

    // 5. Render Surface Controls Dynamically for Current Room
    // Shows ONLY surfaces that have at least one verified render
    function renderSurfaceButtons() {{
      surfaceSelectorContainer.innerHTML = '';
      const room = roomConfigs[currentRoomKey];
      if (!room) return;
      surfaceContextLabel.textContent = `${{room.name}} Plane`;

      // Render Room Design Variations (only if multiple verified designs exist)
      const designBar = document.getElementById('roomDesignVariationBar');
      const designContainer = document.getElementById('roomDesignButtonsContainer');
      if (designBar && designContainer) {{
        const validDesigns = (room.designs || []).filter(d => (d.rendersCount || 0) > 0);
        if (validDesigns.length > 1) {{
          designBar.classList.remove('hidden');
          designContainer.innerHTML = '';
          validDesigns.forEach(d => {{
            const dBtn = document.createElement('button');
            const isDActive = d.id === (room.activeDesignId || 'design-1');
            dBtn.type = 'button';
            dBtn.className = `px-3 py-1.5 rounded-lg text-xs transition cursor-pointer ${{
              isDActive 
                ? 'bg-amber-500 text-stone-950 font-bold shadow' 
                : 'bg-stone-900 text-stone-300 border border-white/10 hover:border-amber-400'
            }}`;
            dBtn.textContent = d.name;
            dBtn.addEventListener('click', () => {{
              room.activeDesignId = d.id;
              room.image = d.image;
              renderSurfaceButtons();
              updateStage();
            }});
            designContainer.appendChild(dBtn);
          }});
        }} else {{
          designBar.classList.add('hidden');
        }}
      }}

      // Filter to surfaces that have >= 1 render in this room
      const availableSurfaces = Object.values(room.surfaces).filter(surf => {{
        return GENERATED_PREVIEWS_MANIFEST.some(item => item.room_id === currentRoomKey && item.surface_id === surf.key);
      }});

      if (availableSurfaces.length > 0 && !availableSurfaces.some(s => s.key === currentSurfaceKey)) {{
        currentSurfaceKey = availableSurfaces[0].key;
      }}

      availableSurfaces.forEach(surf => {{
        const btn = document.createElement('button');
        const isActive = surf.key === currentSurfaceKey;
        btn.className = `surface-btn py-2 px-3 rounded-xl text-xs text-center transition font-semibold ${{
          isActive 
            ? 'active bg-amber-500 text-stone-950 font-bold shadow-md' 
            : 'bg-stone-900 text-stone-300 border border-white/10 hover:border-amber-400'
        }}`;
        btn.setAttribute('data-surface', surf.key);
        btn.textContent = surf.label;

        btn.addEventListener('click', () => {{
          currentSurfaceKey = surf.key;
          renderSurfaceButtons();
          const activeCat = document.querySelector('.mat-tab.active')?.getAttribute('data-cat') || 'all';
          renderMaterialsList(activeCat);
          updateStage();
        }});

        surfaceSelectorContainer.appendChild(btn);
      }});
    }}

    // Fallback Image Map for Verified Working Slabs
    const VERIFIED_SLAB_FALLBACKS = {{
      'river-black': 'assets/images/products/product-1783138465-6a4888a145274.jpg',
      'black-pearl': 'assets/images/products/product-1783138424-6a488878abc22.jpg',
      'tan-brown': 'assets/images/products/product-1783084011-6a47b3eb20cf0.jpg',
      'statuario-marble': 'assets/images/products/product-1783085208-6a47b8986af97.png',
      'kashmir-white': 'assets/images/products/product-1783084356-6a47b5441b767.jpg',
      'emerald-onyx': 'assets/images/products/product-1783085161-6a47b869e0448.jpg',
      'marie-gold': 'assets/images/products/product-1783085317-6a47b9058f71e.jpg',
      'blue-night': 'assets/images/products/product-1783085244-6a47b8bcd330d.png',
      'moon-white': 'assets/images/products/product-1783079448-6a47a218632fd.jpg',
      'river-white': 'assets/images/products/product-1783078831-6a479faf4fcbd.jpg',
      'black-forest': 'assets/images/products/product-1783083657-6a47b289a4a40.jpg',
      'titanium-black': 'assets/images/products/product-1783083560-6a47b228132ac.jpg'
    }};

    function getStoneFallbackSwatch(mat) {{
      if (!mat) return '';
      const name = (mat.name || '').toLowerCase();
      const cat = (mat.category || '').toLowerCase();
      let c1 = '#1a1a20', c2 = '#363740', vein = '#666675';
      if (name.includes('white') || name.includes('statuario') || cat.includes('marble') || name.includes('moon') || name.includes('river white')) {{
        c1 = '#f5f5f7'; c2 = '#dcdde2'; vein = '#8a8b94';
      }} else if (name.includes('gold') || name.includes('marie') || name.includes('amber')) {{
        c1 = '#d4af37'; c2 = '#996515'; vein = '#ffd700';
      }} else if (name.includes('brown') || name.includes('tan')) {{
        c1 = '#4a2f23'; c2 = '#2e1c15'; vein = '#825945';
      }} else if (name.includes('onyx') || name.includes('emerald') || name.includes('green') || cat.includes('onyx')) {{
        c1 = '#174036'; c2 = '#0d241e'; vein = '#38a385';
      }} else if (name.includes('blue')) {{
        c1 = '#121f38'; c2 = '#0a101d'; vein = '#3b67b0';
      }}
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${{c1}}"/><stop offset="100%" stop-color="${{c2}}"/></linearGradient></defs><rect width="80" height="80" fill="url(#g)"/><path d="M0 20 Q30 35 45 15 T80 30" stroke="${{vein}}" stroke-width="1.8" fill="none" opacity="0.6"/><path d="M10 70 Q40 50 60 75 T80 60" stroke="${{vein}}" stroke-width="1.4" fill="none" opacity="0.5"/><circle cx="20" cy="40" r="1.5" fill="${{vein}}" opacity="0.7"/><circle cx="65" cy="25" r="1.5" fill="${{vein}}" opacity="0.7"/></svg>`;
      return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    }}

    function getVerifiedFallbackForMaterial(mat) {{
      if (!mat) return '';
      return VERIFIED_SLAB_FALLBACKS[mat.id] || VERIFIED_SLAB_FALLBACKS['river-black'];
    }}

    // 6. Render Materials List
    // Adds "Preview coming soon" tag for stones unrendered in active space
    function renderMaterialsList(filterCat = 'all') {{
      materialsGrid.innerHTML = '';
      const cleanCat = (filterCat || 'all').toLowerCase();

      let list = visualizerMaterials;
      if (cleanCat !== 'all') {{
        list = visualizerMaterials.filter(m => {{
          const mCat = (m.category || '').toLowerCase();
          if (cleanCat === 'tiles') return mCat === 'tiles';
          if (cleanCat === 'onyx') return mCat === 'onyx' || m.id.includes('onyx');
          if (cleanCat === 'marble') return mCat.includes('marble') && !mCat.includes('onyx');
          if (cleanCat === 'granite') return mCat.includes('granite');
          return mCat.includes(cleanCat);
        }});
      }}

      document.getElementById('materialCountLabel').textContent = `${{list.length}} Verified Slabs`;

      list.forEach(mat => {{
        const btn = document.createElement('button');
        const isActive = mat.id === selectedMaterial.id;
        const hasRenderInCurrent = !!findGeneratedPreview(currentRoomKey, mat.id, currentSurfaceKey);

        btn.className = `texture-pill p-2 rounded-2xl bg-stone-900 flex items-center justify-between text-left transition ${{
          isActive ? 'active border-amber-400' : ''
        }}`;
        btn.setAttribute('data-id', mat.id);

        const fallbackSrc = getVerifiedFallbackForMaterial(mat);
        btn.innerHTML = `
          <div class="flex items-center gap-2.5 overflow-hidden">
            <div class="w-10 h-10 rounded-xl overflow-hidden bg-black shrink-0 border border-white/10 shadow-inner">
              <img src="${{mat.image}}" 
                   alt="${{mat.name}}" 
                   class="w-full h-full object-cover" 
                   onerror="if(this.dataset.triedFallback!=='1'){{this.dataset.triedFallback='1';this.src='${{fallbackSrc}}';}}else{{this.onerror=null;this.src=getStoneFallbackSwatch(selectedMaterial);}}"
                   loading="lazy"/>
            </div>
            <div class="overflow-hidden">
              <div class="text-[11px] font-bold text-white truncate">${{mat.name}}</div>
              <div class="text-[9px] text-stone-400 truncate">${{mat.category}} &bull; ${{mat.origin.split('/')[0].trim()}}</div>
            </div>
          </div>
          ${{!hasRenderInCurrent ? '<span class="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300/90 border border-amber-500/20 font-medium shrink-0 ml-1">Coming soon</span>' : ''}}
        `;

        btn.addEventListener('click', () => {{
          selectMaterial(mat);
        }});

        materialsGrid.appendChild(btn);
      }});
    }}

    function selectMaterial(mat) {{
      selectedMaterial = mat;
      updateStage();
      updateInfoCard();
      const activeCat = document.querySelector('.mat-tab.active')?.getAttribute('data-cat') || 'all';
      renderMaterialsList(activeCat);
    }}

    // Preload neighboring renders for instant transitions
    function preloadNextRenders(currentMatId) {{
      const currentIdx = visualizerMaterials.findIndex(m => m.id === currentMatId);
      if (currentIdx === -1) return;
      const nextIndices = [(currentIdx + 1) % visualizerMaterials.length, (currentIdx + 2) % visualizerMaterials.length];
      nextIndices.forEach(idx => {{
        const nextMat = visualizerMaterials[idx];
        const match = findGeneratedPreview(currentRoomKey, nextMat.id, currentSurfaceKey);
        if (match && match.generated_preview) {{
          const img = new Image();
          img.src = match.generated_preview;
        }}
      }});
    }}

    // 7. Update Stage (Room, Surface, Material, and Comparison)
    function updateStage() {{
      const room = roomConfigs[currentRoomKey];
      let surface = room.surfaces[currentSurfaceKey];

      if (!surface) {{
        currentSurfaceKey = room.defaultSurface;
        surface = room.surfaces[currentSurfaceKey];
        renderSurfaceButtons();
      }}

      // 1. Resilient Base Room Loading
      baseRoomImg.onerror = function() {{
        console.warn('Base room photo missing on host:', this.src);
        this.style.opacity = '0.5';
      }};

      if (baseRoomImg.getAttribute('src') !== room.image) {{
        baseRoomImg.src = room.image;
        afterBaseRoomImg.src = room.image;
      }}

      // 2. Resolve Photorealistic Preview from Manifest
      const generatedMatch = findGeneratedPreview(currentRoomKey, selectedMaterial.id, currentSurfaceKey);
      const generatedRoomImg = document.getElementById('generatedRoomImg');
      const renderQualityBadge = document.getElementById('renderQualityBadge');
      const renderQualityText = document.getElementById('renderQualityText');
      const renderPendingToast = document.getElementById('renderPendingToast');
      const renderPendingToastText = document.getElementById('renderPendingToastText');
      const viewInOtherRoomBtn = document.getElementById('viewInOtherRoomBtn');

      if (generatedMatch && generatedMatch.generated_preview) {{
        // EXACT PREVIEW EXISTS: Render it authentically
        if (renderPendingToast) renderPendingToast.classList.add('hidden');
        generatedRoomImg.style.display = 'block';

        const targetSrc = generatedMatch.generated_preview;
        if (generatedRoomImg.getAttribute('src') !== targetSrc) {{
          generatedRoomImg.classList.add('opacity-0');
          generatedRoomImg.onload = function() {{
            this.classList.remove('opacity-0');
          }};
          generatedRoomImg.onerror = function() {{
            this.classList.remove('opacity-0');
          }};
          generatedRoomImg.src = targetSrc;
          if (generatedRoomImg.complete) {{
            generatedRoomImg.classList.remove('opacity-0');
          }}
        }} else {{
          generatedRoomImg.classList.remove('opacity-0');
        }}

        renderQualityText.textContent = 'Verified Render';
        renderQualityBadge.className = 'text-xs px-3 py-1 rounded-full bg-emerald-500/25 text-emerald-300 font-medium border border-emerald-500/40 backdrop-blur-md shadow-lg flex items-center gap-1.5';

        // Preload next stone render
        preloadNextRenders(selectedMaterial.id);
      }} else {{
        // UNRENDERED COMBINATION: Keep previously valid render active (do not show fake stone)
        // Show honest informative toast with option to view in another room
        if (renderPendingToast && renderPendingToastText) {{
          renderPendingToast.classList.remove('hidden');
          renderPendingToastText.innerHTML = `Preview for <strong class="text-amber-300">${{selectedMaterial.name}}</strong> in this space is being prepared.`;

          const alt = findAlternativeRoomForMaterial(selectedMaterial.id, currentRoomKey);
          if (alt && viewInOtherRoomBtn) {{
            const altRoomName = roomConfigs[alt.room_id]?.name || alt.room_id;
            viewInOtherRoomBtn.textContent = `View in ${{altRoomName}} \u2192`;
            viewInOtherRoomBtn.classList.remove('hidden');
            viewInOtherRoomBtn.onclick = () => {{
              currentRoomKey = alt.room_id;
              currentSurfaceKey = alt.surface_id;
              document.querySelectorAll('.room-btn').forEach(b => {{
                if (b.getAttribute('data-room') === currentRoomKey) {{
                  b.classList.add('active', 'border-amber-500/60', 'text-amber-300', 'font-semibold');
                  b.classList.remove('border-white/10', 'text-stone-300', 'font-medium');
                }} else {{
                  b.classList.remove('active', 'border-amber-500/60', 'text-amber-300', 'font-semibold');
                  b.classList.add('border-white/10', 'text-stone-300', 'font-medium');
                }}
              }});
              renderSurfaceButtons();
              const activeCat = document.querySelector('.mat-tab.active')?.getAttribute('data-cat') || 'all';
              renderMaterialsList(activeCat);
              updateStage();
              updateInfoCard();
            }};
          }} else if (viewInOtherRoomBtn) {{
            viewInOtherRoomBtn.classList.add('hidden');
          }}
        }}
      }}

      // 3. Stage Badges
      currentRoomBadge.textContent = room.name;
      currentSurfaceBadge.textContent = `Surface: ${{surface.label}}`;

      // 4. Ambient Backlight Effect Toggle
      const backlightBtn = document.getElementById('backlightToggleBtn');
      if (backlightBtn) {{
        const isOnyx = (selectedMaterial.category || '').toLowerCase() === 'onyx' || selectedMaterial.id.includes('onyx');
        if (isOnyx) {{
          backlightBtn.classList.remove('hidden');
        }} else {{
          backlightBtn.classList.add('hidden');
          generatedRoomImg?.classList.remove('surface-illuminated');
          backlightBtn.classList.remove('bg-amber-500', 'text-black');
          backlightBtn.classList.add('bg-amber-500/20', 'text-amber-300');
          const statusText = document.getElementById('backlightStatusText');
          if (statusText) statusText.textContent = 'Backlight: OFF';
        }}
      }}

      // 5. Active stone thumbnail
      const thumbFallback = getVerifiedFallbackForMaterial(selectedMaterial);
      activeStoneThumb.onerror = function() {{
        if (this.src !== thumbFallback) {{
          this.src = thumbFallback;
        }} else {{
          this.onerror = null;
          this.src = getStoneFallbackSwatch(selectedMaterial);
        }}
      }};
      activeStoneThumb.src = selectedMaterial.image;
      activeMaterialTitle.textContent = selectedMaterial.name;
      activeCategoryLabel.textContent = selectedMaterial.category;

      // 6. Before / After comparison state
      if (isComparingOriginal) {{
        afterLayer.style.display = 'none';
        originalRoomIndicator.classList.remove('hidden');
        compareModeText.textContent = 'View Selected Stone';
      }} else {{
        afterLayer.style.display = 'block';
        originalRoomIndicator.classList.add('hidden');
        compareModeText.textContent = 'Compare with Original';
      }}

      // 7. Synchronize quote and WhatsApp links
      updateActionLinks();
    }}

    // 8. Update Material Info Card
    function updateInfoCard() {{
      document.getElementById('cardMaterialName').textContent = selectedMaterial.name;
      document.getElementById('cardCategoryTag').textContent = selectedMaterial.category;
      document.getElementById('cardOriginTag').textContent = selectedMaterial.origin;
      document.getElementById('cardDescription').textContent = selectedMaterial.description;
      document.getElementById('cardFinishText').textContent = selectedMaterial.finish;
      document.getElementById('cardThicknessText').textContent = selectedMaterial.thickness;
      document.getElementById('cardUsageText').textContent = selectedMaterial.usage;
    }}

    // 9. Update Quotation and WhatsApp Actions (Synchronized)
    function updateActionLinks() {{
      const room = roomConfigs[currentRoomKey];
      const surface = room.surfaces[currentSurfaceKey] || Object.values(room.surfaces)[0];

      const qMaterial = encodeURIComponent(selectedMaterial.name);
      const qRoom = encodeURIComponent(room.name);
      const qSurface = encodeURIComponent(surface.label);

      enquireQuoteBtn.href = `contact.html?material=${{qMaterial}}&room=${{qRoom}}&surface=${{qSurface}}`;
      
      const whatsappMsg = encodeURIComponent(
        `Hello Murali Granites & Marbles, I am interested in ${{selectedMaterial.name}} for my ${{room.name}} ${{surface.label}}. Please share slab availability and quotation details.`
      );
      whatsappShareBtn.href = `https://wa.me/916366380051?text=${{whatsappMsg}}`;
    }}

    // 10. Room Switcher Listeners
    document.querySelectorAll('.room-btn').forEach(btn => {{
      btn.addEventListener('click', () => {{
        document.querySelectorAll('.room-btn').forEach(b => {{
          b.classList.remove('active', 'border-amber-500/60', 'text-amber-300', 'font-semibold');
          b.classList.add('border-white/10', 'text-stone-300', 'font-medium');
        }});
        btn.classList.add('active', 'border-amber-500/60', 'text-amber-300', 'font-semibold');
        btn.classList.remove('border-white/10', 'text-stone-300', 'font-medium');

        currentRoomKey = btn.getAttribute('data-room');
        const room = roomConfigs[currentRoomKey];
        if (room) {{
          currentSurfaceKey = room.defaultSurface;
          renderSurfaceButtons();
          const activeCat = document.querySelector('.mat-tab.active')?.getAttribute('data-cat') || 'all';
          renderMaterialsList(activeCat);
          updateStage();
          updateInfoCard();
        }}
      }});
    }});

    // 11. Material Category Tabs
    document.querySelectorAll('.mat-tab').forEach(tab => {{
      tab.addEventListener('click', () => {{
        document.querySelectorAll('.mat-tab').forEach(t => {{
          t.classList.remove('active', 'bg-amber-500', 'text-black', 'font-semibold');
          t.classList.add('bg-stone-900', 'text-stone-300');
        }});
        tab.classList.add('active', 'bg-amber-500', 'text-black', 'font-semibold');
        tab.classList.remove('bg-stone-900', 'text-stone-300');

        renderMaterialsList(tab.getAttribute('data-cat'));
      }});
    }});

    // 12. Before / After Comparison Controls (Slider & Toggle)
    const compareSliderRange = document.getElementById('compareSliderRange');
    const sliderPercentLabel = document.getElementById('sliderPercentLabel');
    const splitDividerLine = document.getElementById('splitDividerLine');

    function applyComparisonSplit(val) {{
      if (val === 0) {{
        isComparingOriginal = true;
        afterLayer.style.display = 'none';
        if (splitDividerLine) splitDividerLine.classList.add('hidden');
        sliderPercentLabel.textContent = 'Original (0%)';
        originalRoomIndicator.classList.remove('hidden');
        compareModeText.textContent = 'View Selected Stone';
      }} else if (val === 100) {{
        isComparingOriginal = false;
        afterLayer.style.display = 'block';
        afterLayer.style.clipPath = 'none';
        if (splitDividerLine) splitDividerLine.classList.add('hidden');
        sliderPercentLabel.textContent = 'Selected stone (100%)';
        originalRoomIndicator.classList.add('hidden');
        compareModeText.textContent = 'Compare with Original';
      }} else {{
        isComparingOriginal = false;
        afterLayer.style.display = 'block';
        afterLayer.style.clipPath = `inset(0 ${{100 - val}}% 0 0)`;
        if (splitDividerLine) {{
          splitDividerLine.classList.remove('hidden');
          splitDividerLine.style.left = `${{val}}%`;
        }}
        sliderPercentLabel.textContent = `${{val}}% Comparison Split`;
        originalRoomIndicator.classList.add('hidden');
        compareModeText.textContent = 'Compare with Original';
      }}
    }}

    // Direct Split Line & Viewport Dragging (Smooth & Non-Blocking)
    let isDraggingDivider = false;

    function handleSplitMove(clientX) {{
      if (!stageViewport) return;
      const rect = stageViewport.getBoundingClientRect();
      let percent = ((clientX - rect.left) / rect.width) * 100;
      percent = Math.max(0, Math.min(100, Math.round(percent)));
      if (compareSliderRange) compareSliderRange.value = percent;
      applyComparisonSplit(percent);
    }}

    if (stageViewport) {{
      stageViewport.addEventListener('pointerdown', (e) => {{
        if (e.target.closest('button, a, input, [data-no-drag], #renderPendingToast')) return;
        
        if (e.pointerType === 'touch') {{
          const rect = stageViewport.getBoundingClientRect();
          const touchX = e.clientX - rect.left;
          const currentSplitX = (parseInt(compareSliderRange?.value || 50, 10) / 100) * rect.width;
          if (Math.abs(touchX - currentSplitX) > 45 && !e.target.closest('.split-divider-line, .split-handle-btn')) {{
            return;
          }}
        }}

        isDraggingDivider = true;
        try {{ stageViewport.setPointerCapture(e.pointerId); }} catch(err) {{}}
        handleSplitMove(e.clientX);
      }});

      stageViewport.addEventListener('pointermove', (e) => {{
        if (!isDraggingDivider) return;
        handleSplitMove(e.clientX);
      }});

      const stopDrag = (e) => {{
        if (isDraggingDivider) {{
          isDraggingDivider = false;
          try {{ stageViewport.releasePointerCapture(e.pointerId); }} catch(err) {{}}
        }}
      }};

      stageViewport.addEventListener('pointerup', stopDrag);
      stageViewport.addEventListener('pointercancel', stopDrag);
    }}

    if (compareSliderRange) {{
      compareSliderRange.addEventListener('input', (e) => {{
        applyComparisonSplit(parseInt(e.target.value, 10));
      }});
    }}

    document.getElementById('toggleCompareBtn').addEventListener('click', () => {{
      isComparingOriginal = !isComparingOriginal;
      if (isComparingOriginal) {{
        if (compareSliderRange) compareSliderRange.value = 0;
        applyComparisonSplit(0);
      }} else {{
        if (compareSliderRange) compareSliderRange.value = 100;
        applyComparisonSplit(100);
      }}
    }});

    // 13. Reset View to Default
    document.getElementById('resetVisualizerBtn').addEventListener('click', () => {{
      isComparingOriginal = false;
      currentRoomKey = 'kitchen';
      currentSurfaceKey = 'countertop';
      selectedMaterial = visualizerMaterials[0]; // River Black

      document.querySelectorAll('.room-btn').forEach(b => {{
        if (b.getAttribute('data-room') === 'kitchen') {{
          b.classList.add('active', 'border-amber-500/60', 'text-amber-300', 'font-semibold');
          b.classList.remove('border-white/10', 'text-stone-300', 'font-medium');
        }} else {{
          b.classList.remove('active', 'border-amber-500/60', 'text-amber-300', 'font-semibold');
          b.classList.add('border-white/10', 'text-stone-300', 'font-medium');
        }}
      }});

      document.querySelectorAll('.mat-tab').forEach((t, idx) => {{
        if (idx === 0) {{
          t.classList.add('active', 'bg-amber-500', 'text-black', 'font-semibold');
          t.classList.remove('bg-stone-900', 'text-stone-300');
        }} else {{
          t.classList.remove('active', 'bg-amber-500', 'text-black', 'font-semibold');
          t.classList.add('bg-stone-900', 'text-stone-300');
        }}
      }});

      if (compareSliderRange) compareSliderRange.value = 50;
      applyComparisonSplit(50);

      renderSurfaceButtons();
      renderMaterialsList('all');
      updateStage();
      updateInfoCard();
    }});

    // 14. URL Parameter Handling
    function checkUrlParams() {{
      const urlParams = new URLSearchParams(window.location.search);
      const matParam = urlParams.get('material') || urlParams.get('product');
      if (matParam) {{
        const clean = matParam.toLowerCase().trim();
        const found = visualizerMaterials.find(m => {{
          const mName = m.name.toLowerCase();
          return mName.includes(clean) || clean.includes(mName) || 
                 (clean.includes('statuario') && mName.includes('statuario')) ||
                 (clean.includes('galaxy') && m.id === 'river-black') ||
                 (clean.includes('alaska') && m.id === 'kashmir-white') ||
                 (clean.includes('shiva') && m.id === 'marie-gold') ||
                 (clean.includes('banswara') && m.id === 'statuario-marble') ||
                 (clean.includes('flash') && m.id === 'emerald-onyx') ||
                 (clean.includes('lavender') && m.id === 'blue-night') ||
                 (clean.includes('pink') && m.id === 'marie-gold') ||
                 (clean.includes('onyx') && m.id === 'emerald-onyx') ||
                 (clean.includes('tan') && m.id === 'tan-brown') ||
                 (clean.includes('pearl') && m.id === 'black-pearl') ||
                 m.id.toLowerCase() === clean;
        }});
        if (found) {{
          selectedMaterial = found;
        }}
      }}

      let roomParam = (urlParams.get('room') || '').toLowerCase().trim();
      if (roomParam === 'dining-room' || roomParam === 'dining') {{
        currentRoomKey = 'dining-room';
      }} else if (roomParam === 'staircase' || roomParam === 'stairs') {{
        currentRoomKey = 'staircase';
      }} else if (roomParam === 'living-room' || roomParam === 'living') {{
        currentRoomKey = 'living-room';
      }} else if (roomParam === 'bathroom' || roomParam === 'bath') {{
        currentRoomKey = 'bathroom';
      }} else if (roomParam === 'bedroom' || roomParam === 'bed') {{
        currentRoomKey = 'bedroom';
      }} else if (roomParam === 'kitchen') {{
        currentRoomKey = 'kitchen';
      }} else if (roomParam === 'parking' || roomParam === 'outdoor' || roomParam === 'outdoor-parking') {{
        currentRoomKey = 'parking';
      }} else if (roomParam === 'balcony' || roomParam === 'balcony-flooring') {{
        currentRoomKey = 'balcony';
      }} else if (roomConfigs[roomParam]) {{
        currentRoomKey = roomParam;
      }}

      if (roomConfigs[currentRoomKey]) {{
        document.querySelectorAll('.room-btn').forEach(b => {{
          if (b.getAttribute('data-room') === currentRoomKey) {{
            b.classList.add('active', 'border-amber-500/60', 'text-amber-300', 'font-semibold');
            b.classList.remove('border-white/10', 'text-stone-300', 'font-medium');
          }} else {{
            b.classList.remove('active', 'border-amber-500/60', 'text-amber-300', 'font-semibold');
            b.classList.add('border-white/10', 'text-stone-300', 'font-medium');
          }}
        }});
      }}

      const surfaceParam = (urlParams.get('surface') || '').toLowerCase().trim();
      if (surfaceParam) {{
        const room = roomConfigs[currentRoomKey];
        const matchSurfKey = Object.keys(room.surfaces).find(k => 
          k.toLowerCase() === surfaceParam || 
          room.surfaces[k].label.toLowerCase().includes(surfaceParam) ||
          surfaceParam.includes(k.toLowerCase())
        );
        if (matchSurfKey) {{
          currentSurfaceKey = matchSurfKey;
        }}
      }}
    }}

    // 15. High-Resolution Slab Texture Zoom Lightbox
    function initTextureZoom() {{
      const modal = document.getElementById('textureZoomModal');
      const closeBtn = document.getElementById('closeZoomModalBtn');
      const modalImg = document.getElementById('zoomModalImg');
      const modalTitle = document.getElementById('zoomModalTitle');
      const modalSubtitle = document.getElementById('zoomModalSubtitle');
      const modalApplyBtn = document.getElementById('zoomModalApplyBtn');
      const zoomStageBtn = document.getElementById('zoomTextureBtn');

      let activeZoomMat = null;

      window.openTextureZoom = function(mat) {{
        if (!mat) mat = selectedMaterial;
        activeZoomMat = mat;
        if (modalTitle) modalTitle.textContent = `${{mat.name}} (${{mat.category}})`;
        if (modalSubtitle) modalSubtitle.textContent = `High-Resolution Natural Veining \u2022 ${{mat.origin}} \u2022 ${{mat.finish}}`;
        if (modalImg) modalImg.src = mat.image;
        if (modal) {{
          modal.classList.remove('hidden');
          document.body.style.overflow = 'hidden';
        }}
      }};

      function closeZoom() {{
        if (modal) modal.classList.add('hidden');
        document.body.style.overflow = '';
      }}

      if (closeBtn) closeBtn.addEventListener('click', closeZoom);
      if (modal) {{
        modal.addEventListener('click', (e) => {{
          if (e.target === modal) closeZoom();
        }});
      }}

      window.addEventListener('keydown', (e) => {{
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {{
          closeZoom();
        }}
      }});

      if (modalApplyBtn) {{
        modalApplyBtn.addEventListener('click', () => {{
          if (activeZoomMat) {{
            selectMaterial(activeZoomMat);
            closeZoom();
            document.getElementById('stageViewport')?.scrollIntoView({{ behavior: 'smooth', block: 'start' }});
          }}
        }});
      }}

      if (zoomStageBtn) {{
        zoomStageBtn.addEventListener('click', () => {{
          window.openTextureZoom(selectedMaterial);
        }});
      }}
    }}

    // 16. Subtle Ambient Backlight Glow Toggle
    function initBacklightToggle() {{
      const btn = document.getElementById('backlightToggleBtn');
      const statusText = document.getElementById('backlightStatusText');
      let isBacklit = false;

      if (!btn) return;

      btn.addEventListener('click', () => {{
        isBacklit = !isBacklit;
        const generatedRoomImg = document.getElementById('generatedRoomImg');

        if (isBacklit) {{
          generatedRoomImg?.classList.add('surface-illuminated');
          btn.classList.add('bg-amber-500', 'text-black');
          btn.classList.remove('bg-amber-500/20', 'text-amber-300');
          if (statusText) statusText.textContent = 'Backlight: ON';
        }} else {{
          generatedRoomImg?.classList.remove('surface-illuminated');
          btn.classList.remove('bg-amber-500', 'text-black');
          btn.classList.add('bg-amber-500/20', 'text-amber-300');
          if (statusText) statusText.textContent = 'Backlight: OFF';
        }}
      }});
    }}

    // 17. Unactivated Room / Area Calibration Notice Dialog
    function initUnactivatedAreaNotices() {{
      const modal = document.getElementById('areaCalibrationModal');
      const title = document.getElementById('calibrationModalTitle');
      const desc = document.getElementById('calibrationModalDesc');
      const closeBtn = document.getElementById('closeCalibrationModalBtn');
      const dismissBtn = document.getElementById('dismissCalibrationModalBtn');

      document.querySelectorAll('.unactivated-area-btn').forEach(btn => {{
        btn.addEventListener('click', () => {{
          const area = btn.getAttribute('data-area') || 'Outdoor Area';
          if (title) title.textContent = `${{area}} (Asset Calibration)`;
          if (desc) desc.textContent = `Dedicated high-resolution architectural photography for ${{area}} is currently in preparation. To maintain authentic photorealistic standards, this space will activate as soon as verified photography is calibrated and approved.`;
          modal?.classList.remove('hidden');
        }});
      }});

      const close = () => modal?.classList.add('hidden');
      if (closeBtn) closeBtn.addEventListener('click', close);
      if (dismissBtn) dismissBtn.addEventListener('click', close);
      if (modal) {{
        modal.addEventListener('click', (e) => {{
          if (e.target === modal) close();
        }});
      }}
    }}

    // 17b. Modal Accessibility & Shortcuts (No Number Key Room Hijacking)
    function initKeyboardShortcuts() {{
      window.addEventListener('keydown', (e) => {{
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName) || e.target.isContentEditable) return;

        // Escape: Close any active modal
        if (e.key === 'Escape') {{
          const compareModal = document.getElementById('slabCompareModal');
          const zoomModal = document.getElementById('textureZoomModal');
          const calibModal = document.getElementById('areaCalibrationModal');
          if (compareModal && !compareModal.classList.contains('hidden')) {{
            compareModal.classList.add('hidden');
            document.body.style.overflow = '';
          }}
          if (zoomModal && !zoomModal.classList.contains('hidden')) {{
            zoomModal.classList.add('hidden');
            document.body.style.overflow = '';
          }}
          if (calibModal && !calibModal.classList.contains('hidden')) {{
            calibModal.classList.add('hidden');
            document.body.style.overflow = '';
          }}
          return;
        }}

        // Hotkey 'c' for Stone Compare Modal
        if (e.key.toLowerCase() === 'c' && !e.ctrlKey && !e.metaKey) {{
          const compareBtn = document.getElementById('openSlabCompareBtn');
          if (compareBtn) {{
            e.preventDefault();
            compareBtn.click();
          }}
          return;
        }}

        // Hotkey 'z' for Inspect Slab Texture
        if (e.key.toLowerCase() === 'z' && !e.ctrlKey && !e.metaKey) {{
          const zoomBtn = document.getElementById('zoomTextureBtn');
          if (zoomBtn) {{
            e.preventDefault();
            zoomBtn.click();
          }}
          return;
        }}

        // Hotkey 'b' for Ambient Backlight Toggle
        if (e.key.toLowerCase() === 'b' && !e.ctrlKey && !e.metaKey) {{
          const backlightBtn = document.getElementById('backlightToggleBtn');
          if (backlightBtn && !backlightBtn.classList.contains('hidden')) {{
            e.preventDefault();
            backlightBtn.click();
          }}
          return;
        }}
      }});
    }}

    // 17c. Side-by-Side Stone Comparison Feature
    function initSlabComparator() {{
      const modal = document.getElementById('slabCompareModal');
      const openBtn = document.getElementById('openSlabCompareBtn');
      const cardCompareBtn = document.getElementById('cardCompareWithBtn');
      const closeBtn = document.getElementById('closeSlabCompareBtn');
      const selectA = document.getElementById('compareSelectA');
      const selectB = document.getElementById('compareSelectB');

      const imgA = document.getElementById('compareImgA');
      const nameA = document.getElementById('compareNameA');
      const catA = document.getElementById('compareCategoryA');
      const originA = document.getElementById('compareOriginA');
      const finishA = document.getElementById('compareFinishA');
      const hardnessA = document.getElementById('compareHardnessA');
      const acidA = document.getElementById('compareAcidA');
      const usageA = document.getElementById('compareUsageA');
      const applyABtn = document.getElementById('applyStoneABtn');

      const imgB = document.getElementById('compareImgB');
      const nameB = document.getElementById('compareNameB');
      const catB = document.getElementById('compareCategoryB');
      const originB = document.getElementById('compareOriginB');
      const finishB = document.getElementById('compareFinishB');
      const hardnessB = document.getElementById('compareHardnessB');
      const acidB = document.getElementById('compareAcidB');
      const usageB = document.getElementById('compareUsageB');
      const applyBBtn = document.getElementById('applyStoneBBtn');

      if (!modal) return;

      if (selectA && selectB) {{
        selectA.innerHTML = '';
        selectB.innerHTML = '';
        visualizerMaterials.forEach(m => {{
          const optA = document.createElement('option');
          optA.value = m.id;
          optA.textContent = `${{m.name}} (${{m.category}})`;
          selectA.appendChild(optA);

          const optB = document.createElement('option');
          optB.value = m.id;
          optB.textContent = `${{m.name}} (${{m.category}})`;
          selectB.appendChild(optB);
        }});
      }}

      function getStoneSpecs(stone) {{
        const isGranite = stone.category.toLowerCase().includes('granite');
        const isMarble = stone.category.toLowerCase().includes('marble');
        const isOnyx = stone.category.toLowerCase().includes('onyx');

        let hardness = '6.5 - 7.0 Mohs (High Scratch Resistance)';
        let acid = '100% Acid Proof & Heat Resistant';
        if (isMarble) {{
          hardness = '3.5 - 4.0 Mohs (Moderate)';
          acid = 'Acid Sensitive (Requires Neutral Cleaners)';
        }} else if (isOnyx) {{
          hardness = '3.0 - 3.5 Mohs (Translucent Exotic)';
          acid = 'Sensitive \u2022 Translucent to Backlighting';
        }}
        return {{ hardness, acid }};
      }}

      function updateColumnA(stoneId) {{
        const stone = visualizerMaterials.find(m => m.id === stoneId) || visualizerMaterials[0];
        if (!stone) return;
        if (selectA) selectA.value = stone.id;
        if (imgA) imgA.src = stone.image;
        if (nameA) nameA.textContent = stone.name;
        if (catA) catA.textContent = stone.category;
        if (originA) originA.textContent = stone.origin;
        if (finishA) finishA.textContent = stone.finish;
        if (usageA) usageA.textContent = stone.usage;
        const specs = getStoneSpecs(stone);
        if (hardnessA) hardnessA.textContent = specs.hardness;
        if (acidA) acidA.textContent = specs.acid;
      }}

      function updateColumnB(stoneId) {{
        const stone = visualizerMaterials.find(m => m.id === stoneId) || visualizerMaterials[1];
        if (!stone) return;
        if (selectB) selectB.value = stone.id;
        if (imgB) imgB.src = stone.image;
        if (nameB) nameB.textContent = stone.name;
        if (catB) catB.textContent = stone.category;
        if (originB) originB.textContent = stone.origin;
        if (finishB) finishB.textContent = stone.finish;
        if (usageB) usageB.textContent = stone.usage;
        const specs = getStoneSpecs(stone);
        if (hardnessB) hardnessB.textContent = specs.hardness;
        if (acidB) acidB.textContent = specs.acid;
      }}

      function openModal() {{
        updateColumnA(selectedMaterial.id);
        const contrasting = visualizerMaterials.find(m => m.id !== selectedMaterial.id && m.category !== selectedMaterial.category) || visualizerMaterials[3];
        updateColumnB(contrasting.id);
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }}

      function closeModal() {{
        modal.classList.add('hidden');
        document.body.style.overflow = '';
      }}

      if (openBtn) openBtn.addEventListener('click', openModal);
      if (cardCompareBtn) cardCompareBtn.addEventListener('click', openModal);
      if (closeBtn) closeBtn.addEventListener('click', closeModal);
      modal.addEventListener('click', (e) => {{
        if (e.target === modal) closeModal();
      }});

      window.addEventListener('keydown', (e) => {{
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {{
          closeModal();
        }}
      }});

      if (selectA) {{
        selectA.addEventListener('change', (e) => updateColumnA(e.target.value));
      }}
      if (selectB) {{
        selectB.addEventListener('change', (e) => updateColumnB(e.target.value));
      }}

      if (applyABtn) {{
        applyABtn.addEventListener('click', () => {{
          const stone = visualizerMaterials.find(m => m.id === selectA.value);
          if (stone) {{
            selectMaterial(stone);
            closeModal();
            document.getElementById('stageViewport')?.scrollIntoView({{ behavior: 'smooth', block: 'start' }});
          }}
        }});
      }}

      if (applyBBtn) {{
        applyBBtn.addEventListener('click', () => {{
          const stone = visualizerMaterials.find(m => m.id === selectB.value);
          if (stone) {{
            selectMaterial(stone);
            closeModal();
            document.getElementById('stageViewport')?.scrollIntoView({{ behavior: 'smooth', block: 'start' }});
          }}
        }});
      }}
    }}

    // 18. Initialize Visualizer App
    checkUrlParams();
    renderSurfaceButtons();
    renderMaterialsList('all');
    updateStage();
    updateInfoCard();
    initTextureZoom();
    initBacklightToggle();
    initUnactivatedAreaNotices();
    initKeyboardShortcuts();
    initSlabComparator();
  
    // 19. Global 1-Click Preset Launcher
    window.launchVisualizerPreset = function(roomId, surfaceId, stoneId) {{
      if (roomConfigs[roomId]) {{
        currentRoomKey = roomId;
        const room = roomConfigs[roomId];
        currentSurfaceKey = surfaceId || room.defaultSurface;

        document.querySelectorAll('.room-btn').forEach(b => {{
          if (b.getAttribute('data-room') === roomId) {{
            b.classList.add('active', 'border-amber-500/60', 'text-amber-300', 'font-semibold');
            b.classList.remove('border-white/10', 'text-stone-300', 'font-medium');
          }} else {{
            b.classList.remove('active', 'border-amber-500/60', 'text-amber-300', 'font-semibold');
            b.classList.add('border-white/10', 'text-stone-300', 'font-medium');
          }}
        }});

        if (stoneId) {{
          const found = visualizerMaterials.find(m => m.id === stoneId || m.name.toLowerCase().includes(stoneId));
          if (found) {{
            selectedMaterial = found;
          }}
        }}

        if (compareSliderRange) compareSliderRange.value = 50;
        applyComparisonSplit(50);

        renderSurfaceButtons();
        renderMaterialsList('all');
        updateStage();
        updateInfoCard();

        const stage = document.getElementById('stageViewport');
        if (stage) {{
          stage.scrollIntoView({{ behavior: 'smooth', block: 'center' }});
        }}
      }}
    }};
  </script>
<script src="assets/js/site-config-sync.js"></script>
</body>
</html>"""

# Now build the main section
# We extract the main section and replace:
# 1. stageViewport (removes overlays, enforces 16:9)
# 2. slider label (Original 0%, Selected stone 100%)
# 3. room pills (adds Dining Room, 6 active environments)
# 4. remove #stoneComparisonTool section

main_html = f"""  <!-- Main Visualizer App Container -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 flex-grow w-full">
    
    <!-- Title & Guidance Banner -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 border-b border-white/10 pb-6">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2 uppercase tracking-wider">
          <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          Interactive Room Visualizer
        </div>
        <h1 class="font-serif text-3xl sm:text-5xl font-bold tracking-wide text-white">
          Experience Stone in <span class="gold-gradient">Your Space</span>
        </h1>
        <p class="text-stone-400 text-xs sm:text-sm mt-1 max-w-xl">
          Choose a room, select an architectural surface, and preview natural marble and granite textures before you build.
        </p>
      </div>

      <!-- Quick Actions -->
      <div class="flex items-center gap-3">
        <button id="resetVisualizerBtn" class="text-xs px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 border border-white/10 transition flex items-center gap-1.5 cursor-pointer" title="Reset to default Kitchen view">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          Reset View
        </button>
        <button id="toggleCompareBtn" class="text-xs px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500 hover:text-black font-semibold transition flex items-center gap-1.5 cursor-pointer">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
          <span id="compareModeText">Compare with Original</span>
        </button>
      </div>
    </div>

    <!-- Stage Layout: Stage (Left 8 Cols) + Control Deck (Right 4 Cols) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      <!-- Left: Interactive Stage -->
      <div class="lg:col-span-8 space-y-4">
        
        <!-- Room Stage Viewport (Strict 16:9 Aspect Box for Zero Drift) -->
        <div id="stageViewport" class="relative rounded-3xl overflow-hidden bg-stone-950 border border-white/10 shadow-2xl room-stage select-none group aspect-[16/9] w-full" style="touch-action: pan-y; background: radial-gradient(circle at 50% 35%, #181920 0%, #090a0d 100%);">
          
          <!-- Base Room Photo (Shows authentic base room in Before mode) -->
          <img id="baseRoomImg" src="assets/images/rooms/kitchen.jpg" alt="Original room reference" class="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"/>

          <!-- After Layer: Contains Photorealistic Installed Stone Preview clipped to comparison slider -->
          <div id="afterLayer" class="absolute inset-0 overflow-hidden" style="width: 100%; clip-path: inset(0 50% 0 0);">
            <!-- Matching Room Background inside After layer -->
            <img id="afterBaseRoomImg" src="assets/images/rooms/kitchen.jpg" alt="Room background" class="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"/>

            <!-- PRIMARY PREVIEW: Photorealistic Architectural Installed Stone Room Render -->
            <img id="generatedRoomImg" src="assets/images/room_renders/kitchen countertop/render_River Black.png" alt="Photorealistic installed stone preview" class="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none transition-opacity duration-300" style="display: block;"/>

            <!-- Ambient depth vignette -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none"></div>
          </div>

          <!-- Split Comparison Divider Line & Handle (Active during comparison slider drag) -->
          <div id="splitDividerLine" class="split-divider-line" style="left: 50%; touch-action: none;">
            <div class="split-handle-btn" title="Drag left/right to compare Before and After">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 8L22 12L18 16M6 8L2 12L6 16"/></svg>
            </div>
          </div>

          <!-- Live Overlay Label (Top Left) -->
          <div class="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 pointer-events-none">
            <span id="currentRoomBadge" class="text-xs px-3 py-1 rounded-full bg-black/80 text-white font-medium border border-white/20 backdrop-blur-md shadow-lg pointer-events-auto">
              Kitchen
            </span>
            <span id="currentSurfaceBadge" class="text-xs px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-medium border border-amber-500/40 backdrop-blur-md shadow-lg pointer-events-auto">
              Surface: Countertop &amp; Island
            </span>
            <span id="renderQualityBadge" class="text-xs px-3 py-1 rounded-full bg-emerald-500/25 text-emerald-300 font-medium border border-emerald-500/40 backdrop-blur-md shadow-lg flex items-center gap-1.5 pointer-events-auto">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span id="renderQualityText">Verified Render</span>
            </span>

            <!-- Reversible Backlight Effect Button (Active for Onyx & Translucent Slabs) -->
            <button id="backlightToggleBtn" class="hidden text-xs px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-medium border border-amber-500/40 backdrop-blur-md shadow-lg hover:bg-amber-500 hover:text-black transition flex items-center gap-1.5 pointer-events-auto cursor-pointer" title="Toggle subtle ambient backlight enhancement">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              <span id="backlightStatusText">Backlight: OFF</span>
            </button>
          </div>

          <!-- Top Right Actions: Side-by-Side Compare & Texture Detail Zoom -->
          <div class="absolute top-4 right-4 z-20 flex items-center gap-2 pointer-events-auto">
            <button id="openSlabCompareBtn" class="text-xs px-3 py-1.5 rounded-full bg-black/85 text-amber-300 font-medium border border-white/20 backdrop-blur-md shadow-lg hover:bg-stone-800 hover:border-amber-400 transition flex items-center gap-1.5 cursor-pointer" title="Compare two stone slabs side-by-side (Shortcut: C)">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="8" height="18" rx="1"/><rect x="13" y="3" width="8" height="18" rx="1"/></svg>
              <span>Compare Slabs</span>
            </button>
            <button id="zoomTextureBtn" class="text-xs px-3 py-1.5 rounded-full bg-black/85 text-amber-300 font-medium border border-white/20 backdrop-blur-md shadow-lg hover:bg-stone-800 hover:border-amber-400 transition flex items-center gap-1.5 cursor-pointer" title="Inspect full-resolution slab veining (Shortcut: Z)">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
              <span>Inspect Slab</span>
            </button>
          </div>

          <!-- Honest Toast Notice (Shows when selected stone is unrendered in this space) -->
          <div id="renderPendingToast" class="absolute top-16 left-4 right-4 z-20 hidden">
            <div class="px-4 py-3 rounded-2xl bg-black/95 border border-amber-500/40 backdrop-blur-md shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div class="flex items-center gap-2.5 text-stone-200">
                <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0"></span>
                <span id="renderPendingToastText">Preview for this stone in this space is being prepared.</span>
              </div>
              <button id="viewInOtherRoomBtn" class="text-[11px] px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition shrink-0 hidden cursor-pointer">
                View in Other Room &rarr;
              </button>
            </div>
          </div>

          <!-- Active Stone Tag (Bottom Left) -->
          <div class="absolute bottom-4 left-4 z-20 bg-black/85 backdrop-blur-md border border-white/20 rounded-2xl p-3 flex items-center gap-3 shadow-2xl pointer-events-auto">
            <div class="w-11 h-11 rounded-xl overflow-hidden bg-black shrink-0 border border-white/25 shadow-inner">
              <img id="activeStoneThumb" src="assets/images/products/product-1783138465-6a4888a145274.jpg" class="w-full h-full object-cover" alt="Active texture thumbnail"/>
            </div>
            <div>
              <div class="text-[10px] uppercase tracking-wider text-amber-400 font-semibold" id="activeCategoryLabel">Premium Granite</div>
              <div class="text-sm font-serif font-bold text-white tracking-wide" id="activeMaterialTitle">River Black</div>
            </div>
          </div>

          <!-- Before / After Toggle Status Overlay -->
          <div id="originalRoomIndicator" class="absolute inset-0 bg-black/45 backdrop-blur-[2px] hidden z-10 flex items-center justify-center pointer-events-none">
            <div class="px-5 py-2.5 rounded-full bg-black/90 border border-amber-500/40 text-xs font-semibold uppercase tracking-widest text-amber-400 shadow-2xl flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-amber-400"></span>
              Original Room View (0%)
            </div>
          </div>
        </div>

        <!-- Before / After Interactive Slider Bar -->
        <div class="px-4 py-3 rounded-2xl bg-[#141418] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div class="flex items-center gap-2 text-stone-400 font-medium">
            <svg class="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
            <span>Comparison View:</span>
            <span class="text-white font-semibold" id="sliderPercentLabel">50% Comparison Split</span>
          </div>
          <div class="flex items-center gap-3 w-full sm:w-72">
            <span class="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">Original (0%)</span>
            <input type="range" id="compareSliderRange" min="0" max="100" value="50" class="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500" title="Slide to compare original room and stone render"/>
            <span class="text-[10px] text-amber-400 uppercase tracking-wider font-semibold">Selected stone (100%)</span>
          </div>
        </div>

        <!-- Room Selector Pills -->
        <div class="p-4 rounded-2xl bg-[#141418] border border-white/10 space-y-3">
          <div class="flex items-center justify-between text-xs text-stone-400 font-medium px-1">
            <span class="flex items-center gap-2">
              <span class="text-stone-300 font-semibold flex items-center gap-1.5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-amber-400"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                <span>Select Interior Space:</span>
              </span>
            </span>
            <span class="text-[11px] text-amber-400 font-medium" id="roomEnvCountLabel">8 Architectural Spaces Available</span>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-2.5" id="roomSelectorGrid">
            <button class="room-btn active px-3.5 py-2.5 rounded-xl text-xs font-semibold text-center bg-stone-900 border border-amber-500/60 text-amber-300 transition cursor-pointer flex items-center justify-center gap-1.5 shadow-sm" data-room="kitchen">
              <span>Kitchen</span>
            </button>
            <button class="room-btn px-3.5 py-2.5 rounded-xl text-xs font-medium text-center bg-stone-900 border border-white/10 text-stone-300 hover:border-amber-400 hover:text-white transition cursor-pointer flex items-center justify-center gap-1.5" data-room="living-room">
              <span>Living Room</span>
            </button>
            <button class="room-btn px-3.5 py-2.5 rounded-xl text-xs font-medium text-center bg-stone-900 border border-white/10 text-stone-300 hover:border-amber-400 hover:text-white transition cursor-pointer flex items-center justify-center gap-1.5" data-room="bathroom">
              <span>Bathroom</span>
            </button>
            <button class="room-btn px-3.5 py-2.5 rounded-xl text-xs font-medium text-center bg-stone-900 border border-white/10 text-stone-300 hover:border-amber-400 hover:text-white transition cursor-pointer flex items-center justify-center gap-1.5" data-room="bedroom">
              <span>Bedroom</span>
            </button>
            <button class="room-btn px-3.5 py-2.5 rounded-xl text-xs font-medium text-center bg-stone-900 border border-white/10 text-stone-300 hover:border-amber-400 hover:text-white transition cursor-pointer flex items-center justify-center gap-1.5" data-room="staircase">
              <span>Staircase</span>
            </button>
            <button class="room-btn px-3.5 py-2.5 rounded-xl text-xs font-medium text-center bg-stone-900 border border-white/10 text-stone-300 hover:border-amber-400 hover:text-white transition cursor-pointer flex items-center justify-center gap-1.5" data-room="dining-room">
              <span>Dining Room</span>
            </button>
            <button class="room-btn px-3.5 py-2.5 rounded-xl text-xs font-medium text-center bg-stone-900 border border-white/10 text-stone-300 hover:border-amber-400 hover:text-white transition cursor-pointer flex items-center justify-center gap-1.5" data-room="parking">
              <span>Outdoor Parking</span>
            </button>
            <button class="room-btn px-2.5 py-2.5 rounded-xl text-xs font-medium text-center bg-stone-900 border border-white/10 text-stone-300 hover:border-amber-400 hover:text-white transition cursor-pointer flex items-center justify-center gap-1 relative overflow-hidden" data-room="balcony">
              <span>Balcony</span>
              <span class="text-[8px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase font-bold tracking-wider ml-0.5">Live</span>
            </button>
          </div>

          <!-- Room Design Variation Selector (Only active if multi-renders exist) -->
          <div id="roomDesignVariationBar" class="pt-2 border-t border-white/10 hidden flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <span class="text-stone-400 text-[11px] flex items-center gap-1.5" id="roomDesignVariationLabel">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-amber-400"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
              <span>Interior Design Scheme:</span>
            </span>
            <div class="flex items-center gap-1.5 flex-wrap" id="roomDesignButtonsContainer">
            </div>
          </div>

          <!-- Additional Architectural Areas Status (Unactivated until verified dedicated assets exist) -->
          <div class="pt-2 border-t border-white/5 flex flex-wrap items-center gap-1.5 text-[11px]">
            <span class="text-stone-500 text-[10px] uppercase tracking-wider font-semibold mr-1">In Preparation:</span>
            <button type="button" class="unactivated-area-btn px-2.5 py-1 rounded-lg bg-stone-900/60 text-stone-400 border border-white/5 hover:border-amber-500/30 hover:text-stone-300 transition text-[10px] flex items-center gap-1 cursor-pointer" data-area="Utility Area">
              <span class="w-1.5 h-1.5 rounded-full bg-stone-600"></span>
              Utility Area (Photoshoot Calibration)
            </button>
          </div>
        </div>

        <!-- Practical Disclaimer Note -->
        <p class="text-[11px] text-stone-500 leading-relaxed px-1">
          * Note: Visualizer displays genuine high-definition pre-rendered photoshoot imagery calibrated to matching base room framing. Because marble and granite are natural geological stones quarried from the earth, individual slab veining, mineral crystallization, and tone nuances vary naturally. We invite you to inspect full physical slab lots at our showroom.
        </p>
      </div>

      <!-- Right: Material Selection & Direct Quote Deck -->
      <div class="lg:col-span-4 space-y-4">
        
        <!-- Surface Selection (Dynamically filtered to surfaces with verified renders) -->
        <div class="p-5 rounded-3xl bg-[#141418] border border-white/10 space-y-4">
          <div class="text-xs uppercase tracking-wider font-semibold text-stone-400 flex items-center justify-between">
            <span>Target Surface</span>
            <span class="text-amber-400 text-[10px]" id="surfaceContextLabel">Kitchen Plane</span>
          </div>

          <div class="grid grid-cols-2 gap-2" id="surfaceSelectorContainer">
            <!-- Populated dynamically with surfaces that have renders -->
          </div>
        </div>

        <!-- Material Category Filter Tabs & Verified Slabs -->
        <div class="p-5 rounded-3xl bg-[#141418] border border-white/10 space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-xs uppercase tracking-wider font-semibold text-stone-400">Select Material</span>
            <span class="text-xs text-amber-400 font-medium" id="materialCountLabel">12 Verified Slabs</span>
          </div>

          <div class="flex flex-wrap gap-1.5" id="matCatTabs">
            <button class="mat-tab active text-[11px] px-3.5 py-1.5 rounded-full bg-amber-500 text-black font-semibold transition cursor-pointer" data-cat="all">All</button>
            <button class="mat-tab text-[11px] px-3.5 py-1.5 rounded-full bg-stone-900 text-stone-300 border border-white/10 hover:border-amber-400 transition cursor-pointer" data-cat="granite">Granite</button>
            <button class="mat-tab text-[11px] px-3.5 py-1.5 rounded-full bg-stone-900 text-stone-300 border border-white/10 hover:border-amber-400 transition cursor-pointer" data-cat="marble">Marble</button>
            <button class="mat-tab text-[11px] px-3.5 py-1.5 rounded-full bg-stone-900 text-stone-300 border border-white/10 hover:border-amber-400 transition cursor-pointer" data-cat="tiles">Tiles</button>
            <button class="mat-tab text-[11px] px-3.5 py-1.5 rounded-full bg-stone-900 text-stone-300 border border-white/10 hover:border-amber-400 transition cursor-pointer" data-cat="onyx">Onyx</button>
          </div>

          <!-- Material Grid (Scrollable list of real slabs) -->
          <div class="grid grid-cols-2 gap-2.5 max-h-[300px] overflow-y-auto pr-1" id="materialsGrid">
            <!-- Dynamically populated from visualizerMaterials -->
          </div>
        </div>

        <!-- Selected Material Profile & Quote Connect Card -->
        <div class="p-5 rounded-3xl bg-[#17171E] border border-amber-500/30 shadow-2xl space-y-4">
          <div>
            <div class="flex items-center justify-between">
              <span class="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold" id="cardCategoryTag">
                Granite
              </span>
              <span class="text-xs text-stone-400" id="cardOriginTag">India / Rajasthan</span>
            </div>
            <h3 class="font-serif text-2xl font-bold text-white mt-2" id="cardMaterialName">River Black</h3>
            <p class="text-xs text-stone-400 mt-1 leading-relaxed" id="cardDescription">
              Deep black granite with subtle river-like crystalline grains. Highly recommended for heavy-duty kitchen countertops and high-traffic interior flooring.
            </p>
          </div>

          <!-- Specs row -->
          <div class="grid grid-cols-2 gap-2 text-xs border-y border-white/10 py-3 text-stone-300">
            <div>
              <span class="text-stone-500 block text-[10px]">Finish:</span>
              <span id="cardFinishText" class="font-medium text-white">Polished</span>
            </div>
            <div>
              <span class="text-stone-500 block text-[10px]">Thickness:</span>
              <span id="cardThicknessText" class="font-medium text-white">16mm - 18mm</span>
            </div>
            <div class="col-span-2 pt-1">
              <span class="text-stone-500 block text-[10px]">Recommended Applications:</span>
              <span id="cardUsageText" class="font-medium text-stone-300">Flooring, Countertops, Wall Cladding</span>
            </div>
          </div>

          <!-- Connect with Business Buttons -->
          <div class="space-y-2 pt-1">
            <a id="enquireQuoteBtn" href="contact.html?material=River+Black&room=Kitchen&surface=Countertop" class="block w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs text-center transition shadow-lg shadow-amber-500/20 cursor-pointer">
              Request Quotation For This Look &rarr;
            </a>

            <a id="whatsappShareBtn" href="https://wa.me/916366380051?text=Hello%20Murali%20Granites%20%26%20Marbles%2C%20I%20am%20interested%20in%20River%20Black%20for%20my%20Kitchen%20Countertop." target="_blank" rel="noreferrer" class="block w-full py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 hover:text-white border border-emerald-500/30 text-emerald-300 font-semibold text-xs text-center transition flex items-center justify-center gap-2 cursor-pointer">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.149.929 3.182 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.768-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.299.144.347.491 1.199.534 1.286.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.353.101.173.448.74 0.962 1.198.662.59 1.221.773 1.394.859.173.086.275.072.376-.044.101-.116.433-.506.549-.679.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z"/></svg>
              <span>Inquire via WhatsApp (+91 6366380051)</span>
            </a>

            <button id="cardCompareWithBtn" class="block w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-amber-500/30 text-amber-300 font-semibold text-xs text-center transition flex items-center justify-center gap-2 cursor-pointer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="8" height="18" rx="1"/><rect x="13" y="3" width="8" height="18" rx="1"/></svg>
              <span>Compare Side-by-Side with Another Stone</span>
            </button>
          </div>
        </div>

      </div>
    </div>

    <!-- TEXTURE ZOOM LIGHTBOX MODAL -->
    <div id="textureZoomModal" class="fixed inset-0 z-50 bg-black/85 backdrop-blur-md hidden flex items-center justify-center p-4">
      <div class="relative max-w-4xl w-full bg-[#141418] border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl p-6 space-y-4">
        <div class="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <h3 id="zoomModalTitle" class="font-serif text-xl font-bold text-white">Natural Stone Texture Detail</h3>
            <span id="zoomModalSubtitle" class="text-xs text-amber-400">High-Resolution Geological Veining</span>
          </div>
          <button id="closeZoomModalBtn" class="w-8 h-8 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white flex items-center justify-center transition border border-white/10 cursor-pointer" title="Close (Esc)">
            \u2715
          </button>
        </div>
        <div class="relative max-h-[65vh] overflow-auto rounded-2xl bg-black border border-white/10 flex items-center justify-center p-2">
          <img id="zoomModalImg" src="" alt="High resolution slab texture" class="max-w-full max-h-[60vh] object-contain transition-transform duration-300"/>
        </div>
        <div class="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400 pt-1">
          <span>Natural vein nuances and crystalline formations shown at original photographic scale.</span>
          <button id="zoomModalApplyBtn" class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition cursor-pointer">
            Apply to Visualizer Stage
          </button>
        </div>
      </div>
    </div>


    <!-- SIDE-BY-SIDE STONE COMPARISON MODAL -->
    <div id="slabCompareModal" class="fixed inset-0 z-50 bg-black/85 backdrop-blur-md hidden flex items-center justify-center p-4">
      <div class="relative max-w-5xl w-full bg-[#141418] border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl p-6 space-y-4 max-h-[92vh] flex flex-col">
        <div class="flex items-center justify-between border-b border-white/10 pb-3 shrink-0">
          <div>
            <h3 class="font-serif text-xl font-bold text-white flex items-center gap-2">
              <span>Side-by-Side Natural Stone Comparison</span>
              <span class="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-sans font-semibold">Dual Analysis</span>
            </h3>
            <span class="text-xs text-stone-400">Visually compare high-resolution slab veining, mineral hardness, and architectural suitability</span>
          </div>
          <button id="closeSlabCompareBtn" class="w-8 h-8 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white flex items-center justify-center transition border border-white/10 cursor-pointer" title="Close (Esc)">
            \u2715
          </button>
        </div>

        <!-- Comparison Cards Container (Scrollable) -->
        <div class="overflow-y-auto pr-1 space-y-4 grow">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <!-- Stone A (Left) -->
            <div class="p-4 rounded-2xl bg-stone-900/90 border border-amber-500/40 space-y-3 flex flex-col">
              <div class="flex items-center justify-between gap-2">
                <span class="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-amber-400"></span> Stone A (Primary)
                </span>
                <select id="compareSelectA" class="bg-black text-white text-xs border border-white/20 rounded-lg px-2.5 py-1 outline-none font-medium">
                </select>
              </div>

              <div class="relative aspect-[4/3] rounded-xl overflow-hidden bg-black border border-white/10 shadow-inner group">
                <img id="compareImgA" src="" alt="Stone A preview" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                <div class="absolute bottom-2 left-2 right-2 px-2.5 py-1.5 rounded-lg bg-black/80 backdrop-blur-sm text-[11px] flex items-center justify-between text-white border border-white/10">
                  <span id="compareNameA" class="font-bold">River Black</span>
                  <span id="compareCategoryA" class="text-amber-400">Granite</span>
                </div>
              </div>

              <!-- Specs Table A -->
              <div class="space-y-1.5 text-xs text-stone-300 divide-y divide-white/5 grow">
                <div class="pt-1.5 flex justify-between">
                  <span class="text-stone-500 text-[11px]">Provenance / Origin:</span>
                  <span id="compareOriginA" class="font-medium text-white text-right">India / Rajasthan</span>
                </div>
                <div class="pt-1.5 flex justify-between">
                  <span class="text-stone-500 text-[11px]">Surface Finish:</span>
                  <span id="compareFinishA" class="font-medium text-white text-right">Polished</span>
                </div>
                <div class="pt-1.5 flex justify-between">
                  <span class="text-stone-500 text-[11px]">Hardness (Mohs):</span>
                  <span id="compareHardnessA" class="font-medium text-amber-300 text-right">6.5 - 7.0 (High)</span>
                </div>
                <div class="pt-1.5 flex justify-between">
                  <span class="text-stone-500 text-[11px]">Stain / Acid Resistance:</span>
                  <span id="compareAcidA" class="font-medium text-emerald-400 text-right">100% Acid Proof</span>
                </div>
                <div class="pt-1.5">
                  <span class="text-stone-500 text-[11px] block">Recommended Usage:</span>
                  <span id="compareUsageA" class="font-medium text-stone-300 text-[11px] leading-tight block mt-0.5">Kitchen Countertops, High-Traffic Flooring</span>
                </div>
              </div>

              <button id="applyStoneABtn" class="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition cursor-pointer mt-2">
                Apply Stone A to Visualizer &rarr;
              </button>
            </div>

            <!-- Stone B (Right) -->
            <div class="p-4 rounded-2xl bg-stone-900/90 border border-white/15 space-y-3 flex flex-col">
              <div class="flex items-center justify-between gap-2">
                <span class="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-amber-400"></span> Stone B (Comparison)
                </span>
                <select id="compareSelectB" class="bg-black text-white text-xs border border-white/20 rounded-lg px-2.5 py-1 outline-none font-medium">
                </select>
              </div>

              <div class="relative aspect-[4/3] rounded-xl overflow-hidden bg-black border border-white/10 shadow-inner group">
                <img id="compareImgB" src="" alt="Stone B preview" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                <div class="absolute bottom-2 left-2 right-2 px-2.5 py-1.5 rounded-lg bg-black/80 backdrop-blur-sm text-[11px] flex items-center justify-between text-white border border-white/10">
                  <span id="compareNameB" class="font-bold">Statuario Marble</span>
                  <span id="compareCategoryB" class="text-amber-400">Marble</span>
                </div>
              </div>

              <!-- Specs Table B -->
              <div class="space-y-1.5 text-xs text-stone-300 divide-y divide-white/5 grow">
                <div class="pt-1.5 flex justify-between">
                  <span class="text-stone-500 text-[11px]">Provenance / Origin:</span>
                  <span id="compareOriginB" class="font-medium text-white text-right">India / Rajasthan</span>
                </div>
                <div class="pt-1.5 flex justify-between">
                  <span class="text-stone-500 text-[11px]">Surface Finish:</span>
                  <span id="compareFinishB" class="font-medium text-white text-right">Mirror Polished</span>
                </div>
                <div class="pt-1.5 flex justify-between">
                  <span class="text-stone-500 text-[11px]">Hardness (Mohs):</span>
                  <span id="compareHardnessB" class="font-medium text-amber-300 text-right">3.5 - 4.0 (Medium)</span>
                </div>
                <div class="pt-1.5 flex justify-between">
                  <span class="text-stone-500 text-[11px]">Stain / Acid Resistance:</span>
                  <span id="compareAcidB" class="font-medium text-amber-400 text-right">Acid Sensitive</span>
                </div>
                <div class="pt-1.5">
                  <span class="text-stone-500 text-[11px] block">Recommended Usage:</span>
                  <span id="compareUsageB" class="font-medium text-stone-300 text-[11px] leading-tight block mt-0.5">Living Room Flooring, Master Bedroom Suites</span>
                </div>
              </div>

              <button id="applyStoneBBtn" class="w-full py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs transition border border-white/20 cursor-pointer mt-2">
                Apply Stone B to Visualizer &rarr;
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>

    <!-- AREA IN CALIBRATION MODAL (For Balcony, Utility, Parking) -->
    <div id="areaCalibrationModal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm hidden flex items-center justify-center p-4">
      <div class="relative max-w-md w-full bg-[#141418] border border-amber-500/30 rounded-3xl p-6 space-y-4 shadow-2xl">
        <div class="flex items-center justify-between border-b border-white/10 pb-3">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
            <h3 id="calibrationModalTitle" class="font-serif text-lg font-bold text-white">Asset Calibration in Progress</h3>
          </div>
          <button id="closeCalibrationModalBtn" class="w-7 h-7 rounded-full bg-stone-900 text-stone-300 hover:text-white flex items-center justify-center text-xs border border-white/10 cursor-pointer">
            \u2715
          </button>
        </div>
        <p id="calibrationModalDesc" class="text-xs text-stone-300 leading-relaxed">
          Dedicated high-resolution architectural photography for this area is currently in preparation. To maintain genuine photorealistic accuracy, previews will activate once verified scene photography has been calibrated.
        </p>
        <div class="p-3 rounded-xl bg-stone-900/80 border border-white/5 text-[11px] text-stone-400">
          Tip: You can preview this stone right now in our verified <strong class="text-amber-300">Kitchen, Living Room, Bathroom, Bedroom, Staircase, or Dining Room</strong> environments.
        </div>
        <button id="dismissCalibrationModalBtn" class="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition cursor-pointer">
          Continue in Visualizer
        </button>
      </div>
    </div>
"""

# Extract Guide & FAQ sections from original HTML
guide_start = original_html.find('<!-- SECTION 1: ARCHITECTURAL APPLICATIONS GUIDE')
guide_end = original_html.find('<!-- Footer -->')
guide_and_faq_html = original_html[guide_start:guide_end]

final_html = head_and_header + main_html + guide_and_faq_html + footer_html_only + new_script

with open(HTML_PATH, 'w', encoding='utf-8') as f:
    f.write(final_html)

print("visualizer.html updated successfully!")
