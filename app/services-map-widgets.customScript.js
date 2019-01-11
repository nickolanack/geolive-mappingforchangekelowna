<?php

HtmlDocument()->META(HtmlDocument()->website(), 'base');

foreach(WidgetsForTarget('map.1') as $widget){
				if(($widget->getEnabled()) && Auth('read', $widget, 'widget')){
				    
				    if($widget->getId()==13){
				        continue; //Left Panel!
				    }
				    if($widget->getId()==16||$widget->getId()==22){
				        continue; //Add Services, Add Agency
				    }
				  
				    
				    if(class_exists('SidePanelWidget')&&$widget instanceof SidePanelWidget){
				        //continue;
				    }
				    if(class_exists('MarkerTileWidget')&&$widget instanceof MarkerTileWidget){
				        //continue;
				    }
				    
				     if(class_exists('AttributesFilterBuilderWidget')&&$widget instanceof AttributesFilterBuilderWidget){
				        $widget->setParameter('urlPrefix','/map/services-map/');
				    }
				    
				    
					$widget->display($targetInstance);
				}
				
			}


GetWidget('servicesForm')->display($targetInstance);

?>