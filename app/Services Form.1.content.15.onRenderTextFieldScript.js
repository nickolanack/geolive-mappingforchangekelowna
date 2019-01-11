module.runOnceOnLoad(function(){

                      
                        moduleGroup.forEach(function(mod){
                            if(mod._module.getIdentifier()=="location"){
                            	mod._module.addEvent("change",function(){
                            	    if(module.getValue()==""&&mod._module.getValue()&&mod._module.getValue()!=""){
                            	        module.setValue(mod._module.getValue());
                            	    }
                            	})
                            }
                        });

                        var search = new UISearchControl(inputElement,{});
                        UISearchControl.AddAggregatedSearchResults(search, [

                            new GoogleAutocompleteSearchAggregator('.$map.', search, {
                                header:"Locations"
                            })


                        ],{}).addEvent("onLocationSearch",function(place){

                            textField.setValue(place.geometry.location)
    
                        });


                    });