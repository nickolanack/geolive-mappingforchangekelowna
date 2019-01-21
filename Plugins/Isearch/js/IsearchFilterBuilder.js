var IsearchFilterBuilder = new Class({

	initialize: function(application, container, options) {

		var me = this;
		me.application = application;

		var attributesFilterContent = container.appendChild(new Element('div', {}));

		me.element = attributesFilterContent;

		me.options = Object.append({


			labels: {
				"rental": "Market Rental",
				"sex": "Sex"
			}
		}, options);


		//var attributesFilterContentAlt = gutter.appendChild(new Element('div', {}));
		// var servicesTypesFilterContent = container.appendChild(new Element('div', {
		// 	'class': 'filter services-filter'
		// }));


	},
	getElement: function() {

		var me = this;
		return me.element;
	},


	getIconsetIcons: function(forGroupName) {

		var me = this;
		var iconizeFilters = me.getIconsetIconsMap();

		if (iconizeFilters[forGroupName]) {
			return iconizeFilters[forGroupName]
		}

		return false;
	},
	getIconsetIconsMap: function() {

		var me = this;
		if (!me._iconizeFilterMap) {
			var iconizeFilters = me.options.iconizeFilters;
			if (typeof iconizeFilters == 'function') {
				iconizeFilters = iconizeFilters();
			}

			me._iconizeFilterMap = iconizeFilters;
		}


		return me._iconizeFilterMap;

	},
	getAttributeValues: function(forGroupName) {

		var me = this;

		if (!me._attributeList) {
			var attributeList = me.options.attributeList;
			if (typeof attributeList == 'function') {
				attributeList = attributeList();
			}

			if (!attributeList) {
				console.error('attributeList is not available');
				return;
			}


			attributeList.dropinServicesProvided.forEach(function(name, index) {
				if (attributeList.servicesProvided.indexOf(name) < 0) {
					attributeList.servicesProvided.push(name);
					me._iconizeFilterMap.servicesProvided.push(window["DailyServicesIconset"][index]);
				}
			});


			me._attributeList = attributeList;
		}

		return me._attributeList[forGroupName] || null;



	},

	shouldRenderRange: function(forGroupName) {
		var me = this;
		if (!me._rangeFilters) {
			var rangeFilters = me.options.rangeFilters;
			if (typeof rangeFilters == 'function') {
				rangeFilters = rangeFilters();
			}
			me._rangeFilters = rangeFilters;
		}

		return me._rangeFilters[forGroupName] || forGroupName.indexOf('NumberOf') >= 0

	},


	getAttributeFilterParameters: function(field, table) {

		var me = this;
		var map = me.application;
		//TODO: use global icons sets instead of duplicating icons here, and in wizard forms



		var labels = me.options.labels;
		if (typeof labels == 'function') {
			labels = labels();
		}


		var labelSets = me.options.labelSets;
		if (typeof labelSets == 'function') {
			labelSets = labelSets();
		}



		if (me.shouldRenderRange(field)) {

			return me.getRangeFilterParameters(field, table)

		}

		var iconsForGroup = me.getIconsetIcons(field);

		if (iconsForGroup) {

			var defaultAttributeValues = me.getAttributeValues(field);

			return {
				filterBuilder: function(values) {
					var me = this;
					fieldMetadata = me.getFieldMetadata();

					return map.getContentFilterManager().makeFilter(fieldMetadata.tableName, values.map(function(v) {
						return (new FilterExpander(fieldMetadata)).createFilter(v);
					}));

				},
				listTemplate: function(values) {

					//Rendering an icon selection ui instead of <ul><li>...

					//defined in global behavior widget.
					var attributes = defaultAttributeValues || values;



					var me = this; //bound to Attributes filter object

					var div = new Element('div');

					div.setAttribute('data-filter-type', 'iconset');

					var iconSelection = new UIIconizedSelectionControl(div, {
						allowMultipleSelection: true,
						allowEmptySelection: true,
						icons: iconsForGroup
					});

					iconSelection.addEvent('loadIcon', function(icon, i, asset) {
						var label = attributes[i];

						if (typeof label == "undefined") {
							label = "Missing value for icon: " + field;
							if (labelSets[field]) {
								label = labelSets[field][i];
							}
						}

						if (labels[label]) {
							label = labels[label];
						}
						new UIPopover(asset, {
							title: (label).capitalize(),
							anchor: UIPopover.AnchorTo(['bottom'])
						});
					});

					iconSelection.addEvent('selectionChanged', function(selection) {

						//  if(selection.length===0){
						//    me.filterManager.clear(true);
						//    return;
						//  }

						me.applyFilter(selection.map(function(a) {
							return attributes[a[1]]
						}))
					});


					me.filterManager.addEvent('clear', function() {
						iconSelection.clearSelection();
					});

					me.filterManager.addEvent('filter', function() {
						selection = [];
						attributes.map(function(value) {
							var valueIsSet = me.filterManager.isFilteringOnFieldValue(field, value)
							if (valueIsSet) {

							} else {

							}
						});

					});


					return div;


				}

			};

		}


		return {};

	},
	getRangeFilterParameters: function(field, table) {


		return {

			filterBuilder: function(values) {
				var me = this;
				fieldMetadata = me.getFieldMetadata();

				return map.getContentFilterManager().makeFilter(fieldMetadata.tableName, [{
							field: fieldMetadata.title,
							comparator: 'greatorThanOrEqualTo',
							value: values[0]
						}, {
							field: fieldMetadata.title,
							comparator: 'lessThanOrEqualTo',
							value: values[1]
						}

					]

				);
			},
			listTemplate: function(values) {

				var me = this; //bound to Attributes filter object
				var div = new Element('div', {
					"class": "timeline-container"
				});

				var values = values.map(function(a) {
					return parseInt(a);
				});

				if (values[0] === 0) {
					values.shift();
				}

				var range = [Math.min.apply(null, values), Math.max.apply(null, values)];

				//range[0]=Math.max(1, range[0]);

				if (range[0] === range[1]) {
					//range[1] = 100;
				}

				if (range[0] === range[1] || values.length <= 1) {
					return UIAttributeFilterControl.DefaultFilterListTemplate.bind(me)(values);
				}


				var rangeSelection = new UIRangeSlider(div, {

					range: range,
					state: range.slice(0),
					spanValueFormatter: function(label, state) {
						return state;
					},
					minValueFormatter: function(label, state) {
						return Math.round(state[0]);
					},
					maxValueFormatter: function(label, state) {
						return Math.round(state[1]);
					}


				});

				rangeSelection.addEvent('change', function(state) {

					if (state[0] === range[0] && state[1] === range[1]) {
						me.filterManager.clear(true);
						return;
					}

					me.applyFilter(state);

				});

				me.filterManager.addEvent('clear', function() {
					rangeSelection._setState(range.slice(0), true);
				});


				return div;

			}

		};

	}


});


