<?php
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

$Booking->BOOKING_ID = $data->BOOKING_ID;

if($Booking->delete()){
    echo '{';
    echo '"message": "Booking was created."';
    echo '}';
}
else{
    echo '{';
    echo '"message": "Unable to create Booking."';
    echo '}';
}