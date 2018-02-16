<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../models/Course.php';

$database = new Database();
$db = $database->getConnection();
$course = new Course($db);
$stmt = $course->Index();
$num = $stmt->rowCount();

if($num>0){
    $courseList=array();
    $courseList["records"]=array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $courseItem=array(
            "COURSE_ID" => $COURSE_ID,
            "STUDENTS" => $STUDENTS
        );
        array_push($courseList["records"], $courseItem);
    }
    echo json_encode($courseList);
}
else{
    echo json_encode(
        array("message" => "No products found.")
    );
}
