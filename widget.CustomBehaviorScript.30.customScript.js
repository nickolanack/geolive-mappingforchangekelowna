map.setPolyClickFn(function(feature, latLng){


GeoliveClient.authorize('write', feature, function(writable) {
 if(writable){
    
    if(!map.hasMode()){

    map.setMode('editing-feature',{
            disablesControls: true, 
            fadesContent: true, 
            fadeAmount: 0.5,
            suppressEvents:function(event, args){
                    if(event==='onPolygonDragEnd'||event==='onLineDragEnd'){

                         console.log(event);

                    }else{
 console.log(event);
                   }

           }
    });
     MapFactory.EnableMouseEditing (feature);
     }
}

});




});