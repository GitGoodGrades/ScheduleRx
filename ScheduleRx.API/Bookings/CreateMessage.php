<?php
include_once '../models/getGUID.php';
include_once '../SuperCRUD/Create.php';

function CreateMessage($mssage , $userID, $conn) {
    $newMessage = array("USER_ID" => $userID, "MESSAGE" => $mssage, "MSG_ID" => substr((string)getGUID(), 1, 36));
    CreateRecord('message', $newMessage, $conn);
}