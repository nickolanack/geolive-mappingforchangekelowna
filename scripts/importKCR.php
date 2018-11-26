<?php


include_once __DIR__ . '/vendor/autoload.php';
$listDir=__DIR__.'/kcr';


$items=array();
foreach(array_filter(scandir($listDir), function($p){return strpos($p, '.json')!==false;}) as $list){
	$listItems=json_decode(file_get_contents($listDir.'/'.$list));
	if(is_null($listItems)){
		throw new \Exception($listDir.'/'.$list);
	}
	$listItems=$listItems->items;
	$items=array_merge($items, $listItems);
}


foreach($items as $item){
	$p=explode('/', $item->link);
	$detailPath=$listDir.'/details/'.array_pop($p).'.json';
	if(file_exists($detailPath)){
		$detailItem=json_decode(file_get_contents($detailPath));
		if(is_null($listItems)){
			throw new \Exception($detailPath.' not json');
		}
		echo json_encode(array_merge(get_object_vars($item), get_object_vars($detailItem)), JSON_PRETTY_PRINT);
	}else{
		throw new \Exception($detailPath.' not found');
	}
	
	
}