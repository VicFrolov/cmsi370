function initMap() {
  var myLatLng = {lat: 30.363, lng: -118.044};

  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 2,
    center: myLatLng
  });
}
