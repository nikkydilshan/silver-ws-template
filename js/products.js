const INITIAL_PRODUCTS = [
  // ─── SILVER PRODUCTS ───
  {
    id: 1,
    name: "Pure Silver Ganesha Idol",
    category: "Silver",
    subcategory: "Pooja Idols",
    metalType: "silver_925",
    weightGrams: 150,
    wastagePercent: 8,
    makingCharges: 1200,
    material: "92.5 Sterling Silver",
    availability: "In Stock",
    occasion: "Daily Pooja",
    description: "Intricately carved pure silver Lord Ganesha idol. Designed by heritage artisans to bring positive cosmic energy, peace, and prosperity to your home temple or office.",
    specifications: [
      "Net Weight: 150 grams",
      "Dimensions: 4.2\" height × 3.0\" width",
      "Purity: 92.5% Hallmarked Sterling Silver",
      "Wastage: 8%"
    ],
    image: "assets/images/ganesha_idol.png"
  },
  {
    id: 2,
    name: "Classic Silver Diya Set",
    category: "Silver",
    subcategory: "Pooja Diyas",
    metalType: "silver_925",
    weightGrams: 110,
    wastagePercent: 6,
    makingCharges: 600,
    material: "92.5 Sterling Silver",
    availability: "In Stock",
    occasion: "Festivals",
    description: "Traditional twin silver diyas with a highly polished finish and stable broad base. Handcrafted to safely illuminate your sacred rituals and bring light into your spiritual journey.",
    specifications: [
      "Net Weight: 55 grams each (110g total)",
      "Dimensions: 2.5\" diameter × 1.8\" height",
      "Purity: 92.5% Certified Silver",
      "Wastage: 6%"
    ],
    image: "assets/images/silver_diya.png"
  },
  {
    id: 3,
    name: "Premium Aarti Thali Set",
    category: "Silver",
    subcategory: "Pooja Thalis",
    metalType: "silver_925",
    weightGrams: 310,
    wastagePercent: 10,
    makingCharges: 2500,
    material: "92.5 Sterling Silver",
    availability: "Low Stock",
    occasion: "Weddings",
    description: "A comprehensive and magnificent silver aarti thali. The set contains a carved silver plate, incense holder, Twin Diya, Akshat bowl, and holy water kalash.",
    specifications: [
      "Net Weight: 310 grams",
      "Dimensions: 9.8\" plate diameter",
      "Purity: 92.5% Hallmark Standard",
      "Wastage: 10%"
    ],
    image: "assets/images/aarti_thali.png"
  },
  {
    id: 4,
    name: "Resonant Silver Ghanti (Bell)",
    category: "Silver",
    subcategory: "Pooja Accessories",
    metalType: "silver_925",
    weightGrams: 42,
    wastagePercent: 5,
    makingCharges: 400,
    material: "92.5 Sterling Silver",
    availability: "In Stock",
    occasion: "Daily Pooja",
    description: "A gracefully designed holy bell with detailed floral carvings along the handle. Created to produce a crisp, pure sound that cleanses home environments during prayers.",
    specifications: [
      "Net Weight: 42 grams",
      "Dimensions: 4.5\" height × 1.8\" base width",
      "Purity: 92.5% Sterling Silver",
      "Wastage: 5%"
    ],
    image: "assets/images/silver_ghanti.png"
  },
  {
    id: 5,
    name: "Heritage Oxidized Silver Necklace",
    category: "Silver",
    subcategory: "Necklaces",
    metalType: "silver_925",
    weightGrams: 115,
    wastagePercent: 12,
    makingCharges: 3500,
    material: "Oxidized Silver",
    availability: "In Stock",
    occasion: "Bridal",
    description: "An antique-finished tribal style oxidized silver necklace. Adorned with delicate traditional carvings and fine red/green stone detailing, designed to capture royal heritage.",
    specifications: [
      "Net Weight: 115 grams",
      "Necklace Length: 18 inches (adjustable)",
      "Purity: 92.5% Oxidized Silver",
      "Wastage: 12%"
    ],
    image: "assets/images/oxidized_necklace.png"
  },
  {
    id: 6,
    name: "Kundan Royal Silver Jhumkas",
    category: "Silver",
    subcategory: "Earrings",
    metalType: "silver_925",
    weightGrams: 28,
    wastagePercent: 14,
    makingCharges: 1200,
    material: "92.5 Sterling Silver",
    availability: "In Stock",
    occasion: "Festivals",
    description: "Exquisite kundan studded silver jhumkas with beautiful hanging fresh pearls. Perfect for traditional celebrations, weddings, and premium festive gifting.",
    specifications: [
      "Net Weight: 28 grams (pair)",
      "Length: 2.6 inches",
      "Purity: 92.5% Sterling Silver",
      "Wastage: 14%"
    ],
    image: "assets/images/silver_jhumkas.png"
  },
  {
    id: 7,
    name: "Filigree Crafted Silver Bangle",
    category: "Silver",
    subcategory: "Bangles",
    metalType: "silver_925",
    weightGrams: 85,
    wastagePercent: 10,
    makingCharges: 2000,
    material: "92.5 Sterling Silver",
    availability: "Out of Stock",
    occasion: "Weddings",
    description: "Stunning silver bangles featuring detailed filigree craft. Represents absolute grace and traditional heritage style, perfect for family occasions.",
    specifications: [
      "Net Weight: 85 grams",
      "Available Sizes: 2.4, 2.6, 2.8",
      "Purity: 92.5% Sterling Silver",
      "Wastage: 10%"
    ],
    image: "assets/images/silver_bangle.png"
  },
  {
    id: 8,
    name: "Minimalist Silver Anklet Set",
    category: "Silver",
    subcategory: "Anklets",
    metalType: "silver_925",
    weightGrams: 22,
    wastagePercent: 8,
    makingCharges: 500,
    material: "92.5 Sterling Silver",
    availability: "In Stock",
    occasion: "Daily Wear",
    description: "Ultra-sleek, lightweight silver anklets featuring micro-bead embellishments. Handcrafted to provide comfortable everyday wear and a subtle, charming sound.",
    specifications: [
      "Net Weight: 22 grams (pair)",
      "Length: 10.5 inches",
      "Purity: 92.5% Pure Sterling Silver",
      "Wastage: 8%"
    ],
    image: "assets/images/silver_anklet.png"
  },

  // ─── GOLD PRODUCTS ───
  {
    id: 9,
    name: "Royal 22K Gold Mangalsutra",
    category: "Gold",
    subcategory: "Mangalsutra",
    metalType: "gold_22k",
    weightGrams: 12,
    wastagePercent: 12,
    makingCharges: 3500,
    material: "22K Hallmarked Gold",
    availability: "In Stock",
    occasion: "Bridal",
    description: "An exquisitely crafted 22K gold Mangalsutra featuring a contemporary pendant with traditional black bead chain. Symbolises eternal marital bond with modern elegance.",
    specifications: [
      "Net Weight: 12 grams",
      "Chain Length: 18 inches",
      "Purity: 22K BIS Hallmarked Gold",
      "Wastage: 12%"
    ],
    image: "assets/images/ganesha_idol.png"
  },
  {
    id: 10,
    name: "Temple Gold Necklace Set",
    category: "Gold",
    subcategory: "Necklaces",
    metalType: "gold_22k",
    weightGrams: 35,
    wastagePercent: 14,
    makingCharges: 8000,
    material: "22K Hallmarked Gold",
    availability: "In Stock",
    occasion: "Weddings",
    description: "Grand temple-design gold necklace with matching jhumka earrings. Intricately detailed Lakshmi motifs with antique finish, perfect for South Indian weddings and festivals.",
    specifications: [
      "Net Weight: 35 grams (set)",
      "Necklace Length: 20 inches",
      "Purity: 22K BIS Hallmarked Gold",
      "Wastage: 14%"
    ],
    image: "assets/images/oxidized_necklace.png"
  },
  {
    id: 11,
    name: "Classic Gold Bangles (Pair)",
    category: "Gold",
    subcategory: "Bangles",
    metalType: "gold_22k",
    weightGrams: 24,
    wastagePercent: 10,
    makingCharges: 4000,
    material: "22K Hallmarked Gold",
    availability: "In Stock",
    occasion: "Festivals",
    description: "Elegant pair of solid 22K gold bangles with fine laser-cut geometric patterns. Lightweight yet sturdy, designed for everyday glamour and festive celebrations.",
    specifications: [
      "Net Weight: 24 grams (pair)",
      "Available Sizes: 2.4, 2.6, 2.8",
      "Purity: 22K BIS Hallmarked Gold",
      "Wastage: 10%"
    ],
    image: "assets/images/silver_bangle.png"
  },
  {
    id: 12,
    name: "Delicate Gold Chain",
    category: "Gold",
    subcategory: "Chains",
    metalType: "gold_22k",
    weightGrams: 8,
    wastagePercent: 8,
    makingCharges: 1500,
    material: "22K Hallmarked Gold",
    availability: "In Stock",
    occasion: "Daily Wear",
    description: "A sleek, machine-cut 22K gold chain with a brilliant mirror finish. Versatile enough for daily wear or as a base for your favourite pendant.",
    specifications: [
      "Net Weight: 8 grams",
      "Length: 20 inches",
      "Purity: 22K BIS Hallmarked Gold",
      "Wastage: 8%"
    ],
    image: "assets/images/silver_anklet.png"
  },
  {
    id: 13,
    name: "Gold Stud Earrings",
    category: "Gold",
    subcategory: "Earrings",
    metalType: "gold_22k",
    weightGrams: 4,
    wastagePercent: 16,
    makingCharges: 1200,
    material: "22K Hallmarked Gold",
    availability: "In Stock",
    occasion: "Daily Wear",
    description: "Petite floral-motif 22K gold stud earrings with push-back closure. Beautifully embossed surface catches light at every angle — ideal for office and festive wear alike.",
    specifications: [
      "Net Weight: 4 grams (pair)",
      "Diameter: 8mm",
      "Purity: 22K BIS Hallmarked Gold",
      "Wastage: 16%"
    ],
    image: "assets/images/silver_jhumkas.png"
  },
  {
    id: 14,
    name: "22K Gold Pooja Coin (10g)",
    category: "Gold",
    subcategory: "Pooja Items",
    metalType: "gold_22k",
    weightGrams: 10,
    wastagePercent: 3,
    makingCharges: 500,
    material: "22K Hallmarked Gold",
    availability: "Low Stock",
    occasion: "Festivals",
    description: "Embossed Lakshmi-Ganesha 22K gold coin — a timeless investment and auspicious gift for Dhanteras, Diwali, and wedding ceremonies.",
    specifications: [
      "Net Weight: 10 grams",
      "Diameter: 24mm",
      "Purity: 22K BIS Hallmarked Gold",
      "Wastage: 3%"
    ],
    image: "assets/images/ganesha_idol.png"
  }
];


