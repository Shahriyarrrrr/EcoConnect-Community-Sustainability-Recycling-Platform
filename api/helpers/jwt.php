<?php

class JWT {

    public static $secret = "ECOCONNECT_SUPER_SECRET_KEY_2025";

    public static function encode($payload) {
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
        $payload = json_encode($payload);

        $header = self::base64url_encode($header);
        $payload = self::base64url_encode($payload);

        $signature = hash_hmac('sha256', "$header.$payload", self::$secret, true);
        $signature = self::base64url_encode($signature);

        return "$header.$payload.$signature";
    }

    public static function decode($token) {
        $parts = explode(".", $token);
        if (count($parts) !== 3) return false;

        list($header, $payload, $signature) = $parts;

        $verify = self::base64url_encode(
            hash_hmac('sha256', "$header.$payload", self::$secret, true)
        );

        if ($verify !== $signature) return false;

        return json_decode(self::base64url_decode($payload), true);
    }

    private static function base64url_encode($data) {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    private static function base64url_decode($data) {
        return base64_decode(strtr($data, '-_', '+/'));
    }
}
