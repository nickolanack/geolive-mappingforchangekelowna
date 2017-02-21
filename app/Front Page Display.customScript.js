<?php
Core::Widgets();
Widget::GetWidget(80)->display(); //CSS


//Intro
Widget::GetWidget(83)->display(); 


//Quick start
Widget::GetWidget(84)->display(); 

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


<section class="organizations" style="display:none;">
<h1>Amazing Organizations</h1>
<?php
Core::LoadPlugin('Attributes');

$aMeta=AttributesTable::GetMetadata('agencyAttributes');
$sMeta=AttributesTable::GetMetadata('serviceProviderAttributes');



MapController::IterateLayersMapitems(2, function($mapitem)use($aMeta, $sMeta){

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

                'content'=>function()use($mapitem, $aMeta, $sMeta){

                    //die(print_r(array($aMeta, $sMeta),true));

                    
                    $website=AttributesRecord::GetFields($mapitem->getId(), $mapitem->getType(), array('website'), $aMeta)['website'];
                    if(!empty($website)){

                        if(strpos('http', $website)!==0){
                            $website='http://'.$website;
                        }
                        echo '<a class="agancy-website" href="'.$website.'" target="_blank">website</a>';
                    }
                    echo str_replace('img', 'img class="agancy-logo"', AttributesRecord::GetFields($mapitem->getId(), $mapitem->getType(), array('logo'), $sMeta))['logo'];
                    


                }


            ), Core::Get('Maps')->getScaffoldsPath());




}, $authorize = 'user', $filters = array());

?>
</section>