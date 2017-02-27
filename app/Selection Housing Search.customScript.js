<section class="housing-search">
     <p><form>

<label>What kind of housing are you looking for?</label>
   
     <select class="attributeFilter" data-attribute-field="buildingType" data-attribute-table="serviceProviderAttributes"></select>

<label>Who is the Housing For?</label>

<select class="attributeFilter" data-attribute-field="primaryTargetResident" data-attribute-table="serviceProviderAttributes"></select>
<select class="attributeFilter" data-attribute-field="genderServed" data-attribute-table="serviceProviderAttributes"></select>
<select class="attributeFilter" data-attribute-field="demographicServed" data-attribute-table="serviceProviderAttributes"></select>
  </form></p>
</section>

<?php

IncludeJSBlock('
window.addEvent("load",function(){
        
       var selects=[];
       var countResults=function(){

       };
 
  
         $$(".attributeFilter").forEach(function(el){
             selects.push(el);
             selects.addEvent("change", countResults);
               var uniqueValuesQuery = new AjaxControlQuery(CoreAjaxUrlRoot, "distinct_attribute_value_list",                {
                table: el.getAttribute("data-attribute-table"),
                field: el.getAttribute("data-attribute-field"),
                plugin: "Attributes"
            }).addEvent("onSuccess", function(distinct) {
               
                  el.appendChild(new Element("option", {value:"", html:distinct.label, disabled:true}));
                  distinct.values.filter(function(value){
                       return !!(value&&value!="");
                  }).forEach(function(value){
                       el.appendChild(new Element("option", {value:value, html:value}));
                  });

            }).limit(1).execute();

               
               
          });

        

});
');
?>