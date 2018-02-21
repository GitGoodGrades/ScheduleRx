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

$query = "SELECT * FROM course WHERE COURSE_ID = ?";
$stmt = $this->conn->prepare($query);

$COURSE=htmlspecialchars(strip_tags($data->COURSE_ID));

$stmt->bindParam(1, $COURSE);

if($stmt->execute()){
    echo '{';
    echo '"message": "Courses details retrieved."';
    echo '}';
}
else {
    echo '{';
    echo '"message": "Unable to retrieve Courses details."';
    echo '}';
}