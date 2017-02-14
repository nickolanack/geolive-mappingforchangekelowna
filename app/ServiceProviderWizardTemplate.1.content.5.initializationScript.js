var valuesArray = window.attributeValueList.buildingType


WizardHelper.declareAggregateFunctionObjectForStep(stepIndex, position, moduleIndex, "Attribute_serviceProviderAttributes_Object");
WizardHelper.addModuleDataAggregateFunctionForStep(stepIndex, position, moduleIndex, function(object, Attribute_serviceProviderAttributes_Object) {

  Attribute_serviceProviderAttributes_Object.buildingType = object.values;
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


var setHousingType = function(type) {
  showHousingType(type);
  object.value = type;
};

var showHousingType = function(types) {


  var emergencyHouseing = [
    'housingTypeDormitoryNumberOfBeds',
    'housingTypeSharedBedroomNumberOfBeds',
    'housingTypeBedroomNumberOfBeds',
  ];
  var transitionalHousing = [
    'housingTypeSharedBedroomNumberOfBeds',
    'housingTypeStudioBachelorNumberOfUnits',
    'housingType1BedroomNumberOfUnits',
    'housingType2BedroomNumberOfUnits',
    'housingType3BedroomNumberOfUnits',
    'housingType4BedroomNumberOfUnits',
    'housingTypeOtherBedroomNumberOfUnits',
    'housingTypeOtherBedroomDescription'

  ];
  var supportiveHousing = [
    'housingTypeHouseSharedBedroomNumberOfBeds',
    'housingTypeHouseIndividualBedroomNumberOfBeds',
    'housingTypeApartmentStudioNumberOfUnits',
    'housingTypeApartmen1BedroomNumberOfUnits',
    'housingTypeApartmen2BedroomNumberOfUnits',
    'housingTypeOtherNumberOfUnits',
    'housingTypeOtherDescription'

  ];
  var nonpHousing = [
    'housingTypeHouseSharedBedroomNumberOfBeds',
    'housingTypeHouseIndividualBedroomNumberOfBeds',
    'housingTypeSecondaryHouseSuiteNumberOfUnits',
    'housingTypeStudioBachelorNumberOfUnits',
    'housingType1BedroomNumberOfUnits',
    'housingType2BedroomNumberOfUnits',
    'housingType3BedroomNumberOfUnits',
    'housingType4BedroomNumberOfUnits',
    'housingTypeOtherBedroomNumberOfUnits',
    'housingTypeOtherBedroomDescription'

  ];
  var rentalHousing = [
    //missing house shared accom
    'housingTypeSecondaryHouseSuiteNumberOfUnits',
    'housingTypeApartmentStudioNumberOfUnits',
    'housingTypeApartmen1BedroomNumberOfUnits',
    'housingTypeApartmen2BedroomNumberOfUnits',
    'housingTypeDuplexNumberOfUnits',
    'housingTypeFourplexNumberOfUnits',
    'housingTypeTownHouseNumberOfUnits',
    'housingTypeOtherNumberOfUnits',
    'housingTypeOtherDescription'

  ];

  //var hide = ([]).concat(emergencyHouseing, transitionalHousing, supportiveHousing, nonpHousing, rentalHousing);


  var typeMap = {
    'emergency': emergencyHouseing,
    'transitional': transitionalHousing,
    'supportive': supportiveHousing,
    'nonprofit': nonpHousing,
    'rental': rentalHousing
  };
  var hide = [([]).concat(emergencyHouseing, transitionalHousing, supportiveHousing, nonpHousing, rentalHousing)];
  var map = [];

  types.forEach(function(type){

    map=map.concat(typeMap[type]);

  });

  moduleGroup.forEach(function(object, i) {
    var module = object._module;
    if (i > moduleIndex && module) {
      var id = module.getIdentifier();
      if (id) {

        if ((!map) || map.indexOf(id) >= 0) {
          module.show();
        } else if (hide.indexOf(id) >= 0) {
          module.hide();
        }
      }
    }
  });



};