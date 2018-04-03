<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../Bookings/GetEventDetail.php';
include_once '../SuperCRUD/Search.php';
include_once '../config/LogHandler.php';

$database = new Database();
$conn = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));

/* Script
 * Given a BOOKING_ID, returns the conflict details associated (if any exist)
 */
$tableSql = "conflict_event natural join conflict";

$results = json_decode((Search($tableSql, 'BOOKING_ID', $data->BOOKING_ID, $conn)));
foreach ($results->records as $record) {
    $record->EVENT_INFO = GetDetail($record->BOOKING_ID, $conn);
}

echo json_encode($results);