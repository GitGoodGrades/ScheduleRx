<?php

function GetAll($tableName, $primaryKey, $conn) {
    $log = Logger::getLogger('Gathering Records from table -' . $tableName);
    
    $query = ('SELECT * FROM ' . $tableName. ' ORDER BY ' . $primaryKey. ' DESC');
    $stmt = $conn->prepare($query);

    $stmt->execute();
    $num = $stmt->rowCount();

    if($num>0){
        $log->info("Records Accessed CODE:" . $stmt->errorCode());
        $recordList=array();
        $recordList["records"]=array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            array_push($recordList["records"], $row);
        }
        return json_encode($recordList);
    }
    else{
        $log->info(" No Records Found ERROR CODE:" . $stmt->errorCode());
        return null;
    }
}
