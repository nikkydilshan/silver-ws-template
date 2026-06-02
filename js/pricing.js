/**
 * Mahadev Jewellers — Precious Metal Pricing Engine
 * ---------------------------------------------------
 * This module manages daily gold & silver rates, and computes
 * ornament prices using the industry-standard formula:
 *
 *   Ornament Price = (Metal Weight in grams × Rate per gram)
 *                    + (Metal Weight × Rate per gram × Wastage%)
 *                    + Making Charges (flat)
 *
 * Rates are stored in localStorage and refresh once per day.
 * An admin panel (accessible via ?admin=true) lets the store
 * owner update rates manually.
 */

const PricingEngine = (() => {

  // ─── Default Base Rates (₹ per gram) ───
  const DEFAULT_RATES = {
    gold_24k: 7450,    // Pure 24K gold per gram
    gold_22k: 6830,    // 22K gold per gram (jewellery standard)
    gold_18k: 5590,    // 18K gold per gram
    silver_999: 96,    // 999 fine silver per gram
    silver_925: 89,    // 925 sterling silver per gram
  };

  const STORAGE_KEY = 'mahadev_metal_rates';

  // ─── Rate Persistence ───
  function _loadRates() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Check if rates are from today
        const today = new Date().toDateString();
        if (parsed._date === today) {
          return parsed;
        }
      }
    } catch (e) { /* ignore */ }
    return null;
  }

  function _saveRates(rates) {
    rates._date = new Date().toDateString();
    rates._timestamp = Date.now();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rates));
  }

  function getRates() {
    const cached = _loadRates();
    if (cached) return cached;
    // First load — seed with defaults
    const fresh = { ...DEFAULT_RATES };
    _saveRates(fresh);
    return fresh;
  }

  function updateRate(key, value) {
    const rates = getRates();
    if (key in DEFAULT_RATES) {
      rates[key] = parseFloat(value);
      _saveRates(rates);
    }
  }

  function resetRates() {
    const fresh = { ...DEFAULT_RATES };
    _saveRates(fresh);
    return fresh;
  }

  // ─── Price Computation ───
  /**
   * @param {object} opts
   * @param {number} opts.weightGrams      — net weight of the ornament
   * @param {string} opts.metalType        — key in rate table, e.g. 'gold_22k'
   * @param {number} opts.wastagePercent   — e.g. 12 means 12%
   * @param {number} [opts.makingCharges]  — optional flat making charge
   * @returns {object} { metalCost, wastageCost, makingCharges, totalPrice, ratePerGram }
   */
  function computePrice(opts) {
    const rates = getRates();
    const ratePerGram = rates[opts.metalType] || 0;
    const metalCost = opts.weightGrams * ratePerGram;
    const wastageCost = metalCost * (opts.wastagePercent / 100);
    const making = opts.makingCharges || 0;
    const totalPrice = metalCost + wastageCost + making;

    return {
      ratePerGram,
      metalCost: Math.round(metalCost),
      wastageCost: Math.round(wastageCost),
      makingCharges: making,
      totalPrice: Math.round(totalPrice),
    };
  }

  // ─── Helper: Format Currency ───
  function formatINR(amount) {
    return '₹' + amount.toLocaleString('en-IN');
  }

  // ─── Rate Labels for UI ───
  const RATE_LABELS = {
    gold_24k: '24K Pure Gold',
    gold_22k: '22K Gold (Jewellery)',
    gold_18k: '18K Gold',
    silver_999: '999 Fine Silver',
    silver_925: '925 Sterling Silver',
  };

  // ─── Live Rates Banner Renderer ───
  function renderRatesTicker(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;

    const rates = getRates();
    const items = [
      { label: '22K Gold', value: rates.gold_22k, unit: '/g', icon: '🥇' },
      { label: '24K Gold', value: rates.gold_24k, unit: '/g', icon: '✦' },
      { label: 'Silver 925', value: rates.silver_925, unit: '/g', icon: '🥈' },
      { label: 'Silver 999', value: rates.silver_999, unit: '/g', icon: '◆' },
    ];

    const dateStr = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

    el.innerHTML = `
      <div class="rates-ticker-inner">
        ${items.map(i => `
          <span class="ticker-item">
            <span class="ticker-icon">${i.icon}</span>
            <span class="ticker-label">${i.label}:</span>
            <span class="ticker-value">${formatINR(i.value)}${i.unit}</span>
          </span>
        `).join('<span class="ticker-divider">|</span>')}
        <span class="ticker-divider">|</span>
        <span class="ticker-date">Updated: ${dateStr}</span>
        <span class="ticker-warning" data-tooltip="Prices fluctuate daily. Refresh the page to see live prices.">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg> Live Rates
        </span>
      </div>
    `;
  }

  // ─── Free Auto-Fetch API Integration ───
  // Uses a free public CDN for currency rates (Updates once every 24 hours)
  async function fetchLiveRates() {
    try {
      // Fetch Global Gold (XAU) and Silver (XAG) Spot Prices in INR
      const [goldRes, silverRes] = await Promise.all([
        fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/xau.json'),
        fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/xag.json')
      ]);
      
      const goldData = await goldRes.json();
      const silverData = await silverRes.json();
      
      const troyOunceInGrams = 31.1034768;
      
      // Global spot prices do not include Indian Customs Duty, AIDC, and local bank premiums.
      // We add an approximate 12% markup to match actual retail physical gold/silver prices in India.
      const INDIA_PREMIUM_MULTIPLIER = 1.12; 
      
      // XAU and XAG are priced per Troy Ounce. Convert to per Gram and add India Premium.
      const gold24kGram = (goldData.xau.inr / troyOunceInGrams) * INDIA_PREMIUM_MULTIPLIER;
      const silver999Gram = (silverData.xag.inr / troyOunceInGrams) * INDIA_PREMIUM_MULTIPLIER;
      
      // Update Rates
      const rates = getRates();
      rates.gold_24k = Math.round(gold24kGram);
      rates.gold_22k = Math.round(gold24kGram * 0.9167); // 22K is 91.67% of 24K
      rates.gold_18k = Math.round(gold24kGram * 0.7500); // 18K is 75% of 24K
      rates.silver_999 = Math.round(silver999Gram);
      rates.silver_925 = Math.round(silver999Gram * 0.925); // Sterling is 92.5%
      
      _saveRates(rates);
      
      // Re-render the ticker with the fresh rates
      renderRatesTicker('rates-ticker');
    } catch (error) {
      console.warn("Could not auto-fetch live rates, falling back to cached/default rates.", error);
    }
  }

  // Call the auto-fetch immediately when the script loads
  fetchLiveRates();

  // ─── Admin Panel for Rate Updates ───
  function renderAdminPanel(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;

    const rates = getRates();

    el.innerHTML = `
      <div class="admin-rates-panel">
        <h3 class="playfair">Daily Metal Rates — Admin</h3>
        <p class="admin-subtitle">Update today's rates below. Changes reflect immediately on all product prices.</p>
        <div class="admin-rates-grid">
          ${Object.keys(RATE_LABELS).map(key => `
            <div class="admin-rate-field">
              <label for="rate-${key}">${RATE_LABELS[key]}</label>
              <div class="admin-input-wrap">
                <span class="admin-currency">₹</span>
                <input type="number" id="rate-${key}" value="${rates[key]}" min="0" step="0.01" class="input-control admin-rate-input" data-rate-key="${key}">
                <span class="admin-unit">/gram</span>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="admin-actions">
          <button class="btn btn-primary" id="save-rates-btn">Save Today's Rates</button>
          <button class="btn btn-outline" id="reset-rates-btn">Reset to Defaults</button>
        </div>
        <div class="admin-status" id="admin-status" style="display:none;"></div>
      </div>
    `;

    // Bind events
    document.getElementById('save-rates-btn').addEventListener('click', () => {
      const inputs = el.querySelectorAll('.admin-rate-input');
      inputs.forEach(input => {
        updateRate(input.dataset.rateKey, input.value);
      });
      const status = document.getElementById('admin-status');
      status.style.display = 'block';
      status.className = 'admin-status success';
      status.textContent = '✓ Rates saved successfully! Product prices will update on next page load.';
      setTimeout(() => { status.style.display = 'none'; }, 4000);
    });

    document.getElementById('reset-rates-btn').addEventListener('click', () => {
      const freshRates = resetRates();
      const inputs = el.querySelectorAll('.admin-rate-input');
      inputs.forEach(input => {
        input.value = freshRates[input.dataset.rateKey];
      });
      const status = document.getElementById('admin-status');
      status.style.display = 'block';
      status.className = 'admin-status info';
      status.textContent = 'Rates reset to default values.';
      setTimeout(() => { status.style.display = 'none'; }, 3000);
    });
  }

  return {
    getRates,
    updateRate,
    resetRates,
    computePrice,
    formatINR,
    renderRatesTicker,
    renderAdminPanel,
    RATE_LABELS,
  };

})();
