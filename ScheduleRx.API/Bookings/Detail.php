<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include_once '../config/database.php';
include_once '../models/Booking.php';

$database = new Database();
$db = $database->getConnection();
$Booking = new Booking($db);

$Booking->COURSE_ID = isset($_GET['COURSE_ID']) ? $_GET['COURSE_ID'] : die();
$Booking->Detail();
$bookingInfo = array(
    "COURSE_ID" =>  $Booking->COURSE_ID,
    "ROOM_ID" => $Booking->ROOM_ID,
    "START_TIME" => $Booking->START_TIME,
    "END_TIME" => $Booking->END_TIME
);

print_r(json_encode($bookingInfo));
