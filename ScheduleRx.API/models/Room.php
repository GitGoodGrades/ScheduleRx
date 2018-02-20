<?php
/**
 * Created by PHPSTORM.
 * User: BlakeHarkness
 * Date: 2/19/2018
 * Time: 9:26 PM
 */

class Room
{
    private $conn;
    private $table = "room";


    public $ROOM_ID;
    public $ROOM_DESCRIPTION;
    public $CAPACITY;

    public function __construct($db){
        $this->conn = $db;
    }

    function Index(){
        $query =
            "SELECT ROOM_ID, ROOM_DESCRIPTION, CAPACITY
            FROM ". $this->table ." 
            ORDER BY ROOM_ID DESC";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();

        return $stmt;
    }

    function Detail(){
        $query =
            "SELECT ROOM_ID, ROOM_DESCRIPTION, CAPACITY
            FROM " . $this->table ."
            WHERE ROOM_ID = ?
            LIMIT 0,1";
        $stmt = $this->conn->prepare( $query );
        $stmt->bindParam(1, $this->ROOM_ID);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->ROOM_ID = $row['ROOM_ID'];
        $this->ROOM_DESCRIPTION = $row['ROOM_DESCRIPTION'];
        $this->CAPACITY = $row['CAPACITY'];
    }

    function Create(){
        $query =
            "INSERT INTO " . $this->table . "
            SET ROOM_ID=:ROOM_ID, ROOM_DESCRIPTION=:ROOM_DESCRIPTION, CAPACITY=:CAPACITY";

        $stmt = $this->conn->prepare($query);

        $this->ROOM_ID=htmlspecialchars(strip_tags($this->ROOM_ID));
        $this->ROOM_DESCRIPTION=htmlspecialchars(strip_tags($this->ROOM_DESCRIPTION));
        $this->CAPACITY=htmlspecialchars(strip_tags($this->CAPACITY));

        $stmt->bindParam(":ROOM_ID", $this->ROOM_ID);
        $stmt->bindParam(":ROOM_DESCRIPTION", $this->ROOM_DESCRIPTION);
        $stmt->bindParam(":CAPACITY", $this->CAPACITY);

        if($stmt->execute()){
            return true;
        }

        return false;
    }

    function Update(){
        $query =
            "UPDATE " . $this->table . " 
            SET ROOM_ID =: ROOM_ID, ROOM_DESCRIPTION =: ROOM_DESCRIPTION, CAPACITY =: CAPACITY
            WHERE ROOM_ID = :ROOM_ID";

        $stmt = $this->conn->prepare($query);


        $this->ROOM_ID=htmlspecialchars(strip_tags($this->ROOM_ID));
        $this->ROOM_DESCRIPTION=htmlspecialchars(strip_tags($this->ROOM_DESCRIPTION));
        $this->CAPACITY=htmlspecialchars(strip_tags($this->CAPACITY));


        $stmt->bindParam(":ROOM_ID", $this->ROOM_ID);
        $stmt->bindParam(":ROOM_DESCRIPTION", $this->ROOM_DESCRIPTION);
        $stmt->bindParam(":CAPACITY", $this->CAPACITY);


        if($stmt->execute()){
            return true;
        }
        return false;
    }

    function delete(){
        $query = "DELETE FROM " . $this->table . " WHERE ROOM_ID = ?";

        $stmt = $this->conn->prepare($query);

        $this->ROOM_ID=htmlspecialchars(strip_tags($this->ROOM_ID));

        $stmt->bindParam(1, $this->ROOM_ID);

        if($stmt->execute()){
            return true;
        }
        return false;

    }
}