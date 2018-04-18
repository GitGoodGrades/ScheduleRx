<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once $_SERVER['DOCUMENT_ROOT'] . "/ScheduleRx.API/rxapi.php";

$database = new Database();
$conn = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));

if($data->CAPABILITIES) {
    DeleteRecord('room_capabilities', 'ROOM_ID', $data->ROOM_ID, $conn);
    foreach ($data->CAPABILITIES as $capInt) {
        $newAssoc = array( "ROOM_ID" => $data->ROOM_ID, "CAPABILITY_ID" =>$capInt);
        CreateRecord('room_capabilities',$newAssoc, $conn);
    }
}
unset($data->CAPABILITIES);

echo UpdateRecord('room',$data, 'ROOM_ID', $conn);
