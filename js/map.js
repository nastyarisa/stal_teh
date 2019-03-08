function initMap() {
  var map = new google.maps.Map(document.getElementById('google-map'), {
    zoom: 17,
    center: {lat: 55.779470, lng:  38.472122},
    scrollwheel: false
  });
  var marker = new google.maps.Marker({
    position: {lat: 55.779670, lng: 38.472122},
    map: map,
    icon: 'img/maps_marker.svg'
  });
}