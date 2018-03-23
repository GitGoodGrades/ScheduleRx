<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../SuperCRUD/Detail.php';
include_once '../Bookings/GetSections.php';

$database = new Database();
$conn = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));

$record = json_decode(FindRecord('event_section', 'BOOKING_ID', $data->BOOKING_ID, $conn));
$record->SECTIONS = GetSections($data->BOOKING_ID, $conn);

print_r($record);