<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include  '../SuperCRUD/Delete.php';

$database = new Database();
$conn = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));

/* Script
 * Deletes and event from the 'booking' table. WARNING: DOES NOT YET REMOVE ASSOCIATIONS FROM THE 'event section' table
 */
echo DeleteRecord('booking',"BOOKING_ID", $data->BOOKING_ID, $conn );