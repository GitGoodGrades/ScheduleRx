<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include_once '../config/database.php';
include_once '../SuperCRUD/Detail.php';
include_once 'GetSections.php';

$database = new Database();
$conn = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));

$record = json_decode(FindRecord('booking', 'BOOKING_ID', $data->BOOKING_ID, $conn));
$record->SECTIONS = GetSections($data->BOOKING_ID, $conn);

print_r($record);