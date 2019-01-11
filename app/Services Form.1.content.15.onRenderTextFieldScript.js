module.runOnceOnLoad(function(){

                      
                        moduleGroup.forEach(function(mod){
                            
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