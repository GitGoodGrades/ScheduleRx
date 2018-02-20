<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include_once '../config/database.php';
include_once '../models/Room.php';

$database = new Database();
$db = $database->getConnection();
$Room = new Room($db);

$Room->Room_ID = isset($_GET['Room_ID']) ? $_GET['Room_ID'] : die();
$Room->Detail();
$RoomInfo = array(
    "Room_ID" =>  $Room->Room_ID,
    "ROOM_DESCRIPTION" => $Room->ROOM_DESCRIPTION,
    "CAPACITY" => $Room->CAPACITY
);

print_r(json_encode($RoomInfo));
