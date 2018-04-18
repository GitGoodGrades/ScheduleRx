<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once $_SERVER["DOCUMENT_ROOT"] . "/ScheduleRx.API/rxapi.php";


$database = new Database();
$conn = $database->getConnection();

echo (GetAll('capabilities', 'CAPABILITY_ID', $conn));

