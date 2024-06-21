// Client facing scripts here

var map = L.map('map').setView([43.651070, -79.347015], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);



// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

// function onMapClick(e){
//   alert(e.latlng);

//   var marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
// console.log(e.latlng);
// }
// map.on('click', onMapClick);



// adds and removes an existing marker
map.on("click", function(e){ 
  var marker = new L.marker([e.latlng.lat, e.latlng.lng])
  .addTo(map).on('click', e=> e.target.remove());
})


// make a button function here jquery

$("$favorite")

