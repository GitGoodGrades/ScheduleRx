<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../models/Course.php';

$database = new Database();
$db = $database->getConnection();

$query = "SELECT COURSE_ID, STUDENTS
          FROM course
          ORDER BY COURSE_ID DESC";

$stmt = $db->prepare($query);
$stmt->execute();
$num = $stmt->rowCount();

if($num>0){
    $courseList=array();
    $courseList["records"]=array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        array_push($courseList["records"], $row);
    }
    echo json_encode($courseList);
}
else{
    echo json_encode(
        array("message" => "No Courses found.")
    );
}
