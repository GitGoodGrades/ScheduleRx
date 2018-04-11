<?php

/*
 * Function for Determining if an event conflicts with an existing event in the database
 */
function findConflict( $tableName, $booking_ID ,$start, $end, $room , $conn) {
    $allBookings = json_decode(Search($tableName, 'ROOM_ID', $room . " AND SCHEDULE_ID IS NOT NULL", $conn));
    $conflicts = [];
    if ($allBookings == null) {
        return null;
    }
    foreach ($allBookings->records as $record ) {
        /*
         * A 'Conflict' can occur in 4 ways, Assuming we want the same room.
         * 1) Another Start time falls between my given time frame
         * 2) Another End time falls between my given time frame
         * 3) My Start time falls within another's time frame
         * 4) My End time falls within another's time frame
         */
        if (($start < $record->START_TIME && $record->START_TIME < $end) || //Starts in my Time Frame
            ($start < $record->END_TIME && $record->END_TIME < $end)     || //Ends in my Time Frame
            ($record->START_TIME < $start && $start < $record->END_TIME) || //Start in Your Time Frame
            ($record->START_TIME < $end && $end < $record->END_TIME) ||        //End in Your Time Frame
            ($record->START_TIME == $start && $record->END_TIME == $end)
        ) {
            if ($booking_ID && ($booking_ID != $record->BOOKING_ID)) {
                array_push($conflicts, $record);
            } else {
                array_push($conflicts, $record);
            }
        }

    }

    if($conflicts){
        return json_encode($conflicts);
    }
    else{
        return null;          //json_encode(array("message" => "No Conflicts found."));
    }
}
