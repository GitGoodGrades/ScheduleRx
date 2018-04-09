<?php
include_once '../config/LogHandler.php';

function Search($tableName, $searchKey, $whereValue, $conn) {
    $log = Logger::getLogger('Searching table -' . $tableName);

    $query = ('SELECT * FROM ' . $tableName . " WHERE " . $searchKey . '=' . $whereValue );
    $stmt = $conn->prepare($query);

    $stmt->execute();
    $num = $stmt->rowCount();

    $log->debug($query);

    if($num>0){
        $log->info("Record(s) found. CODE:" . $stmt->errorCode());
        $recordList=array();
        $recordList["records"]=array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            array_push($recordList["records"], $row);
        }
        return json_encode($recordList);
    }
    else{
        $log->info("No Record(s) found. ERROR CODE:" . $stmt->errorCode());
        return null;
    }
}
