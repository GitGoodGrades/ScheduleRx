<?php

function findByTime( $start, $conn) {
    $allSchedules = json_decode(GetAll('schedule', 'SCHEDULE_ID', $conn));
    if (!$allSchedules) {
        return null;
    }
    //return 'obtained urainium';
    foreach ($allSchedules->records as $record ) {
        if (($record->START_SEM_DATE <= $start) && ($start >= $record->END_SEM_DATE)) {
            return $record->SCHEDULE_ID;
        }
    }
    return null;          //json_encode(array("message" => "No Conflicts found."));
}