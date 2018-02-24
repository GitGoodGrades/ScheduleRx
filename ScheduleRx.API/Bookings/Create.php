<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once '../config/database.php';

$database = new Database();
$conn = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));

$query =  ("INSERT INTO booking SET BOOKING_ID=:BOOKING_ID,
                                    COURSE_ID=:COURSE_ID,
                                    ROOM_ID=:ROOM_ID,
                                    START_TIME=:START_TIME,
                                    END_TIME=:END_TIME");
$stmt = $conn->prepare($query);

$BOOKING=htmlspecialchars(strip_tags($data->BOOKING_ID));
$COURSE=htmlspecialchars(strip_tags($data->COURSE_ID));
$ROOM=htmlspecialchars(strip_tags($data->ROOM_ID));
$START=htmlspecialchars(strip_tags($data->START_TIME));
$END=htmlspecialchars(strip_tags($data->END_TIME));

$stmt->bindParam(":BOOKING_ID", $BOOKING);
$stmt->bindParam(":COURSE_ID", $COURSE);
$stmt->bindParam(":ROOM_ID", $ROOM);
$stmt->bindParam(":START_TIME", $START);
$stmt->bindParam(":END_TIME", $END);


if($stmt->execute()){
    echo '{';
    echo '"message": "Booking was created."';
    echo '}';
}
else {
    echo '{';
    echo '"message": "Unable to create Booking."';
    echo '}';
}
