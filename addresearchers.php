<?php

$title = "AddResearchers";

$content = "<form action='' method='post'>
    <fieldset>
    
        <legend><h3>Add a New Researcher</h3></legend><br/>
        <label for='name'>Name: </label>
        <input type='text' class='inputField' name='txtName' /><br/><br/>

  
        <label for='ResearchInterests'>Research interests: </label>
        <input type='text' class='inputField' name='Research Interests' /><br/><br/>

        <label for='CurrentResearchProjects'>Current research projects: </label>
        <input type='text' class='inputField' name='txtCountry' /><br/><br/>

        <input type='submit' value='Submit'><br/><br/>
    </fieldset>
</form>";

if(isset($_POST["txtName"]))
{
    $pcrController->InsertEvent();
}

include './Template.php';
?>
