<?php
/*
 * This function returns the records of all events associated with the given course
 */
function GetList($course_id , $conn){
    $query =
        "SELECT ROOM_ID, START_TIME, END_TIME, SCHEDULE_ID, booking.BOOKING_ID, BOOKING_TITLE, DETAILS, section.SECTION_ID
         FROM ((booking
         INNER JOIN event_section ON booking.BOOKING_ID = event_section.BOOKING_ID)
         INNER JOIN section ON section.SECTION_ID = event_section.SECTION_ID)
         WHERE section.COURSE_ID='" . $course_id ."'";

    //echo "<br/>" . $query . "<br/>";

    $stmt = $conn->prepare($query);

    $stmt->execute();
    $num = $stmt->rowCount();

    //echo $num;

    if($num>0){
        $recordList=array();
        $recordList["records"]=array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            array_push($recordList["records"], $row);  //for each row in the result, add it to the result array
        }
        return $recordList;  //return array (un-encoded)
    }
    else{
       return null;
    }
}