var FilterExpander = new Class({
	initialize: function(fieldMetadata) {
		var me=this;
		me.fieldMetadata=fieldMetadata;
	},
	createFilter:function(value){

		var me=this;

		var fieldMetadata=me.fieldMetadata
		var valueMap = window.groupedAttributes;

		var joinFilter = function(v) {

			if (typeof valueMap[v] == "string") {
				return {
					field: fieldMetadata.title,
					comparator: 'equalTo',
					value: valueMap[v]
				};
			}



			if (Array.isArray(valueMap[v])) {

				var filters = ([{
					field: fieldMetadata.title,
					comparator: 'equalTo',
					value: v
				}]).concat(valueMap[v].map(function(value) {
					return joinFilter(value);
				}))

				return AttributeFilter.JoinFilter(fieldMetadata.tableName, filters);
			}

			if (typeof v == "object") {

				var filters = [];

				Object.keys(v).forEach(function(k) {

					filters.push({
						field: fieldMetadata.title,
						comparator: 'equalTo',
						value: k
					});

					filters = filters.concat(v[k].map(function(value) {
						return joinFilter(value);
					}));

				});



				return AttributeFilter.JoinFilter(fieldMetadata.tableName, filters);
			}



			return {
				field: fieldMetadata.title,
				comparator: 'equalTo',
				value: v
			};


		};


		return joinFilter(value);

	}



})