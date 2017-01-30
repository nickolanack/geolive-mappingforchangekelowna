var valuesArray = [

	"Individuals",
	"Families",
         "Couples"

];
var fieldName='primaryTargetResident';
WizardHelper.declareAggregateFunctionObjectForStep(stepIndex, position, moduleIndex, "Attribute_serviceProviderAttributes_Object");
WizardHelper.addModuleDataAggregateFunctionForStep(stepIndex, position, moduleIndex, function(object, attributes) {
	attributes[fieldName]= object.values;
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