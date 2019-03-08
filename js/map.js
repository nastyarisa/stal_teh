function initMap() {
  var map = new google.maps.Map(document.getElementById('google-map'), {
    zoom: 16,
    center: {lat: 55.778457, lng:  38.470585},
    scrollwheel: false
  });
  var marker = new google.maps.Marker({
    position: {lat: 55.778457, lng: 38.470585},
    map: map,
    icon: 'img/maps_marker.svg'
  });
}