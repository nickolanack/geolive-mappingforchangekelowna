
return <?php 


echo json_encode(
        array_keys(
            get_object_vars(GetWidget('services-config-v2')->getParameter('categories'))
        )
    );


?>

//return defaultTags;