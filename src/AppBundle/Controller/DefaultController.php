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
        
        $count = $request->query->get('count');
        $page = $request->query->get('page');
        $sorting = $request->query->get('sorting');
        $filters = $request->query->get('filter');
        
        if(isset($filters['houseNumber'])){
            $houseNumber = explode("-", $filters['houseNumber']);
        }else{
            $houseNumber = array(1, 150);
        }
        
        // init an array, which will be encoded to json format  
        $result = [];
        
        $repository = $this->getDoctrine()->getRepository('AcmePostBundle:Address');
        
        $query = $repository->createQueryBuilder('a')->select('co.value AS country', 'c.value as city', 
                's.value as street', 
                'a.houseNumber as houseNumber', 
                'p.value as postcode', 
                'a.created as created')
            ->join('a.street', 's')
            ->join('a.postcode', 'p')
            ->join('p.city', 'c')
            ->join('c.country', 'co');
            
        $query = $query
            ->where('a.houseNumber BETWEEN :houseNumberMin AND :houseNumberMax')
            ->setParameter('houseNumberMin', $houseNumber[0])
            ->setParameter('houseNumberMax', $houseNumber[1]);
        
        // @TODO work out other filters
        
        // @TODO work out sorting
        
        // total amount of rows -> required by pagination in ng-table  
        $result['inlineCount'] = count($query->getQuery()->getResult());
            
        // content data
        $result['results'] = $query
            ->setFirstResult(($page-1)*100)
            ->setMaxResults($count)
            ->getQuery()
            ->getResult();
        
        return new Response(json_encode($result));

    }
}
