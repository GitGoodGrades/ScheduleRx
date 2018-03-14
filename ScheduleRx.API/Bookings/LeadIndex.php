<?php
/**
 * Created by PhpStorm.
 * User: The Madman
 * Date: 3/10/2018
 * Time: 1:25 PM
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include_once  '../models/LeadList.php';
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
$results = json_decode(Search( 'teacher_teaches','USER_ID',$data->USER_ID,  $conn2));

                        //the $results variable now holds  list of section numbers the Teacher Teaches
                //Build New Table with Query Join, that Lists events and their relevant booking information

$query = "select * from booking join event_section on booking.BOOKING_ID = event_section.BOOKING_ID";
$stmt = $conn1->prepare($query);
$stmt->execute();

$allBookings=array();                                                              //container array for results
$allBookings["records"]=array();
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){          //loop to pull resulting records into the array
    extract($row);
    array_push($allBookings["records"], $row);
}

$myEvents = [];

        /*loop through all the events in our nursing_database, For every event with a section ID that matches
            anything in MyEvents We will add to the $myEvents Array. The events will be sorted  by SECTION_ID,
                     and thus, so will the myEvents records) so All of a classes events will be
                                            together in the returned object */

foreach ($allBookings['records'] as $record ) {
    foreach ($results->records as $myRecord ) {

        if ($record['SECTION_ID'] == $myRecord->SECTION_ID) {
            array_push($myEvents, GetDetail($record['BOOKING_ID'], $conn1));
        }
    }
}

                                                        //continuing this section for leads

                                                       //get a list of all the courses this Faculty Leads
$myCourses = json_decode(Search('leads_course', 'USER_ID', $data->USER_ID, $conn1 ));


foreach($myCourses->records as $courseLink) {
    $relevantEvents = GetList($courseLink->COURSE_ID, $conn1);
    if($relevantEvents) //if this course has events
    {
        foreach ($relevantEvents['records'] as $record) {
            array_push($myEvents, GetDetail($record['BOOKING_ID'], $conn1));          //push these additional records to MyEvents
        }
    }
}

// remove duplicates,
// duplicates can come from a teacher teaching and section and Managing the Course of that section

$myEvents = array_values(array_unique($myEvents, SORT_REGULAR));

if($myEvents){
    print_r(json_encode($myEvents, true)) ;
}
else{
    echo json_encode(
        array("message" => "No Events found for USER_ID:" . $data->USER_ID . "!!!")
    );
}