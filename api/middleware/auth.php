<?php
require_once __DIR__ . '/../helpers/jwt.php';

class AuthMiddleware {

    public static function verify() {
        $headers = getallheaders();
        $token = $headers['Authorization'] ?? "";

        if (!$token) {
            echo json_encode(["error" => "No token provided"]);
            exit;
        }

        $payload = JWT::decode($token);

        if (!$payload) {
            echo json_encode(["error" => "Invalid or expired token"]);
            exit;
        }

        return $payload;
    }
}
