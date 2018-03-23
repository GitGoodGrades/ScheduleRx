<?php
function CreateRecord ($tableName, $fields, $conn) {
    global $stmt;
    $query = ('INSERT INTO ' . $tableName ." SET ");

    foreach ($fields as $key => $value) {
        $query .= ($key . "=:" . $key . ", ");
    }

    $stmt = $conn->prepare(substr($query, 0 ,-2));

    unset($value);

    foreach ($fields as $key => $value) {
        $colonize = ":" . $key;
        $stmt->bindValue($colonize, $value);
    }

    return $stmt->execute() ? $tableName . ' was created.' : "ERROR CODE: " . $stmt->errorCode();
};
