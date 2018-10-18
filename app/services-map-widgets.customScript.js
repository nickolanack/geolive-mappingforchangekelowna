<?php

HtmlDocument()->META(HtmlDocument()->website(), 'base');

foreach(WidgetsForTarget('map.1') as $widget){
				if(($widget->getEnabled()) && Auth('read', $widget, 'widget')){
				    
				    
				    if(class_exists('SidePanelWidget')&&$widget instanceof SidePanelWidget){
				        //continue;
				    }
				    if(class_exists('MarkerTileWidget')&&$widget instanceof MarkerTileWidget){
				        //continue;
				    }
				    
					$widget->display($targetInstance);
				}
				
			}



?>