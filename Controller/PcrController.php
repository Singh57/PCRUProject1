<script>
//Display a confirmation box when trying to delete an object
function showConfirm(id)
{
    // build the confirmation box
    var c = confirm("Are you sure you wish to delete this item?");
    
    // if true, delete item and refresh
    if(c)
        window.location = "viewproject.php?delete=" + id;
}
</script>

<?php
require ("Model/PcrModel.php");

//Contains non-database related function for the Coffee page
class PcrController {

     function CreateOverviewTable() {
        $result = "
            <table class='overViewTable'>
                <tr>
                    <td></td>
                    <td></td>
                    <td><b>Id</b></td>
                    <td><b>Title</b></td>
                    <td><b>Synopsis</b></td>
                    <td><b>Description</b></td>
                    <td><b>Grant</b></td>
                    <td><b>Researchers</b></td>
                    <td><b>Partners</b></td>
                </tr>";

        $projectArray = $this->GetPcrDataByType('%');

        foreach ($coffeeArray as $key => $value) {
            $result = $result .
                    "<tr>
                        <td><a href='addprojects.php?update=$value->id'>Update</a></td>
                        <td><a href='#' onclick='showConfirm($value->id)'>Delete</a></td>
                        <td>$value->id</td>
                        <td>$value->title</td>
                        <td>$value->synopsis</td>    
                        <td>$value->description</td> 
                        <td>$value->grant</td>
                        <td>$value->researchers</td>   
                        <td>$value->partners</td>   
                    </tr>";
        }

        $result = $result . "</table>";
        return $result;
    }
    
    
    
   //<editor-fold desc="Set Methods">
    function InsertpcrData($POST) {
        $title = $POST["txtTitle"];
        $synopsis = $POST["txtSynopsis"];
        $description = $POST["txtDescription"];
        $grant = $POST["txtGrant"];
        $researchers = $POST["txtResearchers"];
        $partners = $POST["txtPartners"];
      
        $purpose = $POST["txtPurpose"];
        $conferences = $POST["txtConferences"];
        $patents = $POST["txtPatents"];
        $softwares = $POST["txtSoftwares"];
        $websites = $POST["txtWebsites"];
        $researchu = new PcrEntity(-1, $title, $synopsis, $description, $grant, $researchers, $partners,
                 $purpose, $conferences, $patents , $softwares ,$websites);
        $pcrModel = new PcrModel();
        $pcrModel->InsertNewProjectData($researchu);
        
    }
    
    
    //<editor-fold desc="Set Methods">
    function InsertCandidateData($POST) {
        $name = $POST["txtName"];
        $type = $POST["txtType"];
        $education = $POST["txteducation"];
        $emailid = $POST["txtemailid"];
        $projects = $POST["txtprojects"];
        $papers = $POST["txtpapers"];
      
        $researchu = new PcrEntity2($name, $type, $education, $emailid, $projects, $papers);
        $pcrModel = new PcrModel();
        $pcrModel->InsertNewCandidateData($researchu);
        
    }
    
    
    //<editor-fold desc="Set Methods">
    function InsertPapersData($POST) {
        $title = $POST["txtTitle"];
        $authors = $POST["txtAuthors"];
        $issues = $POST["txtIssues"];
        $token = $POST["txtToken"];
        $publishing = $POST["txtPublishing"];
        $links = $POST["txtLinks"];
      $date = $POST["txtDate"];
      $status = $POST["txtStatus"];
      
        $researchu = new PcrEntity3($title, $authors, $issues, $token, $publishing, $links, $date, $status);
        $pcrModel = new PcrModel();
        $pcrModel->InsertNewPapersData($researchu);
        
    }
    
     //<editor-fold desc="Set Methods">
    function InsertmeetingsData($POST) {
         $name = $POST["txtName"];
        $type = $POST["txtType"];
        $education = $POST["txteducation"];
        $emailid = $POST["txtemailid"];
        $projects = $POST["txtprojects"];
        $papers = $POST["txtpapers"];
      
        $researchu = new PcrEntity2($name, $type, $education, $emailid, $projects, $papers);
        $pcrModel = new PcrModel();
        $pcrModel->InsertNewMeetingsData($researchu);
        
    }

    function UpdatepcrData($id) {
        $title = $_POST["txtTitle"];
        $synopsis = $_POST["txtSynopsis"];
        $description = $_POST["txtDescription"];
        $grant = $_POST["txtGrant"];
        $researchers = $_POST["txtResearchers"];
        $partners = $_POST["txtPartners"];
      
        $researchu = new PcrEntity($id, $title, $synopsis, $description, $grant, $researchers, $partners);
        $pcrModel = new PcrModel();
        $pcrModel->UpdateNewProjectData($id, $researchu);
    }

   
    function GetPcrDataById($id) {
        $pcrModel = new PcrModel();
        return $pcrModel->GetResearchDataId($id);
    }

    function DeleteProjectData($id) 
    {
        $pcrModel = new PcrModel();
        $pcrModel->DeletePcrData($id);
    }

     function GetPcrDataByType($type) {
        $pcrModel = new PcrModel();
        return $pcrModel->GetPcrDataByType($type);
    }
}
?>
