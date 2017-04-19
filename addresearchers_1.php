<?php

$title = "AddResearchers";

$content = "<form action='' method='post'>
    <fieldset>
    
  <legend><h3>Add a New Candidates</h3></legend><br/>
       
      <label for='type'>Author Type: </label>
      <input type='text' class='inputField' name='txtName' /><br/><br/>
 

       <label for='name'>Name: </label>
        <input type='text' class='inputField' name='txtName' /><br/><br/>

  
        <label for='ResearchInterests'>Paper Name :</label>
        <input type='text' class='inputField' name='Research Interests' /><br/><br/>

        <label for='CurrentResearchProjects'>Add Link: </label>
        <input type='text' class='inputField' name='txtCountry' /><br/><br/>

        <input type='submit' value='Submit'><br/><br/>
    </fieldset>
</form>";



include './Template.php';
?>
