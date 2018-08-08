<?php

HtmlDocument()->META(HtmlDocument()->website(), 'base');

foreach(Widget::GetWidgetsForTarget('map.1') as $widget){
				if(($widget->getEnabled()) && Auth('read', $widget, 'widget')){
				    
				    
				    if(class_exists('SidePanelWidget')&&$widget instanceof SidePanelWidget){
				        continue;
				    }
				    
					$widget->display($targetInstance);
				}
				
			}



?>