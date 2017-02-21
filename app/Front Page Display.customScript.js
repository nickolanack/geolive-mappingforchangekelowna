<?php
Core::Widgets();


$editButtonForWidget=function($widget){

    $args=$widget->modalViewParamsForForm();
    $args['url']='/administrator/'.$args['url'];
    $args['className']='small';
    $args['title']='Edit '.$widget->getParameter('widgetTitle', 'Content');
  
    if(Auth('memberof', 'special', 'group')){
        echo '<div class="edit-widget-btns">';
        UI('button', $args); 
        echo '</div>';
    }

};

HtmlBlock('widget', 80);
//CSS
//$cssWidget=Widget::GetWidget(80);
//$editButtonForWidget($cssWidget);
//$cssWidget->display(); 



//Intro
$introWidget=Widget::GetWidget(83);
$editButtonForWidget($introWidget);
$introWidget->display();





//Quick start
$quickStartWidget=Widget::GetWidget(84);
$editButtonForWidget($quickStartWidget);
$quickStartWidget->display();






?>
<section class="search" style="display:none;">
<h1>Search Services</h1>
<div class="search-area"><div id="search-container"></div></div>
</section>

<?php

Widget::GetWidget(79)->display(); //Search Bar




Core::LoadPlugin('Maps');
?>


<section class="explore" style="display:none;">
<h1>Explore Homelessness Services</h1>

<?php
Widget::GetWidget(81)->display(); //Search
?>
</section>

<?php
//Agencies
$agenciesWidget=Widget::GetWidget(85);
$editButtonForWidget($agenciesWidget);
$agenciesWidget->display();

?>