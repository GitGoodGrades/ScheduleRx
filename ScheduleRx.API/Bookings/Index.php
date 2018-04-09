<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include_once '../config/database.php';
include_once '../SuperCRUD/Index.php';
include_once 'GetSections.php';
include_once 'GetEventDetail.php';

$database = new Database();
$conn = $database->getConnection();

/* Script
 * Gathers all Events from the 'booking table' (no filters) and returns an array of JSON objects, all with attached
 * Section Details via the 'GetDetail' method.
 */
$results = [];
$allTheThings = json_decode(GetAll('booking', 'BOOKING_ID', $conn));

foreach ($allTheThings->records as $record) {
    array_push($results, GetDetail($record->BOOKING_ID, $conn));
}

echo json_encode($results);