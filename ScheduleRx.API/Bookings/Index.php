<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../models/Booking.php';

$database = new Database();
$db = $database->getConnection();
$booking = new Booking($db);
$stmt = $booking->Index();
$num = $stmt->rowCount();

if($num>0){
    $bookingList=array();
    $bookingList["records"]=array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $bookingItem=array(
            "COURSE_ID" => $COURSE_ID,
            "ROOM_ID" => $ROOM_ID,
            "START_TIME" => $START_TIME,
            "END_TIME" => $END_TIME
        );
        array_push($bookingList["records"], $bookingItem);
    }
    echo json_encode($bookingList);
}
else{
    echo json_encode(
        array("message" => "No booking found.")
    );
}
