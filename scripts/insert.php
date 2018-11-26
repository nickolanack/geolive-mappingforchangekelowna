<?php


include_once __DIR__.'/vendor/autoload.php';

print_r($argv);
if(count($argv)<4){
	throw new Exception('Requires url, username, password');
}

$client=new \coreclient\Client($argv[1], $argv[2], $argv[3]);

$dir=__DIR__.'/kcr';
$paths=scandir($dir);
shuffle($paths);
foreach($paths as $path){
	if(strpos($path, '.json')===false){
		continue;
	}

	$jsonFile=$dir.'/'.$path;
	//echo $jsonFile."\n";
	$list=json_decode(file_get_contents($jsonFile));
	$items=$list->items;
	shuffle($items);
	foreach($items as $item){

		$link=$item->link;
		$link=explode('/', $link);
		$link=array_pop($link);

		$detailFile=$dir.'/details/'.$link.'.json';
		if(!file_exists($detailFile)){
		
			echo "Not Found: ".$detailFile."\n";
			continue;
		}

		$details=json_decode(file_get_contents($detailFile));

		$data=(object) array_merge(get_object_vars($details),get_object_vars($item));
		//echo json_encode($data, JSON_PRETTY_PRINT)."\n\n";

		if(!key_exists("Coordinates", $data)){
			echo "No Coordinates";
			continue;
		}

		if(!key_exists("Service Details", $data)){
			echo "No Service Details";
			continue;
		}


		$attribs=array(
			"programOrService"=>"Service",
			"agency"=>null,
			"populationServed"=>null,
			"age"=>null,
			"sex"=>null,
			
			"referralProcess"=>null,
			"contactInfo"=>null,
			"waitlist"=>null,
			"phoneNumber"=>array($data->phone),
			"fax"=>null,
			"mailingAddress"=>$data->address,
			"website"=>$data->Website,
			"categories"=>null,
			"coverage"=>null
		);

		if(key_exists("Located In Community", $data)){
			$attribs["coverage"]=$data->{"Located In Community"};
		}

		if(key_exists("Eligibility", $data)){
			$attribs["eligibilityCriteria"]=$data->Eligibility;
		}

		if(key_exists("Former Name", $data)){
			$data->{"Service Details"}="Prevously known as:  ".$data->{"Former Name"}."\n\n".$data->{"Service Details"};
		}

		if(key_exists("Accessibility", $data)){
			$data->{"Service Details"}.="\n\nAccessibility: ".$data->{"Accessibility"};
		}

		if(key_exists("Primary Contact", $data)){
			$data->{"Service Details"}.="\n\Primary Contact: ".$data->{"Primary Contact"};
		}

		if(key_exists("Alternate Contact", $data)){
			$data->{"Service Details"}.="\n\Alternate Contact: ".$data->{"Alternate Contact"};
		}

		if(key_exists("Hours", $data)){
			$data->{"Service Details"}.="\n\Hours: ".$data->Hours;
		}


		if(key_exists("Languages", $data)){
			$data->{"Service Details"}.="\n\Languages: ".$data->{"Languages"};
		}

		if(key_exists("Major Intersection", $data)){
			$data->{"Service Details"}.="\n\nClose To: ".$data->{"Major Intersection"};
		}

		if(key_exists("Social Media", $data)){
			$data->{"Service Details"}.="\n\n".$data->{"Social Media"};
		}
		if(key_exists("Cost", $data)){
			$attribs["cost"]=$data->Cost;
		}

		$markerData=array(
			"layerId"=>6,
			"name"=>$data->name,
			"description"=>$data->{"Service Details"},
			"marker"=>array(
				"style"=>'components/com_geolive/users_files/user_files_994/Uploads/MMT_92i_[ImAgE]_k3H_[G].png',
				"coordinates"=>$data->{"Coordinates"}
			),
			"attributes"=>array(
				"servicesAttributes"=>$attribs
			)

		);

		$existing= $client->ajax('search_item_name', array("name"=>$data->name), "Maps");
		//echo $existing;
		$existingData=json_decode($existing);
		if(!$existingData){
			echo 'Error;';
			continue;
		}

		if(count($existingData->results)){
			echo "Has Existing!";
			continue;
		}

		echo $client->ajax('marker_new', $markerData, "Maps");
		//echo 'Maps.marker_new:'.json_encode($markerData, JSON_PRETTY_PRINT)."\n\n";
		sleep(2);
		//exit;
	}

}
