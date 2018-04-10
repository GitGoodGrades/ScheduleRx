<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once  '../SuperCRUD/Delete.php';
include_once  '../SuperCRUD/Search.php';
include_once  '../SuperCRUD/UPDATE.php';
include_once '../config/LogHandler.php';
include_once 'GetSections.php';
include_once '../SuperCRUD/Detail.php';
include '../models/getGUID.php';
include_once '../SuperCRUD/Index.php';

$database = new Database();
$conn = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));
$log = Logger::getLogger('ApproveLog');

/* Script
 * Deletes multiple event by ID on approval and updates the requested SCHEDULE_ID of the approved event
 * @param EVENTS | list of events ID's to delete
 * @param APPROVED | event object to update with current ScheduleID
 * @param CONFLICT_ID | The conflict ID for the approval
 * @param MESSAGE | The to Send to the Deleted Event Leads
 */

if (!isset($data->EVENTS, $data->APPROVED, $data->CONFLICT_ID, $data->MESSAGE)) {
    $log->warn("Improper Parameters Supplied"); exit(null);
}

DeleteRecord('conflict_event',"CONFLICT_ID", $data->CONFLICT_ID, $conn );
DeleteRecord('conflict',"CONFLICT_ID", $data->CONFLICT_ID, $conn );

foreach ($data->EVENTS as $event){
    $eventSection = GetSections($event->BOOKING_ID, $conn);
    $SectionInfo = null;
    $leadID = null;

    if ($eventSection) {
        $SectionInfo = json_decode(FindRecord('section', 'SECTION_ID', $eventSection[0]->records->SECTION_ID, $conn));
        $leadID = json_decode(FindRecord('leads_course natural join course', 'COURSE_ID', $SectionInfo->USER_ID, $conn));
    }
    $newMessage = array( "USER_ID" => $leadID->USER_ID, "MESSAGE" => $data->MESSAGE, "MSG_ID" => substr((string)getGUID(),1 , 36) );

    CreateRecord('message', $newMessage, $conn);
    DeleteRecord('event_section', 'BOOKING_ID', $event->BOOKING_ID, $conn);
    DeleteRecord('booking',"BOOKING_ID", $event->BOOKING_ID , $conn );

    $data->APPROVED->SCHEDULE_ID = $event->SCHEDULE_ID;
}

UpdateRecord('booking', "BOOKING_ID", $data->APPROVED, $conn);
echo GetAll('conflict', "CONFLICT_ID", $conn);