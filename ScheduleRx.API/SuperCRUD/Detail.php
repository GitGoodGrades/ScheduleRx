<?php
include_once '../config/LogHandler.php';

function FindRecord($tableName, $PrimaryKey, $value, $conn) {
    $log = Logger::getLogger('Finding in table -' . $tableName);
    
    $query = ('SELECT * FROM ' . $tableName . " WHERE " . $PrimaryKey . '=:' . $PrimaryKey);
    $stmt = $conn->prepare($query);
    $stmt->bindValue(":" . $PrimaryKey, $value);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($stmt->execute()) {
        return json_encode($row);
    }
    else {
        $log->error("Record not Found ERROR CODE: " . $stmt->errorCode());
        return null;
    }
}
