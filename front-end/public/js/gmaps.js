var userAddress; // JD: 12
var userLat;
var userLon;
var newMarker // JD: 15

//Load map function
var map;
function initMap() { // JD: 13
    map = new google.maps.Map(document.getElementById('map-canvas'), {
        center: {lat: 30.363, lng: -118.044},
        zoom: 3
    });
}

function initilize() { // JD: 13
    google.maps.event.addDomListener(window, 'load', initilize);
    var autocomplete = new google.maps.places.Autocomplete(document.getElementById('location'));

    google.maps.event.addListener(autocomplete, 'place_changed', function() { // JD: 16
        var place = autocomplete.getPlace();
        userAddress = place.formatted_address;
        userLat = place.geometry.location.lat();
        userLon = place.geometry.location.lng();
    });
};

function newMarkerDrop() { // JD: 13
    myLatLng = {lat: LatValue, lng: LonValue};
    newMarker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        animation: google.maps.Animation.DROP
    });
}

function zoomToLastMarker() { // JD: 13
    map.setZoom(12);
    map.panTo(newMarker.position);
}

//GEOCODING ACTION
// JD: 14
document.getElementById('location').onclick = function() { // JD: 16
    initilize();
}


