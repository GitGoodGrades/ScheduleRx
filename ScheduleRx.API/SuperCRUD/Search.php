<?php
include_once '../config/LogHandler.php';

function Search($tableName, $searchKey, $whereValue, $conn) {
    $log = Logger::getLogger("SearchLog");
    $query = ('SELECT * FROM ' . $tableName . " WHERE " . $searchKey . '=' . $whereValue );
    $stmt = $conn->prepare($query);

    $stmt->execute();
    $num = $stmt->rowCount();

    if($num>0){
        $recordList=array();
        $recordList["records"]=array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            array_push($recordList["records"], $row);
        }
        return json_encode($recordList);
    }
    else{
        $log->info("No " . $tableName . "s found. ERROR CODE:" . $stmt->errorCode());
        return null;
    }
}
