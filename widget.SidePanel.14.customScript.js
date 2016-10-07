var ContentModuleViewer=new Class({
	        	Extends:ModuleViewer,
	        	display:function(content){
	        		
	        		page.empty();
	        		page.appendChild(content);

	        		this.fireEvent('load');

	        	}
	        });
var sideBarViewController=new ContentModuleViewer(map, {});



map.setItemEditFn(function(mapitem, options) {

	 var me=this;

        if (!(mapitem instanceof GeoliveMapItem)) {
            throw new Error('MapFactory.MarkerWizard expects instance of GeoliveMapItem');
        }



        var wizardTemplate = (map.getDisplayController().getWizardTemplate((options.wizardName || 'MapItemTemplate')));
        if ((typeof wizardTemplate) != 'function') {
            return false;
        }

        var wizard = wizardTemplate(mapitem, {});

        var step = wizard.build(map, sideBarViewController, {}); //'geolive' string is for css
        step();

        return wizard;


});


map.setMarkerClickFn(function(mapitem) {

    var me = this;

    GeoliveClient.authorize('write', mapitem, function(userHasWriteAccess) {



	    if (userHasWriteAccess) {


	    	map.editItem(mapitem, {});
	    	show();

	    } else {

	    	/* globals GeoliveTemplateModule */
		    if (!window.GeoliveTemplateModule) {
		        throw Error('Requires GeoliveTemplateModule class');
		    }

		    sideBarViewController.open(new GeoliveTemplateModule(map, mapitem,{template:"default"}), mapitem);
		    show();
	    }

	});



    

});