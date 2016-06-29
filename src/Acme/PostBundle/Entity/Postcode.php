<?php

namespace Acme\PostBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * Postcode
 *
 * @ORM\Table(name="postcode")
 * @ORM\Entity(repositoryClass="Acme\PostBundle\Repository\PostcodeRepository")
 */
class Postcode
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
     * @ORM\Column(name="value", type="string", length=8)
     */
    private $value;
    
    /**
     * @ORM\OneToMany(targetEntity="Address", mappedBy="postcode")
     */
    private $address;
    
    /**
     * @ORM\ManyToOne(targetEntity="City", inversedBy="postcode")
     * @ORM\JoinColumn(name="city_id", referencedColumnName="id")
     */
    private $city;
    
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
     * @return Postcode
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
    
    /**
     * Set city
     */
    public function setCity($city)
    {
        $this->city = $city;

        return $this;
    }

    /**
     * Get city
     */
    public function getCity()
    {
        return $this->city;
    }
}

