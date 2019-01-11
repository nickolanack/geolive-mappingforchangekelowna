HtmlDocument()->META(HtmlDocument()->website(), 'base');
GetWidget('form-styles')->display($targetInstance);
IncludeJS("{plugins}/Isearch/js/IsearchFormFilters.js");



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