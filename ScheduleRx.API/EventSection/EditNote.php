<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once '../config/database.php';
include_once '../config/LogHandler.php';

$database = new Database();
$conn = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));
$log = Logger::getLogger('NoteChangeLog');

$response = ChangeNote( $data->BOOKING_ID, $data->SECTION_ID, $data->NOTES, $conn);
$log->info($response);
echo $response;

function ChangeNote ( $bookingID, $sectionID, $newNote, $conn) {
    global $stmt;

    $query = "UPDATE event_section SET NOTES='". $newNote . "' WHERE BOOKING_ID='" . $bookingID . "'" .
            " AND SECTION_ID='" . $sectionID . "'" ;

    $stmt = $conn->prepare($query);

    return $stmt->execute() ? 'event_section note' . ' was updated.' : "note" . ' was not updated ERROR CODE:' . $stmt->errorCode();
};