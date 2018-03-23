<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include_once '../config/database.php';
include_once '../SuperCRUD/Detail.php';
include_once 'GetSections.php';

$database = new Database();
$conn = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));

/* Script
 * Utilizes the 'GetDetail' function to retrieve details about an event. The process itself is abstracted away to be usable
 * in other areas. This file is to serve POST requests for event details.
 */
print_r(GetDetail($data->BOOKING_ID, $conn));