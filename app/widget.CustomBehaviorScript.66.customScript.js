// the following arrays are used by attribute filters and wizard forms (icon selections)
// to override the default sort order, and reduce duplicated code

window.attributeValueList = {
	buildingType: [

		'emergency',
		'transitional',
		'supportive',
		'nonprofit',
		'rental'

	],
	servicesProvided: [

		"Case Management",
		"Referrals to other Agencies",
		"Health/Dental Care",
		"Meals",
		"Showers",
		"Storage",
		"Clothing, Household Goods"

	],
	genderServed: [

		"Male",
		"Female",
		"Transgender",


	],
	primaryTargetResident: [

		"Individuals",
		"Families",
                "Couples"

	]


};

window.prefferedAttributeOrder = window.attributeValueList;