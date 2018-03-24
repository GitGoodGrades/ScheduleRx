<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../Bookings/GetEventDetail.php';
include_once '../SuperCRUD/Search.php';
include_once '../SuperCRUD/Index.php';

$database = new Database();
$conn = $database->getConnection();

/*
 * Returns the All conflict records and appends event details
 */
$tableSql = "conflict natural join conflict_event";

$results = json_decode((GetAll($tableSql, 'CONFLICT_ID',  $conn)));
foreach ($results->records as $record) {
    $record->EVENT_INFO = GetDetail($record->BOOKING_ID, $conn);
}

echo json_encode($results);