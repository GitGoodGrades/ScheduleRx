<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once '../config/database.php';
include  '../SuperCRUD/Update.php';


$database = new Database();
$conn = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));


if ($data->IS_RELEASED == '0') {
    $data->IS_RELEASED = 0;
} else {
    $data->IS_RELEASED = 1;
};
if ($data->IS_ARCHIVED == '0') {
    $data->IS_ARCHIVED = 0;
} else {
    $data->IS_ARCHIVED = 1;
};

UpdateRecord('schedule',$data, 'SCHEDULE_ID', $conn);
