<?php


require './Controller/PcrController.php';
$pcrController = new PcrController();


$title = "Login";

if(isset($_GET["update"]))
{
    
    
$researchu = $pcrController->GetCandidateDataById($_GET["update"]);
    
$content = "


<form action='' method='post'>
    <fieldset>
    
        <legend><h3>Add New Candidate</h3></legend><br/>
       
<label for='name' >: </label><br/>
       <label for='name' > UserName: </label><br/>
        <input type='text'  class='inputField' name='txtName' value='$researchu->username'/><br/><br/>

       <label for='country'>Password: </label>
        <input type='text' class='inputField' name='txtType' value='$researchu->password'/><br/><br/>

     
</div>

<input type='submit' value='Submit'><br/><br/>
    </fieldset>
</form>";


}

else{
   $content = "<form action='loginmodel.php' method='post'>
    <fieldset>
    
        <legend><h3>Please Login</h3></legend><br/>
        

        

<label  for='name' >User Name :  </label>
        <input type='text' style='float:right; margin-right:160px; min-width:265px; ' class='inputField' name='username' /><br/><br/><br/>
 
      <label for='price'>Password :</label>
      <input type='text' style='float:right; margin-right:160px; min-width:265px;' class='inputField' name='password' /><br/><br/><br/>



<input style='float:right; margin-right:300px; background: white;  color : #990000;'  
type='submit' name='validatelogin' value='Login'><br/><br/>
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
    if(isset($_POST["validatelogin"]))
    {
        $pcrController->InsertCandidateData($_POST);
    }
}


include './Template.php';
?>
