<?php
function CreateRecord (string $tableName, $fields, pdo $conn) {
    global $stmt;
    $query = ('INSERT INTO ' . $tableName ." SET ");

    foreach ($fields as $key => $value) {
        $query .= ($key . "=:" . $key . ", ");
    }

    $stmt = $conn->prepare(substr($query, 0 ,-2));

    unset($value);

    foreach ($fields as $key => $value) {
        $temp=htmlspecialchars(strip_tags($value));
        $colonize = ":" . $key;
        $stmt->bindValue($colonize, $temp);
    }

    return $stmt->execute() ? $tableName . ' was created.' : $tableName . ' was not created ERROR CODE:' . $stmt->errorCode();
};
