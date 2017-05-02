<?php
class PcrEntity
{
    public $id;
    public $title;
    public $synopsis;
    public $description;
    public $grant;
    public $researchers;
    public $partners;
   public $purpose;
   public $conferences;
   public $patents;
   public $softwares;
   public $websites;
   
 
   
    function __construct($id, $title, $synopsis, $description, $grant, $researchers, $partners,
            $purpose, $conferences, $patents , $softwares ,$websites )
            {
        $this->id = $id;
        $this->title = $title;
        $this->synopsis = $synopsis;
        $this->description = $description;
        $this->grant = $grant;
        $this->researchers = $researchers;
        $this->partners = $partners;
        $this->purpose = $purpose;
        $this->conferences = $conferences;
        $this->patents = $patents;
        $this->softwares = $softwares;
        $this->websites = $websites;
       
         
            }
            
          
}
?>
