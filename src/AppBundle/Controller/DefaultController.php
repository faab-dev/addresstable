<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Acme\PostBundle\Entity\Address;
use Acme\PostBundle\Entity\City;
use Acme\PostBundle\Entity\Country;
use Acme\PostBundle\Entity\Poscode;
use Acme\PostBundle\Entity\Street;



/**
 * DefaultController
 * 
 * @package paper2
 * @author Fyodorov
 * @copyright 2016
 * @version $Id$
 * @access public
 */
class DefaultController extends Controller
{ 
     
    /**
     * @Route("/{_locale}", defaults={"_locale": "en"}, requirements={
     *     "_locale": "en|ru"
     * })
     */
    public function indexAction(Request $request)
    {
        return $this->render('default/index.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.root_dir').'/..'),
        ]);
    }
    
    /**
     * @Route("/ajax", name="ajax")
     */
    public function ajaxAction(Request $request)
    {
        $request = Request::createFromGlobals();
        
        // @TODO: work out this ajaxAction
        
        // init an array, which will be encoded to json format  
        $result = [];
        
        // total amount of rows -> required by pagination in ng-table  
        $result['inlineCount'] = 0;
            
        // content data
        $result['results'] = [];
        
        return new Response(json_encode($result));

    }
}
