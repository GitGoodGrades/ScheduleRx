<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../models/Course.php';

$database = new Database();
$db = $database->getConnection();

$Course = new Course($db);
$data = json_decode(file_get_contents("php://input"));

$Course->COURSE_ID = $data->COURSE_ID;
$Course->STUDENTS = $data->STUDENTS;

if($Course->Create()){
    echo '{';
    echo '"message": "Course was created."';
    echo '}';
}
else{
    echo '{';
    echo '"message": "Unable to create Course."';
    echo '}';
}