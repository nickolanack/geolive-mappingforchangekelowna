var tabs=new Element('ul',{'class':'sidebar-tabs'});
container.appendChild(tabs);

toggleSwitch.addEvent('click',function(){
	toggle();
});


var page=container.appendChild(new Element('div', {'class':'sidebar-content'}));

var infoTabContent=page.appendChild(new Element('div', {'class':'infotab-content'}));
var editTabContent=page.appendChild(new Element('div', {'class':'edittab-content'}));
var agencyTabContent=page.appendChild(new Element('div', {'class':'agencytab-content'}));

var ContentModuleViewer=new Class({
	Extends:ModuleViewer,
	initialize:function(map, container, options){
		var me=this;
		me._container=container
		me.parent(map, options);
	},
	display:function(content){
		var me=this;
		me._container.empty();
		me._container.appendChild(content);

		this.fireEvent('load');

	}
});

var infoTabViewController=new ContentModuleViewer(map, infoTabContent, {});
var editTabViewController=new ContentModuleViewer(map, editTabContent, {});
var agencyTabViewController=new ContentModuleViewer(map, agencyTabContent, {});

var tabNames=[];
var tabEls={
}
var setTab=function(n, e){

	tabNames.forEach(function(n){
		page.removeClass(n);
		tabEls[n].removeClass('active');
	});

	page.addClass(n);
	tabEls[n].addClass('active');
	if(tabNames.indexOf(n)<0){
		tabNames.push(n);
	}
};



var info=tabs.appendChild(new Element('li',{'html':'info', events:{click:function(){
	setTab('info');
}}}));
var edit=tabs.appendChild(new Element('li',{'html':'edit', events:{click:function(){
	setTab('edit');
}}}));
var agency=tabs.appendChild(new Element('li',{'html':'agency', events:{click:function(){
	setTab('agency');
}}}));

tabEls={
	info:info,
	edit:edit,
	agency:agency
};

setTab('info');

map.setItemEditFn(function(mapitem, options) {

	 var me=this;

	if (!(mapitem instanceof GeoliveMapItem)) {
	    throw new Error('MapFactory.MarkerWizard expects instance of GeoliveMapItem');
	}



	var wizardTemplate = (map.getDisplayController().getWizardTemplate('ServiceProviderWizardTemplate'||'AgencyWizardTemplate'));
	if ((typeof wizardTemplate) != 'function') {
	    return false;
	}

	var wizard = wizardTemplate(mapitem, {});

	var step = wizard.build(map, editTabViewController, {}); //'geolive' string is for css
	step();

	return wizard;


});


map.setMarkerClickFn(function(mapitem) {



    /* globals GeoliveTemplateModule */
    if (!window.GeoliveTemplateModule) {
        throw Error('Requires GeoliveTemplateModule class');
    }

    infoTabViewController.open(new GeoliveTemplateModule(map, mapitem,{template:"default"}), mapitem);
	    

    GeoliveClient.authorize('write', mapitem, function(userHasWriteAccess) {




	    if (userHasWriteAccess) {
	    	map.editItem(mapitem, {});
	    	setTab('edit');
	    }else{
			setTab('info');
	    }
	    	
	    show();
	    
	});



});