
<?php


require './Controller/PcrController.php';
$pcrController = new PcrController();


$title = "Add Papers";


   $content = "<form action='' method='post'>
    <fieldset>
    
        <legend><h3>Add New Paper</h3></legend><br/>
        

       <label >Title :  </label>
        <input type='text' style='float:right; margin-right:130px; min-width:265px; ' class='inputField' name='txtTitle' /><br/><br/><br/>


<label>Link :</label>
        <input type='text' style='float:right; margin-right:130px; min-width:265px;' class='inputField' name='txtLinks' /><br/><br/><br/>

 
           <label>Status: </label>
             <select style='float:right; margin-right:130px; min-width:265px; ' name='txtStatus'>
  <option value='Select' >Select</option>}
    <option value='Published Papers'>Published Papers</option>
 <option value='Papers In Progress'>Papers In Progress</option>
  <option value='Proposed Papers'>Proposed Papers</option>
   </select> <br/><br/><br/>
    

<input style='float:right; margin-right:300px; background: white;  color : #990000;'  
type='submit' name='addnewpapers' value='Submit'><br/><br/>
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
    if(isset($_POST["addnewpapers"]))
    {
        $pcrController->InsertNewPapersData1($_POST);
    }
}


include './Template.php';
?>
