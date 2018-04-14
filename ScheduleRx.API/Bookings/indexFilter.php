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
include_once '../config/LogHandler.php';

$database = new Database();
$conn = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));
$log = Logger::getLogger('FilterLog');

/* Script
 * Filters a list of all events based on any of the given criteria: Notice - Values must be exact matches
 *     COURSE_ID | SECTION_ID | NUM_STUDENTS, COURSE_TITLE | SEMESTER_ID | ROOM_ID | START_TIME | END_TIME
 *     SCHEDULE_ID | BOOKING_ID | BOOKING_TITLE | DETAILS
 *
 * @param FIELD | The field to filter by
 * @param VALUE | The value to search for
 * @return | an array of JSON Event objects with appended SECTIONS Property
 */
$query = "select BOOKING_ID from ((section natural join course) natural join booking) where " . $data->FIELD .  "=" . "'" . $data->VALUE . "' GROUP BY BOOKING_ID";

if ($data->FIELD == "SEMESTER_ID") {
    switch ($data->VALUE) {
        case "1":
            $data->VALUE = 1;
            break;
        case "2":
            $data->VALUE = 2;
            break;
        case "3":
            $data->VALUE = 3;
            break;
        case "4":
            $data->VALUE = 4;
            break;
        case "5":
            $data->VALUE = 5;
            break;
        default:
            $data->VALUE = 1;
            break;
    }
    $query = "select * from ((booking natural join event_section) natural join section) natural join course where  SEMESTER_ID= " . $data->VALUE . " GROUP BY BOOKING_ID";
}

$results = [];
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
    $log->info("No Records Found ERROR CODE:" . $stmt->errorCode());
    return null;
}