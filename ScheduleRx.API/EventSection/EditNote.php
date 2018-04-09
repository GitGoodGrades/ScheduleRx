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

echo ChangeNote( $data->BOOKING_ID, $data->SECTION_ID, $data->NOTES, $conn);

function ChangeNote ( $bookingID, $sectionID, $newNote, $conn) {
    $log = Logger::getLogger('NoteChangeLog');
    $query = "UPDATE event_section SET NOTES='". $newNote . "' WHERE BOOKING_ID='" . $bookingID . "'" .
            " AND SECTION_ID='" . $sectionID . "'" ;

    $stmt = $conn->prepare($query);

    if ($stmt->execute()) {
        $log->info('event_section note' . ' was updated.');
    } else
    {
        $log->info("note" . ' was not updated ERROR CODE:' . $stmt->errorCode());
    }
};