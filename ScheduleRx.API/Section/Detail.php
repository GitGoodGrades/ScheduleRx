<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include_once '../config/database.php';
include_once '../SuperCRUD/Detail.php';


$database = new Database();
$conn = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));

echo FindRecord('section', 'SECTION_ID', $data->SECTION_ID, $conn);