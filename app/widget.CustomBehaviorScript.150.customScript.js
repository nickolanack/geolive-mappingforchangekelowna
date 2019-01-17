var element=new Element('div');
var el=application.getElement();


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

?>


var Control=new UIMapControl(map, {
				element:element,
				anchor:'tm',
				className:'top-filter-form'
			});
			Control.addControl();