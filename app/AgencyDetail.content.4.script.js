var button=new Element('button',{html:"Show all services for this agency", 'class':'btn agency-filter-btn'});

button.addEvent('click',function(){
var filterManager=geolive.getContentFilterManager()
 filterManager.search(
							AttributeFilter.JoinFilter("serviceProviderAttributes",[
                                   {
                                	   field:"agency",
                                	   comparator:"equalTo",
                                	   value:mapItem.getId()
                                   }])
                                   // {}, optional filter options.
                                   // optional callback //if null calls filterManager.filter
					);
					//let the world know.
					filterManager.propagateFilterState(button, "agency", mapItem.getId());

});
return button;