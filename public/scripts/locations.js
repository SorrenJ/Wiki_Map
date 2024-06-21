const map = L.map('map').setView([43.651070, -79.347015], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

let marker, newLatLng;

function onMarkerClick(e){
  //draggable: true for editing
  //marker = L.marker(e.latlng, {draggable: true}).addTo(map);
  console.log("Target", e);
  //console.log(e._latlng);

  this.on('dragend', onMarkerDrop);
}

function onMarkerDrop(event) {
  console.log("New Position:", this._latlng);
  newLatLng = this._latlng;
};

$('#edit-btn').on('click', () => {
  console.log("Button was Clicked");
});

$(() => {
  $.ajax({
    method: 'GET',
    url: '/maps/:id/locations'
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
    }
  });
});

$(document).ready(function() {
  let latLng;
  $('#edit-btn').on('click', function() {
    //map.removeLayer(marker);        //Only removes 1 marker
    //Send this to the query to INSERT into the favourites Table
    //Removes all markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
         layer.remove();
      }
    });

    $(() => {
      $.ajax({
        method: 'GET',
        url: '/maps/:id/locations'
      })
      .done((response) => {
        $('#edit-btn').prop('disabled', true);
        console.log("Ajax Response", response);

        //One Location Only
        //console.log(response.locations[0]);
        // latLng = {
        //   lat: Number(response.locations[0].latitude),
        //   lng: Number(response.locations[0].longitude)
        // };
        //marker = L.marker(latLng, {draggable: true}).addTo(map);

        //All Locations
        for(const location of response.locations) {
          latLng = {
            lat: Number(location.latitude),
            lng: Number(location.longitude)
          };
          marker = L.marker(latLng, {draggable: true}).addTo(map);
          marker.on('click', function() {
            $('#map').append($("<section id='details'>"));
          });
          marker.on('dragstart', onMarkerClick);
        }
      });
    });
  });
});
