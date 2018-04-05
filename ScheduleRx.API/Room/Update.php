<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once  '../SuperCRUD/Update.php';
include_once  '../SuperCRUD/Delete.php';
include_once  '../SuperCRUD/Create.php';
include_once  'GetRoomDetail.php';
include_once '../config/LogHandler.php';

$database = new Database();
$conn = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));
$log = Logger::getLogger("RoomUpdateLog");

if($data->CAPABILITIES) {
    $log->info(DeleteRecord('room_capabilities', 'ROOM_ID', $data->ROOM_ID, $conn));
    foreach ($data->CAPABILITIES as $capInt) {
        $newAssoc = array( "ROOM_ID" => $data->ROOM_ID, "CAPABILITY_ID" =>$capInt);
        $log->info(CreateRecord('room_capabilities',$newAssoc, $conn));
    }
}
unset($data->CAPABILITIES);

$update = UpdateRecord('room',$data, 'ROOM_ID', $conn);
$log->info($update);
echo $update;
