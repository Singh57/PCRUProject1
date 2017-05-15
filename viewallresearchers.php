  
<?php 
include './header.php';
?>
<legend><h3>List Of Researchers</h3></legend>

<ul id="accordion">
<li><div class="mahadi" >Staff Members </div>
		
    
      
    <?php
    
    
    include './Model/Credentials.php ';
   $connect = mysqli_connect($hostname, $username, $password);
   mysqli_select_db($connect, $databaseName);

     $query = "SELECT * FROM addcandidates Where type ='Staff Members' ORDER BY name ";
     $result = mysqli_query($connect,$query) ;
        $dataArray = array();

        //Get data from database.
        while ($row = mysqli_fetch_array($result)) {
        ?>
    <li><div  class="mahadi1"><?php echo $row['name']?></div>
		<ul> 
                    
                    <h4>Author Type :<a target="_blank" href="<?php echo $row['www.google.com']?>"><?php echo $row['type']?></a></h4>
                 <h4>Education : <?php echo $row['education']?></h4>
                 <h4>Email ID :<?php echo $row['emailid']?></h4>
                 <h4>Projects :<?php echo $row['projects']?></h4>
                <h4>Paper-Link:<a href="<?php echo $row['papers']?>"><?php echo $row['papers']?></a></h4>
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

<script type="text/javascript">
     $('#accordion1 ul').slideUp();
$("#accordion1 > li > div").click(function(){
 
    if(false == $(this).next().is(':visible')) {
        $('#accordion1 ul').slideUp(300);
    }
    $(this).next().slideToggle(300);
});
 

</script>


         <?php
     include './footer.php';
?>