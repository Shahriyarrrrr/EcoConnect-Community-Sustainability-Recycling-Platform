<?php
require_once __DIR__ . "/../config/db.php";

class Item {
    public static function create($data){
        $db = DB::connect();
        $stmt = $db->prepare(
            "INSERT INTO items (user_id,title,category,quantity,description,city,lat,lng) 
            VALUES (?,?,?,?,?,?,?,?)"
        );
        $stmt->bind_param("issssddd",
            $data['user_id'],
            $data['title'],
            $data['category'],
            $data['quantity'],
            $data['description'],
            $data['city'],
            $data['lat'],
            $data['lng']
        );
        return $stmt->execute();
    }

    public static function list(){
        $db = DB::connect();
        $res = $db->query("SELECT * FROM items ORDER BY id DESC");
        return $res->fetch_all(MYSQLI_ASSOC);
    }
}
