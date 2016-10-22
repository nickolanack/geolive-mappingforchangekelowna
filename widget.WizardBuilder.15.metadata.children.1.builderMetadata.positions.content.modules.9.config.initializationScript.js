var showHousingType = function(type) {


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

  var hide = ([]).concat(emergencyHouseing, transitionalHousing, supportiveHousing, nonpHousing, rentalHousing);

  var typeMap = {
    'emergency': emergencyHouseing,
    'transitional': transitionalHousing,
    'supportive': supportiveHousing,
    'nonprofit': nonpHousing,
    'rental': rentalHousing
  };

  var map = typeMap[type];

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