<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include_once '../config/database.php';
include_once '../SuperCRUD/Index.php';
include_once 'GetSections.php';
include_once 'GetEventDetail.php';

$database = new Database();
$conn = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));

/* Script
 * Filters a list of all events based on any of the given criteria: Notice - Values must be exact matches
 *     COURSE_ID | SECTION_ID | NUM_STUDENTS, COURSE_TITLE | SEMESTER_ID | ROOM_ID | START_TIME | END_TIME
 *     SCHEDULE_ID | BOOKING_ID | BOOKING_TITLE | DETAILS
 *
 * @param FIELD | The field to filter by
 * @param VALUE | The value to search for
 * @return | an array of JSON Event objects with appended SECTIONS Property
 */
$results = [];
$query = "select BOOKING_ID from ((section natural join course) natural join booking) where " . $data->FIELD .  "=" . "'" . $data->VALUE . "'";
$stmt = $conn->prepare($query);
$stmt->execute();
$num = $stmt->rowCount();

if($num>0){;
    $allTheThings=array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        array_push($allTheThings, $row);
    }
    $allTheThings = array_values(array_unique($allTheThings, SORT_REGULAR));
    foreach ($allTheThings as $record) {
        array_push($results, GetDetail($record['BOOKING_ID'], $conn));
    }

    echo json_encode($results);
}
else{
    return null;
}