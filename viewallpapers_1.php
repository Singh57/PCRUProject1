  
<?php 
include './header.php';
?>

<legend><h3>Published Papers List</h3></legend>
<ul id="accordion">
<li><div class="mahadi" >Published Papers </div>
		
    
    <ul id="accordion1">    
    <?php
    
    
    include './Model/Credentials.php ';
   $connect = mysqli_connect($hostname, $username, $password);
   mysqli_select_db($connect, $databaseName);

     $query = "SELECT * FROM addnewpaper Where status ='Published Papers' ORDER BY title ";
     $result = mysqli_query($connect,$query) ;
        $dataArray = array();

        //Get data from database.
        while ($row = mysqli_fetch_array($result)) {
        ?>
        <li><div  class="mahadi1"><a href="<?php echo $row['link']?>"><?php echo $row['title']?></a></div>
		
    </li>
        <?php }
        
        
        ?>
</ul>
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