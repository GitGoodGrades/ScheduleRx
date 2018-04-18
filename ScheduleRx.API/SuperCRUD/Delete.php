<?php

function DeleteRecord ($tableName, $PrimaryKey, $value, $conn) {
    $log = Logger::getLogger('Deleting from table -' . $tableName);
    global $stmt;
    $query = ('DELETE FROM ' . $tableName ." WHERE " . $PrimaryKey . '=:' . $PrimaryKey);
    $stmt = $conn->prepare($query);
    $stmt->bindValue(":". $PrimaryKey, $value);

    if ($stmt->execute()) {
        $log->info ('Record was deleted CODE:' . $stmt->errorCode());
        return  $tableName . ' was deleted.';
    }
    else {
        $log->warn ($tableName . ' was not deleted ERROR CODE:' . $stmt->errorCode());
        return $tableName . ' was not deleted.';
    }
}

