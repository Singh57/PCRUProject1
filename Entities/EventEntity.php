<?php
class CoffeeEntity
{
    public $id;
    public $name;
    public $type;
    public $address;
    public $country;
    public $image;
   
    
    function __construct($id, $name, $type, $address, $country, $image) {
        $this->id = $id;
        $this->name = $name;
        $this->type = $type;
        $this->roast = $address;
        $this->country = $country;
        $this->image = $image;
      
    }
}
?>
