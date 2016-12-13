$show=array('item id', 'item owner id');
if(Core::Client()->isAdmin()||in_array($fieldFormat['label'], $show)){
return true;
}
return false;