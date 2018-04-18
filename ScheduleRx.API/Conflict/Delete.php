<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once $_SERVER["DOCUMENT_ROOT"] . "/ScheduleRx.API/rxapi.php";

$database = new Database();
$conn = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));

/* Script
 * Deletes a Conflict record and it's associations in the 'conflict_event' table
 * @param CONFLICT_ID the ID of the conflict to delete
 */
$eventResponse = DeleteRecord('conflict_event',"CONFLICT_ID", $data->CONFLICT_ID, $conn );
$conflictResponse = DeleteRecord('conflict',"CONFLICT_ID", $data->CONFLICT_ID, $conn );

echo $eventResponse;
echo $conflictResponse;

if ($conflictResponse != null) {
    $log->info($conflictResponse);
}
else {
    $log->warn("Conflict Deletion Failed");
}

if ($eventResponse != null) {
    $log->info($eventResponse);
}
else {
    $log->warn("Conflict_Event Association Deletion Failed");
}