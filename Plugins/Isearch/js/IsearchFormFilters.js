var IsearchFormFilters={


	createAgencyFilter:function(inputElement, textField){

		var search = new UISearchControl(inputElement, {});

		var selection=null;
		var drawSelection=function(result){
			if(!selection){
				selection=new Element('div',{"class":"selected-agency"});
			}
			selection.innerHTML="";
			var d=selection.appendChild(new Element('div'));
			 d.appendChild(new Asset.image(result.style));
			 d.appendChild(new Element('label',{html:result.name}));
			 d.appendChild(new Element('button', {name:"remove", events:{click:function(){
				textField.setValue("");
				inputElement.parentNode.removeClass('has-agency');
				selection.parentNode.removeChild(selection);
			}}}));

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
			})).addResultFilter(function(res){
			    return parseInt(res.lid)===2;
			}),


		], {}).addEvent("select",function(value){



		});


	}

}