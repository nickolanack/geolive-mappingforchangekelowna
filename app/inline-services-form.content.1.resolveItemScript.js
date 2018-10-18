
var MockMapitem=new Class({
    Extends:MockDataTypeItem,
    initialize:function(options){
        
        var me=this;
        me.parent(options);
        
        me.setName=function(name){
            options.title=name;
        };
        me.setDescription=function(desc){
            options.description=desc;
        }
        me.setAddress=function(addr){
            options.address=addr;
        }
        me.setAttributes=function(data){
            if(!options.attributes){
                options.attributes={};
            }
            options.attributes.servicesAttributes=data;
        }
        
        me.save=function(cb){
            
            (new GoogleSearch(options.address)).addEvent("success", function(result){
                    
                    console.log(result);
                    var latlng=result.results[0].geometry.location;
                    object.coordinates=[latlng.lat(), latlng.lng()];
                    console.log(options);
                    cb(true);
                
            }).execute();
           
        }
        
    }
   
})

return new MockMapitem({
    "id":-1,
    "type":"marker",
   // "latLng":{"lat":49.870536, "lng":-119.463176},
    "title":"",
    "description":""
});