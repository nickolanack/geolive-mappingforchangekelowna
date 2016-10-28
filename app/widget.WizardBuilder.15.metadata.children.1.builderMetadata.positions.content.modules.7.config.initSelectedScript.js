
AttributeWizardModuleUtilities.QueryFieldValue(object, {

                            item:mapItem.getId(),
                            type:mapItem.getType(),
                            table:"serviceProviderAttributes",
                            field:"buildingType"

                        },function(value){
callback((["emergency", "transitional", "supportive", "nonprofit", "rental"]).indexOf(value));
});

