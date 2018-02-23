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

$query =  ("INSERT INTO users SET USER_ID=:USER_ID,
                                    USER_PASSWORD=:USER_PASSWORD,
                                    EMAIL=:EMAIL,
                                    ROLE=:ROLE");

$stmt = $conn->prepare($query);

$USER=htmlspecialchars(strip_tags($data->USER_ID));
$PASSWORD=htmlspecialchars(strip_tags($data->USER_PASSWORD));
$MAIL=htmlspecialchars(strip_tags($data->EMAIL));
$ROL=htmlspecialchars(strip_tags($data->ROLE));

$stmt->bindParam(":USER_ID", $USER);
$stmt->bindParam(":USER_PASSWORD", $PASSWORD);
$stmt->bindParam(":EMAIL", $MAIL);
$stmt->bindParam(":ROLE", $ROL);


if($stmt->execute()){
    echo '{';
    echo '"message": "User was created."';
    echo '}';
}
else {
    echo '{';
    echo '"message": "Unable to create User."';
    echo '}';
}
