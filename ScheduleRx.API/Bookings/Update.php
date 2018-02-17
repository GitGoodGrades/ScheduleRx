<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../models/Booking.php';

$database = new Database();
$db = $database->getConnection();

$Booking = new Booking($db);
$data = json_decode(file_get_contents("php://input"));

$Booking->COURSE_ID = $data->COURSE_ID;
$Booking->ROOM_ID = $data->ROOM_ID;
$Booking->START_TIME = $data->START_TIME;
$Booking->END_TIME = $data->END_TIME;

if($Booking->Update()){
    echo '{';
    echo '"message": "Course was updated."';
    echo '}';
}
else{
    echo '{';
    echo '"message": "Unable to update course."';
    echo '}';
}