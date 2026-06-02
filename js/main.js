// ─── Mobile Menu System ───
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Create overlay backdrop element
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);

  // Create a close header inside the mobile drawer
  const drawerHeader = document.createElement('div');
  drawerHeader.className = 'mobile-drawer-header';
  drawerHeader.innerHTML = `
    <span class="mobile-drawer-title">Menu</span>
    <button class="mobile-drawer-close" aria-label="Close Menu">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
  `;
  if (navLinks) {
    navLinks.insertBefore(drawerHeader, navLinks.firstChild);
  }

  const hamburgerIcon = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';

  function openMenu() {
    navLinks.classList.add('open');
    overlay.classList.add('active');
    document.body.classList.add('menu-open');
  }

  function closeMenu() {
    navLinks.classList.remove('open');
    overlay.classList.remove('active');
    document.body.classList.remove('menu-open');
    // Close all mobile dropdowns
    document.querySelectorAll('.nav-dropdown.mobile-open').forEach(d => d.classList.remove('mobile-open'));
  }

  if (menuToggle && navLinks) {
    // Hamburger button opens the menu
    menuToggle.addEventListener('click', () => {
      navLinks.classList.contains('open') ? closeMenu() : openMenu();
    });

    // Close button inside the drawer
    const drawerCloseBtn = drawerHeader.querySelector('.mobile-drawer-close');
    if (drawerCloseBtn) {
      drawerCloseBtn.addEventListener('click', closeMenu);
    }

    // Close on overlay tap
    overlay.addEventListener('click', closeMenu);

    // Close when a direct nav link is clicked (not dropdown buttons)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) closeMenu();
      });
    });

    // Mobile dropdown toggle — tap to expand sub-menus
    document.querySelectorAll('.nav-dropdown .dropdown-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          e.stopPropagation();
          const dropdown = btn.closest('.nav-dropdown');
          // Close other dropdowns
          document.querySelectorAll('.nav-dropdown.mobile-open').forEach(d => {
            if (d !== dropdown) d.classList.remove('mobile-open');
          });
          dropdown.classList.toggle('mobile-open');
        }
      });
    });
  }

  // Active Link Highlighter
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-links > a, .nav-links .nav-dropdown > a');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // ─── Hero Carousel Auto-Slide ───
  initHeroCarousel();
  
  // ─── Automatic Marquee Catalogue ───
  initHeroMarquee();

  // ─── Rates Ticker ───
  if (typeof PricingEngine !== 'undefined') {
    PricingEngine.renderRatesTicker('rates-ticker');
  }

  // ─── Admin Panel ───
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('admin') === 'true' && typeof PricingEngine !== 'undefined') {
    const adminContainer = document.getElementById('admin-panel');
    if (adminContainer) {
      adminContainer.style.display = 'block';
      PricingEngine.renderAdminPanel('admin-panel');
    }
  }
});

// ─── Hero Marquee Catalogue ───
function initHeroMarquee() {
  const container = document.getElementById('hero-marquee');
  if (!container || typeof products === 'undefined') return;
  
  // Select 6-8 best products to show in marquee
  const marqueeItems = products.slice(0, 8);
  
  // We duplicate the items to create an infinite loop effect
  const trackItems = [...marqueeItems, ...marqueeItems];
  
  const trackHTML = trackItems.map(p => `
    <a href="product.html?id=${p.id}" class="marquee-item">
      <img src="${p.image}" alt="${p.name}">
      <div class="marquee-info">
        <h4>${p.name}</h4>
        <span>₹${getProductPrice(p).totalPrice.toLocaleString('en-IN')}</span>
      </div>
    </a>
  `).join('');
  
  container.innerHTML = `<div class="marquee-track">${trackHTML}</div>`;
}

// ─── Hero Carousel ───
function initHeroCarousel() {
  const carousel = document.querySelector('.hero-carousel');
  if (!carousel) return;

  const slides = carousel.querySelectorAll('.hero-slide');
  const dotsContainer = carousel.querySelector('.carousel-dots');
  if (slides.length <= 1) return;

  let currentSlide = 0;
  let interval;

  // Create dots
  if (dotsContainer) {
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => {
        goToSlide(i);
        resetAutoPlay();
      });
      dotsContainer.appendChild(dot);
    });
  }

  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    const dots = dotsContainer ? dotsContainer.querySelectorAll('.carousel-dot') : [];
    if (dots[currentSlide]) dots[currentSlide].classList.remove('active');

    currentSlide = index;

    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    goToSlide(next);
  }

  function startAutoPlay() {
    interval = setInterval(nextSlide, 4500);
  }

  function resetAutoPlay() {
    clearInterval(interval);
    startAutoPlay();
  }

  startAutoPlay();
}


// Reusable Product Card Generator — with live pricing
function createProductCardHTML(product) {
  const isSaved = Wishlist.has(product.id);
  const isOutOfStock = product.availability === "Out of Stock";

  // Compute live price
  const pricing = getProductPrice(product);
  const formattedPrice = pricing.totalPrice.toLocaleString('en-IN');
  const isGold = product.category === 'Gold';

  return `
    <div class="product-card ${isGold ? 'gold-product' : 'silver-product'}" data-id="${product.id}">
      <div class="product-img-wrap">
        <a href="product.html?id=${product.id}">
          <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
        </a>
        <span class="metal-badge ${isGold ? 'gold-badge' : 'silver-badge'}">${isGold ? 'Gold' : 'Silver'}</span>
        <button 
          class="wishlist-btn ${isSaved ? 'saved' : ''}" 
          onclick="toggleWishlistHandler(${product.id}, this)"
          aria-label="${isSaved ? 'Remove from wishlist' : 'Add to wishlist'}"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>
      <div class="product-info">
        <div class="product-meta">
          <span class="product-category">${product.subcategory}</span>
          ${isOutOfStock ? '<span class="badge-text out-of-stock">Out of Stock</span>' : ''}
        </div>
        <a href="product.html?id=${product.id}">
          <h3 class="product-name">${product.name}</h3>
        </a>
        <div class="product-weight-info">
          <span class="weight-tag">${product.weightGrams}g</span>
          <span class="wastage-tag">Wastage: ${product.wastagePercent}%</span>
        </div>
        <div class="product-price">₹${formattedPrice}</div>
      </div>
    </div>
  `;
}

// Global toggle helper for onclick events on product cards
function toggleWishlistHandler(productId, buttonElement) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const isAdded = Wishlist.toggle(product);
  const svg = buttonElement.querySelector('svg');

  if (isAdded) {
    buttonElement.classList.add('saved');
    svg.setAttribute('fill', 'currentColor');
  } else {
    buttonElement.classList.remove('saved');
    svg.setAttribute('fill', 'none');
    
    // If we are currently on the wishlist page, refresh the listing immediately
    if (window.location.pathname.endsWith('wishlist.html')) {
      const card = buttonElement.closest('.wishlist-item-wrapper') || buttonElement.closest('.product-card');
      if (card) {
        card.remove();
        // Check if wishlist is now empty
        const remaining = Wishlist.get();
        if (remaining.length === 0) {
          location.reload();
        }
      }
    }
  }
}
