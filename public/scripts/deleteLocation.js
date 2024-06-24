// Client facing scripts here

// Client facing scripts here
const map = L.map('map').setView([43.651070, -79.347015], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


// Add a few markers
addMarker(43.651070, -79.347015);
addMarker(45.651070, -79.347015);
addMarker(46.651070, -79.347015);


// Function to add a marker with a click event listener
function addMarker(lat, lng) {
  
  var marker = L.marker([lat, lng]).addTo(map);
 
  $('#delete-btn').on('click', function() {
    alert("clicked on delete");
 
 
  marker.on('click', function() {
    map.removeLayer(marker);
  });

});


}

