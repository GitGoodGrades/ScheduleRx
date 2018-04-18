<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once $_SERVER['DOCUMENT_ROOT'] . "/ScheduleRx.API/rxapi.php";

$database = new Database();
$conn = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));

$newID = substr((string)getGUID(),1 , 36);
$data->MSG_ID = $newID;

echo CreateRecord('message', $data, $conn);