// Helper variables
const categories = ["Gold", "Silver"];
const subcategoriesGold = ["Mangalsutra", "Necklaces", "Bangles", "Chains", "Earrings", "Pooja Items"];
const subcategoriesSilver = ["Pooja Idols", "Pooja Diyas", "Pooja Thalis", "Pooja Accessories", "Necklaces", "Earrings", "Bangles", "Anklets"];
const occasions = ["Daily Pooja", "Festivals", "Weddings", "Bridal", "Daily Wear"];
const buyMaterials = ["22K Hallmarked Gold", "92.5 Sterling Silver", "Oxidized Silver"];

/**
 * Compute live price for a product using the PricingEngine
 */
function getProductPrice(product) {
  if (typeof PricingEngine !== 'undefined') {
    return PricingEngine.computePrice({
      weightGrams: product.weightGrams,
      metalType: product.metalType,
      wastagePercent: product.wastagePercent,
      makingCharges: product.makingCharges || 0,
    });
  }
  // Fallback if PricingEngine not loaded
  return { totalPrice: product.weightGrams * 89, ratePerGram: 89, metalCost: 0, wastageCost: 0, makingCharges: 0 };
}

// ─── Product Database Manager ───
const ProductManager = (() => {
  const STORAGE_KEY = 'mahadev_products_db';
  const API_URL = 'api/products.php';
  
  let cachedProducts = null;
  let isOnline = false;

  // Detect if server has PHP API running
  function _init() {
    try {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', API_URL, false); // synchronous
      xhr.send(null);
      if (xhr.status === 200) {
        cachedProducts = JSON.parse(xhr.responseText);
        isOnline = true;
      }
    } catch (e) {
      // Failed to reach PHP API (e.g. running on local python server)
    }

    if (!cachedProducts) {
      // Fallback to localStorage
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          cachedProducts = JSON.parse(stored);
        }
      } catch (e) { /* ignore */ }

      if (!cachedProducts) {
        cachedProducts = INITIAL_PRODUCTS;
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
        } catch (e) { /* ignore */ }
      }
    }
  }

  // Initialize immediately
  _init();

  function getAll() {
    return cachedProducts;
  }

  // Helper to send secure write operations to PHP
  function _apiWrite(action, data, authHeaders = null) {
    if (!isOnline) return false;
    try {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', API_URL, false); // synchronous
      xhr.setRequestHeader('Content-Type', 'application/json');
      
      let userHash = "";
      let passHash = "";

      if (authHeaders) {
        userHash = authHeaders.usernameHash;
        passHash = authHeaders.passwordHash;
      } else {
        // Fallback to session credentials if stored
        userHash = sessionStorage.getItem('mahadev_admin_user') || '';
        passHash = sessionStorage.getItem('mahadev_admin_pass') || '';
      }

      xhr.setRequestHeader('X-Admin-User', userHash);
      xhr.setRequestHeader('X-Admin-Pass', passHash);

      const payload = { action: action, ...data };
      xhr.send(JSON.stringify(payload));
      
      if (xhr.status === 200) {
        const resp = JSON.parse(xhr.responseText);
        if (resp.success) {
          cachedProducts = resp.products;
          return true;
        }
      } else {
        try {
          const resp = JSON.parse(xhr.responseText);
          if (resp && resp.error) {
            alert("Authorization Error: " + resp.error);
          }
        } catch(e) {
          alert("Request failed with status: " + xhr.status);
        }
      }
    } catch (e) {
      console.error("API Write failed", e);
    }
    return false;
  }

  function add(product, authHeaders = null) {
    if (isOnline) {
      const success = _apiWrite('add', { product: product }, authHeaders);
      if (success) return product;
      return null;
    }
    
    // Offline local fallback
    const maxId = cachedProducts.reduce((max, p) => p.id > max ? p.id : max, 0);
    product.id = maxId + 1;
    cachedProducts.push(product);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cachedProducts));
    return product;
  }

  function updateStatus(id, availability, authHeaders = null) {
    if (isOnline) {
      return _apiWrite('updateStatus', { id: id, availability: availability }, authHeaders);
    }
    
    // Offline local fallback
    const product = cachedProducts.find(p => p.id === id);
    if (product) {
      product.availability = availability;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cachedProducts));
      return true;
    }
    return false;
  }

  function deleteProduct(id, authHeaders = null) {
    if (isOnline) {
      return _apiWrite('delete', { id: id }, authHeaders);
    }
    
    // Offline local fallback
    cachedProducts = cachedProducts.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cachedProducts));
    return true;
  }

  function reset(authHeaders = null) {
    if (isOnline) {
      return _apiWrite('reset', {}, authHeaders);
    }
    
    // Offline local fallback
    localStorage.removeItem(STORAGE_KEY);
    cachedProducts = INITIAL_PRODUCTS;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cachedProducts));
    return true;
  }

  function importDB(productsList, authHeaders = null) {
    if (isOnline) {
      return _apiWrite('import', { products: productsList }, authHeaders);
    }
    
    // Offline local fallback
    cachedProducts = productsList;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cachedProducts));
    return true;
  }

  return {
    getAll,
    add,
    updateStatus,
    deleteProduct,
    reset,
    importDB,
    isOnline: () => isOnline
  };
})();

// Dynamically expose products list globally for backward compatibility
Object.defineProperty(window, 'products', {
  get() {
    return ProductManager.getAll();
  },
  configurable: true
});
