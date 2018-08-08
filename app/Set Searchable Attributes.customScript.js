// the following arrays are used by attribute filters and wizard forms (icon selections)
// to override the default sort order, and reduce duplicated code

window.attributeValueList = {
	buildingType:<?php echo json_encode(GetWidget('buildingTypeIcons')->getIconsetData()->names);?>,
	servicesProvided: window.servicesProvided.names,
	dropinServicesProvided: window.dailyServices.names,
	genderServed: window.genderServed.names,
	primaryTargetResident: window.primaryTargetResident.names
};

window.prefferedAttributeOrder = window.attributeValueList;

window.attributeIconSets= {

	buildingType:<?php echo json_encode(GetWidget('buildingTypeIcons')->getIconsetData()->icons);?>,
	servicesProvided: window.servicesProvided.icons,
	dropinServicesProvided: window.dailyServices.icons,
	genderServed: window.genderServed.icons,
	primaryTargetResident: window.primaryTargetResident.icons
};