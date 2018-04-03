<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once '../config/database.php';
include  '../SuperCRUD/Create.php';
include_once '../config/LogHandler.php';


$database = new Database();
$conn = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));
$log = Logger::getLogger("CourseLog");
$log->info(CreateRecord('course', $data, $conn));
$newAssoc = array( "USER_ID" => 00000000, "COURSE_ID" => $data->COURSE_ID);
$log->info(CreateRecord('leads_course', $newAssoc, $conn));

