<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../Bookings/GetEventDetail.php';
include_once  '../SuperCRUD/Search.php';


$database = new Database();
$conn = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));

/* Script
 * Given a CONFLICT_ID, returns a list of events associated with the conflict ID
 */
$relEvents = json_decode(Search('conflict_event', 'CONFLICT_ID', "'" . $data->CONFLICT_ID . "'", $conn));
$results = [];
if ($relEvents) {
    foreach ($relEvents->records as $record) {
        array_push($results, GetDetail($record->BOOKING_ID, $conn));
    }
    echo json_encode($results);
}
else {
    echo null;
}
