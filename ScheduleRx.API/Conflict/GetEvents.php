<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once '../config/database.php';

$database = new Database();
$conn = $database->getConnection();
$data = json_decode(file_get_contents("php://input"));

echo GetConflict("ROOM_ID", $data->ROOM_ID, $conn );

function GetConflict($ConflictID, $value, $conn)
{
    $query = ('SELECT * FROM ' . $tableName . " WHERE " . $PrimaryKey . '=:' . $PrimaryKey);
    $stmt = $conn->prepare($query);
    $stmt->bindValue(":" . $PrimaryKey, $value);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($row) {
        return json_encode($row);
    }
    else {
        return null; //$tableName . ' was not found ERROR CODE:' . $stmt->errorCode();
    }
}
