<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once  '../SuperCRUD/Delete.php';
include_once  '../SuperCRUD/Search.php';
include_once  '../SuperCRUD/UPDATE.php';
include_once '../config/LogHandler.php';

$database = new Database();
$conn = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));
$log = Logger::getLogger('ApproveLog');

/* Script
 * Deletes multiple event by ID on approval and updates the requested SCHEDULE_ID of the approved event
 * @param EVENTS | list of events to delete
 * @param APPROVED | event object to update with current ScheduleID
 * @param CONFLICT_ID | The conflict ID for the approval
 */
$current = json_decode(FindRecord("schedule", "IS_RELEASED", 1, $conn1));
if (!$current) { $log->warn("No Released Schedule"); exit(null); }

DeleteRecord('conflict_event',"CONFLICT_ID", $data->CONFLICT_ID, $conn );
DeleteRecord('conflict',"CONFLICT_ID", $data->CONFLICT_ID, $conn );

UpdateRecord('booking', "BOOKING_ID", $data->APPROVED, $conn);

foreach ($data->EVENTS as $event){
    DeleteRecord('event_section', 'BOOKING_ID', $data->BOOKING_ID, $conn);
    DeleteRecord('booking',"BOOKING_ID", $data->BOOKING_ID , $conn );
}