<?php
/**
 * Created by PhpStorm.
 * User: The Madman
 * Date: 2/20/2018
 * Time: 11:44 AM
 */

class User
{
    private $conn;
    private $table = 'user';
    private $User_ID;

    public function __construct($db){
        $this->conn = $db;
    }

    function Index(){
        $query = "SELECT * FROM ". $this->table ." 
                  ORDER BY User_ID DESC";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();
        return $stmt;
    }

    function Detail(){
        $query =
            "SELECT * FROM " . $this->table ."
            WHERE User_ID = ?
            LIMIT 0,1";
        $stmt = $this->conn->prepare( $query );
        $stmt->bindParam(1, $this->User_ID);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->COURSE_ID = $row['COURSE_ID'];
        $this->ROOM_ID = $row['ROOM_ID'];
        $this->ROOM_ID = $row['START_TIME'];
        $this->ROOM_ID = $row['END_TIME'];
    }

    function Create(){
        $query =
            "INSERT INTO " . $this->table . "
            SET COURSE_ID=:COURSE_ID, ROOM_ID=:ROOM_ID, START_TIME=:START_TIME, END_TIME=:END_TIME, ROOM_ID=:ROOM_ID";

        $stmt = $this->conn->prepare($query);

        $this->BOOKING_ID=htmlspecialchars(strip_tags($this->BOOKING_ID));
        $this->COURSE_ID=htmlspecialchars(strip_tags($this->COURSE_ID));
        $this->ROOM_ID=htmlspecialchars(strip_tags($this->ROOM_ID));
        $this->START_TIME=htmlspecialchars(strip_tags($this->START_TIME));
        $this->END_TIME=htmlspecialchars(strip_tags($this->END_TIME));

        $stmt->bindParam(":COURSE_ID", $this->BOOKING_ID);
        $stmt->bindParam(":COURSE_ID", $this->COURSE_ID);
        $stmt->bindParam(":ROOM_ID", $this->ROOM_ID);
        $stmt->bindParam(":START_TIME", $this->START_TIME);
        $stmt->bindParam(":END_TIME", $this->END_TIME);

        if($stmt->execute()){
            return true;
        }

        return false;
    }

    function Update(){
        $query =
            "UPDATE " . $this->table . " 
            SET COURSE_ID = :COURSE_ID, ROOM_ID =: ROOM_ID, START_TIME =: START_TIME, END_TIME =: END_TIME
            WHERE COURSE_ID = :COURSE_ID";

        $stmt = $this->conn->prepare($query);

        $this->COURSE_ID=htmlspecialchars(strip_tags($this->COURSE_ID));
        $this->ROOM_ID=htmlspecialchars(strip_tags($this->ROOM_ID));
        $this->START_TIME=htmlspecialchars(strip_tags($this->START_TIME));
        $this->END_TIME=htmlspecialchars(strip_tags($this->END_TIME));

        $stmt->bindParam(":COURSE_ID", $this->COURSE_ID);
        $stmt->bindParam(":ROOM_ID", $this->ROOM_ID);
        $stmt->bindParam(":START_TIME", $this->START_TIME);
        $stmt->bindParam(":END_TIME", $this->END_TIME);


        if($stmt->execute()){
            return true;
        }
        return false;
    }

    function delete(){
        $query = "DELETE FROM " . $this->table . " WHERE BOOKING_ID = ?";

        $stmt = $this->conn->prepare($query);

        $this->COURSE_ID=htmlspecialchars(strip_tags($this->COURSE_ID));

        $stmt->bindParam(1, $this->COURSE_ID);

        if($stmt->execute()){
            return true;
        }
        return false;

    }
}