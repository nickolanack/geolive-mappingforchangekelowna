AttributeWizardModuleUtilities.QueryFieldValue(object, {

	item: mapItem.getId(),
	type: mapItem.getType(),
	table: "serviceProviderAttributes",
	field: "servicesProvided"

}, function(values) {

	callback(values.map(function(a) {
		return valuesArray.indexOf(a);
	}));

});