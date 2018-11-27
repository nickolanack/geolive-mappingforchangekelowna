<?php
 GetPlugin('Isearch')->includeScripts();
?>
sidePanel.addEvent('show:once', function() {
	var filterBuilder = new IsearchFilterBuilder(map, container, {
	    rangeFilters : function(){ return {
			estimatedWaitTime: {},
			MonthlyCostOfStay: {},
			maxDurationOfStay: {}


		}; },

	    iconizeFilters : function(){ return {

			buildingType: window["BuildingTypeIcons"],
			servicesProvided: window["ServicesProvidedIcons"],
			sex: window["GenderServedIcons"],
			primaryTargetResident: window["PrimaryTargetResidentIcons"]
		}; },

		attributeList:function(){ return window.attributeValueList; }

	    
	    
	    
	});
	var attributesMod = <?php



    $whiteList=array(
        "buildingType", 
        "servicesProvided", 
        "primaryTargetResident", 
        "sex", 
        "demographicServed"

    );


$module = Module::LoadModule('plugin.Attributes.AttributeFilterGroup', array());
echo $module->display($targetInstance->getJSObjectName(), $targetInstance->getJSObjectName(), 'map', array(
    "preferredSortOrder"=>$whiteList,
    "fieldWhiteList"=>$whiteList,

  "moduleOptionsScript"=>'
    
       return filterBuilder.getAttributeFilterParameters(field, table);

  '
));
?>;

	attributesMod.load(null, filterBuilder.getElement(), null);
});