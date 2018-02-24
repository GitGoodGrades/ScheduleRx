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

$query =  ("INSERT INTO course SET COURSE_ID=:COURSE_ID, STUDENTS=:STUDENTS");


$stmt = $conn->prepare($query);

$COURSE=htmlspecialchars(strip_tags($data->COURSE_ID));
$STUDENT=htmlspecialchars(strip_tags($data->STUDENTS));

$stmt->bindParam(":COURSE_ID", $COURSE);
$stmt->bindParam(":STUDENTS", $STUDENT);

if($stmt->execute()){
    echo '{';
    echo '"message": "Courses was created."';
    echo '}';
}
else {
    echo '{';
    echo '"message": "Unable to create Courses."';
    echo '}';
}
