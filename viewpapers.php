  
<?php 
include './header.php';
?>

<legend><h3> List of Papers</h3></legend>

<ul id="accordion">
<li><div class="mahadi" >Almost Submitted</div>
		
    
    <ul id="accordion1">    
    <?php
    
    
    include './Model/Credentials.php ';
   $connect = mysqli_connect($hostname, $username, $password);
   mysqli_select_db($connect, $databaseName);

     $query = "SELECT * FROM addpapers Where status ='Almost Submitted' ORDER BY title ";
     $result = mysqli_query($connect,$query) ;
        $dataArray = array();

        //Get data from database.
        while ($row = mysqli_fetch_array($result)) {
        ?>
    <li><div class="mahadi1" ><?php echo $row['title']?></div>
		<ul> 
                    
        <h4>Authors : <?php echo $row['authors']?></h4>
                <h4> Description : <?php echo $row['description']?></h4>
                 <h4>Citation :<?php echo $row['citation']?></h4>
                 <h4>Publisher :<?php echo $row['publisher']?></h4>
                 <h4>Links :<a href="<?php echo $row['links']?>"><?php echo $row['links']?></a></h4>
                 <h4>Publication Date :<?php echo $row['publicationdate']?></h4>
               </ul>
    </li>
        <?php }
        
        
        ?>
</ul>
</ul> 



<ul id="accordion">
<li><div class="mahadi" >Proposed Papers</div>
		
    
    <ul id="accordion1">    
    <?php
    
    
    include './Model/Credentials.php ';
   $connect = mysqli_connect($hostname, $username, $password);
   mysqli_select_db($connect, $databaseName);

     $query = "SELECT * FROM addpapers Where status ='Proposed Papers' ORDER BY title";
     $result = mysqli_query($connect,$query) ;
        $dataArray = array();

        //Get data from database.
        while ($row = mysqli_fetch_array($result)) {
        ?>
    <li><div  class="mahadi1"><?php echo $row['title']?></div>
		<ul> 
                    
        <h4>Authors : <?php echo $row['authors']?></h4>
                <h4> Description : <?php echo $row['description']?></h4>
                 <h4>Citation :<?php echo $row['citation']?></h4>
                 <h4>Publisher :<?php echo $row['publisher']?></h4>
                 <h4>Links :<a href="<?php echo $row['links']?>"><?php echo $row['links']?></a></h4>
                 <h4>Publication Date :<?php echo $row['publicationdate']?></h4>
               </ul>
    </li>
        <?php }
        
        
        ?>
</ul>
</ul>

<ul id="accordion">
<li><div class="mahadi" >Current Papers </div>
		
    
    <ul id="accordion1">    
    <?php
    
    
    include './Model/Credentials.php ';
   $connect = mysqli_connect($hostname, $username, $password);
   mysqli_select_db($connect, $databaseName);

     $query = "SELECT * FROM addpapers Where status ='Current Papers' ORDER BY title ";
     $result = mysqli_query($connect,$query) ;
        $dataArray = array();

        //Get data from database.
        while ($row = mysqli_fetch_array($result)) {
        ?>
    <li><div  class="mahadi1"><?php echo $row['title']?></div>
			<ul> 
                    
        <h4>Authors : <?php echo $row['authors']?></h4>
                <h4> Description : <?php echo $row['description']?></h4>
                 <h4>Citation :<?php echo $row['citation']?></h4>
                 <h4>Publisher :<?php echo $row['publisher']?></h4>
                 <h4>Links :<a href="<?php echo $row['links']?>"><?php echo $row['links']?></a></h4>
                 <h4>Publication Date :<?php echo $row['publicationdate']?></h4>
               </ul>
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