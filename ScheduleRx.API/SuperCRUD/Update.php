<?php
function UpdateRecord ($tableName, $fields, $primaryKey, $conn) {
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

    return $stmt->execute() ? $tableName . ' was updated.' : $tableName . ' was not updated ERROR CODE:' . $stmt->errorCode();
};