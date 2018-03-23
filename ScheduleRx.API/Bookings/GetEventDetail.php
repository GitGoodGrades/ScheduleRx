<?php
include_once 'GetSections.php';
include_once '../SuperCrud/Detail.php';

/* Function
 * Finds an event by the given BOOKING_ID, the retrieved event object is appended it's associated section information as an array
 * and returned as a JSON object.
 * Utilises the 'GetSections' Function
 */
function GetDetail($bID, $conn) {
    $event = json_decode(FindRecord('booking', 'BOOKING_ID', $bID, $conn));
    $event->SECTIONS = GetSections($bID, $conn);
    return $event;
}