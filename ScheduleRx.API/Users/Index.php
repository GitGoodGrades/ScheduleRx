<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");

include_once $_SERVER["DOCUMENT_ROOT"] . "/ScheduleRx.API/rxapi.php";


$database = new Database();
$conn = $database->getConnection();

echo GetAll('users', 'USER_ID', $conn);
