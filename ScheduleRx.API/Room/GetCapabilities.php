<?php
/* Function
 * Gathers details of all capabilities associated with a given room, the results are returned as an array of capabilities
 */
function GetCapabilities($ROOM_ID, $conn1) {
    global $stmt;

    $query =
        "SELECT CAPABILITY
         FROM capabilities natural join room_capabilities
         WHERE ROOM_ID='" . $ROOM_ID ."'";

    $stmt = $conn1->prepare($query);
    $stmt->execute();

    $caps = array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        array_push($caps, $row["CAPABILITY"]);
    }

    return $caps;
}
