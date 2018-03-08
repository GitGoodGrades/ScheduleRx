<?php
/**
 * Created by PhpStorm.
 * User: The Madman
 * Date: 3/5/2018
 * Time: 10:12 PM
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../config/Banner_DB.php';
include_once '../SuperCRUD/Search.php';
include_once '../SuperCRUD/Index.php';

//Connect to nursing_database
$database = new Database();
$conn1 = $database->getConnection();
//connect to banner_database
$database = new Banner_DB();
$conn2 = $database->getConnection();
//decode input
$data = json_decode(file_get_contents("php://input"));

//If it is a teacher
if ($data->ROLE_ID == '2')
    $results = json_decode(Search( 'teacher_teaches','USER_ID',$data->USER_ID,  $conn2));
else {
    $results = json_decode(Search( 'student_takes','USER_ID',$data->USER_ID,  $conn2));
}

//the $results variable now holds  list of section numbers the Student Takes, or the Teacher Teaches


//Get all the Events (and include their seciton numbers from the event_section table
$query = "select * from booking join event_section on booking.BOOKING_ID = event_section.BOOKING_ID";
$stmt = $conn1->prepare($query);
$stmt->execute();

$allBookings=array();
$allBookings["records"]=array();
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    extract($row);
    array_push($allBookings["records"], $row);
}

//set container for matches
$myEvents = [];

/*loop through all the events in our nursing_database, For every event with a section ID that matches anything in MyEvents
We will add the the $myEvents Array ( The events will be sorted by SECTION_ID, and thus, so will the myEvents records)
so All of a classes events will be together in the returned object */
foreach ($allBookings['records'] as $record ) {
    foreach ($results->records as $myRecord ) {

        if ($record['SECTION_ID'] == $myRecord->SECTION_ID) {
            array_push($myEvents, $record);
        }
    }
}

if($myEvents){
    echo json_encode($myEvents);
}
else{
    echo json_encode(
        array("message" => "No Events found for USER_ID:" . $data->USER_ID . "!!!")
    );
}