<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../models/Course.php';

$database = new Database();
$db = $database->getConnection();

$query = "SELECT USER_ID, EMAIL, ROLE
          FROM users
          ORDER BY USER_ID DESC";

$stmt = $db->prepare($query);
$stmt->execute();
$num = $stmt->rowCount();

if($num>0){
    $userList=array();
    $userList["records"]=array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        array_push($userList["records"], $row);
    }
    echo json_encode($userList);
}
else{
    echo json_encode(
        array("message" => "No users found.")
    );
}