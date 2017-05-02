<?php
class PcrEntity2
{
   
    public $name;
   public $type;
   public $education;
   public $emailid;
   public $projects;
   public $papers;
   
    function __construct($name, $type, $education, $emailid,$projects, $papers)
            {
        $this->name = $name;
        $this->type = $type;
        $this->education = $education;
        $this->emailid = $emailid;
        $this->projects = $projects;
        $this->papers = $papers;
            }
}
?>
