<?php


foreach(Widget::GetWidgetsForTarget('map.1') as $widget){
				if(($widget->getEnabled()) && Auth('read', $widget, 'widget')){
				    
				    
				    if(class_exists('SidePanel')&&$widget instanceof SidePanel){
				        continue;
				    }
				    
					$widget->display($targetInstance);
				}
				
			}



?>