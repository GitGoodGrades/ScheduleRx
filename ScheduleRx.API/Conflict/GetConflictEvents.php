<?php

include_once '../Bookings/GetEventDetail.php';

function GetConflictEvents( $conflict_ID, $conn) {

    $query =
        "SELECT BOOKING_ID
         FROM conflict_event
         WHERE CONFLICT_ID='" . $conflict_ID ."'";

    $stmt = $conn->prepare($query);
    $stmt->execute();

    $relatedEvents = array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        array_push($relatedEvents, GetDetail($row['BOOKING_ID'], $conn));
    }

    if($relatedEvents){
        return ($relatedEvents);
    }
    else{
        return null;
    }

}