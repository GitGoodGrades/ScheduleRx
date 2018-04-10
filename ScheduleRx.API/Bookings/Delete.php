<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once  '../SuperCRUD/Delete.php';
include_once  '../SuperCRUD/Search.php';

$database = new Database();
$conn = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));

/* Script
 * Deletes and event from the 'booking' table and it's associations from the event_sections if  any exist
 * @param BOOKING_ID | the ID of the event to Delete
 * @param SCHEDULE_ID | the SCHEDULE_ID if the Delete is for a Requested Event
 */
$recordsOfConflict = json_decode(Search('conflict_event', "BOOKING_ID" , "'" . $data->BOOKING_ID . "'" , $conn));


if(isset($data->SCHEDULE_ID) && ($data->SCHEDULE_ID == null || $data->SCHEDULE_ID == "")) {
    if ($recordsOfConflict != null) {
        foreach ($recordsOfConflict->records as $cRecord) {
            DeleteRecord('conflict_event', "CONFLICT_ID", $cRecord["CONFLICT_ID"], $conn);
            DeleteRecord('conflict', "CONFLICT_ID", $cRecord["CONFLICT_ID"], $conn);
        }
    }

    $eventSection = GetSections($data->BOOKING_ID, $conn);
    $SectionInfo = null;
    $leadID = null;

    if ($eventSection) {
        $SectionInfo = json_decode(FindRecord('section', 'SECTION_ID', $eventSection[0]->records->SECTION_ID, $conn));
        $leadID = json_decode(FindRecord('leads_course natural join course', 'COURSE_ID', $SectionInfo->USER_ID, $conn));
    }

    if (isset($data->MESSAGE)) {
        $newMessage = array("USER_ID" => $leadID->USER_ID, "MESSAGE" => $data->MESSAGE, "MSG_ID" => substr((string)getGUID(), 1, 36));
        CreateRecord('message', $newMessage, $conn);
    }
}
else {
    if ($recordsOfConflict != null) {
        foreach ($recordsOfConflict->records as $cRecord) {
            DeleteRecord('conflict_event',"BOOKING_ID", $data->BOOKING_ID . " AND CONFLICT_ID=" . $cRecord->CONFLICT_ID, $conn );
            $temp = json_decode(Search('conflict_event', "CONFLICT_ID" , "'" . $cRecord->CONFLICT_ID . "'" ,$conn));

            if(count($temp->records) < 2) {
                DeleteRecord('conflict_event',"CONFLICT_ID", $cRecord->CONFLICT_ID, $conn );
                DeleteRecord('conflict',"CONFLICT_ID", $cRecord->CONFLICT_ID, $conn );
            }
        }
    }
}

DeleteRecord('event_section', 'BOOKING_ID', $data->BOOKING_ID, $conn);
DeleteRecord('booking',"BOOKING_ID", $data->BOOKING_ID , $conn );