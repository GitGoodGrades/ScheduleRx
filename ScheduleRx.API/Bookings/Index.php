<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include_once '../config/database.php';
include_once '../models/Course.php';

$database = new Database();
$db = $database->getConnection();

$query = "SELECT * FROM booking ORDER BY BOOKING_ID DESC";
$stmt = $db->prepare($query);
$stmt->execute();
$num = $stmt->rowCount();

if($num>0){
    $bookingList=array();
    $bookingList["records"]=array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        array_push($bookingList["records"], $row);
    }
    echo json_encode($bookingList);
}
else{
    echo json_encode(
        array("message" => "No entries found.")
    );
}
