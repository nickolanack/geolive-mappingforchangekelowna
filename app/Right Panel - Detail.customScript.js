var detailContent = container.appendChild(new Element('div', {
	'class': 'detail-content'
}));
var tabs = container.appendChild(new Element('ul', {
	'class': 'sidebar-tabs'
}));
var page = container.appendChild(new Element('div', {
	'class': 'sidebar-content'
}));



var infoTabContent = page.appendChild(new Element('div', {
	'class': 'infotab-content'
}));
var editTabContent = page.appendChild(new Element('div', {
	'class': 'edittab-content'
}));
var agencyTabContent = page.appendChild(new Element('div', {
	'class': 'agencytab-content'
}));

var ContentModuleViewer = new Class({
	Extends: ModuleViewer,
	initialize: function(map, container, options) {
		var me = this;
		me._container = container
		me.parent(map, options);
	},
	display: function(content) {
		var me = this;
		me._container.empty();
		me._container.appendChild(content);

		this.fireEvent('load');

	}
});

var miniDetailViewController = new ContentModuleViewer(map, detailContent, {});
var infoTabViewController = new ContentModuleViewer(map, infoTabContent, {});
var editTabViewController = new ContentModuleViewer(map, editTabContent, {});
var agencyTabViewController = new ContentModuleViewer(map, agencyTabContent, {});

var tabNames = [];
var tabEls = {}
var setTab = function(n, e) {

	tabNames.forEach(function(n) {
		page.removeClass(n);
		tabEls[n].removeClass('active');
	});

	page.addClass(n);
	tabEls[n].addClass('active');
	if (tabNames.indexOf(n) < 0) {
		tabNames.push(n);
	}
};

var hideTab = function(n) {
	tabEls[n].addClass('hidden');
}

var showTab = function(n) {
	tabEls[n].removeClass('hidden');
}



var info = tabs.appendChild(new Element('li', {
	'html': 'info',
	events: {
		click: function() {
			setTab('info');
		}
	}
}));
var edit = tabs.appendChild(new Element('li', {
	'html': 'edit',
	events: {
		click: function() {
			setTab('edit');
		}
	}
}));
var agency = tabs.appendChild(new Element('li', {
	'html': 'agency',
	events: {
		click: function() {
			setTab('agency');
		}
	}
}));

tabEls = {
	info: info,
	edit: edit,
	agency: agency
};

setTab('info');

var isAgency = function(marker) {
	return (marker.getLayer().getId() === 2);
}
var isService = function(marker) {
	return (marker.getLayer().getId() === 1);
}
var isDaily = function(marker) {
	return (marker.getLayer().getId() === 5);
}
var agencyLayer = function() {
	return map.getLayerManager().getLayer(2);
}

var displayAgencyFor = function(mapitem, userHasWriteAccess) {

	(new GetAttributeItemValueQuery(
		mapitem.getId(), mapitem.getType(), 'serviceProviderAttributes', 'agency'
	)).addEvent("success", function(result) {

		//defualt numeric value is 0. but is mapped to an id. 
		var agencyId = parseInt(result.value);
		var agencyMapitem = null;
		if (agencyId > 0) {
			agencyMapitem = map.getLayerManager().filterMapitemById(agencyId, null, {
				layer: agencyLayer()
			});
		}

		if (agencyMapitem) {
			agencyTabViewController.open(new GeoliveTemplateModule(mapitem, {
				template: "default",
				page: userHasWriteAccess?"AgencyForInlineView":"AgencyForDetail"
			}), mapitem);
		} else {

			if (userHasWriteAccess) {
				var wizardTemplate = (map.getDisplayController().getWizardTemplate('SetAgencyWizardTemplate'));
				if ((typeof wizardTemplate) != 'function') {
					return false;
				}

				var wizard = wizardTemplate(mapitem, {});
				wizard.buildAndShow(agencyTabViewController, {}); //'geolive' string is for css

			} else {



				agencyTabViewController.open(new TemplateModule({
					content: [new HTMLModule(map, 'No agency has been selected for this service provider')]
				}, {
					template: "default",
					//page: "AgencyDetail"
				}), mapitem);
			}

		}

	}).execute();


}




map.setItemEditFn(function(mapitem, options) {

	var me = this;

	if (!(mapitem instanceof GeoliveMapItem)) {
		throw new Error('MapFactory.MarkerWizard expects instance of GeoliveMapItem');
	}



	var wizardTemplate = (map.getDisplayController().getWizardTemplate(isAgency(mapitem) ? 'AgencyWizardTemplate' : (isService(mapitem) ? 'ServiceProviderWizardTemplate' : 'DailyWizardTemplate')));
	if ((typeof wizardTemplate) != 'function') {
		return false;
	}


      var wizard = wizardTemplate(mapitem, {});
		wizard.buildAndShow(editTabViewController, {}); //'geolive' string is for css
		wizard.addEvent('complete',function(){

			//map.editItem(mapitem,{});
                        hide();
		});

	return wizard;

});

var lastMapitem = null;
var className=null;
map.setMapitemSelectFn(function(mapitem) {

	/* globals GeoliveTemplateModule */
	if (!window.GeoliveTemplateModule) {
		throw Error('Requires GeoliveTemplateModule class');
	}


	var newClass='layer-'+mapitem.getLayer().getId();
	if(className){
		container.removeClass(className);
	}
	className=newClass;
	container.addClass(newClass);


	if (mapitem.getId() > 1) {


		infoTabViewController.open(new GeoliveTemplateModule(mapitem, {
			template: "default",
			page: isAgency(mapitem) ? "AgencyDetail" : (isService(mapitem) ? "ServiceProviderDetail" : "DailyDetail")
		}), mapitem);

		showTab('info');
	} else {

		hideTab('info');

	}

	miniDetailViewController.open(new GeoliveTemplateModule(mapitem, {
		template: "default",
		page: "Detail"
	}), mapitem);

	hideTab('agency');

	GeoliveClient.authorize('write', mapitem, function(userHasWriteAccess) {

		if (lastMapitem) {
			MapFactory.DisableMouseEditing(lastMapitem);
		}
		lastMapitem = mapitem;
		MapFactory.EnableMouseEditing(mapitem);


		if (isService(mapitem)||isDaily(mapitem)) {
			showTab('agency');
			displayAgencyFor(mapitem, userHasWriteAccess);
		}

		if (userHasWriteAccess) {
			map.editItem(mapitem, {});
			showTab('edit');
			setTab('edit');
		} else {
			hideTab('edit');
			setTab('info');
		}

		show();

	});

});