// Client facing scripts here

var map = L.map('map').setView([43.651070, -79.347015], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

function onMapClick(e){
  alert(e.latlng);

  var marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
console.log(e.latlng);
}
map.on('click', onMapClick);
function onMapClick(e) {
  alert(e.latlng);

  var marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
  console.log(e.latlng);
}

// Doesn't let the new marker to be positioned in the map until the 'Add Location' button is hit
$('.add-location-button').click(() =>
  map.on('click', onMapClick)
);
