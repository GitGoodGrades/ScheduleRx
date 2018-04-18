<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include_once $_SERVER['DOCUMENT_ROOT'] . "/ScheduleRx.API/rxapi.php";


$database = new Database();
$banner = new Banner_DB();
$conn = $database->getConnection();
$con = $banner->getConnection();
$data = json_decode(file_get_contents("php://input"));

$RxInfo = json_decode(FindRecord('users', 'USER_ID', $data->USER_ID, $conn));
$bannerInfo = json_decode(FindRecord('users', 'USER_ID', $data->USER_ID, $con));

if ($bannerInfo) {
    $RxInfo->FIRSTNAME = $bannerInfo->FIRSTNAME;
    $RxInfo->LASTNAME = $bannerInfo->LASTNAME;
}

echo json_encode($RxInfo);