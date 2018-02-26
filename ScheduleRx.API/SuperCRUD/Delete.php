<?php
function DeleteRecord ($tableName, $PrimaryKey, $value, $conn) {
    global $stmt;
    $query = ('DELETE FROM ' . $tableName ." WHERE " . $PrimaryKey . '=:' . $PrimaryKey);
    $stmt = $conn->prepare($query);
    $stmt->bindValue(":". $PrimaryKey, $value);

    return $stmt->execute() ? $tableName . ' was deleted.' : $tableName . ' was not deleted ERROR CODE:' . $stmt->errorCode();
}

