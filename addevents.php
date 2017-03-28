<?php

$title = "Addevents";

$content = "<form action='' method='post'>
    <fieldset>
    
        <legend><h3>Add a new Event</h3></legend><br/>
        <label for='name'>Name: </label>
        <input type='text' class='inputField' name='txtName' /><br/><br/>

        <label for='price'>Type: </label>
        <input type='text' class='inputField' name='txtPrice' /><br/><br/>

        <label for='roast'>Address: </label>
        <input type='text' class='inputField' name='txtRoast' /><br/><br/>

        <label for='country'>Country: </label>
        <input type='text' class='inputField' name='txtCountry' /><br/><br/>

        <label for='review'>Image: </label>
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
