module.runOnceOnLoad(function(){

                      
                        moduleGroup.forEach(function(mod){
                            if(mod._module.getIdentifier()=="geolocationField"){
                                
                                var mirror=false;
                            	mod._module.addEvent("change",function(){
                            	    if(module.getValue()==""&&mod._module.getValue()&&mod._module.getValue()!=""){
                            	        mirror=true;
                            	        mod._module._search.addEvent("select", function(value){
                                    	    if(mirror){
                                    	        module.setValue(value)
                                    	    }
                                    	})
                            	    }
                            	    
                            	     if(mirror){
                                        module.setValue(mod._module.getValue())
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