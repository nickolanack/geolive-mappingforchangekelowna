<?php


include_once __DIR__.'/vendor/autoload.php';

print_r($argv);
if(count($argv)<4){
	throw new Exception('Requires url, username, password');
}

$client=new \coreclient\Client($argv[1], $argv[2], $argv[3]);



	
	$existing= $client->ajax('search_item_bounds', array(
			"layer"=>6, 
			"polygonBounds"=>[1977], 
			"outsideBounds"=>true
		),
		"Maps"
	);
	//echo $existing;
	$existingData=json_decode($existing);
	if(!$existingData){
		echo 'Error;'."\n";
		//continue;
	}

	if((!key_exists('success', $existingData))||$existingData->success==false){
		echo 'No longer exists;'."\n";
		//continue;
	}

	echo json_encode($existingData, JSON_PRETTY_PRINT)."\n";
	echo count($existingData->results)."\n";


	foreach ($existingData->results as $markerData) {
		if($markerData->layerId===6){
			echo $client->ajax('marker_save', array(
				"markerId"=>$markerData->id,
				"marker"=>(object)array(),
				"layerId"=>8

			), "Maps");
		}
	}



