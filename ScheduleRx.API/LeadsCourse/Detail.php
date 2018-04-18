<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once $_SERVER['DOCUMENT_ROOT'] . "/ScheduleRx.API/rxapi.php";

$database = new Database();
$conn = $database->getConnection();
$log = Logger::getLogger("LeadChangeLog");

$data = json_decode(file_get_contents("php://input"));

$leadID = json_decode(FindRecord('leads_course', 'COURSE_ID', 'N4067', $conn));
echo $leadID;