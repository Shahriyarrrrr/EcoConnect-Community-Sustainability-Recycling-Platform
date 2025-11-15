<?php
require_once __DIR__ . "/../config/db.php";

class Recycler {
    public static function profile($user_id){
        $db = DB::connect();
        $stmt = $db->prepare("SELECT * FROM recyclers WHERE user_id=?");
        $stmt->bind_param("i",$user_id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }
}
