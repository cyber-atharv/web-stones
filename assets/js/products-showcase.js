// Murali Granites & Marbles - Catalogue Showcase Engine
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('catalogue-carousel-track');
  const searchInput = document.getElementById('search-input');
  const originFilter = document.getElementById('origin-filter');
  const colorFilter = document.getElementById('color-filter');
  const finishFilter = document.getElementById('finish-filter');
  const categoryTabs = document.getElementById('categories-tabs');

  if (!container) return;

  // Static product dataset cache for fast instant-load client rendering
  const FALLBACK_PRODUCTS = [
  {
    "id": 78,
    "name": "River Black",
    "slug": "river-black",
    "category": "Granite",
    "description": "",
    "image_url": "assets/images/products/product-1783138465-6a4888a145274.webp",
    "finish": "Polished",
    "origin": "Rajasthan",
    "color": "Black",
    "thickness": "16mm",
    "usage_area": "Flooring",
    "featured_section": "our_legacy"
  },
  {
    "id": 77,
    "name": "Black Pearl",
    "slug": "black-pearl",
    "category": "Granite",
    "description": "",
    "image_url": "assets/images/products/product-1783138424-6a488878abc22.webp",
    "finish": "Polished",
    "origin": "Rajasthan",
    "color": "Black",
    "thickness": "16mm",
    "usage_area": "Flooring",
    "featured_section": "our_collection"
  },
  {
    "id": 76,
    "name": "Marie Gold",
    "slug": "marie-gold",
    "category": "Granite",
    "description": "",
    "image_url": "assets/images/products/product-1783085317-6a47b9058f71e.webp",
    "finish": "Polished",
    "origin": "Tamil Nadu",
    "color": "Gold",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "featured_section": "our_collection"
  },
  {
    "id": 74,
    "name": "Blue in the Night",
    "slug": "blue-in-the-night",
    "category": "Imported Granite",
    "description": "",
    "image_url": "assets/images/products/product-1783085244-6a47b8bcd330d.webp",
    "finish": "Polished",
    "origin": "Norway",
    "color": "Black",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "featured_section": "tile_texture"
  },
  {
    "id": 73,
    "name": "Banswara Marble",
    "slug": "banswara-marble",
    "category": "Marble",
    "description": "",
    "image_url": "assets/images/products/product-1783085208-6a47b8986af97.webp",
    "finish": "Polished",
    "origin": "Rajasthan",
    "color": "White",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "featured_section": "tile_texture"
  },
  {
    "id": 72,
    "name": "Emerald Onyx Marble",
    "slug": "emerald-onyx-marble",
    "category": "Onyx Marble",
    "description": "Luminescent translucent emerald and golden onyx marble, highly prized for backlit accent walls, luxury flooring, and architectural features.",
    "image_url": "assets/images/products/product-1783085161-6a47b869e0448.webp",
    "finish": "Polished",
    "origin": "Rajasthan",
    "color": "Green",
    "thickness": "20mm",
    "usage_area": "Wall Mount, Flooring",
    "featured_section": "our_collection,tile_texture"
  },
  {
    "id": 71,
    "name": "Scorpio",
    "slug": "scorpio",
    "category": "Marble",
    "description": "",
    "image_url": "assets/images/products/product-1783084912-6a47b7700c180.webp",
    "finish": "Hydro",
    "origin": "Rajasthan",
    "color": "Brown",
    "thickness": "20mm",
    "usage_area": "Wall Mount",
    "featured_section": "our_collection,tile_texture"
  },
  {
    "id": 69,
    "name": "Alaska White",
    "slug": "alaska-white",
    "category": "Granite",
    "description": "Alaska White granite is a true showstopper for home flooring, rapidly becoming a favorite choice worldwide. This premium stone features a luminous, crisp white background beautifully interspersed with icy silver frost, dramatic charcoal veins, and shimmering quartz crystals. This striking color palette reflects natural light brilliantly, instantly making any room feel larger, brighter, and ultra-luxurious.\n\nBeyond its high-end, contemporary aesthetic, Alaska White is incredibly tough\u2014highly resistant to stains, scratches, and heavy daily foot traffic. It effortlessly bridges the gap between rugged durability and pure elegance, giving your home an expansive, upscale foundation that never goes out of style.",
    "image_url": "assets/images/products/product-1783084356-6a47b5441b767.webp",
    "finish": "Polished",
    "origin": "Rajasthan",
    "color": "White",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "featured_section": "our_collection,tile_texture"
  },
  {
    "id": 68,
    "name": "Alaska Pink",
    "slug": "alaska-pink",
    "category": "Granite",
    "description": "Gaining massive popularity both globally and domestically, Alaska Pink stone is the ultimate modern choice for home flooring. This breathtaking natural granite seamlessly blends a soft, warm pink background with dramatic patches of white, quartz, and deep black veining, creating an instantly luxurious look. Far from just a beautiful surface, it delivers incredible durability, easily resisting scratches, heat, and heavy foot traffic. Its smooth, polished finish reflects light beautifully to make rooms feel expansive and inviting. Low-maintenance and exceptionally long-lasting, Alaska Pink flooring effortlessly infuses your home with an exotic, high-end charm that stands the test of time.",
    "image_url": "assets/images/products/product-1783084260-6a47b4e40ca25.webp",
    "finish": "Polished",
    "origin": "Rajasthan",
    "color": "White",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "featured_section": "our_collection,tile_texture"
  },
  {
    "id": 67,
    "name": "Tan Brown",
    "slug": "tan-brown",
    "category": "Granite",
    "description": "",
    "image_url": "assets/images/products/product-1783084011-6a47b3eb20cf0.webp",
    "finish": "Polished",
    "origin": "Andhra Pradesh",
    "color": "Brown",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "featured_section": "signature_showcase"
  },
  {
    "id": 66,
    "name": "Mountain Brown",
    "slug": "mountain-brown",
    "category": "Granite",
    "description": "",
    "image_url": "assets/images/products/product-1783083965-6a47b3bd9408e.webp",
    "finish": "Polished",
    "origin": "Karnataka",
    "color": "Brown",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "featured_section": "signature_showcase"
  },
  {
    "id": 65,
    "name": "Red Purpory",
    "slug": "red-purpory",
    "category": "Granite",
    "description": "",
    "image_url": "assets/images/products/product-1783083937-6a47b3a1ec35b.webp",
    "finish": "Polished",
    "origin": "Karnataka",
    "color": "Red",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "featured_section": "signature_showcase"
  },
  {
    "id": 64,
    "name": "Colombo Jubrana",
    "slug": "colombo-jubrana",
    "category": "Granite",
    "description": "",
    "image_url": "assets/images/products/product-1783083902-6a47b37e26547.webp",
    "finish": "Polished",
    "origin": "Tamil Nadu",
    "color": "Beige",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "featured_section": "signature_showcase"
  },
  {
    "id": 63,
    "name": "Lakha Red",
    "slug": "lakha-red",
    "category": "Granite",
    "description": "",
    "image_url": "assets/images/products/product-1783083869-6a47b35dab1cb.webp",
    "finish": "Polished",
    "origin": "Rajasthan",
    "color": "Red",
    "thickness": "16mm",
    "usage_area": "Flooring",
    "featured_section": "signature_showcase"
  },
  {
    "id": 62,
    "name": "Wooden",
    "slug": "wooden",
    "category": "Sandstone",
    "description": "",
    "image_url": "assets/images/products/product-1783083830-6a47b3366d3c3.webp",
    "finish": "Honed",
    "origin": "Rajasthan",
    "color": "Brown",
    "thickness": "20mm",
    "usage_area": "Wall Mount",
    "featured_section": "none"
  },
  {
    "id": 61,
    "name": "Cats Eye",
    "slug": "cats-eye",
    "category": "Granite",
    "description": "",
    "image_url": "assets/images/products/product-1783083788-6a47b30cde49f.webp",
    "finish": "Polished",
    "origin": "Karnataka",
    "color": "Red",
    "thickness": "17mm",
    "usage_area": "Flooring",
    "featured_section": "none"
  },
  {
    "id": 60,
    "name": "Coin Black",
    "slug": "coin-black",
    "category": "Granite",
    "description": "",
    "image_url": "assets/images/products/product-1783083744-6a47b2e0d4304.webp",
    "finish": "Polished",
    "origin": "Rajasthan",
    "color": "Black",
    "thickness": "16mm",
    "usage_area": "Flooring",
    "featured_section": "none"
  },
  {
    "id": 59,
    "name": "Impala Black",
    "slug": "impala-black",
    "category": "Granite",
    "description": "",
    "image_url": "assets/images/products/product-1783083696-6a47b2b0cbb16.webp",
    "finish": "Polished",
    "origin": "Karnataka",
    "color": "Black",
    "thickness": "18MM",
    "usage_area": "Kitchen Countertops",
    "featured_section": "none"
  },
  {
    "id": 58,
    "name": "Black Forrest",
    "slug": "black-forrest",
    "category": "Granite",
    "description": "",
    "image_url": "assets/images/products/product-1783083657-6a47b289a4a40.webp",
    "finish": "Polished",
    "origin": "Rajasthan",
    "color": "Black",
    "thickness": "16mm+",
    "usage_area": "Flooring",
    "featured_section": "none"
  },
  {
    "id": 57,
    "name": "Black Swan",
    "slug": "black-swan",
    "category": "Granite",
    "description": "",
    "image_url": "assets/images/products/product-1783083605-6a47b25571850.webp",
    "finish": "Polished",
    "origin": "Karnataka",
    "color": "Black",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "featured_section": "none"
  },
  {
    "id": 56,
    "name": "Titanium Black",
    "slug": "titanium-black",
    "category": "Granite",
    "description": "",
    "image_url": "assets/images/products/product-1783083560-6a47b228132ac.webp",
    "finish": "Polished",
    "origin": "Rajasthan",
    "color": "Black",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "featured_section": "none"
  },
  {
    "id": 55,
    "name": "Steel Grey",
    "slug": "steel-grey",
    "category": "Granite",
    "description": "",
    "image_url": "assets/images/products/product-1783083531-6a47b20b6691a.webp",
    "finish": "Polished",
    "origin": "Andhra Pradesh",
    "color": "Black",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "featured_section": "none"
  },
  {
    "id": 54,
    "name": "Galaxy",
    "slug": "galaxy",
    "category": "Granite",
    "description": "",
    "image_url": "assets/images/products/product-1783083490-6a47b1e260326.webp",
    "finish": "Polished",
    "origin": "Andhra Pradesh",
    "color": "",
    "thickness": "",
    "usage_area": "",
    "featured_section": "none"
  },
  {
    "id": 53,
    "name": "Pista Green",
    "slug": "pista-green",
    "category": "Granite",
    "description": "Classic Green \nPerfect for an abstract look",
    "image_url": "assets/images/products/product-1783083351-6a47b1575ccdd.webp",
    "finish": "Polished",
    "origin": "Karnataka",
    "color": "Green",
    "thickness": "16mm",
    "usage_area": "Kitchen Countertops",
    "featured_section": "none"
  },
  {
    "id": 52,
    "name": "Flash Green",
    "slug": "flash-green",
    "category": "Granite",
    "description": "This stunning green granite is another incredible bargain, looking just like the legendary Emerald Pearl from Norway while costing seven times less. It features a deep, majestic green backdrop embedded with shimmering, naturally reflective minerals that act like sparkling gems under the light. This stone offers an ultra-luxury, high-end European aesthetic at a fraction of the import price, making it a brilliant, high-value choice for show-stopping countertops, feature walls, and premium interior accents.",
    "image_url": "assets/images/products/product-1783083136-6a47b0804c4ee.webp",
    "finish": "Polished",
    "origin": "Odisha",
    "color": "Green",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "featured_section": "none"
  },
  {
    "id": 51,
    "name": "Bassi Lapatro",
    "slug": "bassi-lapatro",
    "category": "Granite",
    "description": "Bassi Lapatro is a mesmerizing work of art, showcasing a stunning amalgamation of diverse minerals fused together over millions of years. The specialized lapatro finish expertly enhances this natural texture, giving it a sophisticated, semi-gloss sheen that feels incredible to the touch.\n\nAn absolute steal for high-end design, this remarkable stone is a spitting image of the legendary South African deposit, Marinace Black. While the rare African import costs at least five times more, Bassi Lapatro delivers the exact same ultra-luxury, mosaic-like aesthetic and rugged durability at a mere fraction of the price\u2014making premium luxury genuinely accessible.",
    "image_url": "assets/images/products/product-1783081478-6a47aa06b6e30.webp",
    "finish": "Lapatro",
    "origin": "Rajasthan",
    "color": "Green",
    "thickness": "18mm",
    "usage_area": "Steps",
    "featured_section": "none"
  },
  {
    "id": 50,
    "name": "Hassan Green",
    "slug": "hassan-green",
    "category": "Granite",
    "description": "Another timeless classic, Hassan Green Granite remains the most loved color choice for premium kitchen countertops. Granite dealers and expert layers from all across Tamil Nadu consistently choose Murali Granites & Marbles to procure this specific stone.\n\nBecause we operate a dedicated sister company right at the quarry source, Murali Granites & Marbles holds a unique advantage, allowing us to directly handpick and procure the absolute finest quality Hassan Green available anywhere in the Tamil Nadu market. This seamless, direct-from-source pipeline ensures our customers always receive unmatched color consistency, superior structural integrity, and the highly coveted, deep-green depth this legendary stone is famous for.",
    "image_url": "assets/images/products/product-1783081328-6a47a9703a0ea.webp",
    "finish": "Polished",
    "origin": "Karnataka",
    "color": "Green",
    "thickness": "16mm",
    "usage_area": "Kitchen Countertops",
    "featured_section": "none"
  },
  {
    "id": 49,
    "name": "3D Rock Look",
    "slug": "3d-rock-look",
    "category": "Granite",
    "description": "Murali Granites & Marbles is the ultimate destination for premium hydro and lapatro finishes. We offer an unmatched selection of these specialized textures, giving you the freedom to find the perfect look for your home. Hydro finishes provide a slip-resistant, rugged elegance ideal for outdoor spaces, while lapatro offers a semi-gloss, antique texture that elevates interiors.\n\nNavigating these unique finishes is effortless thanks to their exceptional support staff, who are expertly trained to guide everyone from first-time homeowners to seasoned architects, ensuring you get the perfect stone for your project.",
    "image_url": "assets/images/products/product-1783081135-6a47a8af74f0b.webp",
    "finish": "Hydro",
    "origin": "Rajasthan",
    "color": "Grey",
    "thickness": "20mm",
    "usage_area": "Wall Mount",
    "featured_section": "none"
  },
  {
    "id": 48,
    "name": "Green Marble",
    "slug": "green-marble",
    "category": "Marble",
    "description": "Green marble is the ultimate choice for house flooring, seamlessly blending health-centric biophilic design\u2014the practice of connecting indoor spaces to nature\u2014with timeless luxury. Its rich, organic green tones radiate a deeply calming energy, transforming your home into a soothing, stress-free sanctuary. Beyond its mental health benefits, marble is a naturally cool stone, keeping your living spaces refreshed during hot summer months. It is incredibly durable, highly resistant to daily wear, and grows more beautiful with age. Choosing green marble flooring means investing in an eco-friendly, long-lasting foundation that elevates your home's aesthetic while nurturing your daily well-being.",
    "image_url": "assets/images/products/product-1783081066-6a47a86a5d5e2.webp",
    "finish": "Polished",
    "origin": "Rajasthan",
    "color": "Green",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "featured_section": "none"
  },
  {
    "id": 47,
    "name": "Forrest Green",
    "slug": "forrest-green",
    "category": "Marble",
    "description": "Step into pure, unadulterated luxury with this breathtaking green textured marble. Crafted by nature over millennia, its rich, layered surface looks exactly like a raw, organic rock hidden behind a cascading rainforest waterfall. It is a sensory masterpiece\u2014the deep forest greens and striking, mossy textures invite you to run your hands across it, bringing the soothing, untamed essence of a private sanctuary straight into your home. This is not just a stone; it is an exclusive piece of high-end art designed to pamper your senses, exude elite taste, and transform any ordinary space into a lavish, breathtaking retreat.",
    "image_url": "assets/images/products/product-1783080973-6a47a80d4a3d5.webp",
    "finish": "Hydro",
    "origin": "Rajasthan",
    "color": "Green",
    "thickness": "20mm",
    "usage_area": "Wall Mount",
    "featured_section": "none"
  },
  {
    "id": 46,
    "name": "Asian Green",
    "slug": "asian-green",
    "category": "Granite",
    "description": "A dark green kitchen countertop is the ultimate choice for balancing high-end luxury with everyday practicality. This rich, organic hue infuses the heart of your home with a calming, nature-inspired sophistication that pairs beautifully with wood, brass, or neutral cabinets. Beyond its stunning aesthetic, the deep tones and natural veining excel at masking minor scratches, water spots, and daily wear, making it an exceptionally low-maintenance and timeless centerpiece for a busy, hardworking kitchen.",
    "image_url": "assets/images/products/product-1783080897-6a47a7c1ec5ed.webp",
    "finish": "Polished",
    "origin": "Karnataka",
    "color": "Green",
    "thickness": "17mm",
    "usage_area": "Kitchen Countertop",
    "featured_section": "none"
  },
  {
    "id": 45,
    "name": "Shiffon Pink",
    "slug": "shiffon-pink",
    "category": "Granite",
    "description": "This rare, highly sought-after granite showcases a soft pastel pink hue that radiates an ultra-luxury look. Far from an ordinary stone, its delicate color palette offers an exclusive, high-end aesthetic that simply cannot be found everywhere. Because of its extreme rarity and limited quarrying, this premium granite is not part of standard inventory\u2014it is strictly reserved for discerning clients and available only through special, custom requests and dedicated private orders.",
    "image_url": "assets/images/products/product-1783080746-6a47a72a44742.webp",
    "finish": "Polished",
    "origin": "Tamil Nadu",
    "color": "Pink",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "featured_section": "none"
  },
  {
    "id": 44,
    "name": "Shiva Gold",
    "slug": "shiva-gold",
    "category": "Granite",
    "description": "The long-awaited Shiva Gold or Midas Gold granite is finally back after its quarry was closed for almost a decade. Globally celebrated as the \"Golden Touch,\" this is the most famous and loved granite in the world. Its stunning, opulent tones make it a massive favorite across the USA, Europe, and the Middle East.",
    "image_url": "assets/images/products/product-1783080607-6a47a69f485d0.webp",
    "finish": "Polished",
    "origin": "Tamil Nadu",
    "color": "Gold",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "featured_section": "none"
  },
  {
    "id": 43,
    "name": "Strawberry Pink",
    "slug": "strawberry-pink",
    "category": "Granite",
    "description": "Pink floors instantly make a home more mentally pleasing, radiating a warm, comforting energy that reduces daily stress. This soft, soothing hue creates a deeply calming and welcoming atmosphere, visually opening up rooms. It adds an unexpected, cheerful touch of personality, making your living space feel like a true sanctuary.",
    "image_url": "assets/images/products/product-1783080527-6a47a64f53214.webp",
    "finish": "Polished",
    "origin": "Tamil Nadu",
    "color": "Pink",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "featured_section": "none"
  },
  {
    "id": 42,
    "name": "Forrest Gold",
    "slug": "forrest-gold",
    "category": "Sand Stone",
    "description": "Bidasar Gold granite features a richly textured finish, making it the premier choice for striking wall mounting. Renowned for its unique, sweeping white lines, this natural stone brings dramatic artistry to front wall elevations or serves as a showpiece on a bathroom's back wall, effortlessly transforming any vertical space into high-end luxury.",
    "image_url": "assets/images/products/product-1783080383-6a47a5bf9a4a3.webp",
    "finish": "Hydro",
    "origin": "Rajasthan",
    "color": "Gold",
    "thickness": "18mm",
    "usage_area": "Wall Mounting",
    "featured_section": "none"
  },
  {
    "id": 41,
    "name": "Astoria Gold",
    "slug": "astoria-gold",
    "category": "Granite",
    "description": "Radiating pure rich vibes, gold granite is the ultimate symbol of a lux life. Its deep, warm tones embody abundance and prosperity, instantly elevating any interior. Choosing this opulent stone brings a welcoming energy of wealth and success into your home, making it a powerful, timeless statement of high-end design.",
    "image_url": "assets/images/products/product-1783080299-6a47a56b99b00.webp",
    "finish": "Polished",
    "origin": "Tamil Nadu",
    "color": "Gold",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "featured_section": "stone_gallery"
  },
  {
    "id": 40,
    "name": "Romantic Blue",
    "slug": "romantic-blue",
    "category": "Granite",
    "description": "Freshly sourced from a brand new quarry, Romantic Blue granite showcases striking new colors that naturally attract everyone. Because these products are 100% natural, each unique slab tells its own story. This captivating stone brings a romantic, elegant charm to your space, offering a completely fresh look for modern designs.",
    "image_url": "assets/images/products/product-1783080196-6a47a504c714c.webp",
    "finish": "Polished",
    "origin": "Odisha",
    "color": "Blue",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "featured_section": "none"
  },
  {
    "id": 39,
    "name": "SKY Blue",
    "slug": "sky-blue",
    "category": "Granite",
    "description": "SKY Blue is a classic, authentic granite celebrated for its entirely natural blue hues with absolutely no artificial color added. Highly UV-resistant, its vibrant tones will not fade under harsh sunlight. It remains a legendary, old favorite among architects and engineers who trust its timeless look and robust, long-term performance.",
    "image_url": "assets/images/products/product-1783080092-6a47a49c1e7b7.webp",
    "finish": "Polished",
    "origin": "Odisha",
    "color": "Blue",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "featured_section": "none"
  },
  {
    "id": 38,
    "name": "Lavender Blue",
    "slug": "lavender-blue",
    "category": "Granite",
    "description": "Exuding pure luxury, this elite granite pairs a deep blue and ash color palette to create an ultra-premium aesthetic. Famously featured across the grand walkways of the Bangalore International Airport, its sophisticated tones reach absolute perfection when contrasted against sleek, dark-palette furniture for a dramatic, high-end interior design.",
    "image_url": "assets/images/products/product-1783079927-6a47a3f7bc726.webp",
    "finish": "Polished",
    "origin": "Odisha",
    "color": "Blue",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "featured_section": "stone_gallery"
  },
  {
    "id": 37,
    "name": "Kingfisher Blue",
    "slug": "kingfisher-blue",
    "category": "Granite",
    "description": "This exquisite blue granite from Odisha strikes the perfect balance between sophistication and understated luxury. Featuring deep, refined tones and subtle, shifting mineral patterns, it offers a distinct premium feel. It acts as a tasteful, subtle flex of wealth\u2014elevating any space with an elite presence without ever looking loud or overdone.",
    "image_url": "assets/images/products/product-1783079826-6a47a39205007.webp",
    "finish": "Polished",
    "origin": "Odisha",
    "color": "Blue",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "featured_section": "stone_gallery"
  },
  {
    "id": 36,
    "name": "Safari Blue",
    "slug": "safari-blue",
    "category": "Granite",
    "description": "Sourced directly from Andhra Pradesh, this vibrant blue granite offers incredible durability, handling heavy traffic and scratches with ease. Because it is highly cost-effective and very cheap, it provides massive value at scale. This makes it the absolute best choice for large-scale commercial spaces, bustling office floors, and high-use surfaces.",
    "image_url": "assets/images/products/product-1783079748-6a47a34440dc7.webp",
    "finish": "Polished",
    "origin": "Andhra Pradesh",
    "color": "Blue",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "featured_section": "signature_showcase"
  },
  {
    "id": 35,
    "name": "Crystal Blue",
    "slug": "crystal-blue",
    "category": "Granite",
    "description": "This stunning blue granite features a bold, mosaic-like design that naturally commands attention. Renowned for its exceptional strength and durability, it easily resists heavy wear and scratching. Its intricate, sweeping patterns make it the absolute perfect choice for elevating expansive, big-format spaces like large floors, feature walls, or grand countertops.",
    "image_url": "assets/images/products/product-1783079633-6a47a2d18815c.webp",
    "finish": "Polished",
    "origin": "Rajasthan",
    "color": "Blue",
    "thickness": "16mm+",
    "usage_area": "Flooring",
    "featured_section": "stone_gallery"
  },
  {
    "id": 34,
    "name": "Ice White",
    "slug": "ice-white",
    "category": "Granite",
    "description": "Ice White Granite is a budget-friendly, exceptionally strong natural stone featuring a crisp white background with bold charcoal and slate veining. Highly durable and resistant to heavy foot traffic, its cost-effective pricing and striking pattern make it the absolute best choice for expansive flooring, countertops, and large-scale commercial spaces.",
    "image_url": "assets/images/products/product-1783079501-6a47a24d9fa78.webp",
    "finish": "Polished",
    "origin": "Rajasthan",
    "color": "White",
    "thickness": "16mm+",
    "usage_area": "Flooring",
    "featured_section": "none"
  },
  {
    "id": 33,
    "name": "Moon White",
    "slug": "moon-white",
    "category": "Granite",
    "description": "Moon White Granite features a bright ivory and alabaster background intricately speckled with fine silver-grey grains and occasional deep burgundy flecks. Quarried in India, this durable natural stone offers a refined, uniform pattern that pairs effortlessly with modern kitchens, delivering a clean, luminous, and timeless aesthetic.",
    "image_url": "assets/images/products/product-1783079448-6a47a218632fd.webp",
    "finish": "Polished",
    "origin": "Odisha",
    "color": "White",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "featured_section": "none"
  },
  {
    "id": 32,
    "name": "China White",
    "slug": "china-white",
    "category": "Granite",
    "description": "This stunning white granite perfectly captures the ultra-luxurious, bold grey veining of Italy\u2019s legendary Statuario marble. While genuine Statuario commands up to 3,000 rupees per square foot, this stone delivers that exact high-end, iconic aesthetic for under 250 rupees. It adds massive home value, giving you premium marble elegance at an absolute steal.",
    "image_url": "assets/images/products/product-1783078937-6a47a0192a9b3.webp",
    "finish": "Polished",
    "origin": "Odisha",
    "color": "White",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "featured_section": "none"
  },
  {
    "id": 31,
    "name": "River White",
    "slug": "river-white",
    "category": "Granite",
    "description": "World-famous River White granite brings the soothing majesty of nature indoors. Its translucent white background is animated by fluid, sweeping grey waves and delicate burgundy speckles. This highly sought-after stone dramatically boosts home equity, offering an incredibly durable, prestigious flooring option that merges organic artistry with long-term premium value.",
    "image_url": "assets/images/products/product-1783078831-6a479faf4fcbd.webp",
    "finish": "Polished",
    "origin": "Odisha",
    "color": "White",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "featured_section": "signature_showcase"
  },
  {
    "id": 30,
    "name": "Gelatic White",
    "slug": "gelatic-white",
    "category": "Granite",
    "description": "This stunning granite mirrors the dramatic, elegant grey veining of classic Italian marble, offering high-end luxury with superior durability. Scattered throughout are breathtaking, naturally embedded purple garnets that catch the light like hidden gems. This rare combination adds massive resale value, transforming your floor into a durable, unique masterpiece.",
    "image_url": "assets/images/products/product-1783078626-6a479ee25bd3e.webp",
    "finish": "Polished",
    "origin": "Odisha",
    "color": "White",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "featured_section": "signature_showcase"
  },
  {
    "id": 29,
    "name": "Galaxy White",
    "slug": "galaxy-white",
    "category": "Granite",
    "description": "Granite with white sparkling flakes fills your home with a captivating, star-like brilliance. As light hits the shimmering crystals, it creates a dynamic, luxurious depth that elevates any room's aesthetic. This premium stone adds significant market value, offering homeowners an incredibly durable, scratch-resistant floor that blends high-end glamor with everyday practicality.",
    "image_url": "assets/images/products/product-1783078566-6a479ea6bfc0b.webp",
    "finish": "Polished",
    "origin": "Odisha",
    "color": "White",
    "thickness": "18mm",
    "usage_area": "Flooring",
    "featured_section": "none"
  }
];

  // Check for custom products added via Admin Dashboard
  let customProducts = [];
  try {
    const stored = localStorage.getItem('murali_custom_products');
    if (stored) customProducts = JSON.parse(stored);
  } catch (e) {}

  let allProducts = [...customProducts, ...FALLBACK_PRODUCTS];
  let currentCategory = 'all';

  // Render immediately with combined dataset
  renderProducts(allProducts);

  // Attempt fetch if running on live web server
  fetch('api/products.json')
    .then(res => {
      if (!res.ok) throw new Error('Network response not ok');
      return res.json();
    })
    .then(data => {
      if (Array.isArray(data) && data.length > 0) {
        allProducts = [...customProducts, ...data];
        renderProducts(allProducts);
      }
    })
    .catch(err => {
      console.info('Loaded verified stone collection dataset.');
    });

  function renderProducts(items) {
    container.innerHTML = '';

    if (!items.length) {
      container.innerHTML = '<div class="no-results" style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #8A8A80;">No natural stone slabs found matching your filter selection.</div>';
      return;
    }

    const fragment = document.createDocumentFragment();

    items.forEach(product => {
      const tile = document.createElement('div');
      tile.className = 'product-tile';
      tile.setAttribute('title', `${product.name} - ${product.category || 'Natural Stone'}`);

      const encName = encodeURIComponent(product.name);
      tile.innerHTML = `
        <div class="tile-header">
          <span class="tile-title">${product.name}</span>
        </div>
        <div class="tile-img-box" style="position:relative; aspect-ratio:1; overflow:hidden; background:#141416;">
          <img class="tile-img" 
               src="${product.image_url}" 
               alt="${product.name}" 
               loading="lazy" 
               style="width:100%; height:100%; object-fit:cover; transition:transform 0.55s cubic-bezier(0.16, 1, 0.3, 1); will-change: transform;"
               onerror="if(!this.dataset.triedFallback){this.dataset.triedFallback='1';this.src=this.src.replace('.webp','.jpg');}else{this.onerror=null;this.src='assets/images/favicon.png';}"/>
        </div>
        <div class="tile-meta" style="padding:0.75rem; font-size:0.75rem; color:#8A8A80; background:#0e0e11; border-top:1px solid rgba(255,255,255,0.05); display:flex; justify-content:space-between;">
          <span>${product.origin || 'India'}</span>
          <span style="color:#C5A059;">${product.finish || 'Polished'}</span>
        </div>
        <div class="tile-actions" style="display:flex; border-top:1px solid rgba(255,255,255,0.08); background:#0c0c0e;">
          <a href="visualizer.html?material=${encName}" style="flex:1; padding:0.55rem 0.2rem; font-size:0.72rem; text-align:center; color:#C5A059; font-weight:600; text-transform:uppercase; letter-spacing:0.04em; border-right:1px solid rgba(255,255,255,0.08); text-decoration:none;" title="Preview in Room Visualizer">
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
  }

  function filterDataset() {
    const query = (searchInput?.value || '').toLowerCase().trim();
    const origin = (originFilter?.value || 'all').toLowerCase();
    const color = (colorFilter?.value || 'all').toLowerCase();
    const finish = (finishFilter?.value || 'all').toLowerCase();

    const INDIAN_REGIONS = ['rajasthan', 'tamil nadu', 'karnataka', 'andhra pradesh', 'odisha', 'gujarat', 'india', 'makrana', 'kishangarh', 'bangalore'];

    const filtered = allProducts.filter(p => {
      const cat = (p.category || '').toLowerCase();
      const name = (p.name || '').toLowerCase();
      const desc = (p.description || '').toLowerCase();
      const orig = (p.origin || '').toLowerCase();
      const col = (p.color || '').toLowerCase();
      const fin = (p.finish || '').toLowerCase();
      const feat = (p.featured_section || '').toLowerCase();
      const usage = (p.usage_area || '').toLowerCase();

      // Category Tabs
      if (currentCategory !== 'all') {
        if (currentCategory === 'granite') {
          if (!cat.includes('granite')) return false;
        } else if (currentCategory === 'marble') {
          if (!cat.includes('marble') && !name.includes('marble')) return false;
        } else if (currentCategory === 'tiles') {
          // Matches tile category, tile textures, or products suitable for floor/wall tiles
          const isTile = cat.includes('tile') || 
                         feat.includes('tile') || 
                         usage.includes('tile') || 
                         usage.includes('flooring') ||
                         cat.includes('sandstone') ||
                         cat.includes('sand stone');
          if (!isTile) return false;
        } else if (currentCategory === 'onyx') {
          // Matches onyx category or onyx in name/description
          const isOnyx = cat.includes('onyx') || 
                         name.includes('onyx') || 
                         desc.includes('onyx');
          if (!isOnyx) return false;
        } else {
          if (!cat.includes(currentCategory)) return false;
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
        if (!fin.includes(finish)) return false;
      }

      // Search Query
      if (query) {
        if (!name.includes(query) && !cat.includes(query) && !orig.includes(query) && !col.includes(query) && !usage.includes(query) && !desc.includes(query)) {
          return false;
        }
      }

      return true;
    });

    renderProducts(filtered);
  }

  // Event Listeners
  if (searchInput) searchInput.addEventListener('input', filterDataset);
  if (originFilter) originFilter.addEventListener('change', filterDataset);
  if (colorFilter) colorFilter.addEventListener('change', filterDataset);
  if (finishFilter) finishFilter.addEventListener('change', filterDataset);

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
