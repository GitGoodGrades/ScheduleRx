<?php
function ChangeNote ( $bookingID, $sectionID, $newNote, $conn) {
    $log = Logger::getLogger('NoteChangeLog');
    $query = "UPDATE event_section SET NOTES='". $newNote . "' WHERE BOOKING_ID='" . $bookingID . "'" .
        " AND SECTION_ID='" . $sectionID . "'" ;

    $stmt = $conn->prepare($query);

    if ($stmt->execute()) {
        $log->info('event_section note' . ' was updated.');
    } else
    {
        $log->info("note" . ' was not updated ERROR CODE:' . $stmt->errorCode());
    }
};