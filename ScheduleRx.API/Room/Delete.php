<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once '../config/database.php';
include  '../SuperCRUD/Delete.php';


$database = new Database();
$conn = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));


echo DeleteRecord('room',"ROOM_ID", $data->ROOM_ID, $conn );
echo DeleteRecord('room_capabilities',"ROOM_ID", $data->ROOM_ID, $conn );