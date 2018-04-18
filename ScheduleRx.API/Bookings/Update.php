<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once $_SERVER["DOCUMENT_ROOT"] . "/ScheduleRx.API/rxapi.php";

$database = new Database();
$conn = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));

/* Script
 * Updates the value of any field other than the BOOKING_ID of an event. Should be given the event ID labeled as BOOKING_ID in JSON
 * and the new value labeled with the matching field name
 */
if (isset($data->SECTIONS)) {
    DeleteRecord('event_section', "BOOKING_ID", $data->BOOKING_ID, $conn);
    foreach ($data->SECTIONS as $section_id) {
        $new = array("BOOKING_ID" => $data->BOOKING_ID, "SECTION_ID" => $section_id, "NOTES" => $data->DETAILS );
        CreateRecord('event_section', $new, $conn );
    }
}
unset($data->SECTIONS);
echo UpdateRecord('booking',$data, 'BOOKING_ID', $conn);