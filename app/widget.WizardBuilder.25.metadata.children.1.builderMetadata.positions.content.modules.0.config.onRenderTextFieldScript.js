var search = new UISearchControl(inputElement,{});
                            UISearchControl.AddAggregatedSearchResults(search, [

                                new MarkerSearchAggregator(map, search,{
							header:"Agencies",
                                                       ResultClickEventFunction:function(result){
textField.setValue(result.id);
//alert("boom - you blew up the internet");
                                                       }
					}),


                            ],{});