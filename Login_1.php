<?php
$title = "Admin";

$content = "<form action='' method='post'>
    <fieldset>
    
        <legend><h3>Authentication</h3></legend><br/>
        
        <label for='name'>Username: </label>
        <input type='text' class='inputField' name='txtName' /><br/><br/>

        <label for='price'>Password: </label>
        <input type='text' class='inputField' name='txtPrice' /><br/><br/>

       

        <input type='submit' value='Submit'><br/><br/>
    </fieldset>
</form>";
include './Template.php';
?>
