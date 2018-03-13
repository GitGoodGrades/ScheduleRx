<?php
include_once 'GetSections.php';
include_once '../SuperCrud/Detail.php';

function GetDetail($bID, $conn) {
    $event = json_decode(FindRecord('booking', 'BOOKING_ID', $bID, $conn));
    $event->SECTIONS = GetSections($bID, $conn);
    return $event;
}