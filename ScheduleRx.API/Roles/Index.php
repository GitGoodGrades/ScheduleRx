<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../models/Course.php';

$database = new Database();
$db = $database->getConnection();

$query = "SELECT * FROM roles ORDER BY ROLE DESC";

$stmt = $db->prepare($query);
$stmt->execute();
$num = $stmt->rowCount();

if($num>0){
    $roleList=array();
    $roleList["records"]=array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        array_push($roleList["records"], $row);
    }
    echo json_encode($roleList);
}
else{
    echo json_encode(
        array("message" => "No roles were found.")
    );
}
