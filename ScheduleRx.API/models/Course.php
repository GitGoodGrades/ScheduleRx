<?php
class Course{
    private $conn;
    private $table = "course";

    public $COURSE_ID;
    public $STUDENTS;

    public function __construct($db){
        $this->conn = $db;
    }

    function Index(){
        $query =
            "SELECT COURSE_ID, STUDENTS
            FROM ". $this->table ." 
            ORDER BY COURSE_ID DESC";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();

        return $stmt;
    }

    function Detail(){
        $query =
            "SELECT COURSE_ID, STUDENTS
            FROM " . $this->table ."
            WHERE COURSE_ID = ?
            LIMIT 0,1";
        $stmt = $this->conn->prepare( $query );
        $stmt->bindParam(1, $this->COURSE_ID);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->COURSE_ID = $row['COURSE_ID'];
        $this->STUDENTS = $row['STUDENTS'];
    }

    function Update(){
        $query =
            "UPDATE " . $this->table . " 
            SET COURSE_ID = :COURSE_ID, STUDENTS =: STUDENTS
            WHERE COURSE_ID = :COURSE_ID";

        $stmt = $this->conn->prepare($query);

        $this->COURSE_ID=htmlspecialchars(strip_tags($this->COURSE_ID));
        $this->STUDENTS=htmlspecialchars(strip_tags($this->STUDENTS));

        $stmt->bindParam(':COURSE_ID', $this->COURSE_ID);
        $stmt->bindParam(':STUDENTS', $this->STUDENTS);

        if($stmt->execute()){
            return true;
        }
        return false;
    }

    function delete(){
        $query = "DELETE FROM " . $this->table . " WHERE COURSE_ID = ?";

        $stmt = $this->conn->prepare($query);

        $this->COURSE_ID=htmlspecialchars(strip_tags($this->COURSE_ID));

        $stmt->bindParam(1, $this->COURSE_ID);

        if($stmt->execute()){
            return true;
        }
        return false;

    }
}