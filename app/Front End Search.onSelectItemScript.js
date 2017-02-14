if(result.type=='marker'||result.type=='line'||result.type=='polygon'){
    window.location="https://isearchkelowna.ca/map/mapitem-"+result.id;
}

if(result.link){
    window.location="https://isearchkelowna.ca/map/filter-"+result.link.alias
}