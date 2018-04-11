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
include_once '../SuperCRUD/Index.php';
include_once 'CreateMessage.php';
include_once '../SuperCRUD/Create.php';

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

foreach ($data->EVENTS as $event) {
    $log->info("Deleting Event with ID: " . $event->BOOKING_ID);
    $eventSection = GetSections($event->BOOKING_ID, $conn);
    $log->info("Getting Sections for Event " . $event->BOOKING_ID);
    $SectionInfo = null;
    $leadID = null;
    $log->info("Has a Section of COURSE: " . $eventSection['records'][0]['COURSE_ID']);
    if ($eventSection) {
        $log->info("Searching for Lead of This Course");
        $leadID = json_decode(FindRecord('leads_course', 'COURSE_ID', $eventSection['records'][0]['COURSE_ID'], $conn));

        $log->info("Lead of Course FoundXXXXXXX: " . $leadID->USER_ID);
        CreateMessage($data->MESSAGE, $leadID->USER_ID, $conn);
    }

    DeleteRecord('event_section', 'BOOKING_ID',   $event->BOOKING_ID , $conn);
    DeleteRecord('booking',"BOOKING_ID",   $event->BOOKING_ID , $conn );
    $data->APPROVED->SCHEDULE_ID = $event->SCHEDULE_ID;
}

unset($data->APPROVED->SECTIONS);
UpdateRecord('booking', $data->APPROVED ,"BOOKING_ID", $conn);
echo GetAll('conflict', "CONFLICT_ID", $conn);