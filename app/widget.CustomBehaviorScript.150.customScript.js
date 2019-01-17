var element=new Element('div');
var el=application.getContainerElement();
var id=el.id
el.parentNode.insertBefore(element, el);

element.innerHTML=<?php 
ob_start();
?>
<section class="housing-search">


     <p><div class="housing-search-area" >

     

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

$content=ob_get_contents();
ob_end_clean();

echo json_encode($content);
IncludeJS(GetPlugin('Attributes')->getPath().'/js/FilterFromInput.js');
?>;



    

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
           var url="map/filter-"+encodeURIComponent(link);
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

      (new FilterFromInput($$(".attributeFilter").concat($$(".attributeFilterJoin")))).addEvent("clear",function(){
            setResultCount(0);
            setSearchedFor("...");

      }).addEvent("beforeFilter",function(){

            setResultCount(-1);
            setSearchedFor("...")

      }).addEvent("filter",function(results, filter){
            setResultCount(results.countMatches, results.link.alias);
            setSearchedFor(results.link.description);

      });