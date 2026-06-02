const Wishlist = {
  get() {
    const saved = localStorage.getItem('mahadev_jewellers_wishlist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  },

  set(items) {
    localStorage.setItem('mahadev_jewellers_wishlist', JSON.stringify(items));
    this.updateBadges();
  },

  add(product) {
    const items = this.get();
    if (!items.some(item => item.id === product.id)) {
      items.push(product);
      this.set(items);
    }
  },

  remove(productId) {
    let items = this.get();
    items = items.filter(item => item.id !== productId);
    this.set(items);
  },

  toggle(product) {
    const items = this.get();
    const index = items.findIndex(item => item.id === product.id);
    if (index > -1) {
      items.splice(index, 1);
      this.set(items);
      return false; // Removed
    } else {
      items.push(product);
      this.set(items);
      return true; // Added
    }
  },

  has(productId) {
    const items = this.get();
    return items.some(item => item.id === productId);
  },

  updateBadges() {
    const items = this.get();
    const count = items.length;
    const badges = document.querySelectorAll('.wishlist-badge');
    badges.forEach(badge => {
      badge.textContent = count;
      if (count > 0) {
        badge.style.display = 'flex';
      } else {
        badge.style.display = 'none';
      }
    });
  }
};

// Auto-run badge update when page loads
document.addEventListener('DOMContentLoaded', () => {
  Wishlist.updateBadges();
});
