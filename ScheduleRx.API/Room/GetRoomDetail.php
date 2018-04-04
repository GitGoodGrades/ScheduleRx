<?php
include_once 'GetCapabilities.php';
include_once '../SuperCRUD/Detail.php';

/* Function
 * Finds an event by the given ROOM_ID, the retrieved event object is appended it's associated section information as an array
 * and returned as a JSON object. Returns null if the recode is not found.
 * Utilises the 'GetSections' Function
 */
function GetRoomDetail($rID, $conn) {
    $room = json_decode(FindRecord('room', 'ROOM_ID', $rID, $conn));
    if ($room) {
        $room->CAPABILITIES = GetCapabilities($rID, $conn);
        return $room;
    }
    else {
        return null;
    }
}