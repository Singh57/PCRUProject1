<?php
require './Controller/PcrController.php';
$pcrController = new PcrController();


$title = "Addproject";


   $content = "<form action='' method='post'>
    <fieldset>
    
        <legend><h3>Add New Project</h3></legend><br/>
        

<label>Titles :  </label>
        <textarea class='fortextarea' cols='30' rows='3' name='txtTitle'></textarea></br><br/></br></br>

  <label>Grants: </label>
        <textarea class='fortextarea' cols='30' rows='3' name='txtGrants'></textarea></br><br/></br></br>
        

        <label>Synopsis:</label>
           <textarea class='fortextarea' cols='30' rows='3' name='txtSynopsis'></textarea></br><br/></br></br>


        <label>Description:</label>
         <textarea class='fortextarea' cols='30'  rows='10' name='txtDescription'></textarea></br><br/></br></br>
         <br/></br></br></br></br></br>

      
        <label>Researchers: </label>
        <textarea class='fortextarea' cols='30' rows='3' name='txtResearchers'></textarea></br><br/></br></br>

           <label>Partners: </label>
           <textarea  class='fortextarea' cols='30' rows='3' name='txtPartners'></textarea></br><br/></br><br/>

          <legend><h3>Output</h3></legend><br/>
  
        <label>Grant: </label>
        <textarea  class='fortextarea' cols='30' rows='3' name='txtPurpose'></textarea></br><br/></br><br/>


          <label>Conferences: </label>
        <textarea class='fortextarea' cols='30' rows='3' name='txtConferences'></textarea></br><br/></br><br/>


          <label>Patent: </label>
        <textarea class='fortextarea' cols='30' rows='3' name='txtPatents'></textarea></br><br/></br><br/>


          <label >Software: </label>
        <textarea class='fortextarea' cols='30' rows='3' name='txtSoftwares'></textarea></br><br/></br><br/>


          <label>Website Link: </label>
        <textarea class='fortextarea' cols='30' rows='3' name='txtWebsites'></textarea></br><br/></br><br/>


<input style='float:right; margin-right:300px; background: white;  color : #990000;'  
type='submit' name='addproject' value='Submit'><br/><br/>
    </fieldset>
</form>";



if(isset($_GET["update"]))
{
    if(isset($_POST["txtTitle"]))
    {
        $pcrController->UpdatepcrData($_GET["update"]);
    }
}
else
{
    if(isset($_POST["addproject"]))
    {
        $pcrController->InsertpcrData($_POST);
    }
}

include './Template.php';
?>
