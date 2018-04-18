<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include_once $_SERVER["DOCUMENT_ROOT"] . "/ScheduleRx.API/rxapi.php";


$database = new Database();
$conn = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));

echo FindRecord('course', 'COURSE_ID', $data->COURSE_ID, $conn);