<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include '../config/database.php';
include  '../SuperCRUD/Search.php';
include '../SuperCRUD/Index.php';
include '../Conflict/FindConflict.php';

$database = new Database();
$conn = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));


/* Script
 * Determines if there is a conflict and returns the event(s) for witch the given Room information conflicts
 * (This is only conflict Detection) no data is added to the database. and no records are altered
 */
if (isset($data->BOOKING_ID)) {
    echo findConflict( 'booking', $data->BOOKING_ID, $data->START_TIME, $data->END_TIME, $data->ROOM_ID, $conn);
}
else {
    echo findConflict( 'booking', null, $data->START_TIME, $data->END_TIME, $data->ROOM_ID, $conn);
}
