<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once '../config/database.php';

$database = new Database();
$conn = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));

echo UpdateRecord('event_section', $data->BOOKING_ID, $data->SECTION_ID, $data->NOTES, $conn);

function UpdateRecord ($tableName, $bookingID, $sectionID, $newNote, $conn) {
    global $stmt;

    $query = "UPDATE ". $tableName . " SET NOTES='". $newNote . "' WHERE BOOKING_ID=" . $bookingID .
            " AND SECTION_ID=" . $sectionID ;

    $stmt = $conn->prepare($query);

    return $stmt->execute() ? $tableName . ' was updated.' : null;//$tableName . ' was not updated ERROR CODE:' . $stmt->errorCode();
};