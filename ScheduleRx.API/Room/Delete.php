<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once '../config/database.php';
include  '../SuperCRUD/Delete.php';
include_once '../config/LogHandler.php';

$database = new Database();
$conn = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));
$log = Logger::getLogger("RoomDeleteLog");

$roomResponse =  DeleteRecord('room',"ROOM_ID", $data->ROOM_ID, $conn );
$roomCapResponse = DeleteRecord('room_capabilities',"ROOM_ID", $data->ROOM_ID, $conn );

echo $roomResponse;
echo $roomCapResponse;

if ($roomResponse != null) {
    $log->info($roomResponse);
}
else {
    $log->info("Room Deletion Failed");
}

if ($roomCapResponse != null) {
    $log->info($roomCapResponse);
}
else {
    $log->info("Room_Capability Association Deletion Failed");
}