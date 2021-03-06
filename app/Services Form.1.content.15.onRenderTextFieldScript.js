module.runOnceOnLoad(function(){

                        var mirror=false;
                        module.getElement().setAttribute('data-mirroring',"copying location");
                        var setMirror=function(bool){
                            mirror=bool;
                            if(mirror){
                                  module.getElement().addClass("mirroring");
                                  return;
                            }
                            module.getElement().addClass("mirroring");
                            
                        };
                      
                        moduleGroup.forEach(function(mod){
                            if(mod._module.getIdentifier()=="geolocationField"){
                           
                                if(module.getValue()==mod._module.getValue()&&mod._module.getValue()!=""){
                                    setMirror(true);
                                  
                                } 
                           
                            	mod._module.addEvent("change",function(){
                            	    if(module.getValue()==""&&mod._module.getValue()&&mod._module.getValue()!=""){
                            	        setMirror(true);
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
                        search.addEvent('select',function(){
                            setMirror(false);
                        });
                        UISearchControl.AddAggregatedSearchResults(search, [

                            new GoogleAutocompleteSearchAggregator('.$map.', search, {
                                header:"Locations"
                            })


                        ],{}).addEvent("onLocationSearch",function(place){

                            textField.setValue(place.geometry.location)
    
                        });


                    });