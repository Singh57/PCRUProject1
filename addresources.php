<?php

$title = "AddResources";

$content = "<form action='' method='post'>
    <fieldset>
    
        <legend><h3>Add a New Resource</h3></legend><br/>
        <label for='name'>Name: </label>
        <input type='text' class='inputField' name='txtName' /><br/><br/>

        <label for='price'>Type: </label>
        <input type='text' class='inputField' name='txtPrice' /><br/><br/>

        <label for='roast'>Author: </label>
        <input type='text' class='inputField' name='txtRoast' /><br/><br/>

        <label for='country'>Last Updated:</label>
        <input type='text' class='inputField' name='txtCountry' /><br/><br/>

        <label for='review'>Review: </label>
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
