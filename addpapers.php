
<?php


require './Controller/PcrController.php';
$pcrController = new PcrController();


$title = "Add Papers";

if(isset($_GET["update"]))
{
    
    
$researchu = $pcrController->GetCandidateDataById($_GET["update"]);
    
$content = "


<form action='' method='post'>
    <fieldset>
    
        <legend><h3>Add New Candidate</h3></legend><br/>
       
<label for='name' >: </label><br/>
       <label for='name' >Name: </label><br/>
        <input type='text'  class='inputField' name='txtName' value='$researchu->name'/><br/><br/>

       <label for='country'>Type: </label>
        <input type='text' class='inputField' name='txtType' value='$researchu->type'/><br/><br/>

       <label for='price'>Education: </label>
           <textarea cols='30' rows='3' name='txtEducation'></textarea>$researchu->education</br><br/>


        <label for='roast'>Email Id: </label>
         <textarea cols='30' rows='3' name='txtEmailid'></textarea>$researchu->emailid</br><br/>


          <label for='review'>Projects: </label>
        <textarea cols='30' rows='3' name='txtprojects'>$researchu->projects</textarea></br><br/>

      
           <label for='review'>Papers: </label>
           <textarea cols='30' rows='3' name='txtpapers'>$researchu->papers</textarea></br><br/>
</div>

<input type='submit' value='Submit'><br/><br/>
    </fieldset>
</form>";


}

else{
   $content = "<form action='' method='post'>
    <fieldset>
    
        <legend><h3>Add New Paper</h3></legend><br/>
        

       <label  for='name' >Title :  </label>
        <input type='text' style='float:right; margin-right:130px; min-width:265px; ' class='inputField' name='txtTitle' /><br/><br/><br/>

 
<label for='country'>Authors: </label>
      <textarea style='float:right;margin-right:130px;' cols='30' rows='2' name='txtAuthors'></textarea></br><br/></br>

        <label for='price'>Description :</label>
      <input type='text' style='float:right; margin-right:130px; min-width:265px;' class='inputField' name='txtIssues' /><br/><br/><br/>


        <label for='roast'>Citation :</label>
        <input type='text' style='float:right; margin-right:130px; min-width:265px;' class='inputField' name='txtToken' /><br/><br/><br/>

      <label for='roast'>Publisher :</label>
        <input type='text' style='float:right; margin-right:130px; min-width:265px;' class='inputField' name='txtPublishing' /><br/><br/><br/>

<label for='roast'>Link :</label>
        <input type='text' style='float:right; margin-right:130px; min-width:265px;' class='inputField' name='txtLinks' /><br/><br/><br/>

 <label for='review'>Publication Date: </label>
         <input type='text' style='float:right; margin-right:130px; min-width:265px;' class='inputField' name='txtDate' /><br/><br/><br/>

           <label for='review'>Status: </label>
             <select style='float:right; margin-right:130px; min-width:265px; ' name='txtStatus'>
  <option value='Select' >Select</option>}
  <option value='Almost Submitted'>Almost Submitted</option>
   <option value='Current Papers'>Current Papers</option>
  <option value='Proposed Papers'>Proposed Papers</option>
   </select> <br/><br/><br/>
    

<input style='float:right; margin-right:300px; background: white;  color : #990000;'  
type='submit' name='addpapers' value='Submit'><br/><br/>
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
    if(isset($_POST["addpapers"]))
    {
        $pcrController->InsertPapersData($_POST);
    }
}


include './Template.php';
?>
