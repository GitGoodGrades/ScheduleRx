<?php

/*
 * Function for Determining if an event conflicts with an existing event in the database
 */
function findConflict( $tableName,$start, $end, $room , $conn) {
    $allBookings = json_decode(Search($tableName, 'ROOM_ID', $room, $conn));
    $conflicts = [];

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
<<<<<<< HEAD
            ($record->START_TIME < $start && $start < $record->END_TIME) || //Start in Your Time Frame
            ($record->START_TIME < $end && $end < $record->END_TIME)     ||   //End in Your Time Frame
            ($record->START_TIME == $start && $record->END_TIME == $end)
=======
            ($record->START_TIME < $start && $start <= $record->END_TIME) || //Start in Your Time Frame
            ($record->START_TIME < $end && $end <= $record->END_TIME)        //End in Your Time Frame
>>>>>>> b40418dcd1f400b3da65b13d9300f21742d68442
        ) array_push($conflicts,$record);                              //if so, add this record conflict array

    }

    if($conflicts){
        return json_encode($conflicts);
    }
    else{
        return null;          //json_encode(array("message" => "No Conflicts found."));
    }
}
