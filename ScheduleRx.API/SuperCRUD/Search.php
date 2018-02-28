<?php
function Search($tableName, $searchKey, $whereKey, $conn) {
    $query = ('SELECT * FROM ' . $tableName . " WHERE " . $searchKey . '=' . $whereKey );
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
        return json_encode(
            array("message" => "No " . $tableName . "s found.")
        );
    }
}
