<?php
include_once '../config/LogHandler.php';
function DeleteRecord ($tableName, $PrimaryKey, $value, $conn) {
    $log = Logger::getLogger('EventDeleteLog');
    global $stmt;
    $query = ('DELETE FROM ' . $tableName ." WHERE " . $PrimaryKey . '=:' . $PrimaryKey);
    $stmt = $conn->prepare($query);
    $stmt->bindValue(":". $PrimaryKey, $value);

    if ($stmt->execute()) {
        return  $tableName . ' was deleted.';
    }
    else {
        $log->warn ($tableName . ' was not deleted ERROR CODE:' . $stmt->errorCode());
        return null;
    }
}

