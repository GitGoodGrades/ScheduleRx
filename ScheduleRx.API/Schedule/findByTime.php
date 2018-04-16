<?php

function findByTime( $start, $conn, $logger) {
    $allSchedules = json_decode(GetAll('schedule', 'SCHEDULE_ID', $conn));
    if (!$allSchedules) {
        return null;
    }
    $logger->info("given start format: " . $start);

    foreach ($allSchedules->records as $record ) {
        if (($record->START_SEM_DATE <= $start) && ($start >= $record->END_SEM_DATE)) {
            $logger->info("matching time frame found: " . $start);
            return $record->SCHEDULE_ID;
        }
    }

    $logger->info("no matching time found");
    return null;          //json_encode(array("message" => "No Conflicts found."));
}