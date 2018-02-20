<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../models/Room.php';

$database = new Database();
$db = $database->getConnection();

$Room = new Room($db);
$data = json_decode(file_get_contents("php://input"));


$Room->ROOM_ID = $data->ROOM_ID;
$Room->ROOM_DESCRIPTION = $data->ROOM_DESCRIPTION;
$Room->CAPACITY = $data->CAPACITY;

if($Room->Create()){
    echo '{';
    echo '"message": "Room was created."';
    echo '}';
}
else{
    echo '{';
    echo '"message": "Unable to create Room."';
    echo '}';
}