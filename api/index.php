<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

$method = $_SERVER['REQUEST_METHOD'];

// Get clean URI without query string
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Split into segments
$segments = explode('/', trim($uri, '/'));

// Expected:
// ["EcoConnect", "api", "auth"]

if (!isset($segments[1]) || $segments[1] !== "api") {
    echo json_encode(["error" => "API root not found"]);
    exit;
}

// Extract endpoint (clean, no query string)
$endpoint = $segments[2] ?? null;

require_once "config/db.php";
require_once "controllers/AuthController.php";
require_once "controllers/UserController.php";
require_once "controllers/ItemController.php";
require_once "controllers/CommentController.php";
require_once "controllers/ReactionController.php";
require_once "controllers/RecyclerController.php";
require_once "controllers/AdminController.php";

switch ($endpoint) {

    case "auth":
        AuthController::handle($method);
        break;

    case "users":
        UserController::handle($method);
        break;

    case "items":
        ItemController::handle($method);
        break;

    case "comments":
        CommentController::handle($method);
        break;

    case "reactions":
        ReactionController::handle($method);
        break;

    case "recyclers":
        RecyclerController::handle($method);
        break;

    case "admin":
        AdminController::handle($method);
        break;

    default:
        echo json_encode(["error" => "Unknown endpoint"]);
}
