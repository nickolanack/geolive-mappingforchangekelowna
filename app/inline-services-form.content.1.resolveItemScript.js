
var MockMapitem=new Class({
    Extends:MockDataTypeItem,
    initialize:function(options){
        
        var me=this;
        me.parent(options);
        
        me.setName=function(name){
            options.title=name;
            options.name=name;
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
                    options.layerId=6;
                    options.marker={
                        coordinates:[latlng.lat(), latlng.lng()],
                        style:'components/com_geolive/users_files/user_files_994/Uploads/MMT_92i_[ImAgE]_k3H_[G].png'
                    }
                    console.log(options);
                    
                    
                    
                     (new AjaxControlQuery(
                        CoreAjaxUrlRoot, 
                        "marker_new", 
                        Object.append(options, {plugin:"Maps"})
                     )).addEvent("success", function(result){
                         NotificationBubble.Make('', "Woop Woop Success!");
                         cb(true);
                     }).execute();
                
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