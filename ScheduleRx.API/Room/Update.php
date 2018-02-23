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

$query = "UPDATE room SET          CAPACITY=:CAPACITY,
                                   ROOM_NAME=:ROOM_NAME,
                                   LOCATION=:LOCATION,
                                   DESCRIPTION=:DESCRIPTION
                      WHERE        ROOM_ID = :ROOM_ID";

$stmt = $conn->prepare($query);

$ROOM=htmlspecialchars(strip_tags($data->ROOM_ID));
$CAP=htmlspecialchars(strip_tags($data->CAPACITY));
$NAME=htmlspecialchars(strip_tags($data->ROOM_NAME));
$LOC=htmlspecialchars(strip_tags($data->LOCATION));
$DES=htmlspecialchars(strip_tags($data->DESCRIPTION));

$stmt->bindParam(":ROOM_ID", $ROOM);
$stmt->bindParam(":CAPACITY", $CAP);
$stmt->bindParam(":ROOM_NAME", $NAME);
$stmt->bindParam(":LOCATION", $LOC);
$stmt->bindParam(":DESCRIPTION", $DES);

if($stmt->execute()){
    echo '{';
    echo '"message": "Room was updated."';
    echo '}';
}
else {
    echo null;
}
