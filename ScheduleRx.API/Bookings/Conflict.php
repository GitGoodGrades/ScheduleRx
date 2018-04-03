<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include '../config/database.php';
include  '../SuperCRUD/Search.php';
include '../SuperCRUD/Index.php';
include '../Conflict/FindConflict.php';
include_once '../config/LogHandler.php';

$database = new Database();
$conn = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));


/* Script
 * Determines if there is a conflict and returns the event(s) for witch the given Room information conflicts
 * (This is only conflict Detection) no data is added to the database. and no records are altered
 */
echo findConflict( 'booking',$data->START_TIME, $data->END_TIME, $data->ROOM_ID, $conn);
