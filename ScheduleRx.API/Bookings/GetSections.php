<?php
/* Function
 * Gathers details of all sections associated with a given event ID, the results are returned as an array, containing
 * the SECTION_ID and COURSE_ID
 */
function GetSections($bookingID, $conn1) {
    global $stmt;

    $query =
        "SELECT section.SECTION_ID, section.COURSE_ID, event_section.NOTES
         FROM ((booking
         INNER JOIN event_section ON booking.BOOKING_ID = event_section.BOOKING_ID)
         INNER JOIN section ON section.SECTION_ID = event_section.SECTION_ID)
         WHERE booking.BOOKING_ID='" . $bookingID ."'";

    $stmt = $conn1->prepare($query);
    $stmt->execute();

    $relatedSections = array();
    $relatedSections["records"] = array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        array_push($relatedSections["records"], $row);
    }

    if($relatedSections){
        return ($relatedSections);
    }
    else{
        return [null];
    }
}
