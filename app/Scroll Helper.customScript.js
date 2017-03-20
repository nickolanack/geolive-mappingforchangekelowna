<?php
 IncludeJSBlock('


var scrollHelper=function(name){var myFx = new Fx.Scroll(window, {
}).start(0,document.getElementsByName(name)[0].getPosition().y);
                               }

window.addEvent("load",function(){

$$("a").forEach(function(a){
var href=a.getAttribute("href");
if(href&&href.indexOf("#")>=0){
   var name=href.split("#").pop();
   if(document.getElementsByName(name).length){
     a.addEvent("click",function(){
      scrollHelper(name);
      return false;
    })
   }
}

})


});





')

?>