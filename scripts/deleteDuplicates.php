<?php


include_once __DIR__.'/vendor/autoload.php';

print_r($argv);
if(count($argv)<4){
	throw new Exception('Requires url, username, password');
}

$client=new \coreclient\Client($argv[1], $argv[2], $argv[3]);



foreach(json_decode(file_get_contents(__DIR__.'/duplicates.json')) as $id){

	
	$existing= $client->ajax('get_map_item', array("id"=>$id), "Maps");
	//echo $existing;
	$existingData=json_decode($existing);
	if(!$existingData){
		echo 'Error;'."\n";
		continue;
	}

	if((!key_exists('success', $existingData))||$existingData->success==false){
		echo 'No longer exists;'."\n";
		continue;
	}

	echo json_encode($existingData)."\n";

	echo json_encode($client->ajax('marker_delete', array(
		"markerId"=>$id
	)))."\n";

}


