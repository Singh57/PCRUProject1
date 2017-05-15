  
<?php
     include './header.php';
?>

<legend><h3>Details of Events/Meetings</h3></legend>

<ul id="accordion">
    <?php
    
    
    include './Model/Credentials.php ';
   $connect = mysqli_connect($hostname, $username, $password);
   mysqli_select_db($connect, $databaseName);

        $query = "SELECT * FROM addmeetings ORDER BY title " ;
        $result = mysqli_query($connect,$query) ;
        $dataArray = array();

        //Get data from database
        //<h3>Add New Candidate</h3>.
        while ($row = mysqli_fetch_array($result)) {
        ?>
    <li><div class="mahadi" >Title :<?php echo $row['title']?></div>
		<ul> 
                    
	  	 <h4>Type :<a href="<?php echo $row['partners']?>"><?php echo $row['type']?></a></h4>
                 <h4>Group : <a href="<?php echo $row['http://localhost/PmatPcruProject/index.php']?>"><?php echo $row['groups']?></a></h4>
                 <h4>Partners :<?php echo $row['partners']?></h4>
                 <h4>Date :<?php echo $row['date']?></h4>
                 <h4>Place :<?php echo $row['place']?></h4>
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