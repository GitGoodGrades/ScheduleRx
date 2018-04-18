<?php

function CreateRecord ($tableName, $fields, $conn) {
    $log = Logger::getLogger('Creating in table -' . $tableName);
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

    if ($stmt->execute()) {
        $log->info("Record was Created CODE: " . $stmt->errorCode());
        return $tableName . ' was created.';
    }
    else {
      $log->error("Record Not Created ERROR CODE: " . $stmt->errorCode());
      return $tableName . ' was not created.';
    } 
};
