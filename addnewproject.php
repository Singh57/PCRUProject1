<?php
require './Controller/PcrController.php';
$pcrController = new PcrController();


$title = "Addproject";


if(isset($_GET["update"]))
{
    
    
$researchu = $pcrController->GetPcrDataById($_GET["update"]);
    
$content = "


<form action='' method='post'>
    <fieldset>
    
        <legend><h3>Add a New Project</h3></legend><br/>
       
<label for='name' >: </label><br/>
       <label for='name' >Title: </label><br/>
        <input type='text'  class='inputField' name='txtTitle' value='$researchu->title'/><br/><br/>

       <label for='country'>Grants: </label>
        <input type='text' class='inputField' name='txtGrant' value='$researchu->grant'/><br/><br/>

       <label for='price'>Synopsis: </label>
        <textarea cols='30' rows='3' name='txtSynopsis'></textarea>$researchu->synopsis</br><br/>


        <label for='roast'>Description: </label>
         <textarea cols='30' rows='3' name='txtDescription'></textarea>$researchu->description</br><br/>


          <label for='review'>Researchers: </label>
        <textarea cols='30' rows='3' name='txtResearchers'>$researchu->researchers</textarea></br><br/>

      
           <label for='review'>Partners: </label>
           <textarea cols='30' rows='3' name='txtPartners'>$researchu->partners</textarea></br><br/>
         
</div>

<input type='submit' value='Submit'><br/><br/>
    </fieldset>
</form>";


}

else{
   $content = "<form action='' method='post'>
    <fieldset>
    
        <legend><h3>Add New Project</h3></legend><br/>
        

<label  for='name' >Titles :  </label>
        <textarea class='fortextarea' cols='30' rows='3' name='txtTitle'></textarea></br><br/></br></br>

  <label for='country'>Grants: </label>
        <textarea class='fortextarea' cols='30' rows='3' name='txtGrants'></textarea></br><br/></br></br>
        

        <label for='price'>Synopsis:</label>
           <textarea class='fortextarea' cols='30' rows='3' name='txtSynopsis'></textarea></br><br/></br></br>


        <label for='roast'>Description:</label>
         <textarea class='fortextarea' cols='30'  rows='10' name='txtDescription'></textarea></br><br/></br></br>
         <br/></br></br></br></br></br>

      
        <label for='review'>Researchers: </label>
        <textarea class='fortextarea' cols='30' rows='3' name='txtResearchers'></textarea></br><br/></br></br>

           <label for='review'>Partners: </label>
           <textarea  class='fortextarea' cols='30' rows='3' name='txtPartners'></textarea></br><br/></br><br/>

          <legend><h3>Output</h3></legend><br/>
  
        <label for='review'>Grant: </label>
        <textarea  class='fortextarea' cols='30' rows='3' name='txtPurpose'></textarea></br><br/></br><br/>


          <label for='review'>Conferences: </label>
        <textarea class='fortextarea' cols='30' rows='3' name='txtConferences'></textarea></br><br/></br><br/>


          <label for='review'>Patent: </label>
        <textarea class='fortextarea' cols='30' rows='3' name='txtPatents'></textarea></br><br/></br><br/>


          <label for='review'>Software: </label>
        <textarea class='fortextarea' cols='30' rows='3' name='txtSoftwares'></textarea></br><br/></br><br/>


          <label for='review'>Website Link: </label>
        <textarea class='fortextarea' cols='30' rows='3' name='txtWebsites'></textarea></br><br/></br><br/>


<input style='float:right; margin-right:300px; background: white;  color : #990000;'  
type='submit' name='addproject' value='Submit'><br/><br/>
    </fieldset>
</form>";
}


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
