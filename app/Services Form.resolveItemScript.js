<?php 

print_r($targetInstance);

$apikey=GetPlugin('Maps')->getParameter('googleMapsServerApiKey', '');
        if(!empty($apikey)){
            $apikey='&key='.$apikey;
        }
        
        $version=GetPlugin('Maps')->getParameter('googleMapsVersion', '');
        if(!empty($version)){
            $version='&v='.$version;
        }

        IncludeExternalJS(
            '//maps.google.com/maps/api/js?libraries=places'.$apikey.$version
        );

?>

return new MockDataTypeItem({
    "id":-1,
    "type":"marker",
   // "latLng":{"lat":49.870536, "lng":-119.463176},
    "title":"",
    "description":""
});