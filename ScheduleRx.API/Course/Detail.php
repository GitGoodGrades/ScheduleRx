<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include_once '../config/database.php';
include_once '../models/Course.php';

$database = new Database();
$db = $database->getConnection();
$Course = new Course($db);

$Course->COURSE_ID = isset($_GET['COURSE_ID']) ? $_GET['COURSE_ID'] : die();
$Course->Detail();
$CourseList = array(
    "COURSE_ID" =>  $Course->COURSE_ID,
    "STUDENTS" => $Course->STUDENTS
);

print_r(json_encode($CourseList));
