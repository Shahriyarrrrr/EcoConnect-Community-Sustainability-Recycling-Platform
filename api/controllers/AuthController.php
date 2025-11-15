<?php
require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../helpers/jwt.php';

class AuthController {

    public static function handle($method) {

        if ($method === "POST") {

            $action = $_GET['action'] ?? null;

            if ($action === "register") {
                self::register();
                return;
            }

            if ($action === "login") {
                self::login();
                return;
            }
        }

        echo json_encode(["error" => "Invalid Auth endpoint or method"]);
    }

    private static function register() {

        $data = json_decode(file_get_contents("php://input"), true);

        if (!$data['email'] || !$data['password'] || !$data['name']) {
            echo json_encode(["error" => "Missing required fields"]);
            return;
        }

        if (User::findByEmail($data['email'])) {
            echo json_encode(["error" => "Email already exists"]);
            return;
        }

        $insert = User::create([
            "name" => $data['name'],
            "email" => $data['email'],
            "password" => password_hash($data['password'], PASSWORD_DEFAULT),
            "role" => "resident",
            "city" => $data['city'] ?? "",
            "avatar" => "",
            "lat" => 0,
            "lng" => 0
        ]);

        echo json_encode(["success" => $insert]);
    }

    private static function login() {

        $data = json_decode(file_get_contents("php://input"), true);

        $user = User::findByEmail($data['email']);

        if (!$user) {
            echo json_encode(["error" => "User not found"]);
            return;
        }

        if (!password_verify($data['password'], $user['password'])) {
            echo json_encode(["error" => "Invalid credentials"]);
            return;
        }

        $token = JWT::encode([
            "id" => $user['id'],
            "email" => $user['email'],
            "role" => $user['role'],
            "iat" => time(),
            "exp" => time() + (60*60*24) // 24 hours
        ]);

        echo json_encode([
            "token" => $token,
            "user" => $user
        ]);
    }
}
