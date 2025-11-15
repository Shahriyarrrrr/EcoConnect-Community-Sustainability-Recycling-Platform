<?php
class DB {
    private static $conn;

    public static function connect() {
        if (!self::$conn) {
            self::$conn = new mysqli("localhost", "root", "", "ecoconnect");

            if (self::$conn->connect_error) {
                die(json_encode(["error" => "DB connection failed"]));
            }
        }
        return self::$conn;
    }
}
