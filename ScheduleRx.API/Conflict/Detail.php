<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../Bookings/GetEventDetail.php';
include_once '../SuperCRUD/Detail.php';
include_once 'GetConflictEvents.php';
include_once '../config/LogHandler.php';

$database = new Database();
$conn = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));

/* Script
 * Given a BOOKING_ID, returns the conflict details associated (if any exist)
 */

$results = json_decode(findRecord("conflict", 'CONFLICT_ID', $data->CONFLICT_ID, $conn));

$results->COURSE_ID = [];
$results->ROOM = null;
$results->TYPE = "Conflict";
$results->EVENTS = GetConflictEvents($data->CONFLICT_ID, $conn);

$earliestStart = "9999-99-99 23:59:59";
$latestEnd = "0000-00-00 00:00:00";

foreach ($results->EVENTS as $booking) {

    if ($booking->START_TIME < $earliestStart) {
        $earliestStart = $booking->START_TIME;
    }
    if ($booking->END_TIME > $latestEnd) {
        $latestEnd = $booking->END_TIME;
    }
    if ($booking->SECTIONS['records'] != []) {
        array_push($results->COURSE_ID, $booking->SECTIONS['records'][0]['COURSE_ID']);
    }

    if ($results->ROOM == null) {
        $results->ROOM  = $booking->ROOM_ID;
    }
}

if (count($results->EVENTS) < 2) {
    $results->TYPE = "Request";
}

$results->CONFLICT_START = $earliestStart;
$results->CONFLICT_END = $latestEnd;

echo json_encode($results);