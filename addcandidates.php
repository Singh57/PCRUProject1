
<?php


require './Controller/PcrController.php';
$pcrController = new PcrController();


$title = "Addproject";

if(isset($_GET["update"]))
{
    
    
$researchu = $pcrController->GetCandidateDataById($_GET["update"]);
    
$content = "


<form action='' method='post'>
    <fieldset>
    
        <legend><h3>Add New Member</h3></legend><br/>
       
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
    
        <legend><h3>Add New Member</h3></legend><br/>
        

        

<label  for='name' >Name :  </label>
        <input type='text' style='float:right; margin-right:160px; min-width:265px; ' class='inputField' name='txtName' /><br/><br/><br/>

 
<label for='country'>Type: </label>
       <select style='float:right; margin-right:160px; min-width:265px; ' name='txtType'>
  <option value='Select' >Select</option>}
  <option value='Current Phd Candidates'>Current Phd Candidates</option>
   <option value='Non PCRU Phd Cndidates'>Non PCRU Phd Cndidates</option>
  <option value='Staff Members'>Staff Members</option>
  <option value='Visitors'>Visitors</option>
 <option value='Key Collaborators'>Key Collaborators</option>
    </select> <br/><br/><br/>

   

        <label for='price'>Position:</label>
      <input type='text' style='float:right; margin-right:160px; min-width:265px;' class='inputField' name='txteducation' /><br/><br/><br/>


        <label for='roast'>Email ID:</label>
        <input type='text' style='float:right; margin-right:160px; min-width:265px;' class='inputField' name='txtemailid' /><br/><br/><br/>

      
        <label for='review'>Projects: </label>
        <textarea style='float:right;margin-right:160px;' cols='30' rows='2' name='txtprojects'></textarea></br><br/></br>

           <label for='review'>Link: </label>
           <textarea  style='float:right;margin-right:160px;' cols='30' rows='2' name='txtpapers'></textarea></br><br/></br><br/>


<input style='float:right; margin-right:300px; background: white;  color : #990000;'  
type='submit' name='addcandidates' value='Submit'><br/><br/>
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
    if(isset($_POST["addcandidates"]))
    {
        $pcrController->InsertCandidateData($_POST);
    }
}


include './Template.php';
?>
