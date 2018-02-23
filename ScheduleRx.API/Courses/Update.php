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

$query = "UPDATE course SET STUDENTS =:STUDENTS
          WHERE COURSE_ID = :COURSE_ID";

$stmt = $conn->prepare($query);

$COURSE=htmlspecialchars(strip_tags($data->COURSE_ID));
$STUDENT=htmlspecialchars(strip_tags($data->STUDENTS));

$stmt->bindParam(":COURSE_ID", $COURSE);
$stmt->bindParam(":STUDENTS", $STUDENT);

if($stmt->execute()){
    echo '{';
    echo '"message": "Course update applied (if exists)."';
    echo '}';
}
else {
    echo null;
}