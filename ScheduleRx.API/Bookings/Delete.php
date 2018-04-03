<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include  '../SuperCRUD/Delete.php';
include_once '../config/LogHandler.php';

$database = new Database();
$conn = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));
$log = Logger::getLogger('EventLog');

/* Script
 * Deletes and event from the 'booking' table and it's associations from the event_sections if  any exist
 */
$eventResponse =  DeleteRecord('booking',"BOOKING_ID", $data->BOOKING_ID, $conn );
$sectionResponse = DeleteRecord('event_section', 'BOOKING_ID', $data->BOOKING_ID, $conn);

echo $eventResponse;
echo $sectionResponse;

if ($eventResponse != null) {
    $log->info($eventResponse);
}
else {
    $log->info("Event Deletion Failed");
}

if ($sectionResponse != null) {
    $log->info($sectionResponse);
}
else {
    $log->info("Event_Section Deletion Failed");
}