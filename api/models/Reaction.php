<?php
require_once __DIR__ . "/../config/db.php";

class Reaction {
    public static function add($item_id,$user_id,$type){
        $db = DB::connect();

        // Remove previous reaction
        $stmt = $db->prepare("DELETE FROM reactions WHERE item_id=? AND user_id=?");
        $stmt->bind_param("ii",$item_id,$user_id);
        $stmt->execute();

        // Add new
        $stmt = $db->prepare("INSERT INTO reactions (item_id,user_id,type) VALUES (?,?,?)");
        $stmt->bind_param("iis", $item_id,$user_id,$type);
        return $stmt->execute();
    }

    public static function summary($item_id){
        $db = DB::connect();
        $stmt = $db->prepare("
            SELECT type, COUNT(*) as total 
            FROM reactions 
            WHERE item_id=? 
            GROUP BY type
        ");
        $stmt->bind_param("i",$item_id);
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }
}
