<?php

namespace Acme\PostBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * Country
 *
 * @ORM\Table(name="country")
 * @ORM\Entity(repositoryClass="Acme\PostBundle\Repository\CountryRepository")
 */
class Country
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
     * @ORM\OneToMany(targetEntity="City", mappedBy="country")
     */
    private $city;
    
    /**
     * Association One-To-Many, Bidirectional
     */
    public function __construct() {
        $this->city = new ArrayCollection();
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
     * @return Country
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
     * Get city
     */
    public function getCity()
    {
        return $this->city;
    }
    
}

