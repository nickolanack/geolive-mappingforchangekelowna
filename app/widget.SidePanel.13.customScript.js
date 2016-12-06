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
 
//TODO: use global icons sets instead of duplicating icons here, and in wizard forms

  var iconizeFilters={

    buildingType:window["BuildingTypeIcons"],
    servicesProvided:window["ServicesProvidedIcons"]


  }


  if(iconizeFilters[field]){

    return {
      listTemplate:function(values){

        //Rendering an icon selection ui instead of 

        var me=this; //bound to Attributes filter object

        var div=new Element('div');
        var iconSelection=new UIIconizedSelectionControl(div, {

          icons: iconizeFilters[field],
        });

        iconSelection.addEvent('loadIcon', function(icon, i, asset){
          me._addMouseEventsForFilterItem(asset, values[i]);
        });




        return div;


      }

    };

  }

 
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