<?php


namespace Plugin;


class Isearch extends \Plugin implements 
	\core\ViewController{

	protected $name = 'Isearch Plugin';
	protected $description = 'Isearch behaviour';



	public function includeScripts(){


		IncludeCSS('{plugins}/Timeline/Widgets/Timeline/css/timeline.css');
    	IncludeJS('{scripts}/Controls/UIRangeSlider.js');
    	IncludeJS($this->getPath().'/js/IsearchFilterBuilder.js');
    	IncludeJS($this->getPath().'/js/IsearchDetailViewer.js');


	}



	public function includeHousingAttributeMap(){

		IncludeJSBlockOnce(function(){

			?>
			<script type="text/javascript">

			window.attributeValueList = {
				buildingType:<?php echo json_encode(($buildingType=GetWidget('buildingTypeIcons')->getIconsetData())->names);?>,
				servicesProvided:<?php echo json_encode(($servicesProvided=GetWidget('servicesProvidedIcons')->getIconsetData())->names);?>, 
				dropinServicesProvided:<?php echo json_encode(($dropinServicesProvided=GetWidget('dailyServicesIcons')->getIconsetData())->names);?>,
				genderServed:<?php echo json_encode(($genderServed=GetWidget('genderServedIcons')->getIconsetData())->names);?>,
				primaryTargetResident: <?php echo json_encode(($primaryTargetResident=GetWidget('primaryTargetResidentIcons')->getIconsetData())->names);?>,
				servicesCategories: <?php echo json_encode(($servicesCategoriesIcons=GetWidget('servicesCategoriesIcons')->getIconsetData())->names);?>
			};

			window.prefferedAttributeOrder = window.attributeValueList;

			window.attributeIconSets= {

				buildingType:<?php echo json_encode($buildingType->icons);?>,
				servicesProvided:<?php echo json_encode($servicesProvided->icons);?>, 
				dropinServicesProvided:<?php echo json_encode($dropinServicesProvided->icons);?>,
				genderServed:<?php echo json_encode($genderServed->icons);?>,
				primaryTargetResident: <?php echo json_encode($primaryTargetResident->icons);?>,
				servicesCategories: <?php echo json_encode($servicesCategoriesIcons->icons);?>
			};

			</script>
			<?php

		});


	}

}