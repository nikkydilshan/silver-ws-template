// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      menuToggle.innerHTML = isOpen 
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
    });
  }

  // Active Link Highlighter
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-links a');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

// Reusable Product Card Generator
function createProductCardHTML(product) {
  const isSaved = Wishlist.has(product.id);
  const formattedPrice = product.price.toLocaleString('en-IN');
  const isOutOfStock = product.availability === "Out of Stock";

  return `
    <div class="product-card" data-id="${product.id}">
      <div class="product-img-wrap">
        <a href="product.html?id=${product.id}">
          <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
        </a>
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
