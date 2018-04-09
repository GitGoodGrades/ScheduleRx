<?php
include_once '../config/LogHandler.php';

function UpdateRecord ($tableName, $fields, $primaryKey, $conn) {
    $log = Logger::getLogger('Updating in table -' . $tableName);
    global $stmt;

    $update = "UPDATE ". $tableName . " SET ";

    foreach ($fields as $key => $value) {
        if ($key == $primaryKey) { continue;}
        $update .= ($key . "=:" . $key . ", ");
    }
    $query = (substr($update, 0 ,-2) . " WHERE " . $primaryKey . "=:" . $primaryKey);

    $stmt = $conn->prepare($query);
    unset($value);

    foreach ($fields as $key => $value) {
        $temp=htmlspecialchars(strip_tags($value));
        $stmt->bindValue(":" . $key, $temp);
    }

    if ($stmt->execute()) {
        $log->info("Record was Updated CODE: " . $stmt->errorCode());
        return $tableName . ' was updated.';
    }
    else {
        $log->error("Record Not Updated ERROR CODE: " . $stmt->errorCode());
        return $tableName . ' was not updated.';
    }
}