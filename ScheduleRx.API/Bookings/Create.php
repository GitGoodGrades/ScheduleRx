<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include '../config/database.php';
include  '../SuperCRUD/Create.php';
include 'GetEventDetail.php';
include '../models/getGUID.php';
include '../Conflict/Create.php';
include_once '../config/LogHandler.php';

$database = new Database();
$conn = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));
$conflict = false;
$message = "";
$BIDs = [];
$log = Logger::getLogger('EventCreation Detailed Log');

/* Script
 * Creates a new Event in the 'booking' table of the nursing_database, A Unique Identifier generated for each new Event.
 * The Section_IDs given as an array is separated from then incoming data and used to created associations in the
 * 'event_section' table. if the event is successfully created, an event JSON object is returned. and null otherwise.
 *
 * If the SCHEDULE_ID is null, the event is identified as a conflict and an conflict with an association
 * to the ID is created.  If this is a conflicting event, provide MESSAGE, AND BOOKING_IDs
 */
$newID = substr((string)getGUID(),1 , 36);
$data->BOOKING_ID = $newID;

if ($data->ROOM_ID != 'clinical' && ($data->SCHEDULE_ID == null || $data->SCHEDULE_ID == "")) {
    if (isset($data->MESSAGE)) {
        $conflict = true;
        $message = $data->MESSAGE;
        $BIDs = $data->BOOKING_IDs;
    }
    else { //Attempt Error Recovery
        $log->warn("Null SCHEDULE_ID supplied with No Attached Message");
        $log->warn("Adjusting SCHEDULE_ID to current");
        $current = json_decode(FindRecord("schedule", "IS_RELEASED", 1, $conn));
        if (!$current) { $log->warn("No Released Schedule"); exit(null); }
        $data->SCHEDULE_ID = $current->SCHEDULE_ID;
    }
}

$sectionEntries = $data->SECTION_ID;
$initialNote = $data->NOTES;
$data->DETAILS = $data->NOTES;

unset($data->SECTION_ID, $data->COURSE_ID, $data->NOTES, $data->MESSAGE, $data->BOOKING_IDs);

CreateRecord('booking', $data, $conn);

$LastEntry = json_decode(FindRecord('booking',"BOOKING_ID", $data->BOOKING_ID , $conn));

if ($LastEntry) {
    foreach ($sectionEntries as $sec_ID) {
        $newAssoc = array( "SECTION_ID" => $sec_ID, "BOOKING_ID" => $LastEntry->BOOKING_ID, "NOTES" => $initialNote );
        CreateRecord('event_section', $newAssoc, $conn);
    }
    echo(json_encode(GetDetail($newID, $conn)));
}
else {
    echo null;
}

if ($conflict) {
    CreateConflict($message, $newID,  $BIDs, $conn);
}

