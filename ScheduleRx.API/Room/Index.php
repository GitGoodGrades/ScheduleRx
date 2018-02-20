<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../models/Room.php';

$database = new Database();
$db = $database->getConnection();
$Room = new Room($db);
$stmt = $Room->Index();
$num = $stmt->rowCount();

if($num>0){
    $RoomList=array();
    $RoomList["records"]=array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $RoomItem=array(
            "ROOM_ID" => $ROOM_ID,
            "ROOM_DESCRIPTION" => $ROOM_DESCRIPTION,
            "CAPACITY" => $CAPACITY
        );
        array_push($RoomList["records"], $RoomItem);
    }
    echo json_encode($RoomList);
}
else{
    echo json_encode(
        array("message" => "No Room found.")
    );
}
