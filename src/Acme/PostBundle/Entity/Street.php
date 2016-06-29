<?php

namespace Acme\PostBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * Street
 *
 * @ORM\Table(name="street")
 * @ORM\Entity(repositoryClass="Acme\PostBundle\Repository\StreetRepository")
 */
class Street
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="value", type="string", length=191, unique=true)
     */
    private $value;
    
    /**
     * @ORM\OneToMany(targetEntity="Address", mappedBy="street")
     */
    private $address;
    
    /**
     * Association One-To-Many, Bidirectional
     */
    public function __construct() {
        $this->address = new ArrayCollection();
    }


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set value
     *
     * @param string $value
     *
     * @return Street
     */
    public function setValue($value)
    {
        $this->value = $value;

        return $this;
    }

    /**
     * Get value
     *
     * @return string
     */
    public function getValue()
    {
        return $this->value;
    }
    
    /**
     * Get Address
     */
    public function getAddress()
    {
        return $this->address;
    }
    
    
}

