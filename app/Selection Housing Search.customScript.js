<section class="housing-search">
     <p><form>

<label>What kind of housing are you looking for?</label>
   
     <select class="attributeFilter" data-attribute-field="buildingType" data-attribute-table="serviceProviderAttributes"></select>

<label>Who is the Housing For?</label>

<select class="attributeFilter" data-attribute-field="primaryTargetResident" data-attribute-table="serviceProviderAttributes"></select>
<select class="attributeFilter" data-attribute-field="genderServed" data-attribute-table="serviceProviderAttributes"></select>
<select class="attributeFilter" data-attribute-field="demographicServed" data-attribute-table="serviceProviderAttributes"></select>
<label>Items that match all fields<input id="join-intersect" type="radio" name="join" value="intersect"  checked="true" /></label>
<label>Items that match any field<input type="radio" name="join" value="join" / ></label>
  </form></p>
</section>
<section class="housing-results empty">
<h3><span id="housing-results">0 Results </span>for your search<h3>
<h4 >you searched <span id="housing-query">...</span><h4>
<p></p>
</section>
  
<?php

// /{"filters":{"join":"join","table":"serviceProviderAttributes","set":"*","filters":[{"field":"buildingType","comparator":"equalTo","value":"emergency"}]},"mapId":1,"plugin":"Attributes"}


//{"filters":{"join":"join","table":"serviceProviderAttributes","set":"*","filters":[
  // {"field":"buildingType","comparator":"equalTo","value":"emergency"},
  // {"field":"primaryTargetResident","comparator":"equalTo","value":"Individuals"},
  // {"field":"genderServed","comparator":"equalTo","value":"Transgender"},
  // {"field":"demographicServed","comparator":"equalTo","value":"19+"}]},"mapId":1,"plugin":"Attributes"}
  // 
  
IncludeJSBlock('
window.addEvent("load",function(){

      var FilterSearchQuery=new Class({
          Extends:AjaxControlQuery,
          initialize:function(filters){
            this.parent(CoreAjaxUrlRoot, "search_attributes", Object.append(filters, {plugin:"Attributes"}));
          }
        });
        
       var selects=[];
       var countResults=function(){

          var filters=[];

          selects.forEach(function(el){

              if(el.value&&el.value!==""){

                filters.push({"field":el.getAttribute("data-attribute-field"),"comparator":"equalTo","value":el.value});

              }

          });

          
          var join=$("join-intersect").checked?"intersect":"join"
          var searchQuery=new FilterSearchQuery({
            filters:{"join":join,"table":"serviceProviderAttributes","set":"*","filters":filters},
            mapId:1
          });
          searchQuery.addEvent("onSuccess",function(response){

            var results=response.results;
            console.log(results);
           $("housing-results").innerHTML=results.countMatches+"Results";
           $("housing-query").innerHTML=results.link.description

          });
          searchQuery.execute();


       };
 
  
         $$(".attributeFilter").forEach(function(el){
             selects.push(el);
             el.addEvent("change", countResults);
               var uniqueValuesQuery = new AjaxControlQuery(CoreAjaxUrlRoot, "distinct_attribute_value_list",                {
                table: el.getAttribute("data-attribute-table"),
                field: el.getAttribute("data-attribute-field"),
                plugin: "Attributes"
            }).addEvent("onSuccess", function(distinct) {
               
                  el.appendChild(new Element("option", {value:"", html:distinct.label, disabled:true}));
                  el.appendChild(new Element("option", {value:"", html:""}));
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