$show=array(
'item id', 
'item owner id', 
'coordinates',
'description', 
'Building Type',
'Phone Number',
'Email',
'Services Provided'
);
if(Core::Client()->isAdmin()||in_array($fieldFormat['label'], $show)){
return true;
}
return false;