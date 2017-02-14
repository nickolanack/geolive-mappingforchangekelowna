var currentListeners = [];
var currentFeature;


var endEditing = function() {
    map.clearMode();
    MapFactory.DisableMouseEditing(currentFeature);
    currentListeners.forEach(function(e) {
        e.remove();
    });
};

var startEditing = function(feature) {

    currentFeature = feature;
    map.setMode('editing-feature', {
        disablesControls: true,
        fadesContent: true,
        fadeAmount: 0.5,
        suppressEvents: function(event, args) {
            console.log(event);
            if (event === 'onMapClick') {
                endEditing();
            }
        }
    });
    MapFactory.EnableMouseEditing(feature);

    var paths = [feature.item.getPath()];

    var eventHandler = function() {
        feature.save();
    };

    paths.forEach(function(path) {
        (['insert_at', 'remove_at', 'set_at']).forEach(function(event) {
            currentListeners.push(google.maps.event.addListener(path, event, eventHandler));
        });
    });

    var deleteMenu = new DeleteMenu();

    currentListeners.push(google.maps.event.addListener(feature.item, 'rightclick', function(e) {
        // Check if click was on a vertex control point
        if (e.vertex == undefined) {
            return;
        }
        deleteMenu.open(map.getBaseMap(), feature.item.getPath(), e.vertex);
    }));


};



/**
 * A menu that lets a user delete a selected vertex of a path.
 * @constructor
 */
function DeleteMenu() {
    this.div_ = document.createElement('div');
    this.div_.className = 'delete-menu';
    this.div_.innerHTML = 'Delete';

    var menu = this;
    google.maps.event.addDomListener(this.div_, 'click', function() {
        menu.removeVertex();
    });
}
DeleteMenu.prototype = new google.maps.OverlayView();

DeleteMenu.prototype.onAdd = function() {
    var deleteMenu = this;
    var map = this.getMap();
    this.getPanes().floatPane.appendChild(this.div_);

    // mousedown anywhere on the map except on the menu div will close the
    // menu.
    this.divListener_ = google.maps.event.addDomListener(map.getDiv(), 'mousedown', function(e) {
        if (e.target != deleteMenu.div_) {
            deleteMenu.close();
        }
    }, true);
};

DeleteMenu.prototype.onRemove = function() {
    google.maps.event.removeListener(this.divListener_);
    this.div_.parentNode.removeChild(this.div_);

    // clean up
    this.set('position');
    this.set('path');
    this.set('vertex');
};

DeleteMenu.prototype.close = function() {
    this.setMap(null);
};

DeleteMenu.prototype.draw = function() {
    var position = this.get('position');
    var projection = this.getProjection();

    if (!position || !projection) {
        return;
    }

    var point = projection.fromLatLngToDivPixel(position);
    this.div_.style.top = point.y + 'px';
    this.div_.style.left = point.x + 'px';
};

/**
 * Opens the menu at a vertex of a given path.
 */
DeleteMenu.prototype.open = function(map, path, vertex) {
    this.set('position', path.getAt(vertex));
    this.set('path', path);
    this.set('vertex', vertex);
    this.setMap(map);
    this.draw();
};

/**
 * Deletes the vertex from the path.
 */
DeleteMenu.prototype.removeVertex = function() {
    var path = this.get('path');
    var vertex = this.get('vertex');

    if (!path || vertex == undefined) {
        this.close();
        return;
    }

    path.removeAt(vertex);
    this.close();
};



map.setPolyClickFn(function(feature, latLng) {


    GeoliveClient.authorize('write', feature, function(writable) {
        if (writable) {
            if (!map.hasMode()) {
                startEditing(feature);
            }
        }

    });



});