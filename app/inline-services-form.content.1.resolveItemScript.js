
var MockMapitem=new Class({
    Extends:MockDataTypeItem,
    save:function(cb){
        
        cb(false);
    }
})

return new MockMapitem({
    "id":-1,
    "type":"marker",
   // "latLng":{"lat":49.870536, "lng":-119.463176},
    "title":"",
    "description":""
});