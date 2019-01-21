var IsearchFormFilters = {


	createAgencyFilter: function(inputElement, textField) {

		var search = new UISearchControl(inputElement, {});

		var selection = null;
		var drawSelection = function(result) {
			if (!selection) {
				selection = new Element('div', {
					"class": "selected-agency"
				});
			}
			selection.innerHTML = "";
			var d = selection.appendChild(new Element('div'));
			d.appendChild(new Asset.image(result.style));
			d.appendChild(new Element('label', {
				html: result.name
			}));
			d.appendChild(new Element('button', {
				name: "remove",
				events: {
					click: function() {
						textField.setValue("");
						inputElement.parentNode.removeClass('has-agency');
						selection.parentNode.removeChild(selection);
					}
				}
			}));

			inputElement.parentNode.addClass('has-agency');
			inputElement.parentNode.insertBefore(selection, inputElement);

		}



		UISearchControl.AddAggregatedSearchResults(search, [

			(new MarkerSearchAggregator(null, search, {
				header: "Agencies",
				ResultClickEventFunction: function(result) {
					textField.setValue(result.id);

					drawSelection(result);
					//alert("boom - you blew up the internet");
				}
			})).addResultFilter(function(res) {
				return parseInt(res.lid) === 2;
			})


		], {}).addEvent("select", function(value) {



		});


	},
	formatTagCloud: function(module, categoryTree) {


		[{
			"Basic needs & Emergency Services": [{
				"Drop-in Services": ["Laundry", "Toiletries", "Phone service", "Haircare", "Meals", "Showers", "Clothing", "Furniture", "Foodbank", "Internet access", "Household Items"]
			}, "Outreach", "Financial Assistance", "Crisis Services"],
		}]

		var el = module.getElement();
		var rootCloud = module.getCloud();

		//var subClouds = {};


		

		var SubCloudTree = new Class({
			Implements:[Events],
			initialize: function(parentCloud, tree) {

				var me=this;
				
				me.rootCloud = parentCloud;
				me.addedTags=[];
				me.initialTags=Object.keys(tree);
				me.parentTags=[];
				me.parentTagMap={};
				me.rootCloud.addEvent('draw', function(){
					me.rootCloud.getWords().forEach(function(word){
						if(me.addedTags.indexOf(word)!==-1||me.initialTags.indexOf(word)===-1){
							me.rootCloud.getWordElement(word).addClass('sub-cloud-word');
						}
						if(me.parentTagMap[word]&&me.parentTags.indexOf(word)!==-1){
							me.parentTagMap[word].getWordElement(word).addClass('is-parent-word');
						}
					});
					
				});

				var me = this;
				me.subClouds = {};
				Object.keys(tree).forEach(function(rootWord){
					var branch={};
					branch[rootWord]=tree[rootWord];
					me.renderTree([branch],rootCloud);
				});


				me.addEvent('addWord',function(word){
					if(!me.rootCloud.hasWord(word)){
						
						me.addedTags.push(word);
						module.addValue(word);
						//rootCloud.getWordElement(word).addClass('sub-cloud-word');
					}
				})

				me.addEvent('removeWord',function(word, cloud){
					if(cloud!==me.rootCloud){
						if(me.isSelected(word, me.rootCloud)){
							me.rootCloud.selectWord(word);
						}
					}
				});

				me.addEvent('addWord',function(word, cloud){
					if(cloud!==me.rootCloud){
						if(!me.isSelected(word, me.rootCloud)){
							me.rootCloud.selectWord(word);
						}
					}
				});


				me.rootCloud.addEvent('selectWord', function(word){

					if(me.isSelected(word, me.rootCloud)){

						me.fireEvent('rootAddWord', [word]);
						me.fireEvent('rootAddWord.'+word);
						return;
					}
					me.fireEvent('rootRemoveWord', [word]);
					me.fireEvent('rootRemoveWord.'+word);

				});
						
				

			},
			isSelected:function(word, cloud){
				var wordEl = cloud.getWordElement(word);
				return wordEl.hasClass('selected');
			},
			renderTree:function(nodes, parentCloud){
				var me=this;
				
				nodes.forEach(function(treeValue){
					if(typeof treeValue!="string"){
						me.addSubCloud(treeValue, parentCloud)
					}
				});
				
			},
			justTags:function(values){
				return values.map(function(v){
					if(typeof v!="string"){
						return Object.keys(v).shift();
					}
					return v;
				});
			},
			addSubCloudEvents:function(cloud){

				var me=this;
				cloud.addEvent("onSelectWord", function(word) {
					
					var wordEl = cloud.getWordElement(word);

					if (!wordEl.hasClass('selected')) {
						wordEl.addClass('selected');
						me.fireEvent('addWord', [word, cloud]);
						me.fireEvent('add.'+word, [cloud]);
						
					} else {
						wordEl.removeClass('selected');
						me.fireEvent('removeWord', [word, cloud]);
						me.fireEvent('remove.'+word, [cloud]);
					}

					me.addEvent('rootRemoveWord.'+word, function(){
						if(me.isSelected(word, cloud)){
							cloud.selectWord(word);
						}
					});
					me.addEvent('rootAddWord.'+word, function(){
						if(!me.isSelected(word, cloud)){
							cloud.selectWord(word);
						}
					});
				});



			},
			initializeSubCloud:function(cloud){

				var me=this;
				var values=module.getValues();
				cloud.getWords().forEach(function(word){
					if(values.indexOf(word)!==-1){
						cloud.getWordElement(word).addClass('selected');
					}
				});

			},
			addParentCloudEvents:function(parentCloud, word, subCloud){
				var me=this;
				parentCloud.addEvent('selectWord',function(parentWord){


					

					if(parentWord===word){
						

						if(me.rootCloud.getWordElement(word).hasClass('selected')){
							subCloud.getElement().parentNode.removeClass("hide");
							return;
						}
						
						
						subCloud.getElement().parentNode.addClass("hide");
						me.unselectAll(subCloud);
					}


				});
			},
			unselectAll:function(cloud){
				cloud.getWords().forEach(function(word){

					var el=cloud.getWordElement(word);
					if(el.hasClass('selected')){
						cloud.selectWord(word);
					}
			
				});
			},
			addSubCloud:function(branch, parentCloud){

				var me=this;
				var word=Object.keys(branch).shift();
				var tags=me.justTags(branch[word]);

				me.parentTags.push(word);
				me.parentTagMap[word]=parentCloud;

				parentCloud.getWordElement(word).addClass('is-parent-word');
				
				var subCloudContainer = el.appendChild(new Element('div', {
					"class": "sub-cloud hide"
				}));

				subCloudContainer.appendChild(new Element('label', {
					html: word + ": Sub Categories"
				}));
				var subCloud = (new TagCloud(subCloudContainer, {
					shuffle: false,
					tags: tags
				})).show();

				me.initializeSubCloud(subCloud);
				me.addSubCloudEvents(subCloud);
				me.addParentCloudEvents(parentCloud, word, subCloud)

				

				me.subClouds[word]=subCloud;

				me.renderTree(branch[word], subCloud);

			},
			getClouds:function(){
				var me=this;
				return Object.keys(me.subClouds).map(function(word){ return me.subClouds[word]; });
			},
			getCloudWithWord:function(word){
				var me=this;
				var clouds=me.getClouds();
				for(var i=0; i<clouds.length; i++){
					if(clouds[i].hasWord(word)){
						return clouds[i];
					}
				}
				return null;
			},
			setSelected:function(values){
				
				var me=this;
				values.forEach(function(word){
					var cloud=me.getCloudWithWord(word);
					if(cloud&&(!me.isSelected(word, cloud))){

						cloud.selectWord(word);

					}
				});

			}
			

		});

		var subcloud=(new SubCloudTree(rootCloud, categoryTree));
		module.addEvent("change",function(){
			subcloud.setSelected(module.getValues());
		})

	}

}