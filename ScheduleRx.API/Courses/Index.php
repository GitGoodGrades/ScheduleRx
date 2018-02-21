<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once '../config/database.php';

$database = new Database();
$conn = $database->getConnection();

$query = "SELECT * FROM course";
$stmt = $this->conn->prepare($query);

if($stmt->execute()){
    echo '{';
    echo '"message": "Courses were retrieved."';
    echo '}';
}
else {
    echo '{';
    echo '"message": "Unable to retrieve Courses."';
    echo '}';
}