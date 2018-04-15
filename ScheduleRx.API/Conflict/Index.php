<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../SuperCRUD/Search.php';
include_once '../SuperCRUD/Index.php';
include_once 'GetConflictEvents.php';

$database = new Database();
$conn = $database->getConnection();

/* Script
 * Returns the All conflict records and appends event details
 */

$results = json_decode(GetAll('conflict', 'CONFLICT_ID',  $conn));

if (!$results) {
    exit(null);
}

foreach ($results['records'] as $record) {
    $record->COURSE_ID = [];
    $record->ROOM = null;
    $record->TYPE = "Conflict";
    $record->EVENTS = GetConflictEvents($record->CONFLICT_ID, $conn);

    $earliestStart = "9999-99-99 23:59:59";
    $latestEnd = "0000-00-00 00:00:00";

    foreach ($record->EVENTS as $booking) {

        if ($booking->START_TIME < $earliestStart) {
            $earliestStart = $booking->START_TIME;
        }
        if ($booking->END_TIME > $latestEnd) {
            $latestEnd = $booking->END_TIME;
        }
        if ($booking->SECTIONS['records'] != []) {
            array_push($record->COURSE_ID, $booking->SECTIONS['records'][0]['COURSE_ID']);
        }

        if ($record->ROOM == null) {
            $record->ROOM  = $booking->ROOM_ID;
        }
    }

    if (count($record->EVENTS) < 2) {
        $record->TYPE = "Request";
    }

    $record->CONFLICT_START = $earliestStart;
    $record->CONFLICT_END = $latestEnd;
}
echo json_encode($results);