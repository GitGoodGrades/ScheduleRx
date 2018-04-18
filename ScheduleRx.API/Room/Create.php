<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once $_SERVER['DOCUMENT_ROOT'] . "/ScheduleRx.API/rxapi.php";



$database = new Database();
$conn = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));


/*  Script - Creates a Room and it's associations to the capabilities table in the database
 *  @param ROOM_ID |        The room ID (Room Number)
 *  @param CAPACITY |       The capacity of the room
 *  @param ROOM_NAME |      The name of the room (if applicable)
 *  @param LOCATION |       The building the room is located in
 *  @param DESCRIPTION |    A description of the room
 *  @param CAPABILITIES |   A list of int CAPABILITY ID's that this room has
 *  @return                 The response if the room was successfully created
 */
$capabilities = $data->CAPABILITIES;
unset($data->CAPABILITIES);

$response = CreateRecord('room', $data, $conn);

foreach ($capabilities as $caps) {
    $newAssoc = array( "ROOM_ID" => $data->ROOM_ID, "CAPABILITY_ID" =>$caps);
    CreateRecord('room_capabilities', $newAssoc, $conn);
}

echo $response;
