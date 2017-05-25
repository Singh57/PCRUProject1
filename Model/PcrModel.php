<?php
require ("Entities/PcrEntity.php");
require ("Entities/PcrEntity2.php");
require ("Entities/PcrEntity3.php");

//Contains database related code for the Coffee page.
class PcrModel {

    
    

    function InsertNewProjectData(PcrEntity $researchu) {
         require ('Credentials.php'); 
        $connect = mysqli_connect($hostname, $username, $password);
         mysqli_select_db($connect, $databaseName);
  
        
        $query = sprintf("INSERT INTO addproject
                          (title,`grants`, synopsis, description,researchers, partners 
                          , grant1 , conferences, patents, softwares, websites )
                          VALUES
                          ('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s')",
             mysqli_real_escape_string($connect,$researchu->title),
                mysqli_real_escape_string($connect,$researchu->grant),
                mysqli_real_escape_string($connect,$researchu->synopsis),
                mysqli_real_escape_string($connect,$researchu->description),
                mysqli_real_escape_string($connect,$researchu->researchers),
                 mysqli_real_escape_string($connect,$researchu->partners),
        
                       mysqli_real_escape_string($connect,$researchu->purpose),
            mysqli_real_escape_string($connect,$researchu->conferences),
                 mysqli_real_escape_string($connect,$researchu->patents),
                 mysqli_real_escape_string($connect,$researchu->softwares),
                 mysqli_real_escape_string($connect,$researchu->websites));
              $this->PerformQuery($query);
    }

     
    
    function InsertNewCandidateData(PcrEntity2 $researchu) {
         require ('Credentials.php'); 
        $connect = mysqli_connect($hostname, $username, $password);
         mysqli_select_db($connect, $databaseName);
  
        
        $query = sprintf("INSERT INTO addcandidates
                          (name,type, timezone, emailid, projects, papers 
                         )
                          VALUES
                          ('%s','%s','%s','%s','%s','%s')",
             mysqli_real_escape_string($connect,$researchu->name),
                mysqli_real_escape_string($connect,$researchu->type),
                mysqli_real_escape_string($connect,$researchu->education),
                mysqli_real_escape_string($connect,$researchu->emailid),
                mysqli_real_escape_string($connect,$researchu->projects),
                 mysqli_real_escape_string($connect,$researchu->papers));
        
                 
              $this->PerformQuery($query);
    }
    
     function InsertNewMeetingsData(PcrEntity2 $researchu) {
         require ('Credentials.php'); 
        $connect = mysqli_connect($hostname, $username, $password);
         mysqli_select_db($connect, $databaseName);
  
        
        $query = sprintf("INSERT INTO addmeetings
                          (title,type, groups, partners, date, place 
                         )
                          VALUES
                          ('%s','%s','%s','%s','%s','%s')",
             mysqli_real_escape_string($connect,$researchu->name),
                mysqli_real_escape_string($connect,$researchu->type),
                mysqli_real_escape_string($connect,$researchu->education),
                mysqli_real_escape_string($connect,$researchu->emailid),
                mysqli_real_escape_string($connect,$researchu->projects),
                 mysqli_real_escape_string($connect,$researchu->papers));
        
                 
              $this->PerformQuery($query);
    }
    
    
    function InsertNewPapersData(PcrEntity3 $researchu) {
         require ('Credentials.php'); 
        $connect = mysqli_connect($hostname, $username, $password);
         mysqli_select_db($connect, $databaseName);
  
        
        $query = sprintf("INSERT INTO addpapers
                          (title, authors, description, citation, publisher, links, publicationdate, status 
                         )
                          VALUES
                          ('%s','%s','%s','%s','%s','%s','%s','%s')",
             mysqli_real_escape_string($connect,$researchu->title),
                mysqli_real_escape_string($connect,$researchu->authors),
                mysqli_real_escape_string($connect,$researchu->issues),
                mysqli_real_escape_string($connect,$researchu->token),
                mysqli_real_escape_string($connect,$researchu->publishing),
                 mysqli_real_escape_string($connect,$researchu->links),
                  mysqli_real_escape_string($connect,$researchu->date),
                 mysqli_real_escape_string($connect,$researchu->status));
        
                 
              $this->PerformQuery($query);
    }
    
    
    function UpdateNewProjectData($id, PcrEntity $researchu) {
          require ('Credentials.php'); 
        $connect = mysqli_connect($hostname, $username, $password);
        mysqli_select_db($connect, $databaseName);
        
        $query = sprintf("UPDATE addnewproject
                            SET title = '%s', synopsis = '%s', description = '%s', `grant` = '%s',
                            researchers = '%s', partners = '%s'
                          WHERE id = $id",
                mysqli_real_escape_string($connect,$researchu->title),
                mysqli_real_escape_string($connect,$researchu->synopsis),
                mysqli_real_escape_string($connect,$researchu->description),
                mysqli_real_escape_string($connect,$researchu->grant),
                mysqli_real_escape_string($connect,$researchu->researchers),
                 mysqli_real_escape_string($connect,$researchu->partners));
                     
        $this->PerformQuery($query);
    }

    
    function GetResearchDataId($id) {
        require ('Credentials.php');
        //Open connection and Select database.     
       $connect = mysqli_connect($hostname, $username, $password);
       mysqli_select_db($connect, $databaseName);
        $query = "SELECT * FROM addnewproject WHERE id = $id";
        $result = mysqli_query($connect,$query) or die(mysql_error());

        //Get data from database.
        while ($row = mysqli_fetch_array($result)) {
            $title = $row[1];
            $synopsis = $row[2];
            $description = $row[3];
            $grant = $row[4];
            $researchers = $row[5];
            $partners = $row[6];
          
            //Create coffee
            $researchu = new PcrEntity($id, $title, $synopsis, $description, $grant, $researchers, $partners);
        }
        //Close connection and return result
        mysqli_close();
        return $researchu;
    }

    
    function DeletePcrData($id) {
        $query = "DELETE FROM addnewproject WHERE id = $id";
        $this->PerformQuery($query);
    }
    
    
    function GetPcrDataByType($type) {
        require ('Credentials.php');
        //Open connection and Select database.     
       $connect = mysqli_connect($hostname, $username, $password);
mysqli_select_db($connect, $databaseName);

        $query = "SELECT * FROM addnnewproject WHERE title LIKE '$type'";
        $result = mysqli_query($connect,$query) ;
        $dataArray = array();

        //Get data from database.
        while ($row = mysqli_fetch_array($result)) {
            $id = $row[0];
            $title = $row[1];
            $synopsis = $row[2];
            $description = $row[3];
            $grants = $row[4];
            $researchers = $row[5];
            $partners = $row[6];
           
            //Create coffee objects and store them in an array.
            $coffee = new CoffeeEntity($id, $title, $synopsis, $description, $grants, $researchers, $partners);
            array_push($dataArray, $coffee);
        }
        //Close connection and return result
        mysqli_close($connect);
        return $dataArray;
    }

       function PerformQuery($query) {
        require ('Credentials.php');
        
      $connect = mysqli_connect($hostname, $username, $password);
       mysqli_select_db($connect, $databaseName);
        //Execute query and close connection
        mysqli_query($connect, $query);
     mysqli_close($connect);
    }
    
}
?>