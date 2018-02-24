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

$query =  ("INSERT INTO roles SET ROLE=:ROLE");

$stmt = $conn->prepare($query);

$ROL=htmlspecialchars(strip_tags($data->ROLE));

$stmt->bindParam(":ROLE", $ROL);

if($stmt->execute()){
    echo '{';
    echo '"message": "role was created."';
    echo '}';
}
else {
    echo '{';
    echo '"message": "Unable to create role."';
    echo '}';
}
