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
   
    
    function __construct($id, $title, $synopsis, $description, $grant, $researchers, $partners) {
        $this->id = $id;
        $this->title = $title;
        $this->synopsis = $synopsis;
        $this->description = $description;
        $this->grant = $grant;
        $this->researchers = $researchers;
        $this->partners = $partners;
    }
}
?>
