<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once $_SERVER['DOCUMENT_ROOT'] . "/ScheduleRx.API/rxapi.php";

$database = new Database();
$conn = $database->getConnection();

/* Script
 * retrieves all rooms with their respective capabilities appended
 */
$results = [];
$allTheThings = json_decode(GetAll('room', 'ROOM_ID', $conn));

foreach ($allTheThings->records as $record) {
    array_push($results, GetRoomDetail($record->ROOM_ID, $conn));
}

echo json_encode($results);