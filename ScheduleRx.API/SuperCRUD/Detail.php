<?php
function FindRecord($tableName, $PrimaryKey, $value, pdo $conn)
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
        return $tableName . ' was not found ERROR CODE:' . $stmt->errorCode();
    }
}
