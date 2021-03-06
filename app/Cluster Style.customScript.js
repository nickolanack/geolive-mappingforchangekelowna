if (window.Cluster) {
	Cluster.Symbol = ClusterSymbol;
	ClusterSymbol.IconScale = function(sum) {
		return 20 + (5 * Math.log(sum) / Math.log(2));
	};
	ClusterSymbol.IconStyle = function(name) {

        var defaultStyle='rgb(35,206,37)';

		var colorsForLayer = {
			"1":'rgb(31,120,180)',
			"2":'rgb(223,194,125)',
			"5":'rgb(166,97,26)',
			"6":'rgb(35,206,37)'

		}
		var activeColorsForLayer = {
			"1":'rgb(31,120,180)',
			"2":'rgb(223,194,125)',
			"5":'rgb(166,97,26)',
			"6":'rgb(35,206,37)'
		};
		var me = this;
		var getColor = function(colorMap,
			defaultColor) {
			try {
				var lid = me.cluster_.markers_[0]._layerid
				if (colorMap['' + lid]) {
					return colorMap['' + lid];
				}
			    
			} catch (e) {}
			return defaultColor;


		}


		//expect to be bound to ClusterSymbol object
		if (name == "hover") {

			return {
				path: google.maps.SymbolPath.CIRCLE,
				fillColor: getColor(activeColorsForLayer, defaultStyle),
				fillOpacity: 0.9,
				strokeWeight: 1.5,
				strokeColor: "#000000",
				labelOrigin: google.maps.Point(0, 0)
			};


		} else {


			return {
				path: google.maps.SymbolPath.CIRCLE,
				fillColor: getColor(colorsForLayer, defaultStyle),
				fillOpacity: 0.7,
				strokeWeight: 1.5,
				strokeColor: "#000000",
				labelOrigin: google.maps.Point(0, 0)

			};

		}

	};
	
	application.getLayerManager().getLayers().map(function(l){
	    return  l.getRenderer(); 
	}).filter(function(r){ 
	    return r instanceof ClusterRenderer; 
	    
	}).forEach(function(r){ 
	    r.refresh(); 
	    
	});
	
} else {
	setTimeout(start, 100);
}