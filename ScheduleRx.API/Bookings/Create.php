<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include '../config/database.php';
include  '../SuperCRUD/Create.php';
include 'GetEventDetail.php';
include '../models/getGUID.php';

$database = new Database();
$conn = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));

/* Script
 * Creates a new Event in the 'booking' table of the nursing_database, A Unique Identifier generated for each new Event.
 * The Section_IDs given as an array is separated from then incoming data and used to created associations in the
 * 'event_section' table. if the event is successfully created, an event JSON object is returned. and null otherwise.
 */
$newID = substr((string)getGUID(),1 , 36);
$data->BOOKING_ID = $newID;

$sectionEntries = $data->SECTION_ID;
$initialNote = $data->NOTES;

unset($data->SECTION_ID);
unset($data->COURSE_ID);
unset($data->NOTES);

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