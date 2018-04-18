<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once $_SERVER['DOCUMENT_ROOT'] . 'ScheduleRx.API/config/database.php';

$database = new Database();
$conn = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));
$log = Logger::getLogger('GetNoteInfoLog');

$query = "SELECT ROOM_ID, START_TIME, END_TIME, SCHEDULE_ID, booking.BOOKING_ID, BOOKING_TITLE, SECTION_ID, NOTES 
          FROM booking join event_section on booking.BOOKING_ID 
          WHERE booking.BOOKING_ID=event_section.BOOKING_ID AND 
          SECTION_ID='" . $data->SECTION_ID . "' AND 
          booking.BOOKING_ID=" . $data->BOOKING_ID ;

$stmt = $conn->prepare($query);
//echo $query;
$stmt->execute();
$row = $stmt->fetch(PDO::FETCH_ASSOC);

echo $query;

if ($row) {
    $log->info("EventsAccessed: SQL CODE:" . $stmt->errorCode());
    echo json_encode($row);
}
else {
    $log->info("EventsAccessed: No Data Found. ERROR CODE:" . $stmt->errorCode());
    echo  null;
}