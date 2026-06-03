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

// ─── Super Admin Website Text Editor ───
(function initSuperAdminEditor() {
  const user = sessionStorage.getItem('mahadev_admin_user');
  const pass = sessionStorage.getItem('mahadev_admin_pass');
  if (user !== 'superadmin' || pass !== 'developer') {
    return;
  }

  // Inject floating editor bar after DOM load
  document.addEventListener('DOMContentLoaded', () => {
    const pagePath = window.location.pathname.split('/').pop() || 'index.html';
    if (pagePath === 'admin.html') return;

    const bar = document.createElement('div');
    bar.id = 'superadmin-editor-bar';
    bar.className = 'superadmin-editor-bar';
    bar.innerHTML = `
      <div class="superadmin-editor-title">Super Admin Editor Mode: ${pagePath}</div>
      <div class="superadmin-editor-btn-group">
        <button id="superadmin-edit-toggle" class="superadmin-editor-btn edit-toggle">Enable Edit</button>
        <button id="superadmin-save-btn" class="superadmin-editor-btn save" disabled>Save Changes</button>
        <button id="superadmin-cancel-btn" class="superadmin-editor-btn cancel">Cancel</button>
        <a href="admin.html" class="superadmin-editor-btn dashboard-back" style="background-color: #c5a059; color: #181715; border: 1px solid #c5a059; text-decoration: none; display: inline-flex; align-items: center; justify-content: center;">Back to Dashboard</a>
      </div>
    `;
    document.body.appendChild(bar);

    // Prevent content from being hidden behind bar at the bottom
    document.body.style.paddingBottom = '80px';

    let editModeActive = false;
    let pendingChanges = {};

    const editToggleBtn = document.getElementById('superadmin-edit-toggle');
    const saveBtn = document.getElementById('superadmin-save-btn');
    const cancelBtn = document.getElementById('superadmin-cancel-btn');
    const backBtn = bar.querySelector('.dashboard-back');

    backBtn.addEventListener('click', (e) => {
      if (Object.keys(pendingChanges).length > 0) {
        if (!confirm('You have unsaved changes. Are you sure you want to go back to the dashboard?')) {
          e.preventDefault();
        }
      }
    });

    editToggleBtn.addEventListener('click', () => {
      editModeActive = !editModeActive;
      if (editModeActive) {
        editToggleBtn.textContent = 'Disable Edit';
        editToggleBtn.classList.add('active');
        enableEditing();
      } else {
        editToggleBtn.textContent = 'Enable Edit';
        editToggleBtn.classList.remove('active');
        disableEditing();
      }
    });

    cancelBtn.addEventListener('click', () => {
      if (Object.keys(pendingChanges).length > 0) {
        if (confirm('Discard all unsaved edits?')) {
          location.reload();
        }
      } else {
        location.reload();
      }
    });

    saveBtn.addEventListener('click', async () => {
      const changesArray = Object.keys(pendingChanges).map(selector => ({
        selector: selector,
        newHTML: pendingChanges[selector]
      }));

      if (changesArray.length === 0) return;

      saveBtn.disabled = true;
      saveBtn.textContent = 'Saving...';

      try {
        const response = await fetch('api/save_page.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Admin-User': user,
            'X-Admin-Pass': pass
          },
          body: JSON.stringify({
            page: pagePath,
            changes: changesArray
          })
        });

        const data = await response.json();
        if (data.success) {
          alert(`Successfully saved ${data.updated} changes to ${pagePath}!`);
          pendingChanges = {};
          saveBtn.disabled = true;
          saveBtn.textContent = 'Save Changes';
          location.reload();
        } else {
          alert('Error saving changes: ' + (data.error || 'Unknown error'));
          saveBtn.disabled = false;
          saveBtn.textContent = 'Save Changes';
        }
      } catch (err) {
        alert('Network error while saving changes: ' + err.message);
        saveBtn.disabled = false;
        saveBtn.textContent = 'Save Changes';
      }
    });

    function getElementPath(el) {
      let path = [];
      while (el && el.nodeType === Node.ELEMENT_NODE) {
        let nodeName = el.nodeName.toLowerCase();
        let sibling = el;
        let index = 1;
        while (sibling = sibling.previousElementSibling) {
          if (sibling.nodeName === el.nodeName) {
            index++;
          }
        }
        path.unshift(`${nodeName}:nth-of-type(${index})`);
        el = el.parentNode;
      }
      return path.join(' > ');
    }

    function handleElementBlur(event) {
      const el = event.target;
      const newHTML = el.innerHTML;
      const originalHTML = el.dataset.originalHtml;

      if (newHTML !== originalHTML) {
        const path = getElementPath(el);
        pendingChanges[path] = newHTML;
        saveBtn.disabled = false;
      }
    }

    function enableEditing() {
      const tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'a', 'li', 'button', 'td', 'th', 'label', 'figcaption'];
      const elements = document.querySelectorAll(tags.join(','));

      elements.forEach(el => {
        // Exclude elements inside the editor controls itself
        if (el.closest('#superadmin-editor-bar')) return;
        
        // Exclude dynamic database-driven components
        if (el.closest('.product-card') || el.closest('.marquee-item') || el.closest('.wishlist-item-wrapper') || el.closest('.stat-card') || el.closest('.admin-modal') || el.closest('.rates-ticker') || el.closest('#rates-ticker')) return;

        // Skip logo/svg links that don't represent clear text
        if (el.tagName === 'A' && el.classList.contains('logo')) return;
        if (el.querySelector('svg') && el.children.length === 1 && el.textContent.trim() === '') return;
        if (el.classList.contains('nav-icon')) return;

        if (!el.dataset.originalHtml) {
          el.dataset.originalHtml = el.innerHTML;
        }

        el.contentEditable = 'true';
        el.classList.add('superadmin-editable');
        el.addEventListener('blur', handleElementBlur);
      });
    }

    function disableEditing() {
      const editables = document.querySelectorAll('.superadmin-editable');
      editables.forEach(el => {
        el.contentEditable = 'false';
        el.classList.remove('superadmin-editable');
        el.removeEventListener('blur', handleElementBlur);
      });
    }
  });
})();
