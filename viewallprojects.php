  
<?php
     include './header.php';
?>
<ul id="accordion">
    <?php
    
    
    include './Model/Credentials.php ';
   $connect = mysqli_connect($hostname, $username, $password);
   mysqli_select_db($connect, $databaseName);

        $query = "SELECT * FROM addproject";
        $result = mysqli_query($connect,$query) ;
        $dataArray = array();

        //Get data from database
        //<h3>Add New Candidate</h3>.
        while ($row = mysqli_fetch_array($result)) {
        ?>
    <li><div class="mahadi" >Project Title :<?php echo $row['title']?></div>
		<ul> 
                    
	  	 <h4>Description :<a href="<?php echo $row['partners']?>"><?php echo $row['description']?></a></h4>
                 <h4>Grants : <a href="<?php echo $row['http://localhost/PmatPcruProject/index.php']?>"><?php echo $row['grants']?></a></h4>
                 <h4>Synopsis :<?php echo $row['synopsis']?></h4>
                 <h4>Researchers :<?php echo $row['researchers']?></h4>
                 <h4>Partners :<?php echo $row['partners']?></h4>
                 <h4>Purpose :<?php echo $row['purpose']?></h4>
                 <h4>Conferences :<?php echo $row['conferences']?></h4>
                <h4>Patents Link :<a href="<?php echo $row['patents']?>"><?php echo $row['patents']?></a></h4>
                 <h4>Softwares :<?php echo $row['softwares']?></h4>
                <h4>Website Link :<a href="<?php echo $row['websites']?>"><?php echo $row['websites']?></a></h4>
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