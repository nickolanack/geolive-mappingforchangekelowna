<?php
include_once __DIR__ . '/vendor/autoload.php';

$path=__DIR__.'/kcr';

(new \isearch\kcr\IndexScraper($path))
	
	->beforeRequest(function($url){
		echo 'Requesting: '.$url." ";
	})
	->onRequest(function($url){
		echo 'OK'."\n";
		sleep(rand(5, 15));
	})
	->cache();





$listDir=$path;


(new \isearch\kcr\ItemScraper($path.'/details'))

	->readPagesFromCachedIndexAt($listDir)

	->beforeRequest(function($url){
		echo 'Requesting: '.$url." ";
	})
	->onRequest(function($url){
		echo 'OK'."\n";
		//sleep(rand(5, 15));
	})
	->onUsedCacheItem(function($url){
		echo 'Cached: '.$url."\n";
	})
	->cache();
