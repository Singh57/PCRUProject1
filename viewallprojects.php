  
<?php 
include './header.php';
?>

<script src="js/rt-menu.js" type="text/javascript"></script>
<script src="js/js_9dbc62f17dada3128baa71d7eb582ac9.js" type="text/javascript"></script>

<ul id="accordion">
    <?php
    
    
    include './Model/Credentials.php ';
   $connect = mysqli_connect($hostname, $username, $password);
   mysqli_select_db($connect, $databaseName);

        $query = "SELECT * FROM addnewproject";
        $result = mysqli_query($connect,$query) ;
        $dataArray = array();

        //Get data from database.
        while ($row = mysqli_fetch_array($result)) {
        ?>
    <li><div class="mahadi" ><?php echo $row['title']?></div>
		<ul> 
	  	 <h1 > <a href="<?php echo $row['researchers']?>"><?php echo $row['description']?></a></h1>
                 <h1><?php echo $row['grant']?></h1>
                 <h1><?php echo $row['synopsis']?></h1>
                </ul>
    </li>
        <?php }
        
        
        ?>
</ul>

<script type="text/javascript">
     $('#accordion ul').slideUp();
$("#accordion > li > div").click(function(){
 
    if(false == $(this).next().is(':visible')) {
        $('#accordion ul').slideUp(300);
    }
    $(this).next().slideToggle(300);
});
 

</script>


         <?php 
     include './footer.php';
?>