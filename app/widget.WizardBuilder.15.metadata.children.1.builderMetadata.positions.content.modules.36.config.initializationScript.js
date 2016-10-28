var valuesArray = [

	"Case Management",
	"Referrals to other Agencies",
	"Health/Dental Care",
	"Meals",
	"Showers",
	"Storage",
	"Clothing, Household Goods"

];

WizardHelper.declareAggregateFunctionObjectForStep(stepIndex, position, moduleIndex, "Attribute_serviceProviderAttributes_Object");
WizardHelper.addModuleDataAggregateFunctionForStep(stepIndex, position, moduleIndex, function(object, attributes) {
	attributes.servicesProvided = object.values;
});

var addValue = function(nameOrIndex) {

	var name = nameOrIndex;
	if ((typeof nameOrIndex) === 'number') {
		name = valuesArray[nameOrIndex];
	}

	if (!object.values) {
		object.values = [];
	}

	var i = object.values.indexOf(name);
	if (i < 0) {
		object.values.push(name);
	}

}


var removeValue = function(nameOrIndex) {

	var name = nameOrIndex;
	if ((typeof nameOrIndex) === 'number') {
		name = valuesArray[nameOrIndex];
	}

	if (!object.values) {
		object.values = [];
	}

	var i = object.values.indexOf(name);
	if (i >= 0) {
		object.values.splice(i, 1);
	}

}