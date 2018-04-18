<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once $_SERVER["DOCUMENT_ROOT"] . "/ScheduleRx.API/rxapi.php";

$database = new Database();
$conn1 = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));

/* Function
 * A function to extend 'MyEvents', It takes a pre-compiles (or empty) array of events and appends the events related to related to
 * the sections that a Faculty Leads. Returns an extended version of the given array of events.
 */
function GetLeadIndex ($myEvents, $UID, $conn1) {
    $myCourses = json_decode(Search('leads_course', 'USER_ID', $UID, $conn1));

    foreach ($myCourses->records as $courseLink) {
        $relevantEvents = GetList($courseLink->COURSE_ID, $conn1);
        if ($relevantEvents) //if this course has events
        {
            foreach ($relevantEvents['records'] as $record) {
                array_push($myEvents, GetDetail($record['BOOKING_ID'], $conn1));          //push these additional records to MyEvents
            }
        }
    }

    // remove duplicates that arise from a teacher teaching a section and Managing the Course of that section
    $myEvents = array_values(array_unique($myEvents, SORT_REGULAR));

    return $myEvents;
}