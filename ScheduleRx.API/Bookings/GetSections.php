<?php
/**
 * Created by PhpStorm.
 * User: The Madman
 * Date: 3/12/2018
 * Time: 7:25 PM
 */

function GetSections($bookingID, $conn1) {
    global $stmt;
    $query = "SELECT * FROM booking JOIN event_section ON booking.BOOKING_ID = event_section.BOOKING_ID
              WHERE booking.BOOKING_D=" . $bookingID;
    $stmt = $conn1->prepare($query);
    $stmt->execute();

    $relatedSections = array();
    $relatedSections["records"] = array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        array_push($relatedSections["records"], $row);
    }

    if($relatedSections){
        return json_encode($relatedSections);
    }
    else{
        return json_encode(
            array("message" => "No Events found for USER_ID:" . $bookingID . "!!!")
        );
    }
}
