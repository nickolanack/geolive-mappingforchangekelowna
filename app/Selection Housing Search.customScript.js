<section class="housing-search">
     <p><div class="housing-search-area" >

     <h2>Search For Housing Services</h2>

     <form id="housing-search-form" action="/map">

<label>What kind of housing are you looking for?</label>
   
     <select class="attributeFilter" data-attribute-field="buildingType" data-attribute-table="serviceProviderAttributes"></select>

<label>Who is the Housing For?</label>

<select class="attributeFilter" data-attribute-field="primaryTargetResident" data-attribute-table="serviceProviderAttributes"></select>
<select class="attributeFilter" data-attribute-field="genderServed" data-attribute-table="serviceProviderAttributes"></select>
<select class="attributeFilter" data-attribute-field="demographicServed" data-attribute-table="serviceProviderAttributes"></select>

</form></p>
<label>Items that match all fields<input class="attributeFilterJoin" id="join-intersect" type="radio"  name="join" value="intersect"  checked="true" /></label>
<label>Items that match any field<input class="attributeFilterJoin" id="join-intersect" type="radio" name="join" value="join" / ></label>
  
 
  <section class="housing-results empty well" id="housing-results-section">
  <h3><span id="housing-results">0 Results</span> for your search</h3>
  <p><h4>you searched </h4> <span id="housing-query">...</span>
  </p>
    <button class="btn btn-primary" id="housing-search-goto-map">Show Results</button>
  </section>

  </div> 

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

       var setResultCount=function(count, link){

            if(count<=0){
              $$(".housing-results button").forEach(function(b){
                  b.addClass("disabled");
              });

             
              if(count==-1){
                 $("housing-results").innerHTML="Looking";
                 $("housing-results-section").removeClass("empty");
              }else{
                 $("housing-results").innerHTML="0 Results";
                 $("housing-results-section").addClass("empty");
              }
               console.log("remove events");
              $("housing-search-goto-map").removeEvents();

            }else{
              $$(".housing-results button").forEach(function(b){
                  b.removeClass("disabled");
              });

               $("housing-results").innerHTML="<span class=\"r-count\">"+count+"</span> Result"+(count==1?"":"s");

               console.log("add events");
               var url="map/filter-"+link;
               $("housing-search-goto-map").setAttribute("title",url);
               $("housing-search-goto-map").addEvent("click", function(){

                $("housing-search-form").action=url;
                 $("housing-search-form").submit();

               });

            }


          };

           var setSearchedFor=function(label){
              $("housing-query").innerHTML=label

           }

          setResultCount(0);
          setSearchedFor("...");

       var queryResults=function(){

          var filters=[];

          selects.forEach(function(el){

              if(el.value&&el.value!==""){

                filters.push({"field":el.getAttribute("data-attribute-field"),"comparator":"equalTo","value":el.value});

              }

          });


          
          if(filters.length){

            setResultCount(-1);
            setSearchedFor("...")

            var join=$("join-intersect").checked?"intersect":"join"

            if(window.GeoliveMapInstances){

              var filter=GeoliveMapInstances[0].getContentFilterManager();
              filter.search({"join":join,"table":"serviceProviderAttributes","set":"*","filters":filters});
              return;
            }

            
            var searchQuery=new FilterSearchQuery({
              filters:{"join":join,"table":"serviceProviderAttributes","set":"*","filters":filters},
              mapId:1
            });
            searchQuery.addEvent("onSuccess",function(response){

              var results=response.results;
              console.log(results);
              setResultCount(results.countMatches, results.link.alias);
              setSearchedFor(results.link.description);

            });
            searchQuery.execute();
          }else{
            setResultCount(0);
            setSearchedFor("...");
          }


       };
 
        $$(".attributeFilterJoin").forEach(function(el){
           el.addEvent("change", queryResults);
        });
  
         $$(".attributeFilter").forEach(function(el){
             selects.push(el);
             el.addEvent("change", queryResults);
               var uniqueValuesQuery = new AjaxControlQuery(CoreAjaxUrlRoot, "distinct_attribute_value_list",                {
                table: el.getAttribute("data-attribute-table"),
                field: el.getAttribute("data-attribute-field"),
                plugin: "Attributes"
            }).addEvent("onSuccess", function(distinct) {
               
                  el.appendChild(new Element("option", {value:"", html:distinct.label, disabled:true, selected:true}));
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