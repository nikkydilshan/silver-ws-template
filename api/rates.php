<?php
/**
 * Mahadev Jewellers — Hyderabad Live Metal Rates API
 * ----------------------------------------------------
 * Scrapes live Hyderabad gold & silver rates from GoodReturns.
 * Caches the results to prevent hitting the target server too frequently.
 */

// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$cache_file = __DIR__ . '/rates_cache.json';
$cache_lifetime = 3600; // 1 hour cache

// Helper to scrape HTML and extract ID content
function extract_id_value($url, $id) {
    $options = [
        'http' => [
            'method' => "GET",
            'header' => "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3\r\n"
        ]
    ];
    $context = stream_context_create($options);
    $html = @file_get_contents($url, false, $context);
    if (!$html) {
        return null;
    }
    
    // Pattern to match id="ID" ... >value<
    $pattern = '/id="' . preg_quote($id, '/') . '"[^>]*>(.*?)</si';
    if (preg_match($pattern, $html, $matches)) {
        $val = trim($matches[1]);
        // Remove currency symbols, commas, and entities (e.g., &#x20b9; or ₹)
        $clean = preg_replace('/[^\d\.]/', '', html_entity_decode($val));
        return floatval($clean);
    }
    return null;
}

$rates = null;

// Try loading from cache first
if (file_exists($cache_file) && (time() - filemtime($cache_file) < $cache_lifetime)) {
    $rates = json_decode(file_get_contents($cache_file), true);
}

if (!$rates) {
    // Fetch fresh rates
    $gold_url = "https://www.goodreturns.in/gold-rates/hyderabad.html";
    $silver_url = "https://www.goodreturns.in/silver-rates/hyderabad.html";
    
    $gold_24k = extract_id_value($gold_url, '24K-price');
    $gold_22k = extract_id_value($gold_url, '22K-price');
    $gold_18k = extract_id_value($gold_url, '18K-price');
    $silver_999 = extract_id_value($silver_url, 'silver-1g-price');
    
    if ($gold_24k && $gold_22k && $gold_18k && $silver_999) {
        $rates = [
            "gold_24k" => $gold_24k,
            "gold_22k" => $gold_22k,
            "gold_18k" => $gold_18k,
            "silver_999" => $silver_999,
            "silver_925" => round($silver_999 * 0.925, 2),
            "updated_at" => time()
        ];
        file_put_contents($cache_file, json_encode($rates, JSON_PRETTY_PRINT));
    }
}

// Fallback if scraping failed and cache is empty/stale
if (!$rates) {
    if (file_exists($cache_file)) {
        $rates = json_decode(file_get_contents($cache_file), true);
    } else {
        // Hardcoded June 2026 default fallback values
        $rates = [
            "gold_24k" => 15622,
            "gold_22k" => 14320,
            "gold_18k" => 11717,
            "silver_999" => 290,
            "silver_925" => 268.25,
            "updated_at" => time(),
            "fallback" => true
        ];
    }
}

header('Content-Type: application/json');
echo json_encode($rates);
?>
