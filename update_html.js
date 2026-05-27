const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/Akshith/Downloads/silver-ws-template-1-main/silver-ws-template-1-main';
const htmlFiles = [
  'index.html', 'about.html', 'contact.html', 'faq.html', 
  'shop.html', 'terms.html', 'wishlist.html', 'product.html'
];

htmlFiles.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace Navdurga with Mahadev
  content = content.replace(/Navdurga/g, 'Mahadev');

  // Replace Logo SVG letter N with M
  content = content.replace(/<text x="1" y="27"[^>]+>N<\/text>/g, '<text x="1" y="27" font-family="\'Playfair Display\', \'Georgia\', serif" font-size="21" font-weight="900" fill="url(#logoGold)">M</text>');
  content = content.replace(/<text x="1" y="27"[^>]+fill="url\(#logoGoldFooter\)">N<\/text>/g, '<text x="1" y="27" font-family="\'Playfair Display\', \'Georgia\', serif" font-size="21" font-weight="900" fill="url(#logoGoldFooter)">M</text>');

  // Update Nav Links
  const oldNavLinks = /<div class="nav-links">[\s\S]*?<\/div>/;
  const activeClassMatch = content.match(/<a href="([^"]+)"\s*(class="active")?>/g);
  let activePage = '';
  if (file === 'index.html') activePage = 'index.html';
  else if (file === 'shop.html') activePage = 'shop.html';
  else if (file === 'about.html') activePage = 'about.html';
  else if (file === 'contact.html') activePage = 'contact.html';

  const newNavLinks = `<div class="nav-links">
        <a href="index.html" ${activePage === 'index.html' ? 'class="active"' : ''}>Home</a>
        <div class="nav-dropdown">
          <button class="dropdown-btn">Gold <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></button>
          <div class="dropdown-content">
            <a href="shop.html?category=Gold">All Gold</a>
            <a href="shop.html?category=Gold&subcategory=Necklaces">Necklaces</a>
            <a href="shop.html?category=Gold&subcategory=Bangles">Bangles</a>
            <a href="shop.html?category=Gold&subcategory=Earrings">Earrings</a>
          </div>
        </div>
        <div class="nav-dropdown">
          <button class="dropdown-btn">Silver <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></button>
          <div class="dropdown-content">
            <a href="shop.html?category=Silver">All Silver</a>
            <a href="shop.html?category=Silver&subcategory=Pooja%20Idols">Pooja Idols</a>
            <a href="shop.html?category=Silver&subcategory=Pooja%20Diyas">Pooja Diyas</a>
            <a href="shop.html?category=Silver&subcategory=Necklaces">Silver Jewelry</a>
          </div>
        </div>
        <a href="shop.html" ${activePage === 'shop.html' ? 'class="active"' : ''}>Shop All</a>
        <a href="about.html" ${activePage === 'about.html' ? 'class="active"' : ''}>Our Legacy</a>
        <a href="contact.html" ${activePage === 'contact.html' ? 'class="active"' : ''}>Contact Us</a>
      </div>`;
  content = content.replace(oldNavLinks, newNavLinks);

  // Add Pricing Ticker after </nav>
  if (!content.includes('<div id="rates-ticker" class="rates-ticker"></div>')) {
    content = content.replace(/<\/nav>/, '</nav>\n\n  <!-- Rates Ticker -->\n  <div id="rates-ticker" class="rates-ticker"></div>');
  }

  // Include pricing.js script before products.js
  if (!content.includes('pricing.js')) {
    content = content.replace(/<script src="js\/products\.js"><\/script>/, '<script src="js/pricing.js"></script>\n  <script src="js/products.js"></script>');
    if (!content.includes('products.js')) {
        content = content.replace(/<script src="js\/wishlist\.js"><\/script>/, '<script src="js/pricing.js"></script>\n  <script src="js/wishlist.js"></script>');
    }
  }

  fs.writeFileSync(filePath, content);
});

console.log("HTML files updated successfully.");
