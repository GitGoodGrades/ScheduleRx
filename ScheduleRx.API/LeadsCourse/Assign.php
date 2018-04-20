<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once $_SERVER['DOCUMENT_ROOT'] . "/ScheduleRx.API/rxapi.php";

$database = new Database();
$conn = $database->getConnection();
$log = Logger::getLogger("LeadChangeLog");

$data = json_decode(file_get_contents("php://input"));

$toLevel3 = json_decode(Search( 'users',"ROLE_ID", 2,  $conn));

function isAdmin($userID, $conn) {
    $UserDetails = json_decode(findRecord("users","USER_ID", $userID, $conn));
    if ($UserDetails->ROLE_ID == 1) {
        return true;
    }
    return false;
}

foreach ($toLevel3->records as $record) {
    $field1 = array( "ROLE_ID" => 3, "USER_ID" => $record->USER_ID);
    if (!isAdmin($record->USER_ID, $conn)) {
        UpdateRecord("users", $field1, "USER_ID", $conn);
    }
    DeleteRecord("leads_course", "USER_ID" , $record->USER_ID , $conn);
}
$log->debug("All Level 2 Users Reset to Level 3");
foreach ($data as $json) {
    $field2 = array( "ROLE_ID" => 2, "USER_ID" => $json->USER_ID);
    if (!isAdmin($json->USER_ID, $conn)) {
        UpdateRecord('users', $field2, "USER_ID", $conn);
    }
    CreateRecord('leads_course', $json, $conn);
}
$log->debug("Selected Level 3 Users Altered to Level 2");