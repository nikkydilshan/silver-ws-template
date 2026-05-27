import os
import re

directory = r'c:\Users\Akshith\Downloads\silver-ws-template-1-main\silver-ws-template-1-main'
html_files = [
    'index.html', 'about.html', 'contact.html', 'faq.html', 
    'shop.html', 'terms.html', 'wishlist.html', 'product.html'
]

def get_active_class(filename, current_page):
    return 'class="active"' if filename == current_page else ''

for file in html_files:
    filepath = os.path.join(directory, file)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace Navdurga with Mahadev
    content = content.replace('Navdurga', 'Mahadev')
    
    # Replace Logo SVG letter N with M
    content = re.sub(
        r'<text x="1" y="27"[^>]+>N</text>', 
        r'<text x="1" y="27" font-family="\'Playfair Display\', \'Georgia\', serif" font-size="21" font-weight="900" fill="url(#logoGold)">M</text>', 
        content
    )
    content = re.sub(
        r'<text x="1" y="27"[^>]+fill="url\(#logoGoldFooter\)">N</text>', 
        r'<text x="1" y="27" font-family="\'Playfair Display\', \'Georgia\', serif" font-size="21" font-weight="900" fill="url(#logoGoldFooter)">M</text>', 
        content
    )
    
    # New Nav Links
    active_page = file if file in ['index.html', 'shop.html', 'about.html', 'contact.html'] else ''
    
    new_nav_links = f'''<div class="nav-links">
        <a href="index.html" {get_active_class('index.html', active_page)}>Home</a>
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
        <a href="shop.html" {get_active_class('shop.html', active_page)}>Shop All</a>
        <a href="about.html" {get_active_class('about.html', active_page)}>Our Legacy</a>
        <a href="contact.html" {get_active_class('contact.html', active_page)}>Contact Us</a>
      </div>'''
      
    content = re.sub(r'<div class="nav-links">[\s\S]*?</div>', new_nav_links, content)
    
    # Add Pricing Ticker after </nav>
    if '<div id="rates-ticker" class="rates-ticker"></div>' not in content:
        content = content.replace('</nav>', '</nav>\n\n  <!-- Rates Ticker -->\n  <div id="rates-ticker" class="rates-ticker"></div>')
        
    # Include pricing.js script before products.js or wishlist.js
    if 'pricing.js' not in content:
        content = content.replace('<script src="js/products.js"></script>', '<script src="js/pricing.js"></script>\n  <script src="js/products.js"></script>')
        if 'products.js' not in content:
            content = content.replace('<script src="js/wishlist.js"></script>', '<script src="js/pricing.js"></script>\n  <script src="js/wishlist.js"></script>')
            
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("HTML files updated successfully via Python.")
