// the following arrays are used by attribute filters and wizard forms (icon selections)
// to override the default sort order, and reduce duplicated code

window.attributeValueList = {
	buildingType:<?php echo json_encode(($buildingType=GetWidget('buildingTypeIcons')->getIconsetData())->names);?>,
	servicesProvided:<?php echo json_encode(($servicesProvided=GetWidget('servicesProvidedIcons')->getIconsetData())->names);?>, 
	dropinServicesProvided:<?php echo json_encode(($dropinServicesProvided=GetWidget('dailyServicesIcons')->getIconsetData())->names);?>,
	genderServed:<?php echo json_encode(($genderServed=GetWidget('genderServedIcons')->getIconsetData())->names);?>,
	primaryTargetResident: <?php echo json_encode(($primaryTargetResident=GetWidget('primaryTargetResidentIcons')->getIconsetData())->names);?>
};

window.prefferedAttributeOrder = window.attributeValueList;

window.attributeIconSets= {

	buildingType:<?php echo json_encode($buildingType->icons);?>,
	servicesProvided:<?php echo json_encode($servicesProvided->icons);?>, 
	dropinServicesProvided:<?php echo json_encode($dropinServicesProvided->icons);?>,
	genderServed:<?php echo json_encode($genderServed->icons);?>,
	primaryTargetResident: <?php echo json_encode($primaryTargetResident->icons);?>
};