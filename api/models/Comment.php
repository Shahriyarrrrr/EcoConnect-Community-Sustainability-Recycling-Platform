<?php
require_once __DIR__ . "/../config/db.php";

class Comment {
    public static function create($item_id,$user_id,$text){
        $db = DB::connect();
        $stmt = $db->prepare("INSERT INTO comments (item_id,user_id,text) VALUES (?,?,?)");
        $stmt->bind_param("iis", $item_id,$user_id,$text);
        return $stmt->execute();
    }

    public static function list($item_id){
        $db = DB::connect();
        $stmt = $db->prepare("
            SELECT c.*, u.name, u.avatar 
            FROM comments c 
            JOIN users u ON c.user_id=u.id 
            WHERE item_id=? 
            ORDER BY c.id DESC
        ");
        $stmt->bind_param("i",$item_id);
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }
}
