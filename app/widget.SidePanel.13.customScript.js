var layersFilterContent = container.appendChild(new Element('div', {
	'class': 'filter layer-filter'
}));
var housingTypesFilterContent = container.appendChild(new Element('div', {
	'class': 'filter housing-filter'
}));
var servicesTypesFilterContent = container.appendChild(new Element('div', {
	'class': 'filter services-filter'
}));

var layersMod=<?php
Core::Modules();
$module = Module::LoadModule('LayerLegend', array());
echo $module->display($targetInstance->getJSObjectName(), $targetInstance->getJSObjectName(), 'map', array(
   "iconSize"=>32,
   "shouldShowLayerScript"=>'
  
        return id!=4;

   '


));
?>;
layersMod.load(null, layersFilterContent, null);


var getAttributeFilterParameters=function(field, table){
 
   return {};

};


var attributesMod=<?php
$module = Module::LoadModule('plugin.Attributes.AttributeFilterGroup', array());
echo $module->display($targetInstance->getJSObjectName(), $targetInstance->getJSObjectName(), 'map', array(
    "preferredSortOrder"=>array(
        "buildingType", 
        "servicesProvided", 
        "otherServices",
       "primaryTargetResident", 
       "genderServed", 
       "demographicServed"
    ),
  "fieldBlackList"=>array("email"),
  "tableBlackList"=>array("agencyAttributes"),
  "moduleOptionsScript"=>'
    
       return getAttributeFilterParameters(field, table);

  '
));
?>;
attributesMod.load(null, housingTypesFilterContent, null);