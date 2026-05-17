const products = [
  {
    id: 1,
    name: "Pure Silver Ganesha Idol",
    category: "Pooja Items",
    subcategory: "Idols",
    price: 15500,
    material: "92.5 Sterling Silver",
    availability: "In Stock",
    occasion: "Daily Pooja",
    description: "Intricately carved pure silver Lord Ganesha idol. Designed by heritage artisans to bring positive cosmic energy, peace, and prosperity to your home temple or office.",
    specifications: [
      "Weight: Approx. 150 grams",
      "Dimensions: 4.2\" height x 3.0\" width",
      "Purity: 92.5% Hallmarked Sterling Silver"
    ],
    image: "assets/images/ganesha_idol.png"
  },
  {
    id: 2,
    name: "Classic Silver Diya Set",
    category: "Pooja Items",
    subcategory: "Diyas",
    price: 4800,
    material: "92.5 Sterling Silver",
    availability: "In Stock",
    occasion: "Festivals",
    description: "Traditional twin silver diyas with a highly polished finish and stable broad base. Handcrafted to safely illuminate your sacred rituals and bring light into your spiritual journey.",
    specifications: [
      "Weight: Approx. 55 grams each",
      "Dimensions: 2.5\" diameter x 1.8\" height",
      "Purity: 92.5% Certified Silver"
    ],
    image: "assets/images/silver_diya.png"
  },
  {
    id: 3,
    name: "Premium Aarti Thali Set",
    category: "Pooja Items",
    subcategory: "Thalis",
    price: 28000,
    material: "92.5 Sterling Silver",
    availability: "Low Stock",
    occasion: "Weddings",
    description: "A comprehensive and magnificent silver aarti thali. The set contains a carved silver plate, incense holder, Twin Diya, Akshat bowl, and holy water kalash.",
    specifications: [
      "Weight: Approx. 310 grams",
      "Dimensions: 9.8\" plate diameter",
      "Purity: 92.5% Hallmark Standard"
    ],
    image: "assets/images/aarti_thali.png"
  },
  {
    id: 4,
    name: "Resonant Silver Ghanti (Bell)",
    category: "Pooja Items",
    subcategory: "Accessories",
    price: 3800,
    material: "92.5 Sterling Silver",
    availability: "In Stock",
    occasion: "Daily Pooja",
    description: "A gracefully designed holy bell with detailed floral carvings along the handle. Created to produce a crisp, pure sound that cleanses home environments during prayers.",
    specifications: [
      "Weight: Approx. 42 grams",
      "Dimensions: 4.5\" height x 1.8\" base width",
      "Purity: 92.5% Sterling Silver"
    ],
    image: "assets/images/silver_ghanti.png"
  },
  {
    id: 5,
    name: "Heritage Oxidized Silver Necklace",
    category: "Silver Jewelry",
    subcategory: "Necklaces",
    price: 19500,
    material: "Oxidized Silver",
    availability: "In Stock",
    occasion: "Bridal",
    description: "An antique-finished tribal style oxidized silver necklace. Adorned with delicate traditional carvings and fine red/green stone detailing, designed to capture royal heritage.",
    specifications: [
      "Weight: Approx. 115 grams",
      "Necklace Length: 18 inches (adjustable)",
      "Purity: 92.5% Oxidized Silver"
    ],
    image: "assets/images/oxidized_necklace.png"
  },
  {
    id: 6,
    name: "Kundan Royal Silver Jhumkas",
    category: "Silver Jewelry",
    subcategory: "Earrings",
    price: 6800,
    material: "92.5 Sterling Silver",
    availability: "In Stock",
    occasion: "Festivals",
    description: "Exquisite kundan studded silver jhumkas with beautiful hanging fresh pearls. Perfect for traditional celebrations, weddings, and premium festive gifting.",
    specifications: [
      "Weight: Approx. 28 grams (pair)",
      "Length: 2.6 inches",
      "Purity: 92.5% Sterling Silver"
    ],
    image: "assets/images/silver_jhumkas.png"
  },
  {
    id: 7,
    name: "Filigree Crafted Silver Bangle",
    category: "Silver Jewelry",
    subcategory: "Bangles",
    price: 13500,
    material: "92.5 Sterling Silver",
    availability: "Out of Stock",
    occasion: "Weddings",
    description: "Stunning silver bangles featuring detailed filigree craft. Represents absolute grace and traditional heritage style, perfect for family occasions.",
    specifications: [
      "Weight: Approx. 85 grams",
      "Available Sizes: 2.4, 2.6, 2.8",
      "Purity: 92.5% Sterling Silver"
    ],
    image: "assets/images/silver_bangle.png"
  },
  {
    id: 8,
    name: "Minimalist Silver Anklet Set",
    category: "Silver Jewelry",
    subcategory: "Anklets",
    price: 3200,
    material: "92.5 Sterling Silver",
    availability: "In Stock",
    occasion: "Daily Wear",
    description: "Ultra-sleek, lightweight silver anklets featuring micro-bead embellishments. Handcrafted to provide comfortable everyday wear and a subtle, charming sound.",
    specifications: [
      "Weight: Approx. 22 grams (pair)",
      "Length: 10.5 inches",
      "Purity: 92.5% Pure Sterling Silver"
    ],
    image: "assets/images/silver_anklet.png"
  }
];


// Helper variables
const categories = ["Pooja Items", "Silver Jewelry"];
const occasions = ["Daily Pooja", "Festivals", "Weddings", "Bridal", "Daily Wear"];
const buyMaterials = ["92.5 Sterling Silver", "Oxidized Silver"];
