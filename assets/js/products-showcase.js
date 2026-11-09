// Murali Granites & Marbles - High-Performance Scalable Catalogue Showcase Engine
// Calibrated for 400+ Products with Debounced Filtering, Size Facets, and Virtualized Pagination
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('catalogue-carousel-track');
  const searchInput = document.getElementById('search-input');
  const originFilter = document.getElementById('origin-filter');
  const colorFilter = document.getElementById('color-filter');
  const finishFilter = document.getElementById('finish-filter');
  const sizeFilter = document.getElementById('size-filter');
  const categoryTabs = document.getElementById('categories-tabs');
  const countBadge = document.getElementById('products-count-badge');
  const resetBtn = document.getElementById('reset-filters-btn');
  const loadMoreBtn = document.getElementById('load-more-btn');
  const paginationContainer = document.getElementById('pagination-container');
  const paginationStatus = document.getElementById('pagination-status');

  if (!container) return;

  // Embedded baseline catalog for instantaneous zero-latency render before network fetch
  const FALLBACK_PRODUCTS = [
  {
    "id": 78,
    "name": "River Black",
    "slug": "river-black",
    "type": "Granite",
    "category": "Granite",
    "subcategory": "North Indian Granite",
    "size_mm": "Gang-saw Slab",
    "finish": "Polished",
    "origin": "Rajasthan",
    "color": "Black",
    "thickness": "16mm",
    "usage_area": "Flooring",
    "description": "Premium River Black (Granite) for luxury residential and commercial installations.",
    "image_url": "assets/images/products/product-1783138465-6a4888a145274.webp",
    "featured_section": "our_legacy",
    "price_range": "₹120 - ₹280 / sq.ft",
    "in_stock": true
  },
  {
    "id": 77,
    "name": "Black Pearl",
    "slug": "black-pearl",
    "type": "Granite",
    "category": "Granite",
    "subcategory": "North Indian Granite",
    "size_mm": "Gang-saw Slab",
    "finish": "Polished",
    "origin": "Rajasthan",
    "color": "Black",
    "thickness": "16mm",
    "usage_area": "Flooring",
    "description": "Premium Black Pearl (Granite) for luxury residential and commercial installations.",
    "image_url": "assets/images/products/product-1783138424-6a488878abc22.webp",
    "featured_section": "our_collection",
    "price_range": "₹120 - ₹280 / sq.ft",
    "in_stock": true
  },
  {
    "id": 76,
    "name": "Marie Gold",
    "slug": "marie-gold",
    "type": "Granite",
    "category": "Granite",
    "subcategory": "South Indian Granite",
    "size_mm": "Gang-saw Slab",
    "finish": "Polished",
    "origin": "Tamil Nadu",
    "color": "Gold",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "description": "Premium Marie Gold (Granite) for luxury residential and commercial installations.",
    "image_url": "assets/images/products/product-1783085317-6a47b9058f71e.webp",
    "featured_section": "our_collection",
    "price_range": "₹120 - ₹280 / sq.ft",
    "in_stock": true
  },
  {
    "id": 74,
    "name": "Blue in the Night",
    "slug": "blue-in-the-night",
    "type": "Granite",
    "category": "Imported Granite",
    "subcategory": "Imported Exotic Granite",
    "size_mm": "Gang-saw Slab",
    "finish": "Polished",
    "origin": "Norway",
    "color": "Black",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "description": "Premium Blue in the Night (Imported Granite) for luxury residential and commercial installations.",
    "image_url": "assets/images/products/product-1783085244-6a47b8bcd330d.webp",
    "featured_section": "tile_texture",
    "price_range": "₹120 - ₹280 / sq.ft",
    "in_stock": true
  },
  {
    "id": 73,
    "name": "Banswara Marble",
    "slug": "banswara-marble",
    "type": "Marble",
    "category": "Marble",
    "subcategory": "",
    "size_mm": "Gang-saw Slab",
    "finish": "Polished",
    "origin": "Rajasthan",
    "color": "White",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "description": "Premium Banswara Marble (Marble) for luxury residential and commercial installations.",
    "image_url": "assets/images/products/product-1783085208-6a47b8986af97.webp",
    "featured_section": "tile_texture",
    "price_range": "₹42 - ₹95 / sq.ft",
    "in_stock": true
  },
  {
    "id": 72,
    "name": "Emerald Onyx Marble",
    "slug": "emerald-onyx-marble",
    "type": "Marble",
    "category": "Onyx Marble",
    "subcategory": "",
    "size_mm": "Gang-saw Slab",
    "finish": "Polished",
    "origin": "Rajasthan",
    "color": "Green",
    "thickness": "20mm",
    "usage_area": "Wall Mount, Flooring",
    "description": "Luminescent translucent emerald and golden onyx marble, highly prized for backlit accent walls, luxury flooring, and architectural features.",
    "image_url": "assets/images/products/product-1783085161-6a47b869e0448.webp",
    "featured_section": "our_collection,tile_texture",
    "price_range": "₹42 - ₹95 / sq.ft",
    "in_stock": true
  },
  {
    "id": 71,
    "name": "Scorpio",
    "slug": "scorpio",
    "type": "Marble",
    "category": "Marble",
    "subcategory": "",
    "size_mm": "Gang-saw Slab",
    "finish": "Hydro",
    "origin": "Rajasthan",
    "color": "Brown",
    "thickness": "20mm",
    "usage_area": "Wall Mount",
    "description": "Premium Scorpio (Marble) for luxury residential and commercial installations.",
    "image_url": "assets/images/products/product-1783084912-6a47b7700c180.webp",
    "featured_section": "our_collection,tile_texture",
    "price_range": "₹42 - ₹95 / sq.ft",
    "in_stock": true
  },
  {
    "id": 69,
    "name": "Alaska White",
    "slug": "alaska-white",
    "type": "Granite",
    "category": "Granite",
    "subcategory": "North Indian Granite",
    "size_mm": "Gang-saw Slab",
    "finish": "Polished",
    "origin": "Rajasthan",
    "color": "White",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "description": "Alaska White granite is a true showstopper for home flooring, rapidly becoming a favorite choice worldwide. This premium stone features a luminous, crisp white background beautifully interspersed with icy silver frost, dramatic charcoal veins, and shimmering quartz crystals. This striking color palette reflects natural light brilliantly, instantly making any room feel larger, brighter, and ultra-luxurious.\n\nBeyond its high-end, contemporary aesthetic, Alaska White is incredibly tough—highly resistant to stains, scratches, and heavy daily foot traffic. It effortlessly bridges the gap between rugged durability and pure elegance, giving your home an expansive, upscale foundation that never goes out of style.",
    "image_url": "assets/images/products/product-1783084356-6a47b5441b767.webp",
    "featured_section": "our_collection,tile_texture",
    "price_range": "₹120 - ₹280 / sq.ft",
    "in_stock": true
  },
  {
    "id": 68,
    "name": "Alaska Pink",
    "slug": "alaska-pink",
    "type": "Granite",
    "category": "Granite",
    "subcategory": "North Indian Granite",
    "size_mm": "Gang-saw Slab",
    "finish": "Polished",
    "origin": "Rajasthan",
    "color": "White",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "description": "Gaining massive popularity both globally and domestically, Alaska Pink stone is the ultimate modern choice for home flooring. This breathtaking natural granite seamlessly blends a soft, warm pink background with dramatic patches of white, quartz, and deep black veining, creating an instantly luxurious look. Far from just a beautiful surface, it delivers incredible durability, easily resisting scratches, heat, and heavy foot traffic. Its smooth, polished finish reflects light beautifully to make rooms feel expansive and inviting. Low-maintenance and exceptionally long-lasting, Alaska Pink flooring effortlessly infuses your home with an exotic, high-end charm that stands the test of time.",
    "image_url": "assets/images/products/product-1783084260-6a47b4e40ca25.webp",
    "featured_section": "our_collection,tile_texture",
    "price_range": "₹120 - ₹280 / sq.ft",
    "in_stock": true
  },
  {
    "id": 67,
    "name": "Tan Brown",
    "slug": "tan-brown",
    "type": "Granite",
    "category": "Granite",
    "subcategory": "South Indian Granite",
    "size_mm": "Gang-saw Slab",
    "finish": "Polished",
    "origin": "Andhra Pradesh",
    "color": "Brown",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "description": "Premium Tan Brown (Granite) for luxury residential and commercial installations.",
    "image_url": "assets/images/products/product-1783084011-6a47b3eb20cf0.webp",
    "featured_section": "signature_showcase",
    "price_range": "₹120 - ₹280 / sq.ft",
    "in_stock": true
  },
  {
    "id": 66,
    "name": "Mountain Brown",
    "slug": "mountain-brown",
    "type": "Granite",
    "category": "Granite",
    "subcategory": "South Indian Granite",
    "size_mm": "Gang-saw Slab",
    "finish": "Polished",
    "origin": "Karnataka",
    "color": "Brown",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "description": "Premium Mountain Brown (Granite) for luxury residential and commercial installations.",
    "image_url": "assets/images/products/product-1783083965-6a47b3bd9408e.webp",
    "featured_section": "signature_showcase",
    "price_range": "₹120 - ₹280 / sq.ft",
    "in_stock": true
  },
  {
    "id": 65,
    "name": "Red Purpory",
    "slug": "red-purpory",
    "type": "Granite",
    "category": "Granite",
    "subcategory": "South Indian Granite",
    "size_mm": "Gang-saw Slab",
    "finish": "Polished",
    "origin": "Karnataka",
    "color": "Red",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "description": "Premium Red Purpory (Granite) for luxury residential and commercial installations.",
    "image_url": "assets/images/products/product-1783083937-6a47b3a1ec35b.webp",
    "featured_section": "signature_showcase",
    "price_range": "₹120 - ₹280 / sq.ft",
    "in_stock": true
  },
  {
    "id": 64,
    "name": "Colombo Jubrana",
    "slug": "colombo-jubrana",
    "type": "Granite",
    "category": "Granite",
    "subcategory": "South Indian Granite",
    "size_mm": "Gang-saw Slab",
    "finish": "Polished",
    "origin": "Tamil Nadu",
    "color": "Beige",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "description": "Premium Colombo Jubrana (Granite) for luxury residential and commercial installations.",
    "image_url": "assets/images/products/product-1783083902-6a47b37e26547.webp",
    "featured_section": "signature_showcase",
    "price_range": "₹120 - ₹280 / sq.ft",
    "in_stock": true
  },
  {
    "id": 63,
    "name": "Lakha Red",
    "slug": "lakha-red",
    "type": "Granite",
    "category": "Granite",
    "subcategory": "North Indian Granite",
    "size_mm": "Gang-saw Slab",
    "finish": "Polished",
    "origin": "Rajasthan",
    "color": "Red",
    "thickness": "16mm",
    "usage_area": "Flooring",
    "description": "Premium Lakha Red (Granite) for luxury residential and commercial installations.",
    "image_url": "assets/images/products/product-1783083869-6a47b35dab1cb.webp",
    "featured_section": "signature_showcase",
    "price_range": "₹120 - ₹280 / sq.ft",
    "in_stock": true
  },
  {
    "id": 62,
    "name": "Wooden",
    "slug": "wooden",
    "type": "Granite",
    "category": "Sandstone",
    "subcategory": "North Indian Granite",
    "size_mm": "Gang-saw Slab",
    "finish": "Honed",
    "origin": "Rajasthan",
    "color": "Brown",
    "thickness": "20mm",
    "usage_area": "Wall Mount",
    "description": "Premium Wooden (Sandstone) for luxury residential and commercial installations.",
    "image_url": "assets/images/products/product-1783083830-6a47b3366d3c3.webp",
    "featured_section": "none",
    "price_range": "₹120 - ₹280 / sq.ft",
    "in_stock": true
  },
  {
    "id": 61,
    "name": "Cats Eye",
    "slug": "cats-eye",
    "type": "Granite",
    "category": "Granite",
    "subcategory": "South Indian Granite",
    "size_mm": "Gang-saw Slab",
    "finish": "Polished",
    "origin": "Karnataka",
    "color": "Red",
    "thickness": "17mm",
    "usage_area": "Flooring",
    "description": "Premium Cats Eye (Granite) for luxury residential and commercial installations.",
    "image_url": "assets/images/products/product-1783083788-6a47b30cde49f.webp",
    "featured_section": "none",
    "price_range": "₹120 - ₹280 / sq.ft",
    "in_stock": true
  },
  {
    "id": 60,
    "name": "Coin Black",
    "slug": "coin-black",
    "type": "Granite",
    "category": "Granite",
    "subcategory": "North Indian Granite",
    "size_mm": "Gang-saw Slab",
    "finish": "Polished",
    "origin": "Rajasthan",
    "color": "Black",
    "thickness": "16mm",
    "usage_area": "Flooring",
    "description": "Premium Coin Black (Granite) for luxury residential and commercial installations.",
    "image_url": "assets/images/products/product-1783083744-6a47b2e0d4304.webp",
    "featured_section": "none",
    "price_range": "₹120 - ₹280 / sq.ft",
    "in_stock": true
  },
  {
    "id": 59,
    "name": "Impala Black",
    "slug": "impala-black",
    "type": "Granite",
    "category": "Granite",
    "subcategory": "South Indian Granite",
    "size_mm": "Gang-saw Slab",
    "finish": "Polished",
    "origin": "Karnataka",
    "color": "Black",
    "thickness": "18MM",
    "usage_area": "Kitchen Countertops",
    "description": "Premium Impala Black (Granite) for luxury residential and commercial installations.",
    "image_url": "assets/images/products/product-1783083696-6a47b2b0cbb16.webp",
    "featured_section": "none",
    "price_range": "₹120 - ₹280 / sq.ft",
    "in_stock": true
  },
  {
    "id": 58,
    "name": "Black Forrest",
    "slug": "black-forrest",
    "type": "Granite",
    "category": "Granite",
    "subcategory": "North Indian Granite",
    "size_mm": "Gang-saw Slab",
    "finish": "Polished",
    "origin": "Rajasthan",
    "color": "Black",
    "thickness": "16mm+",
    "usage_area": "Flooring",
    "description": "Premium Black Forrest (Granite) for luxury residential and commercial installations.",
    "image_url": "assets/images/products/product-1783083657-6a47b289a4a40.webp",
    "featured_section": "none",
    "price_range": "₹120 - ₹280 / sq.ft",
    "in_stock": true
  },
  {
    "id": 57,
    "name": "Black Swan",
    "slug": "black-swan",
    "type": "Granite",
    "category": "Granite",
    "subcategory": "South Indian Granite",
    "size_mm": "Gang-saw Slab",
    "finish": "Polished",
    "origin": "Karnataka",
    "color": "Black",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "description": "Premium Black Swan (Granite) for luxury residential and commercial installations.",
    "image_url": "assets/images/products/product-1783083605-6a47b25571850.webp",
    "featured_section": "none",
    "price_range": "₹120 - ₹280 / sq.ft",
    "in_stock": true
  },
  {
    "id": 56,
    "name": "Titanium Black",
    "slug": "titanium-black",
    "type": "Granite",
    "category": "Granite",
    "subcategory": "North Indian Granite",
    "size_mm": "Gang-saw Slab",
    "finish": "Polished",
    "origin": "Rajasthan",
    "color": "Black",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "description": "Premium Titanium Black (Granite) for luxury residential and commercial installations.",
    "image_url": "assets/images/products/product-1783083560-6a47b228132ac.webp",
    "featured_section": "none",
    "price_range": "₹120 - ₹280 / sq.ft",
    "in_stock": true
  },
  {
    "id": 55,
    "name": "Steel Grey",
    "slug": "steel-grey",
    "type": "Granite",
    "category": "Granite",
    "subcategory": "South Indian Granite",
    "size_mm": "Gang-saw Slab",
    "finish": "Polished",
    "origin": "Andhra Pradesh",
    "color": "Black",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "description": "Premium Steel Grey (Granite) for luxury residential and commercial installations.",
    "image_url": "assets/images/products/product-1783083531-6a47b20b6691a.webp",
    "featured_section": "none",
    "price_range": "₹120 - ₹280 / sq.ft",
    "in_stock": true
  },
  {
    "id": 54,
    "name": "Galaxy",
    "slug": "galaxy",
    "type": "Granite",
    "category": "Granite",
    "subcategory": "South Indian Granite",
    "size_mm": "Gang-saw Slab",
    "finish": "Polished",
    "origin": "Andhra Pradesh",
    "color": "White",
    "thickness": "18mm",
    "usage_area": "Flooring, Wall Cladding",
    "description": "Premium Galaxy (Granite) for luxury residential and commercial installations.",
    "image_url": "assets/images/products/product-1783083490-6a47b1e260326.webp",
    "featured_section": "none",
    "price_range": "₹120 - ₹280 / sq.ft",
    "in_stock": true
  },
  {
    "id": 53,
    "name": "Pista Green",
    "slug": "pista-green",
    "type": "Granite",
    "category": "Granite",
    "subcategory": "South Indian Granite",
    "size_mm": "Gang-saw Slab",
    "finish": "Polished",
    "origin": "Karnataka",
    "color": "Green",
    "thickness": "16mm",
    "usage_area": "Kitchen Countertops",
    "description": "Classic Green \nPerfect for an abstract look",
    "image_url": "assets/images/products/product-1783083351-6a47b1575ccdd.webp",
    "featured_section": "none",
    "price_range": "₹120 - ₹280 / sq.ft",
    "in_stock": true
  },
  {
    "id": 52,
    "name": "Flash Green",
    "slug": "flash-green",
    "type": "Granite",
    "category": "Granite",
    "subcategory": "South Indian Granite",
    "size_mm": "Gang-saw Slab",
    "finish": "Polished",
    "origin": "Odisha",
    "color": "Green",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "description": "This stunning green granite is another incredible bargain, looking just like the legendary Emerald Pearl from Norway while costing seven times less. It features a deep, majestic green backdrop embedded with shimmering, naturally reflective minerals that act like sparkling gems under the light. This stone offers an ultra-luxury, high-end European aesthetic at a fraction of the import price, making it a brilliant, high-value choice for show-stopping countertops, feature walls, and premium interior accents.",
    "image_url": "assets/images/products/product-1783083136-6a47b0804c4ee.webp",
    "featured_section": "none",
    "price_range": "₹120 - ₹280 / sq.ft",
    "in_stock": true
  },
  {
    "id": 51,
    "name": "Bassi Lapatro",
    "slug": "bassi-lapatro",
    "type": "Granite",
    "category": "Granite",
    "subcategory": "North Indian Granite",
    "size_mm": "Gang-saw Slab",
    "finish": "Lapatro",
    "origin": "Rajasthan",
    "color": "Green",
    "thickness": "18mm",
    "usage_area": "Steps",
    "description": "Bassi Lapatro is a mesmerizing work of art, showcasing a stunning amalgamation of diverse minerals fused together over millions of years. The specialized lapatro finish expertly enhances this natural texture, giving it a sophisticated, semi-gloss sheen that feels incredible to the touch.\n\nAn absolute steal for high-end design, this remarkable stone is a spitting image of the legendary South African deposit, Marinace Black. While the rare African import costs at least five times more, Bassi Lapatro delivers the exact same ultra-luxury, mosaic-like aesthetic and rugged durability at a mere fraction of the price—making premium luxury genuinely accessible.",
    "image_url": "assets/images/products/product-1783081478-6a47aa06b6e30.webp",
    "featured_section": "none",
    "price_range": "₹120 - ₹280 / sq.ft",
    "in_stock": true
  },
  {
    "id": 50,
    "name": "Hassan Green",
    "slug": "hassan-green",
    "type": "Granite",
    "category": "Granite",
    "subcategory": "South Indian Granite",
    "size_mm": "Gang-saw Slab",
    "finish": "Polished",
    "origin": "Karnataka",
    "color": "Green",
    "thickness": "16mm",
    "usage_area": "Kitchen Countertops",
    "description": "Another timeless classic, Hassan Green Granite remains the most loved color choice for premium kitchen countertops. Granite dealers and expert layers from all across Tamil Nadu consistently choose Murali Granites & Marbles to procure this specific stone.\n\nBecause we operate a dedicated sister company right at the quarry source, Murali Granites & Marbles holds a unique advantage, allowing us to directly handpick and procure the absolute finest quality Hassan Green available anywhere in the Tamil Nadu market. This seamless, direct-from-source pipeline ensures our customers always receive unmatched color consistency, superior structural integrity, and the highly coveted, deep-green depth this legendary stone is famous for.",
    "image_url": "assets/images/products/product-1783081328-6a47a9703a0ea.webp",
    "featured_section": "none",
    "price_range": "₹120 - ₹280 / sq.ft",
    "in_stock": true
  },
  {
    "id": 49,
    "name": "3D Rock Look",
    "slug": "3d-rock-look",
    "type": "Granite",
    "category": "Granite",
    "subcategory": "North Indian Granite",
    "size_mm": "Gang-saw Slab",
    "finish": "Hydro",
    "origin": "Rajasthan",
    "color": "Grey",
    "thickness": "20mm",
    "usage_area": "Wall Mount",
    "description": "Murali Granites & Marbles is the ultimate destination for premium hydro and lapatro finishes. We offer an unmatched selection of these specialized textures, giving you the freedom to find the perfect look for your home. Hydro finishes provide a slip-resistant, rugged elegance ideal for outdoor spaces, while lapatro offers a semi-gloss, antique texture that elevates interiors.\n\nNavigating these unique finishes is effortless thanks to their exceptional support staff, who are expertly trained to guide everyone from first-time homeowners to seasoned architects, ensuring you get the perfect stone for your project.",
    "image_url": "assets/images/products/product-1783081135-6a47a8af74f0b.webp",
    "featured_section": "none",
    "price_range": "₹120 - ₹280 / sq.ft",
    "in_stock": true
  },
  {
    "id": 48,
    "name": "Green Marble",
    "slug": "green-marble",
    "type": "Marble",
    "category": "Marble",
    "subcategory": "",
    "size_mm": "Gang-saw Slab",
    "finish": "Polished",
    "origin": "Rajasthan",
    "color": "Green",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "description": "Green marble is the ultimate choice for house flooring, seamlessly blending health-centric biophilic design—the practice of connecting indoor spaces to nature—with timeless luxury. Its rich, organic green tones radiate a deeply calming energy, transforming your home into a soothing, stress-free sanctuary. Beyond its mental health benefits, marble is a naturally cool stone, keeping your living spaces refreshed during hot summer months. It is incredibly durable, highly resistant to daily wear, and grows more beautiful with age. Choosing green marble flooring means investing in an eco-friendly, long-lasting foundation that elevates your home's aesthetic while nurturing your daily well-being.",
    "image_url": "assets/images/products/product-1783081066-6a47a86a5d5e2.webp",
    "featured_section": "none",
    "price_range": "₹42 - ₹95 / sq.ft",
    "in_stock": true
  },
  {
    "id": 47,
    "name": "Forrest Green",
    "slug": "forrest-green",
    "type": "Marble",
    "category": "Marble",
    "subcategory": "",
    "size_mm": "Gang-saw Slab",
    "finish": "Hydro",
    "origin": "Rajasthan",
    "color": "Green",
    "thickness": "20mm",
    "usage_area": "Wall Mount",
    "description": "Step into pure, unadulterated luxury with this breathtaking green textured marble. Crafted by nature over millennia, its rich, layered surface looks exactly like a raw, organic rock hidden behind a cascading rainforest waterfall. It is a sensory masterpiece—the deep forest greens and striking, mossy textures invite you to run your hands across it, bringing the soothing, untamed essence of a private sanctuary straight into your home. This is not just a stone; it is an exclusive piece of high-end art designed to pamper your senses, exude elite taste, and transform any ordinary space into a lavish, breathtaking retreat.",
    "image_url": "assets/images/products/product-1783080973-6a47a80d4a3d5.webp",
    "featured_section": "none",
    "price_range": "₹42 - ₹95 / sq.ft",
    "in_stock": true
  },
  {
    "id": 46,
    "name": "Asian Green",
    "slug": "asian-green",
    "type": "Granite",
    "category": "Granite",
    "subcategory": "South Indian Granite",
    "size_mm": "Gang-saw Slab",
    "finish": "Polished",
    "origin": "Karnataka",
    "color": "Green",
    "thickness": "17mm",
    "usage_area": "Kitchen Countertop",
    "description": "A dark green kitchen countertop is the ultimate choice for balancing high-end luxury with everyday practicality. This rich, organic hue infuses the heart of your home with a calming, nature-inspired sophistication that pairs beautifully with wood, brass, or neutral cabinets. Beyond its stunning aesthetic, the deep tones and natural veining excel at masking minor scratches, water spots, and daily wear, making it an exceptionally low-maintenance and timeless centerpiece for a busy, hardworking kitchen.",
    "image_url": "assets/images/products/product-1783080897-6a47a7c1ec5ed.webp",
    "featured_section": "none",
    "price_range": "₹120 - ₹280 / sq.ft",
    "in_stock": true
  },
  {
    "id": 45,
    "name": "Shiffon Pink",
    "slug": "shiffon-pink",
    "type": "Granite",
    "category": "Granite",
    "subcategory": "South Indian Granite",
    "size_mm": "Gang-saw Slab",
    "finish": "Polished",
    "origin": "Tamil Nadu",
    "color": "Pink",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "description": "This rare, highly sought-after granite showcases a soft pastel pink hue that radiates an ultra-luxury look. Far from an ordinary stone, its delicate color palette offers an exclusive, high-end aesthetic that simply cannot be found everywhere. Because of its extreme rarity and limited quarrying, this premium granite is not part of standard inventory—it is strictly reserved for discerning clients and available only through special, custom requests and dedicated private orders.",
    "image_url": "assets/images/products/product-1783080746-6a47a72a44742.webp",
    "featured_section": "none",
    "price_range": "₹120 - ₹280 / sq.ft",
    "in_stock": true
  },
  {
    "id": 44,
    "name": "Shiva Gold",
    "slug": "shiva-gold",
    "type": "Granite",
    "category": "Granite",
    "subcategory": "South Indian Granite",
    "size_mm": "Gang-saw Slab",
    "finish": "Polished",
    "origin": "Tamil Nadu",
    "color": "Gold",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "description": "The long-awaited Shiva Gold or Midas Gold granite is finally back after its quarry was closed for almost a decade. Globally celebrated as the \"Golden Touch,\" this is the most famous and loved granite in the world. Its stunning, opulent tones make it a massive favorite across the USA, Europe, and the Middle East.",
    "image_url": "assets/images/products/product-1783080607-6a47a69f485d0.webp",
    "featured_section": "none",
    "price_range": "₹120 - ₹280 / sq.ft",
    "in_stock": true
  },
  {
    "id": 43,
    "name": "Strawberry Pink",
    "slug": "strawberry-pink",
    "type": "Granite",
    "category": "Granite",
    "subcategory": "South Indian Granite",
    "size_mm": "Gang-saw Slab",
    "finish": "Polished",
    "origin": "Tamil Nadu",
    "color": "Pink",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "description": "Pink floors instantly make a home more mentally pleasing, radiating a warm, comforting energy that reduces daily stress. This soft, soothing hue creates a deeply calming and welcoming atmosphere, visually opening up rooms. It adds an unexpected, cheerful touch of personality, making your living space feel like a true sanctuary.",
    "image_url": "assets/images/products/product-1783080527-6a47a64f53214.webp",
    "featured_section": "none",
    "price_range": "₹120 - ₹280 / sq.ft",
    "in_stock": true
  },
  {
    "id": 42,
    "name": "Forrest Gold",
    "slug": "forrest-gold",
    "type": "Granite",
    "category": "Sand Stone",
    "subcategory": "North Indian Granite",
    "size_mm": "Gang-saw Slab",
    "finish": "Hydro",
    "origin": "Rajasthan",
    "color": "Gold",
    "thickness": "18mm",
    "usage_area": "Wall Mounting",
    "description": "Bidasar Gold granite features a richly textured finish, making it the premier choice for striking wall mounting. Renowned for its unique, sweeping white lines, this natural stone brings dramatic artistry to front wall elevations or serves as a showpiece on a bathroom's back wall, effortlessly transforming any vertical space into high-end luxury.",
    "image_url": "assets/images/products/product-1783080383-6a47a5bf9a4a3.webp",
    "featured_section": "none",
    "price_range": "₹120 - ₹280 / sq.ft",
    "in_stock": true
  },
  {
    "id": 41,
    "name": "Astoria Gold",
    "slug": "astoria-gold",
    "type": "Granite",
    "category": "Granite",
    "subcategory": "South Indian Granite",
    "size_mm": "Gang-saw Slab",
    "finish": "Polished",
    "origin": "Tamil Nadu",
    "color": "Gold",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "description": "Radiating pure rich vibes, gold granite is the ultimate symbol of a lux life. Its deep, warm tones embody abundance and prosperity, instantly elevating any interior. Choosing this opulent stone brings a welcoming energy of wealth and success into your home, making it a powerful, timeless statement of high-end design.",
    "image_url": "assets/images/products/product-1783080299-6a47a56b99b00.webp",
    "featured_section": "stone_gallery",
    "price_range": "₹120 - ₹280 / sq.ft",
    "in_stock": true
  },
  {
    "id": 40,
    "name": "Romantic Blue",
    "slug": "romantic-blue",
    "type": "Granite",
    "category": "Granite",
    "subcategory": "South Indian Granite",
    "size_mm": "Gang-saw Slab",
    "finish": "Polished",
    "origin": "Odisha",
    "color": "Blue",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "description": "Freshly sourced from a brand new quarry, Romantic Blue granite showcases striking new colors that naturally attract everyone. Because these products are 100% natural, each unique slab tells its own story. This captivating stone brings a romantic, elegant charm to your space, offering a completely fresh look for modern designs.",
    "image_url": "assets/images/products/product-1783080196-6a47a504c714c.webp",
    "featured_section": "none",
    "price_range": "₹120 - ₹280 / sq.ft",
    "in_stock": true
  },
  {
    "id": 39,
    "name": "SKY Blue",
    "slug": "sky-blue",
    "type": "Granite",
    "category": "Granite",
    "subcategory": "South Indian Granite",
    "size_mm": "Gang-saw Slab",
    "finish": "Polished",
    "origin": "Odisha",
    "color": "Blue",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "description": "SKY Blue is a classic, authentic granite celebrated for its entirely natural blue hues with absolutely no artificial color added. Highly UV-resistant, its vibrant tones will not fade under harsh sunlight. It remains a legendary, old favorite among architects and engineers who trust its timeless look and robust, long-term performance.",
    "image_url": "assets/images/products/product-1783080092-6a47a49c1e7b7.webp",
    "featured_section": "none",
    "price_range": "₹120 - ₹280 / sq.ft",
    "in_stock": true
  },
  {
    "id": 38,
    "name": "Lavender Blue",
    "slug": "lavender-blue",
    "type": "Granite",
    "category": "Granite",
    "subcategory": "South Indian Granite",
    "size_mm": "Gang-saw Slab",
    "finish": "Polished",
    "origin": "Odisha",
    "color": "Blue",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "description": "Exuding pure luxury, this elite granite pairs a deep blue and ash color palette to create an ultra-premium aesthetic. Famously featured across the grand walkways of the Bangalore International Airport, its sophisticated tones reach absolute perfection when contrasted against sleek, dark-palette furniture for a dramatic, high-end interior design.",
    "image_url": "assets/images/products/product-1783079927-6a47a3f7bc726.webp",
    "featured_section": "stone_gallery",
    "price_range": "₹120 - ₹280 / sq.ft",
    "in_stock": true
  },
  {
    "id": 37,
    "name": "Kingfisher Blue",
    "slug": "kingfisher-blue",
    "type": "Granite",
    "category": "Granite",
    "subcategory": "South Indian Granite",
    "size_mm": "Gang-saw Slab",
    "finish": "Polished",
    "origin": "Odisha",
    "color": "Blue",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "description": "This exquisite blue granite from Odisha strikes the perfect balance between sophistication and understated luxury. Featuring deep, refined tones and subtle, shifting mineral patterns, it offers a distinct premium feel. It acts as a tasteful, subtle flex of wealth—elevating any space with an elite presence without ever looking loud or overdone.",
    "image_url": "assets/images/products/product-1783079826-6a47a39205007.webp",
    "featured_section": "stone_gallery",
    "price_range": "₹120 - ₹280 / sq.ft",
    "in_stock": true
  },
  {
    "id": 36,
    "name": "Safari Blue",
    "slug": "safari-blue",
    "type": "Granite",
    "category": "Granite",
    "subcategory": "South Indian Granite",
    "size_mm": "Gang-saw Slab",
    "finish": "Polished",
    "origin": "Andhra Pradesh",
    "color": "Blue",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "description": "Sourced directly from Andhra Pradesh, this vibrant blue granite offers incredible durability, handling heavy traffic and scratches with ease. Because it is highly cost-effective and very cheap, it provides massive value at scale. This makes it the absolute best choice for large-scale commercial spaces, bustling office floors, and high-use surfaces.",
    "image_url": "assets/images/products/product-1783079748-6a47a34440dc7.webp",
    "featured_section": "signature_showcase",
    "price_range": "₹120 - ₹280 / sq.ft",
    "in_stock": true
  },
  {
    "id": 35,
    "name": "Crystal Blue",
    "slug": "crystal-blue",
    "type": "Granite",
    "category": "Granite",
    "subcategory": "North Indian Granite",
    "size_mm": "Gang-saw Slab",
    "finish": "Polished",
    "origin": "Rajasthan",
    "color": "Blue",
    "thickness": "16mm+",
    "usage_area": "Flooring",
    "description": "This stunning blue granite features a bold, mosaic-like design that naturally commands attention. Renowned for its exceptional strength and durability, it easily resists heavy wear and scratching. Its intricate, sweeping patterns make it the absolute perfect choice for elevating expansive, big-format spaces like large floors, feature walls, or grand countertops.",
    "image_url": "assets/images/products/product-1783079633-6a47a2d18815c.webp",
    "featured_section": "stone_gallery",
    "price_range": "₹120 - ₹280 / sq.ft",
    "in_stock": true
  },
  {
    "id": 34,
    "name": "Ice White",
    "slug": "ice-white",
    "type": "Granite",
    "category": "Granite",
    "subcategory": "North Indian Granite",
    "size_mm": "Gang-saw Slab",
    "finish": "Polished",
    "origin": "Rajasthan",
    "color": "White",
    "thickness": "16mm+",
    "usage_area": "Flooring",
    "description": "Ice White Granite is a budget-friendly, exceptionally strong natural stone featuring a crisp white background with bold charcoal and slate veining. Highly durable and resistant to heavy foot traffic, its cost-effective pricing and striking pattern make it the absolute best choice for expansive flooring, countertops, and large-scale commercial spaces.",
    "image_url": "assets/images/products/product-1783079501-6a47a24d9fa78.webp",
    "featured_section": "none",
    "price_range": "₹120 - ₹280 / sq.ft",
    "in_stock": true
  },
  {
    "id": 33,
    "name": "Moon White",
    "slug": "moon-white",
    "type": "Granite",
    "category": "Granite",
    "subcategory": "South Indian Granite",
    "size_mm": "Gang-saw Slab",
    "finish": "Polished",
    "origin": "Odisha",
    "color": "White",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "description": "Moon White Granite features a bright ivory and alabaster background intricately speckled with fine silver-grey grains and occasional deep burgundy flecks. Quarried in India, this durable natural stone offers a refined, uniform pattern that pairs effortlessly with modern kitchens, delivering a clean, luminous, and timeless aesthetic.",
    "image_url": "assets/images/products/product-1783079448-6a47a218632fd.webp",
    "featured_section": "none",
    "price_range": "₹120 - ₹280 / sq.ft",
    "in_stock": true
  },
  {
    "id": 32,
    "name": "China White",
    "slug": "china-white",
    "type": "Granite",
    "category": "Granite",
    "subcategory": "South Indian Granite",
    "size_mm": "Gang-saw Slab",
    "finish": "Polished",
    "origin": "Odisha",
    "color": "White",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "description": "This stunning white granite perfectly captures the ultra-luxurious, bold grey veining of Italy’s legendary Statuario marble. While genuine Statuario commands up to 3,000 rupees per square foot, this stone delivers that exact high-end, iconic aesthetic for under 250 rupees. It adds massive home value, giving you premium marble elegance at an absolute steal.",
    "image_url": "assets/images/products/product-1783078937-6a47a0192a9b3.webp",
    "featured_section": "none",
    "price_range": "₹120 - ₹280 / sq.ft",
    "in_stock": true
  },
  {
    "id": 31,
    "name": "River White",
    "slug": "river-white",
    "type": "Granite",
    "category": "Granite",
    "subcategory": "South Indian Granite",
    "size_mm": "Gang-saw Slab",
    "finish": "Polished",
    "origin": "Odisha",
    "color": "White",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "description": "World-famous River White granite brings the soothing majesty of nature indoors. Its translucent white background is animated by fluid, sweeping grey waves and delicate burgundy speckles. This highly sought-after stone dramatically boosts home equity, offering an incredibly durable, prestigious flooring option that merges organic artistry with long-term premium value.",
    "image_url": "assets/images/products/product-1783078831-6a479faf4fcbd.webp",
    "featured_section": "signature_showcase",
    "price_range": "₹120 - ₹280 / sq.ft",
    "in_stock": true
  },
  {
    "id": 30,
    "name": "Gelatic White",
    "slug": "gelatic-white",
    "type": "Granite",
    "category": "Granite",
    "subcategory": "South Indian Granite",
    "size_mm": "Gang-saw Slab",
    "finish": "Polished",
    "origin": "Odisha",
    "color": "White",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "description": "This stunning granite mirrors the dramatic, elegant grey veining of classic Italian marble, offering high-end luxury with superior durability. Scattered throughout are breathtaking, naturally embedded purple garnets that catch the light like hidden gems. This rare combination adds massive resale value, transforming your floor into a durable, unique masterpiece.",
    "image_url": "assets/images/products/product-1783078626-6a479ee25bd3e.webp",
    "featured_section": "signature_showcase",
    "price_range": "₹120 - ₹280 / sq.ft",
    "in_stock": true
  },
  {
    "id": 29,
    "name": "Galaxy White",
    "slug": "galaxy-white",
    "type": "Granite",
    "category": "Granite",
    "subcategory": "South Indian Granite",
    "size_mm": "Gang-saw Slab",
    "finish": "Polished",
    "origin": "Odisha",
    "color": "White",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "description": "Granite with white sparkling flakes fills your home with a captivating, star-like brilliance. As light hits the shimmering crystals, it creates a dynamic, luxurious depth that elevates any room's aesthetic. This premium stone adds significant market value, offering homeowners an incredibly durable, scratch-resistant floor that blends high-end glamor with everyday practicality.",
    "image_url": "assets/images/products/product-1783078566-6a479ea6bfc0b.webp",
    "featured_section": "none",
    "price_range": "₹120 - ₹280 / sq.ft",
    "in_stock": true
  }
];

  // State Management with MuraliSync
  function getApprovedCustomProducts() {
    try {
      const stored = localStorage.getItem('murali_custom_products');
      if (!stored) return [];
      const arr = JSON.parse(stored);
      return Array.isArray(arr) ? arr.filter(p => p.status !== 'draft') : [];
    } catch(e) {
      return [];
    }
  }

  function getOverridesMap() {
    try {
      const stored = localStorage.getItem('murali_catalog_overrides');
      return stored ? JSON.parse(stored) : {};
    } catch(e) {
      return {};
    }
  }

  function applyOverridesToDataset(rawList) {
    const ov = getOverridesMap();
    return rawList.map(item => {
      const key = item.slug || item.id;
      if (ov[key]) {
        return { ...item, ...ov[key] };
      }
      return item;
    }).filter(item => item.status !== 'draft');
  }

  let customProducts = getApprovedCustomProducts();
  let baseProductsRaw = FALLBACK_PRODUCTS;
  let allProducts = [...customProducts, ...applyOverridesToDataset(baseProductsRaw)];
  let currentCategory = 'all';
  let filteredItems = [];
  let currentPage = 1;
  const PAGE_SIZE = 36; // High density 6-column grid x 6 rows per page

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // 1. Initial Render
  filterDataset();

  // 2. Network Fetch for Live Server Sync
  function refreshProductDataset(newData = null) {
    if (newData && Array.isArray(newData)) {
      baseProductsRaw = newData;
    }
    customProducts = getApprovedCustomProducts();
    allProducts = [...customProducts, ...applyOverridesToDataset(baseProductsRaw)];
    filterDataset();
  }

  fetch(window.location.pathname.includes('/pages/') ? '../api/products.json' : 'api/products.json')
    .then(res => {
      if (!res.ok) throw new Error('Network response not ok');
      return res.json();
    })
    .then(data => {
      if (Array.isArray(data) && data.length > 0) {
        refreshProductDataset(data);
      }
    })
    .catch(err => {
      console.info('Loaded verified natural stone & tile catalog dataset.');
    });

  // Live Cross-Tab & Synchronizer Listeners
  window.addEventListener('storage', (e) => {
    if (!e.key || e.key.startsWith('murali_')) {
      refreshProductDataset();
    }
  });

  window.addEventListener('murali-sync-event', () => {
    refreshProductDataset();
  });

  // 3. Batch Rendering with DocumentFragment
  function renderCurrentPage(append = false) {
    if (!append) {
      container.innerHTML = '';
      currentPage = 1;
    }

    const totalCount = filteredItems.length;
    if (countBadge) countBadge.textContent = totalCount;

    if (totalCount === 0) {
      container.innerHTML = '<div class="no-results" style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem; color: #8A8A80; font-size: 1rem;">No natural stones or tiles found matching your filter selection.<br><button id="empty-reset-btn" style="margin-top:1rem; background:#C9A96E; color:#000; font-weight:700; border:none; padding:8px 18px; border-radius:4px; cursor:pointer;">Clear All Filters</button></div>';
      const emptyReset = document.getElementById('empty-reset-btn');
      if (emptyReset) emptyReset.onclick = resetAllFilters;
      if (paginationContainer) paginationContainer.style.display = 'none';
      return;
    }

    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = Math.min(startIndex + PAGE_SIZE, totalCount);
    const pageItems = filteredItems.slice(startIndex, endIndex);

    const fragment = document.createDocumentFragment();

    pageItems.forEach(product => {
      const tile = document.createElement('div');
      tile.className = 'product-tile';
      tile.setAttribute('title', `${product.name} - ${product.category || 'Stone / Tile'}`);

      const encName = encodeURIComponent(product.name);
      const subLabel = product.subcategory || product.category || 'Stone Slab';
      const sizeLabel = product.size_mm || (product.type === 'Tile' ? '600×600 mm' : product.thickness || '18mm Slab');
      const finishLabel = product.finish || 'Polished';
      const priceBadge = product.price_range ? `<span style="color:#E8C98A; font-weight:600; font-size:0.68rem;">${escapeHtml(product.price_range)}</span>` : '';

      tile.innerHTML = `
        <div class="tile-header" style="display:flex; flex-direction:column; padding:0.65rem 0.5rem; min-height:50px; justify-content:center; align-items:center; background:#0a0a0c;">
          <span class="tile-title" style="font-size:0.75rem; letter-spacing:0.06em;">${escapeHtml(product.name)}</span>
          <span style="font-size:0.62rem; color:#8A8A80; text-transform:uppercase; letter-spacing:0.06em; margin-top:2px;">${escapeHtml(subLabel)}</span>
        </div>
        <div class="tile-img-box" style="position:relative; aspect-ratio:1; overflow:hidden; background:#141416;">
          <img class="tile-img" 
               src="${escapeHtml((window.location.pathname.includes('/pages/') && !product.image_url.startsWith('http') && !product.image_url.startsWith('../') ? '../' : '') + product.image_url)}" 
               alt="${escapeHtml(product.name)}" 
               loading="lazy" 
               style="width:100%; height:100%; object-fit:cover; transition:transform 0.45s cubic-bezier(0.16, 1, 0.3, 1); will-change: transform;"
               onerror="if(!this.dataset.triedFallback){this.dataset.triedFallback='1';this.src=this.src.replace('.webp','.jpg');}else{this.onerror=null;this.src='assets/images/favicon.png';}"/>
        </div>
        <div class="tile-meta" style="padding:0.55rem 0.65rem; font-size:0.72rem; color:#8A8A80; background:#0e0e11; border-top:1px solid rgba(255,255,255,0.05); display:flex; justify-content:space-between; align-items:center;">
          <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:65%;">${escapeHtml(sizeLabel)}</span>
          <span style="color:#C5A059; font-weight:500;">${escapeHtml(finishLabel)}</span>
        </div>
        <div class="tile-actions" style="display:flex; border-top:1px solid rgba(255,255,255,0.08); background:#0c0c0e;">
          <a href="pages/visualizer.html?material=${encName}" style="flex:1; padding:0.55rem 0.2rem; font-size:0.72rem; text-align:center; color:#C5A059; font-weight:600; text-transform:uppercase; letter-spacing:0.04em; border-right:1px solid rgba(255,255,255,0.08); text-decoration:none;" title="Preview in Room Visualizer">
            Visualize
          </a>
          <a href="contact.html?material=${encName}" style="flex:1; padding:0.55rem 0.2rem; font-size:0.72rem; text-align:center; color:#E8E6E1; font-weight:600; text-transform:uppercase; letter-spacing:0.04em; text-decoration:none;" title="Request Quote">
            Quote &rarr;
          </a>
        </div>
      `;

      fragment.appendChild(tile);
    });

    container.appendChild(fragment);

    // Update Pagination Controls
    if (paginationContainer) {
      if (endIndex >= totalCount) {
        paginationContainer.style.display = totalCount > PAGE_SIZE ? 'flex' : 'none';
        if (loadMoreBtn) loadMoreBtn.style.display = 'none';
      } else {
        paginationContainer.style.display = 'flex';
        if (loadMoreBtn) {
          loadMoreBtn.style.display = 'inline-block';
          const remaining = totalCount - endIndex;
          loadMoreBtn.textContent = `Load More (${remaining} Remaining)`;
        }
      }
      if (paginationStatus) {
        paginationStatus.textContent = `Showing ${endIndex} of ${totalCount} items`;
      }
    }
  }

  // 4. Multi-Facet Filtering Engine
  function filterDataset() {
    const query = (searchInput?.value || '').toLowerCase().trim();
    const origin = (originFilter?.value || 'all').toLowerCase();
    const color = (colorFilter?.value || 'all').toLowerCase();
    const finish = (finishFilter?.value || 'all').toLowerCase();
    const size = (sizeFilter?.value || 'all').toLowerCase();

    const INDIAN_REGIONS = ['rajasthan', 'tamil nadu', 'karnataka', 'andhra pradesh', 'odisha', 'gujarat', 'india', 'makrana', 'kishangarh', 'bangalore', 'morbi'];

    filteredItems = allProducts.filter(p => {
      const cat = (p.category || '').toLowerCase();
      const subcat = (p.subcategory || '').toLowerCase();
      const ptype = (p.type || '').toLowerCase();
      const name = (p.name || '').toLowerCase();
      const desc = (p.description || '').toLowerCase();
      const orig = (p.origin || '').toLowerCase();
      const col = (p.color || '').toLowerCase();
      const fin = (p.finish || '').toLowerCase();
      const psize = (p.size_mm || p.dimensions || '').toLowerCase();
      const feat = (p.featured_section || '').toLowerCase();
      const usage = (p.usage_area || '').toLowerCase();

      // Category Tabs
      if (currentCategory !== 'all') {
        if (currentCategory === 'granite') {
          if (!cat.includes('granite') && !ptype.includes('granite')) return false;
        } else if (currentCategory === 'vitrified') {
          const isVitrified = cat.includes('vitrified') || subcat.includes('vitrified') || subcat.includes('gvt') || subcat.includes('pgvt') || (ptype === 'tile' && !subcat.includes('wall') && !subcat.includes('parking'));
          if (!isVitrified) return false;
        } else if (currentCategory === 'wall-tiles') {
          const isWall = subcat.includes('wall') || usage.includes('wall') || cat.includes('ceramic') || name.includes('wall');
          if (!isWall) return false;
        } else if (currentCategory === 'parking') {
          const isParking = subcat.includes('parking') || usage.includes('parking') || usage.includes('portico') || name.includes('parking') || name.includes('paver');
          if (!isParking) return false;
        } else if (currentCategory === 'marble') {
          if (!cat.includes('marble') && !ptype.includes('marble') && !name.includes('marble')) return false;
        } else if (currentCategory === 'onyx') {
          const isOnyx = cat.includes('onyx') || name.includes('onyx') || desc.includes('onyx');
          if (!isOnyx) return false;
        } else {
          if (!cat.includes(currentCategory) && !ptype.includes(currentCategory)) return false;
        }
      }

      // Origin
      if (origin !== 'all') {
        if (origin === 'india') {
          const isIndian = INDIAN_REGIONS.some(reg => orig.includes(reg));
          if (!isIndian) return false;
        } else {
          if (!orig.includes(origin)) return false;
        }
      }

      // Color
      if (color !== 'all') {
        if (color === 'gold') {
          if (!col.includes('gold') && !col.includes('amber') && !name.includes('gold')) return false;
        } else {
          if (!col.includes(color) && !name.includes(color)) return false;
        }
      }

      // Finish
      if (finish !== 'all') {
        if (finish === 'polished') {
          if (!fin.includes('polish') && !fin.includes('gloss')) return false;
        } else if (finish === 'matte') {
          if (!fin.includes('matte') && !fin.includes('satin') && !fin.includes('lapatro')) return false;
        } else if (finish === 'hydro') {
          if (!fin.includes('hydro') && !fin.includes('flamed') && !fin.includes('rustic')) return false;
        } else {
          if (!fin.includes(finish)) return false;
        }
      }

      // Size / Dimension
      if (size !== 'all') {
        if (size === '600x600') {
          if (!psize.includes('600x600') && !psize.includes('2x2')) return false;
        } else if (size === '600x1200') {
          if (!psize.includes('600x1200') && !psize.includes('2x4')) return false;
        } else if (size === '800x1600') {
          if (!psize.includes('800x1600')) return false;
        } else if (size === '1200x1800') {
          if (!psize.includes('1200x1800') && !psize.includes('4x6')) return false;
        } else if (size === '300x600') {
          if (!psize.includes('300x600') && !psize.includes('1x2')) return false;
        } else if (size === '400x400') {
          if (!psize.includes('400x400')) return false;
        } else if (size === 'slab') {
          if (!psize.includes('slab') && ptype !== 'granite' && ptype !== 'marble') return false;
        }
      }

      // Text Query with Token Matching
      if (query) {
        const tokens = query.split(/\s+/);
        const searchable = `${name} ${cat} ${subcat} ${orig} ${col} ${fin} ${psize} ${usage} ${desc}`;
        const matchesAll = tokens.every(tok => searchable.includes(tok));
        if (!matchesAll) return false;
      }

      return true;
    });

    renderCurrentPage(false);
  }

  // 5. Debounce helper for 400+ item fluid search
  let debounceTimeout = null;
  function debouncedFilter() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      filterDataset();
    }, 200);
  }

  // 6. Reset Filters Helper
  function resetAllFilters() {
    if (searchInput) searchInput.value = '';
    if (originFilter) originFilter.value = 'all';
    if (colorFilter) colorFilter.value = 'all';
    if (finishFilter) finishFilter.value = 'all';
    if (sizeFilter) sizeFilter.value = 'all';
    currentCategory = 'all';

    if (categoryTabs) {
      categoryTabs.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-category') === 'all');
      });
    }

    filterDataset();
  }

  // 7. Event Listeners
  if (searchInput) searchInput.addEventListener('input', debouncedFilter);
  if (originFilter) originFilter.addEventListener('change', filterDataset);
  if (colorFilter) colorFilter.addEventListener('change', filterDataset);
  if (finishFilter) finishFilter.addEventListener('change', filterDataset);
  if (sizeFilter) sizeFilter.addEventListener('change', filterDataset);
  if (resetBtn) resetBtn.addEventListener('click', resetAllFilters);

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      currentPage += 1;
      renderCurrentPage(true);
    });
  }

  if (categoryTabs) {
    categoryTabs.addEventListener('click', e => {
      const btn = e.target.closest('.tab-btn');
      if (!btn) return;

      categoryTabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      currentCategory = (btn.getAttribute('data-category') || 'all').toLowerCase();
      filterDataset();
    });
  }
});
