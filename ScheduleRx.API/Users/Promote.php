<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once '../config/database.php';
include_once  '../SuperCRUD/Update.php';
include_once '../SuperCRUD/Search.php';


$database = new Database();
$conn = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));

/* Promotes or demotes a faculty to or from the admin role
 * @param USER_ID | user id to promote to admin
 * @param PROMOTE | 1 to promote a user to admin, 0 to demote back to lead or faculty
 */
$update = array("USER_ID" => $data->USER_ID, "ROLE_ID" => 3);
if ($data->PROMOTE == "1") {
    $update['ROLE_ID'] = 1;
}
else {
    $searchLead = json_decode(Search('leads_course', "USER_ID" , "'" . $data->USER_ID . "'" , $conn));
    if ($searchLead) {
        $update['ROLE_ID'] = 2;
    }
}

echo UpdateRecord('users', $update, 'USER_ID', $conn);