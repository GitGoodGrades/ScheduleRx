<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include_once '../config/database.php';
include_once '../models/Course.php';

$database = new Database();
$db = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));

$query = "SELECT * FROM room WHERE ROOM_ID = ? LIMIT 0,1";

$stmt = $db->prepare( $query );
$stmt->bindParam(1,$data->ROOM_ID);
$stmt->execute();
$row = $stmt->fetch(PDO::FETCH_ASSOC);

if ($row) {
    print_r(json_encode($row));
}
else {
    echo null;
}

// Returns null if the record was not found.
