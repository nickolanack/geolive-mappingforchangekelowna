<?php


foreach(Widget::GetWidgetsForTarget('map.1') as $widget){
				if(($widget->getEnabled()) && Auth('read', $widget, 'widget')){
				    
				    
				    
				    
					$widget->display($targetInstance);
				}
				
			}



?>