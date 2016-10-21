var showHousingType=function(type){

var hide=[
 'housingTypeStudioBachelorNumberOfUnits'
];
 var emergencyHouseing=[
 'housingTypeStudioBachelorNumberOfUnits'
];
var transitionalHousing=[];

var typeMap={
 'emergency':emergencyHouseing,
 'transitional':transitionalHousing
};

var map=typeMap[type];

   moduleGroup.forEach(function(object, i){
      var module=object._module;
       if(i>moduleIndex&&module){
         var id=module.getIdentifier();
         if(id){

             if((!map)||map.indexOf(id)>=0){
                  module.show();
              }else if(hide.indexOf(id)>=0){
                  module.hide();
              }
         }
       }
   });




};