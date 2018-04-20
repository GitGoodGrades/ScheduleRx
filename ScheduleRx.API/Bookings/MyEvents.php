<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../config/Banner_DB.php';
include_once '../SuperCRUD/Search.php';
include_once 'LeadIndex.php';
include_once 'GetEventDetail.php';

include_once '../config/LogHandler.php';

$log = Logger::getLogger('EventLog');
$database = new Database();
$conn1 = $database->getConnection();
$database = new Banner_DB();
$conn2 = $database->getConnection();
$data1 = json_decode(file_get_contents("php://input"));
$data =  json_decode(FindRecord("users", "USER_ID", $data1->USER_ID, $conn1));
$current = json_decode(FindRecord("schedule", "IS_RELEASED", 1, $conn1));

if ($data->ROLE_ID == '4' || $data->ROLE_ID == '3') {
    if (!$current) { $log->warn("No Released Schedule"); exit(null); }
} //Stop if there is no released schedule


/* Script
 * MyEvents Gathers All events for a given USER (Lead, Faculty, or Student) and returns All events
 *   relevant to that particular user.
 *
 *     Student results are all events associated with sections that the student takes in the current schedule.
 *     Faculty results are all events associated with sections that the faculty teaches in the current schedule.
 *     Lead results include the events associated with the sections the lead teaches, and includes
 *     events associated with sections of courses that the lead manages. Conflicting events are not included.
 *
 * @param ROLE_ID | role of the user
 * @param USER_ID | ID of the user
 */
if ($data->ROLE_ID == '2' || $data->ROLE_ID == '3')
    $results = json_decode(Search( 'teacher_teaches','USER_ID',$data->USER_ID,  $conn2));
else {
    $results = json_decode(Search( 'student_takes','USER_ID',$data->USER_ID,  $conn2));
}

$query = "";
if ($data->ROLE_ID == '2') {
    $query = "select * from booking join event_section on booking.BOOKING_ID = event_section.BOOKING_ID
              WHERE SCHEDULE_ID is not null";
}
else {
    $query = "select * from booking join event_section on booking.BOOKING_ID = event_section.BOOKING_ID
              WHERE SCHEDULE_ID='" . $current->SCHEDULE_ID ."'";
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

foreach ($allBookings['records'] as $record ) {
    if (!$results) break;
    foreach ($results->records as $myRecord ) {
        if ($record['SECTION_ID'] == $myRecord->SECTION_ID) {
            array_push($myEvents, GetDetail($record['BOOKING_ID'], $conn1));
        }
    }
}

if ($data->ROLE_ID == '2') {
    $myEvents = GetLeadIndex($myEvents, $data->USER_ID, $conn1);
}
else {
    $log->info("Removing Other Sections");
    foreach ($myEvents as $event) {
        $mySections = [];
        $log->info("Removing Sections for Event with ID: " . $event->BOOKING_ID, $log);
        $log->info("Number of Sections:" . count($event->SECTIONS['records']) );
        $log->info($event);
        for ($counter = 0; $counter < count($event->SECTIONS['records']) ; $counter++) {
            $log->info("counter value: " . $counter);
            if (isIn($event->SECTIONS['records'][$counter]['SECTION_ID'], $results->records, $log)) {
                array_push($mySections , $event->SECTIONS['records'][$counter]);
            }
        }
        $event->SECTIONS['records'] = $mySections;
    }
}

if($myEvents){
    $log->info($myEvents);
    echo json_encode($myEvents);
}
else{
    echo null;
}

function isIn($value, $array, $log) {
    foreach ($array as $arrayVal) {
        $log->info("Comparing Section:" . $value . " | to User_Section:" . $arrayVal->SECTION_ID);
        if ($arrayVal->SECTION_ID == $value) {
            return true;
        }
    }
    $log->info("Section not on list");
    return false;
}
/*
 *      WARNING: THIS FILE DOES NOT TEST IF A FACULTY IS PRESENT IN THE 'leads_course' TABLE, IF THE GIVEN INFORMATION IS INCORRECT
 *         AN ERROR IS THROWN, BE SURE THE USER ID MATCHES THE ROLE IN THE DATABASE AND THAT A LEAD'S USER_ID IS PRESENT IN THE
 *                                                      'leads_course' TABLE.
 */