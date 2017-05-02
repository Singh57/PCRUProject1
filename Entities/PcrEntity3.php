<?php
class PcrEntity3
{
   
    public $title;
   public $authors;
   public $issues;
   public $token;
   public $publishing;
   public $links;
   public $date;
   public $status;
   
   
    function __construct($title, $authors, $issues, $token,$publishing, $links, $date, $status)
            {
        $this->title = $title;
        $this->authors = $authors;
        $this->issues = $issues;
        $this->token = $token;
        $this->publishing = $publishing;
        $this->links = $links;
        $this->date = $date;
        $this->status = $status;
            }
}
?>
