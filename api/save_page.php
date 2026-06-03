<?php
/**
 * Mahadev Jewellers — Super Admin Page Editor Save API
 * ----------------------------------------------------
 * Receives CSS structural selectors and updated HTML content from the frontend,
 * parses and applies the updates to the corresponding page HTML, and saves it.
 */

// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, X-Admin-User, X-Admin-Pass");
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Function helper to get request headers in various environments
if (!function_exists('getallheaders')) {
    function getallheaders() {
        $headers = [];
        foreach ($_SERVER as $name => $value) {
            if (substr($name, 0, 5) == 'HTTP_') {
                $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
            }
        }
        return $headers;
    }
}

// Extract authentication headers
$headers = getallheaders();
$authUser = isset($headers['X-Admin-User']) ? $headers['X-Admin-User'] : '';
$authPass = isset($headers['X-Admin-Pass']) ? $headers['X-Admin-Pass'] : '';

if (empty($authUser)) {
    $authUser = isset($_SERVER['HTTP_X_ADMIN_USER']) ? $_SERVER['HTTP_X_ADMIN_USER'] : '';
}
if (empty($authPass)) {
    $authPass = isset($_SERVER['HTTP_X_ADMIN_PASS']) ? $_SERVER['HTTP_X_ADMIN_PASS'] : '';
}

// Validate Super Admin credentials
$SUPER_USER = 'superadmin';
$SUPER_PASS = 'developer';

if ($authUser !== $SUPER_USER || $authPass !== $SUPER_PASS) {
    http_response_code(401);
    header('Content-Type: application/json');
    echo json_encode(["error" => "Unauthorized access. Only Super Admin can edit page content."]);
    exit;
}

// Process POST request input
$input = json_decode(file_get_contents('php://input'), true);
if (!$input || !isset($input['page']) || !isset($input['changes'])) {
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode(["error" => "Invalid request payload. Page and changes array are required."]);
    exit;
}

$page = basename($input['page']);
$allowed_pages = ['index.html', 'about.html', 'contact.html', 'faq.html', 'shop.html', 'terms.html', 'wishlist.html', 'product.html'];

if (!in_array($page, $allowed_pages)) {
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode(["error" => "Invalid target page name."]);
    exit;
}

$filePath = __DIR__ . '/../' . $page;
if (!file_exists($filePath)) {
    http_response_code(404);
    header('Content-Type: application/json');
    echo json_encode(["error" => "Target page file does not exist."]);
    exit;
}

// Create a backup file (.bak) before modifying
copy($filePath, $filePath . '.bak');

// Read current HTML content
$htmlContent = file_get_contents($filePath);

// Set up DOMDocument for parsing UTF-8 HTML
$doc = new DOMDocument();
libxml_use_internal_errors(true);
$doc->loadHTML('<?xml encoding="UTF-8">' . $htmlContent, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
$xpath = new DOMXPath($doc);

$changes = $input['changes'];
$updatedCount = 0;

foreach ($changes as $change) {
    if (!isset($change['selector']) || !isset($change['newHTML'])) {
        continue;
    }
    
    $selector = $change['selector'];
    $newHTML = $change['newHTML'];
    
    // Convert CSS Selector Path into XPath Query
    // Example: html:nth-of-type(1) > body:nth-of-type(1) > main:nth-of-type(1) -> /html[1]/body[1]/main[1]
    $steps = explode(' > ', $selector);
    $xpathSteps = [];
    foreach ($steps as $step) {
        if (preg_match('/^([a-zA-Z0-9\-]+):nth-of-type\((\d+)\)$/', $step, $matches)) {
            $tag = $matches[1];
            $index = $matches[2];
            $xpathSteps[] = "{$tag}[{$index}]";
        } else {
            $xpathSteps[] = $step;
        }
    }
    $xpathQuery = '/' . implode('/', $xpathSteps);
    
    $elements = $xpath->query($xpathQuery);
    if ($elements->length > 0) {
        $element = $elements->item(0);
        
        // Parse the new HTML content using a temporary document to handle encoding and structural nesting
        $tempDoc = new DOMDocument();
        libxml_use_internal_errors(true);
        $tempDoc->loadHTML('<?xml encoding="UTF-8"><div>' . $newHTML . '</div>', LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
        $importNode = $doc->importNode($tempDoc->documentElement, true);
        
        // Clear all current children of the element
        while ($element->hasChildNodes()) {
            $element->removeChild($element->firstChild);
        }
        
        // Append all imported child nodes to the element
        while ($importNode->hasChildNodes()) {
            $element->appendChild($importNode->firstChild);
        }
        $updatedCount++;
    }
}

// Generate HTML output
$htmlOutput = $doc->saveHTML();
// Remove the XML encoding prefix
$htmlOutput = str_replace('<?xml encoding="UTF-8">', '', $htmlOutput);

// Write back to file
if (file_put_contents($filePath, $htmlOutput)) {
    header('Content-Type: application/json');
    echo json_encode(["success" => true, "updated" => $updatedCount]);
} else {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(["error" => "Failed to save modifications to $page."]);
}
exit;
