<?php

class IsearchAjaxController extends core\AjaxController implements core\PluginMember
{
    
    use core\PluginMemberTrait;

    protected function getUserAgencies($task, $json)
    {


    	if(GetClient()->isGuest()){
    		 return $this->setError('not implemented');
		}
       
    	

    		GetPlugin('Maps');
    		GetPlugin('Attributes');
    		$email=GetClient()->getEmail();
    		//$email="manager@recoverykelowna.ca";
    		
    		$json=json_decode('{"filters":{"join":"intersect","table":"agencyAttributes","set":"*","filters":[{"field":"contactEmail","comparator":"equalTo","value":"'.$email.'"}]}}');


    		$filtered=(new \spatial\AttributeFeatures())->fromJson($json);
    		$filtered['results']['agencies']=array();

    		foreach($filtered['results']['matches'] as $layerItems){

    			foreach($layerItems as $id=>$marker){
    				$filtered['results']['agencies'][]=(new \spatial\FeatureLoader())->fromId($id)->getMetadata();
    			}
    			
    		}

    		return array_merge(
    			array(
    				'distinct'=>(new \attributes\Record('agencyAttributes'))->distinctValues('contactEmail')
    			),
    			$filtered
    		);
    		
			
    		


    	
    }



   
}
