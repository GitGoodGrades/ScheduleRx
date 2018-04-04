<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../config/LogHandler.php';

$log = Logger::getLogger('LeadsErrorLog');
$database = new Database();
$conn = $database->getConnection();

$query = "SELECT C.COURSE_ID, L.USER_ID FROM course AS C LEFT join leads_course AS L on C.COURSE_ID = L.COURSE_ID;";
$stmt = $conn->prepare($query);

$stmt->execute();
$num = $stmt->rowCount();

if($num>0){
    $recordList=array();
    $recordList["records"]=array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        array_push($recordList["records"], $row);
    }
    echo json_encode($recordList);
}
else{
    $log->info("message No leads_course found." . "ERROR CODE:" . $stmt->errorCode());
    echo null;
}