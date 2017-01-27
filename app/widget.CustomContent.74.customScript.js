<section>
<h1>Search Services</h1>
<div class="search-area"><div id="search-container"></div></div>
</section>

<?php

Core::Widgets();
Widget::GetWidget(80)->display(); //CSS
Widget::GetWidget(79)->display(); //Search Bar




Core::LoadPlugin('Maps');
?>
<section>
<h1>Amazing Organizations</h1>
<?php
MapController::IterateLayersMapitems(2, function($mapitem){

	$articleId=Scaffold('article.mapitem',
            array(
                'item'        => $mapitem,
                'heading'     => 2,
                'link'        => 'map'.SefUrlFrom(
                    Core::HTML()->urlToCurrentView(
                        array(
                            'mapitem' => $mapitem->getId(),
                        ))),
                'linkTitle'=>'go to the map',
                'schema'      => array(
                    'link' => 'itemprop="map"',
                ),
                'afterHeader' => '<hr/>',
            ), Core::Get('Maps')->getScaffoldsPath());




}, $authorize = 'user', $filters = array());

?>
</section>