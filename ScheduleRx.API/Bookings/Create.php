<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once '../config/database.php';
include  '../SuperCRUD/Create.php';
include 'GetEventDetail.php';
include_once '../models/getGUID.php';

$database = new Database();
$conn = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));

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