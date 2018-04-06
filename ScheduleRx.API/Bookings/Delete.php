<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once  '../SuperCRUD/Delete.php';
include_once  '../SuperCRUD/Search.php';
include_once '../config/LogHandler.php';

$database = new Database();
$conn = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));
$log = Logger::getLogger('EventAssociationsLog');

/* Script
 * Deletes and event from the 'booking' table and it's associations from the event_sections if  any exist
 */
$recordsOfConflict = json_decode(Search('conflict_event', "BOOKING_ID" , "'" . $data->BOOKING_ID . "'" ,$conn));

if($data->SCHEDULE_ID == null || $data->SCHEDULE_ID == "") {
    foreach ($recordsOfConflict->records as $cRecord) {
        DeleteRecord('conflict_event',"CONFLICT_ID", $cRecord->CONFLICT_ID, $conn );
        DeleteRecord('conflict',"CONFLICT_ID", $cRecord->CONFLICT_ID, $conn );
    }
}
else {
    if ($recordsOfConflict != null) {
        foreach ($recordsOfConflict->records as $cRecord) {
            DeleteRecord('conflict_event',"BOOKING_ID", $data->BOOKING_ID . " AND CONFLICT_ID=" . $temp->CONFLICT_ID, $conn );
            $temp = json_decode(Search('conflict_event', "CONFLICT_ID" , "'" . $cRecord->CONFLICT_ID . "'" ,$conn));

            if(count($temp->records) < 2) {
                DeleteRecord('conflict_event',"CONFLICT_ID", $cRecord->CONFLICT_ID, $conn );
                DeleteRecord('conflict',"CONFLICT_ID", $cRecord->CONFLICT_ID, $conn );
            }
        }
    }
}
$sectionResponse = DeleteRecord('event_section', 'BOOKING_ID', $data->BOOKING_ID, $conn);
$eventResponse =  DeleteRecord('booking',"BOOKING_ID", $data->BOOKING_ID , $conn );


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