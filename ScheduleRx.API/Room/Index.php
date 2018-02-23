<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../models/Course.php';

$database = new Database();
$db = $database->getConnection();

$query = "SELECT * FROM room ORDER BY ROOM_ID DESC";

$stmt = $db->prepare($query);
$stmt->execute();
$num = $stmt->rowCount();

if($num>0){
    $roomList=array();
    $roomList["records"]=array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        array_push($roomList["records"], $row);
    }
    echo json_encode($roomList);
}
else{
    echo json_encode(
        array("message" => "No rooms found.")
    );
}
