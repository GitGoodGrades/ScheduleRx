<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../SuperCRUD/Create.php';
include_once '../SuperCRUD/Update.php';
include_once '../SuperCRUD/Search.php';
include_once '../SuperCRUD/Delete.php';
include_once '../config/LogHandler.php';

$database = new Database();
$conn = $database->getConnection();
$log = Logger::getLogger("LeadChangeLog");

$data = json_decode(file_get_contents("php://input"));

$toLevel3 = json_decode(Search( 'users',"ROLE_ID", 2,  $conn));

foreach ($toLevel3->records as $record) {
    $field1 = array( "ROLE_ID" => 3, "USER_ID" => $record->USER_ID);
    UpdateRecord("users", $field1, "USER_ID", $conn);
    DeleteRecord("leads_course", "USER_ID" , $record->USER_ID , $conn);
}
$log->debug("All Level 2 Users Reset to Level 3");
foreach($data as $json) {
    $field2 = array( "ROLE_ID" => 2, "USER_ID" => $json->USER_ID);
    if ($json->ROLE_ID == 1) { $field2['ROLE_ID'] = 1;}
    UpdateRecord('users', $field2, "USER_ID", $conn);
    CreateRecord('leads_course', $json, $conn);
}
$log->debug("Selected Level 3 Users Altered to Level 2");