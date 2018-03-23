<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../config/Banner_DB.php';
include_once '../SuperCRUD/Search.php';
include_once '../SuperCRUD/Index.php';
include_once 'GetEventDetail.php';

$database = new Database();
$conn1 = $database->getConnection();
$database = new Banner_DB();
$conn2 = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));

/* Script
 * MyEvents Gathers All events for a given USER (Lead, Faculty, or Student) and returns All events relevant to that particular user. Student results
 * all events associated with sections that the student takes in the current schedule. Faculty results includes all the events associated with
 * the sections that the faculty teaches, and Lead results include the events associated with the sections the lead teaches, and includes
 * events associated with sections of courses that the lead manages. Conflicting events are included.
 */
if ($data->ROLE_ID == '2' || $data->ROLE_ID == '3')
    $results = json_decode(Search( 'teacher_teaches','USER_ID',$data->USER_ID,  $conn2));
else {
    $results = json_decode(Search( 'student_takes','USER_ID',$data->USER_ID,  $conn2));
}

//Get all the Events (and include their section numbers from the event_section table
$query = "";
if ($data->ROLE_ID == '2') { //if lead, filter by  SCHEDULE_ID not null
    $query = "select * from booking join event_section on booking.BOOKING_ID = event_section.BOOKING_ID
              WHERE SCHEDULE_ID is not null";
}
else { //Only show events for the current schedule to faculty and students
    $query = "select * from booking join event_section on booking.BOOKING_ID = event_section.BOOKING_ID
              WHERE SCHEDULE_ID='" . $data->CURRENT ."'";
}
$stmt = $conn1->prepare($query);
$stmt->execute();

$allBookings=array();
$allBookings["records"]=array();
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    extract($row);
    array_push($allBookings["records"], $row);
}

$myEvents = [];

/*loop through all the events in our nursing_database, For every event with a section ID that matches anything in MyEvents
   We will add the the $myEvents Array ( The events will be sorted by SECTION_ID, and thus, so will the myEvents records)
                     so All of a classes events will be together in the returned object */
foreach ($allBookings['records'] as $record ) {
    foreach ($results->records as $myRecord ) {

        if ($record['SECTION_ID'] == $myRecord->SECTION_ID) {
            array_push($myEvents, GetDetail($record['BOOKING_ID'], $conn1));
        }
    }
}

//If lead, expand results with leads-course-section-events
if ($data->ROLE_ID == '2') {
    $myEvents = GetLeadIndex($myEvents, $data->USER_ID, $conn1);
}

if($myEvents){
    echo json_encode($myEvents);
}
else{
    echo null;
}