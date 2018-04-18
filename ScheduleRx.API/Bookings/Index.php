<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");

include_once $_SERVER["DOCUMENT_ROOT"] . "/ScheduleRx.API/rxapi.php";

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