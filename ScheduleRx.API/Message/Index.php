<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include  '../SuperCRUD/Index.php';

$database = new Database();
$conn = $database->getConnection();

echo json_encode(GetAll('message', 'USER_ID', $conn));

