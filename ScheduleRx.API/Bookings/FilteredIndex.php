<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include_once $_SERVER["DOCUMENT_ROOT"] . "/ScheduleRx.API/rxapi.php";

$database = new Database();
$conn = $database->getConnection();

/* Script
 * Gathers all Events from the 'booking table' (filtering SCHEDULE_ID) and returns an array of JSON objects, all with attached
 * Section Details via the 'GetDetail' method.
 */
$results = [];
$allTheThings = json_decode(Search($conn));

foreach ($allTheThings->records as $record) {
    array_push($results, GetDetail($record->BOOKING_ID, $conn));
}

echo json_encode($results);


function Search($conn) {
    $log = Logger::getLogger("SearchLog");
    $query = ("select * from booking where 'SCHEDULE_ID' IS NOT Null");
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
        $log->info("No events found. ERROR CODE:" . $stmt->errorCode());
        return null;
    }
}