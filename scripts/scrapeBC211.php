<?php
include_once __DIR__ . '/vendor/autoload.php';

$path=__DIR__.'/bc211';

(new \isearch\IndexScraper($path))
	
	->beforeRequest(function($url){
		echo 'Requesting: '.$url." ";
	})
	->onRequest(function($url){
		echo 'OK'."\n";
		sleep(rand(5, 15));
	})
	->cache();





$listDir=$path;


(new \isearch\ItemScraper($path))

	->readPagesFromCachedIndexAt($listDir)

	->beforeRequest(function($url){
		echo 'Requesting: '.$url." ";
	})
	->onRequest(function($url){
		echo 'OK'."\n";
		//sleep(rand(5, 15));
	})
	->cache();


	$categories=array();
	$main=json_decode(file_get_contents($path.'/index.json'));
	foreach($main->items as $index){

		
		$subs=json_decode(file_get_contents($path.'/'.$index->id.'.json'));
		$categories[$index->name]=$subs->items;

	}


	file_put_contents(__DIR__.'/bc211.json', json_encode($categories, JSON_PRETTY_PRINT));
