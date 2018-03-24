<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../SuperCRUD/Delete.php';
include_once '../config/database.php';
include  '../SuperCRUD/Delete.php';

$database = new Database();
$conn = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));

/* Script
 * Deletes a Conflict record and it's associations in the 'conflict_event' table
 * @param CONFLICT_ID the ID of the conflict to delete
 */
echo DeleteRecord('event_section',"CONFLICT_ID", $data->CONFLICT_ID, $conn );
echo DeleteRecord('conflict',"CONFLICT_ID", $data->CONFLICT_ID, $conn );