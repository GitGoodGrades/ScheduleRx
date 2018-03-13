<?php
function GetSections($bookingID, $conn1) {
    global $stmt;

    $query =
        "SELECT ROOM_ID, START_TIME, END_TIME, SCHEDULE_ID, booking.BOOKING_ID, BOOKING_TITLE, DETAILS, section.SECTION_ID, section.COURSE_ID
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
        return null;
    }
}
