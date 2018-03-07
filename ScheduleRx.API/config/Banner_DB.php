<?php
/**
 * Created by PhpStorm.
 * User: The Madman
 * Date: 3/5/2018
 * Time: 10:19 PM
 */

class Banner_DB{

    private $host = "localhost";
    private $db_name = "banner_database";
    private $username = "root";
    private $password = "admin";
    public $conn;

    public function getConnection(){

        $this->conn = null;

        try{
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
        }catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }

        return $this->conn;
    }
}
