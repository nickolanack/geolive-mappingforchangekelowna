<?php
include_once __DIR__.'/administrator/components/com_geolive/core.php';
include_once Core::LibDir().'/easycsv/EasyCsv.php';



$csv=EasyCsv::OpenCsv('userlist.csv');

$duplicates=array();

$insert='INSERT INTO lkc8g_users (name, username, email, password) VALUES ';
$inserts=array();

EasyCsv::IterateRows_Assoc($csv, function($row)use(&$duplicates, &$inserts){

	$agencyField='Agency';

	$usernameField='Agency User Name';
	$emailField='email address';
	$passwordField='Password (don\'t fill in)';
	$nameField='Contact Name';




	$agency=trim($row[$agencyField]);

	$username=str_replace(' ','', strtolower(trim($row[$nameField])));
	$email=trim($row[$emailField]);
	$password=trim($row[$passwordField]);
	$name=trim($row[$nameField]);

	$account=array($name, $username, $email, $password);

	if(empty($agency)&&empty($username)&&empty($email)&&empty($password)&&empty($name)){
		return;
	}

	echo $agency."\n";




	if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
		echo '    Invalid Email: '.json_encode($account);
	}elseif(in_array($email, $duplicates)){
		echo '    Duplicate: '.json_encode($account);
	}elseif(empty($password)){
		echo '    Invalid Password: '.json_encode($account);
	}else{

		$duplicates[]=$email;

		if(Core::GetUsersource()->emailExists($email)){
			echo '    Exists: '.json_encode($account);
		}else{
			$inserts[]='(\''.implode('\', \'', array($name, $username, $email, md5($password))).'\')';
		}

	}




	echo "\n\n";

});


echo $insert.implode(",\n", $inserts);

echo "\n\n";

