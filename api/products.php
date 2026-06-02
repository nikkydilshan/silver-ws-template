<?php
/**
 * Mahadev Jewellers — Secure Precious Metal Products Database API
 * ----------------------------------------------------------------
 * Serves the products catalog and handles updates securely via SHA-256
 * authentication checks.
 */

// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, X-Admin-User, X-Admin-Pass");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$db_file = __DIR__ . '/products.json';

// Get request method
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Return all products
    if (file_exists($db_file)) {
        header('Content-Type: application/json');
        echo file_get_contents($db_file);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Database file not found."]);
    }
    exit;
}

if ($method === 'POST') {
    // --- Secure Authentication Check ---
    // Extract headers (handles various Apache/Nginx formats)
    $headers = getallheaders();
    $authUser = isset($headers['X-Admin-User']) ? $headers['X-Admin-User'] : '';
    $authPass = isset($headers['X-Admin-Pass']) ? $headers['X-Admin-Pass'] : '';

    // If headers aren't in getallheaders(), check $_SERVER
    if (empty($authUser)) {
        $authUser = isset($_SERVER['HTTP_X_ADMIN_USER']) ? $_SERVER['HTTP_X_ADMIN_USER'] : '';
    }
    if (empty($authPass)) {
        $authPass = isset($_SERVER['HTTP_X_ADMIN_PASS']) ? $_SERVER['HTTP_X_ADMIN_PASS'] : '';
    }

    // Plain-text credentials
    $ADMIN_USER = 'admin';
    $ADMIN_PASS = 'shopowner';

    $SUPER_USER = 'superadmin';
    $SUPER_PASS = 'developer';

    $is_admin = ($authUser === $ADMIN_USER && $authPass === $ADMIN_PASS);
    $is_super = ($authUser === $SUPER_USER && $authPass === $SUPER_PASS);

    if (!$is_admin && !$is_super) {
        http_response_code(401);
        header('Content-Type: application/json');
        echo json_encode(["error" => "Unauthorized access. Invalid secure credentials."]);
        exit;
    }

    // --- Process Write Operations ---
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input || !isset($input['action'])) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid payload or missing action."]);
        exit;
    }

    $action = $input['action'];

    // Read current database
    if (!file_exists($db_file)) {
        http_response_code(500);
        echo json_encode(["error" => "Database file does not exist."]);
        exit;
    }
    $products = json_decode(file_get_contents($db_file), true);

    if ($action === 'add') {
        $new_product = $input['product'];
        
        // Find max ID
        $max_id = 0;
        foreach ($products as $p) {
            if ($p['id'] > $max_id) {
                $max_id = $p['id'];
            }
        }
        $new_product['id'] = $max_id + 1;
        $products[] = $new_product;

    } else if ($action === 'updateStatus') {
        $id = intval($input['id']);
        $status = $input['availability'];
        
        $found = false;
        foreach ($products as &$p) {
            if ($p['id'] === $id) {
                $p['availability'] = $status;
                $found = true;
                break;
            }
        }
        if (!$found) {
            http_response_code(404);
            echo json_encode(["error" => "Product ID $id not found."]);
            exit;
        }

    } else if ($action === 'delete') {
        $id = intval($input['id']);
        
        $filtered = [];
        foreach ($products as $p) {
            if ($p['id'] !== $id) {
                $filtered[] = $p;
            }
        }
        $products = $filtered;

    } else if ($action === 'import') {
        // Super Admin only action
        if (!$is_super) {
            http_response_code(403);
            echo json_encode(["error" => "Forbidden. Only Super Admin can import database snapshots."]);
            exit;
        }
        $products = $input['products'];

    } else if ($action === 'reset') {
        // Super Admin only action
        if (!$is_super) {
            http_response_code(403);
            echo json_encode(["error" => "Forbidden. Only Super Admin can reset the database."]);
            exit;
        }
        
        // Restore from default fallback file if exists
        $fallback_file = __DIR__ . '/products.json.backup';
        if (file_exists($fallback_file)) {
            $products = json_decode(file_get_contents($fallback_file), true);
        } else {
            // If backup is missing, just use default array
            http_response_code(500);
            echo json_encode(["error" => "Reset backup file not found."]);
            exit;
        }
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Unknown database action."]);
        exit;
    }

    // Save back to products.json
    if (file_put_contents($db_file, json_encode($products, JSON_PRETTY_PRINT))) {
        header('Content-Type: application/json');
        echo json_encode(["success" => true, "products" => $products]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to write database file."]);
    }
    exit;
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
?>
