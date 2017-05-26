
<?php


require './Controller/PcrController.php';
$pcrController = new PcrController();


$title = "Addproject";

   $content = "<form action='' method='post'>
    <fieldset>
    
        <legend><h3>Add New PCRU Meeting</h3></legend><br/>
        

<label >Title :  </label>
 <input type='text' style='float:right; margin-right:120px; min-width:265px; ' class='inputField' name='txtName' /><br/><br/><br/>

 
<label>Type : </label>
       <select style='float:right; margin-right:120px; min-width:265px; ' name='txtType'>
  <option value='Select' >Select</option>}
  <option value='Conference'>Conference</option>
   <option value='Sessions'>Sessions</option>
  <option value='Topic For Lecturer'>Topic For Lecturer</option>
  <option value='Workshop'>Workshop</option>
 <option value='Others'>Others</option>
    </select> <br/><br/><br/>

   

        <label>Discussion Group:</label>
          <select style='float:right; margin-right:120px; min-width:265px; ' name='txteducation'>
  <option value='Select' >Select</option>}
  <option value='Phd discussion group'>Phd discussion group</option>
   <option value='Community enagagement activity'>Community enagagement activity</option>
  <option value='Visitors'>Visitors</option>
  <option value='Others'>Others</option>
    </select> <br/><br/><br/>

   

        <label>Partners:</label>
             <select style='float:right; margin-right:120px; min-width:265px; ' name='txtemailid'>
  <option value='Select' >Select</option>}
  <option value='University Partners'>University Partners</option>
   <option value='Other Industry Partners'>Other Industry Partners</option>
 <option value='Others'>Others</option>
    </select> <br/><br/><br/>


   
      
        <label>Date: </label>
        <textarea style='float:right;margin-right:120px;' cols='30' rows='2' name='txtprojects'></textarea></br><br/></br>

           <label>Place: </label>
           <textarea  style='float:right;margin-right:120px;' cols='30' rows='2' name='txtpapers'></textarea></br><br/></br><br/>


<input style='float:right; margin-right:300px; background: white;  color : #990000;'  
type='submit' name='addmeetings' value='Submit'><br/><br/>
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
    if(isset($_POST["addmeetings"]))
    {
        $pcrController->InsertmeetingsData($_POST);
    }
}


include './Template.php';
?>
