<?php
/* Function
 * Creates a new conflict record in the 'conflict' table and builds associations to the given BOOKING_IDs in the
 * event_conflict table
 */
function CreateConflict($message, $newID, $BIDconflicts, $conn) {

    $new_conflict_id = substr((string)getGUID(),1 , 36);;
    $cdata = array( "CONFLICT_ID" => $new_conflict_id, "MESSAGE" => $message);
    CreateRecord('conflict', $cdata, $conn);

    $nedata = array( "CONFLICT_ID" => $new_conflict_id, "BOOKING_ID" => $newID);
    CreateRecord('conflict_event', $nedata, $conn);

    foreach ($BIDconflicts as $Booking_ID) {
        $cedata = array( "CONFLICT_ID" => $new_conflict_id, "BOOKING_ID" => $Booking_ID);
        CreateRecord('conflict_event', $cedata, $conn);
    }
}