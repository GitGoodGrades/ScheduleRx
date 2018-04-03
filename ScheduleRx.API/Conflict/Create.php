<?php
include_once '../SuperCRUD/Create.php';
include_once '../models/getGUID.php';
include_once '../config/LogHandler.php';

/* Function
 * Creates a new conflict record in the 'conflict' table and builds associations to the given BOOKING_IDs in the
 * event_conflict table
 */
function CreateConflict($message, $newID, $BIDconflicts, $conn) {
    $log = Logger::getLogger('ConflictLog');

    $new_conflict_id = substr((string)getGUID(),1 , 36);;
    $cdata = array( "CONFLICT_ID" => $new_conflict_id, "MESSAGE" => $message);
    $log->info(CreateRecord('conflict', $cdata, $conn));

    $nedata = array( "CONFLICT_ID" => $new_conflict_id, "BOOKING_ID" => $newID);
    $log->info(CreateRecord('conflict_event', $nedata, $conn));

    foreach ($BIDconflicts as $Booking_ID) {
        $cedata = array( "CONFLICT_ID" => $new_conflict_id, "BOOKING_ID" => $Booking_ID);
        $log->info(CreateRecord('conflict_event', $cedata, $conn));
    }
}