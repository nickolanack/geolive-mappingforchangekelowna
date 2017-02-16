var layersFilterContent = container.appendChild(new Element('div', {
  'class': 'filter layer-filter'
}));
var attributesFilterContent = container.appendChild(new Element('div', {}));
var attributesFilterContentAlt = gutter.appendChild(new Element('div', {}));
var servicesTypesFilterContent = container.appendChild(new Element('div', {
  'class': 'filter services-filter'
}));

var layersMod = <?php
Core::Modules();
$module = Module::LoadModule('LayerLegend', array());
echo $module->display($targetInstance->getJSObjectName(), $targetInstance->getJSObjectName(), 'map', array(
   "iconSize"=>32,
   "shouldShowLayerScript"=>'
  
        return id!=4; //red zone layer id (its already displayed in bottom left legend).

   '


));
?>;
layersMod.load(null, layersFilterContent, null);


var getAttributeFilterParameters = function(field, table) {

    //TODO: use global icons sets instead of duplicating icons here, and in wizard forms

    <?php 
   IncludeCSS(Core::PluginDir() . '/Timeline/Widgets/Timeline/css/timeline.css');
    IncludeJS(Core::ViewerDir() . DS . 'Controls' . DS . 'UIRangeSlider.js');
?>
    var rangeFilters = {
      estimatedWaitTime: {},
      MonthlyCostOfStay: {},
      maxDurationOfStay: {}


    }

    var iconizeFilters = {

      buildingType: window["BuildingTypeIcons"],
      servicesProvided: window["ServicesProvidedIcons"],
      genderServed: window["GenderServedIcons"],
      primaryTargetResident: window["PrimaryTargetResidentIcons"]
    }

    



    if (rangeFilters[field] || field.indexOf('NumberOf') >= 0) {


      return {

        filterBuilder: function(values) {
          var me = this;
          fieldMetadata = me.getFieldMetadata();

          return map.getContentFilterManager().makeFilter(fieldMetadata.tableName, 
              [
                {
                  field: fieldMetadata.title,
                  comparator: 'greatorThanOrEqualTo',
                  value: values[0]
                },
                {
                  field: fieldMetadata.title,
                  comparator: 'lessThanOrEqualTo',
                  value: values[1]
                }

              ]
            
          );
        },
        listTemplate: function(values) {

          var me = this; //bound to Attributes filter object
          var div = new Element('div', {
            "class": "timeline-container"
          });

          var values=values.map(function(a) {
            return parseInt(a);
          });

          if(values[0]===0){
            values.shift();
          }

          var range = [Math.min.apply(null, values), Math.max.apply(null, values)];

          //range[0]=Math.max(1, range[0]);

          if (range[0] === range[1]) {
            //range[1] = 100;
          }

          if (range[0] === range[1]||values.length<=1) {
            return UIAttributeFilterControl.DefaultFilterListTemplate.bind(me)(values);
          }


          var rangeSelection = new UIRangeSlider(div, {

            range: range,
            state: range.slice(0),
            spanValueFormatter: function(label, state) {
              return state;
            },
            minValueFormatter: function(label, state) {
              return Math.round(state[0]);
            },
            maxValueFormatter: function(label, state) {
              return Math.round(state[1]);
            }


          });

          rangeSelection.addEvent('change',function(state){

            if(state[0]===range[0]&&state[1]===range[1]){
                me.filterManager.clear(true);
                return;
              }

            me.applyFilter(state);

          });

          me.filterManager.addEvent('clear',function(){
            rangeSelection._setState(range.slice(0), true);
          });


          return div;

        }

      }

    }


    if (iconizeFilters[field]) {

      return {
        filterBuilder: function(values) {
          var me = this;
          fieldMetadata = me.getFieldMetadata();

          return map.getContentFilterManager().makeFilter(fieldMetadata.tableName, values.map(function(v) {
              return {
                field: fieldMetadata.title,
                comparator: 'equalTo',
                value: v
              };
            })
          );
        },
        listTemplate: function(values) {

          //Rendering an icon selection ui instead of <ul><li>...

          //defined in global behavior widget.
          var attributes = window.attributeValueList[field] || values;

          var me = this; //bound to Attributes filter object

          var div = new Element('div');
          var iconSelection = new UIIconizedSelectionControl(div, {
              allowMultipleSelection: true,
              allowEmptySelection: true,
              icons: iconizeFilters[field],
              
            });

            iconSelection.addEvent('loadIcon', function(icon, i, asset) {
              new UIPopover(asset, {
                title: attributes[i].capitalize(),
                anchor: UIPopover.AnchorTo(['bottom'])
              });
            }); 

            iconSelection.addEvent('selectionChanged', function(selection) {

              if(selection.length===0){
                me.filterManager.clear(true);
                return;
              }

              me.applyFilter(selection.map(function(a) {
                return attributes[a[1]]
              }))
            });


            me.filterManager.addEvent('clear',function(){
              iconSelection.clearSelection();
            });


            return div;


          }

        };

      }


      return {};

    };


    var attributesMod = <?php



    $whiteList=array(
        "buildingType", 
        "servicesProvided", 
        "primaryTargetResident", 
        "genderServed", 
        "demographicServed",
        "otherServices"
    );


$module = Module::LoadModule('plugin.Attributes.AttributeFilterGroup', array());
echo $module->display($targetInstance->getJSObjectName(), $targetInstance->getJSObjectName(), 'map', array(
    "preferredSortOrder"=>$whiteList,
    "fieldWhiteList"=>$whiteList,

  "moduleOptionsScript"=>'
    
       return getAttributeFilterParameters(field, table);

  '
));
?>;
    attributesMod.load(null, attributesFilterContent, null);
    attributesMod.load(null, attributesFilterContentAlt, null);