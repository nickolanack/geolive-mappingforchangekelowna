servicesProvided

WizardHelper.declareAggregateFunctionObjectForStep(stepIndex, position, moduleIndex, "Attribute_serviceProviderAttributes_Object");
WizardHelper.addModuleDataAggregateFunctionForStep(stepIndex, position, moduleIndex,  function(object, Attribute_serviceProviderAttributes_Object){

			    		            	Attribute_serviceProviderAttributes_Object.servicesProvided=object.values;
			    		            });