<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../SuperCRUD/Index.php';
include_once  'GetSections.php';

$database = new Database();
$conn = $database->getConnection();

$results = [];
$allTheThings = json_decode(GetAll('booking', 'BOOKING_ID', $conn));

foreach ($allTheThings->records as $record) {
    $record->SECTION = GetSections($record->BOOKING_ID, $conn);
    array_push($results, $record);
}

echo json_encode($results);