<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include_once '../config/database.php';
include_once '../config/LogHandler.php';
include_once 'GetRoomDetail.php';

$database = new Database();
$conn = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));

$result = GetRoomDetail($data->ROOM_ID, $conn);
if ($result)
    echo json_encode($result);
else {
    echo null;
}