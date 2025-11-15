<?php
require_once __DIR__ . "/../config/db.php";

class User {
    public static function create($data) {
        $db = DB::connect();
        $stmt = $db->prepare("INSERT INTO users (name,email,password,role,city,avatar,lat,lng) VALUES (?,?,?,?,?,?,?,?)");
        $stmt->bind_param("ssssssdd", 
            $data['name'], 
            $data['email'], 
            $data['password'], 
            $data['role'], 
            $data['city'], 
            $data['avatar'],
            $data['lat'], 
            $data['lng']
        );
        return $stmt->execute();
    }

    public static function findByEmail($email){
        $db = DB::connect();
        $stmt = $db->prepare("SELECT * FROM users WHERE email=?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public static function findById($id){
        $db = DB::connect();
        $stmt = $db->prepare("SELECT * FROM users WHERE id=?");
        $stmt->bind_param("i",$id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }
}
