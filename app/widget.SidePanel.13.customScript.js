var layersFilterContent = container.appendChild(new Element('div', {
	'class': 'filter layer-filter'
}));
var housingTypesFilterContent = container.appendChild(new Element('div', {
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

   <?php 
   IncludeCSS(Core::PluginDir() . '/Timeline/Widgets/Timeline/css/timeline.css');
    IncludeJS(Core::ViewerDir() . DS . 'Controls' . DS . 'UIRangeSlider.js');
?>
    var rangeFilters={
    estimatedWaitTime:{},
    MonthlyCostOfStay:{},
    maxDurationOfStay:{}
 

  }
 
  var iconizeFilters={

    buildingType:window["BuildingTypeIcons"],
    servicesProvided:window["ServicesProvidedIcons"],
    genderServed:window["GenderServedIcons"],
    primaryTargetResident:window["PrimaryTargetResidentIcons"]
  }


 if(rangeFilters[field]||field.indexOf('NumberOf')>=0){


    return {

      listTemplate:function(values){

        var me=this; //bound to Attributes filter object
        var div=new Element('div', {"class":"timeline-container"});

        var range=[Math.min.apply(null, values.map(function(a){return parseInt(a);})), Math.max.apply(null, values.map(function(a){return parseInt(a);}))];
        if(range[0]===range[1]){
             return UIAttributeFilterControl.DefaultFilterListTemplate.bind(me)(values);
        }

   
        var rangeSelection=new UIRangeSlider(div, {
         
          range:range,
          state:range.slice(0),
          spanValueFormatter:function(label, state){
            return state;
          },
          minValueFormatter:function(label, state){
            return Math.round(state[0]*10)/10.0;
          },
          maxValueFormatter:function(label, state){
            return Math.round(state[1]*10)/10.0;
          }

          
        });


        return div;

      }

    }

  }


  if(iconizeFilters[field]){

    return {
      listTemplate:function(values){

        //Rendering an icon selection ui instead of <ul><li>...
        
        //defined in global behavior widget.
        var attributes=window.attributeValueList[field]||values;

        var me=this; //bound to Attributes filter object

        var div=new Element('div');
        var iconSelection=new UIIconizedSelectionControl(div, {

          icons: iconizeFilters[field],
        });

        iconSelection.addEvent('loadIcon', function(icon, i, asset){
          me._addMouseEventsForFilterItem(asset, attributes[i]);
          new UIPopover(asset, {title:attributes[i], anchor:UIPopover.AnchorTo(['bottom'])});
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
  "fieldBlackList"=>array("email", "phoneNumber", "positionOfContact", "hasService*"),
  "tableBlackList"=>array("agencyAttributes"),
  "moduleOptionsScript"=>'
    
       return getAttributeFilterParameters(field, table);

  '
));
?>;
attributesMod.load(null, housingTypesFilterContent, null);