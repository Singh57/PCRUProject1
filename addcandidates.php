
<?php


require './Controller/PcrController.php';
$pcrController = new PcrController();

$title = "Addproject";
   

   $content = "<form action='' method='post'>
    <fieldset>
    
        <legend><h3>Add New Member</h3></legend><br/>
        

        

<label>Name :  </label>
        <input type='text' style='float:right; margin-right:160px; min-width:265px; ' class='inputField' name='txtName' /><br/><br/><br/>

 
<label>Type: </label>
       <select style='float:right; margin-right:160px; min-width:265px; ' name='txtType'>
  <option value='Select' >Select</option>}
  <option value='Current Phd Candidates'>Current Phd Candidates</option>
  <option value='Staff Members'>Staff Members</option>
  <option value='Visitors'>Visitors</option>
 <option value='Key Collaborators'>Key Collaborators</option>
    </select> <br/><br/><br/>

   

        <label>Phd Students:</label>
        <textarea style='float:right;margin-right:160px;' cols='30' rows='3' name='txteducation'></textarea></br><br/></br></br>


        <label>Email ID:</label>
        <input type='text' style='float:right; margin-right:160px; min-width:265px;' class='inputField' name='txtemailid' /><br/><br/><br/>

      
        <label>Project Link: </label>
        <textarea style='float:right;margin-right:160px;' cols='30' rows='2' name='txtprojects'></textarea></br><br/></br>

           <label>Paper Link: </label>
           <textarea  style='float:right;margin-right:160px;' cols='30' rows='2' name='txtpapers'></textarea></br><br/></br><br/>


<input style='float:right; margin-right:300px; background: white;  color : #990000;'  
type='submit' name='addcandidates' value='Submit'><br/><br/>
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
    if(isset($_POST["addcandidates"]))
    {
        $pcrController->InsertCandidateData($_POST);
    }
}


include './Template.php';
?>
