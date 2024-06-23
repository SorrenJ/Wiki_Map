const map = L.map('map').setView([43.651070, -79.347015], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

let marker, newLatLng;
let clickedMarker;

$('#edit-btn').hide();

function onMarkerDrag(e){
  //draggable: true for editing
  //marker = L.marker(e.latlng, {draggable: true}).addTo(map);
  console.log("Target", e);
  //console.log(e._latlng);

  this.on('dragend', onMarkerDrop);
}

function onMarkerDrop(event) {
  console.log("New Position:", this._latlng);
  newLatLng = this._latlng;
  console.log("New LatLng:", newLatLng);

  const $form = $(this).find($('form'));
  $form.children($(".lat").children($("<input>")).val(newLatLng.lat));
  $form.children($(".lng").children($("<input>")).val(newLatLng.lng));

  //$(this).find($('form').children($("<input>")).val(`${newLatLng.lat}, ${newLatLng.lng} `));
  clickedMarker.dragging.disable();
};

$(() => {
  console.log("Front end cookie", document.cookie.split("=")[2]);     //Use document.cookie to get Front-end/Client side cookie
  const mapId = document.cookie.split("=")[2];
  // $.ajax({
  //   method: 'GET',
  //   url: `/maps/:id/locations`
  // })
  $.ajax({
    method: 'GET',
    url: `/maps/${mapId}/locations`
  })
  .done((response) => {
    console.log(response);
    console.log(response.locations[0]);

    //marker = L.marker(newLatLng).addTo(map);
    for(const location of response.locations) {
      newLatLng = {
        lat: Number(location.latitude),
        lng: Number(location.longitude)
      };
      marker = L.marker(newLatLng).addTo(map);
      marker.on('click', onMarkerClick);
    }
  });

});

// $('form').on('submit', function (event) {
//   //$(this).children($("<input>").val(newLatLng));
//   //console.log(newLatLng);
//   const test = $(this).children($("<input>").val());
//   console.log("Test", test);
// })

function onMarkerClick(event) {
  $('#edit-btn').show();
  console.log("Marker was clicked", event);
  clickedMarker = event.target;
}

$('#edit-btn').on('click', function(e) {
  console.log("Button Clicked", e);
  clickedMarker.dragging.enable();
  clickedMarker.on('dragstart', onMarkerDrag);
  //clickedMarker.on('dragend', onMarkerDrop);
});

$('#edit-btn').on('blur', function(e) {
  $('#edit-btn').hide();
});



// $(document).ready(function() {
//   let latLng;
//   $('#edit-btn').on('click', function() {
//     //map.removeLayer(marker);        //Only removes 1 marker
//     //Send this to the query to INSERT into the favourites Table
//     //Removes all markers
//     map.eachLayer((layer) => {
//       if (layer instanceof L.Marker) {
//          layer.remove();
//       }
//     });

//     $(() => {
//       $.ajax({
//         method: 'GET',
//         url: '/maps/:id/locations'
//       })
//       .done((response) => {
//         // $('#edit-btn').prop('disabled', true);
//         console.log("Ajax Response", response);

//         //One Location Only
//         //console.log(response.locations[0]);
//         // latLng = {
//         //   lat: Number(response.locations[0].latitude),
//         //   lng: Number(response.locations[0].longitude)
//         // };
//         //marker = L.marker(latLng, {draggable: true}).addTo(map);

//         //All Locations
//         for(const location of response.locations) {
//           latLng = {
//             lat: Number(location.latitude),
//             lng: Number(location.longitude)
//           };
//           marker = L.marker(latLng, {draggable: true}).addTo(map);

//           marker.on('dragstart', onMarkerDrag);
//         }
//       });
//     });
//   });
// });
