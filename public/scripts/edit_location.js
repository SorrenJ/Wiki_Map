// Client facing scripts here
const map = L.map('map').setView([43.651070, -79.347015], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

$(document).ready(function() {
  let marker, latLng;
  $('#edit-btn').on('click', function() {
    $(() => {
      $.ajax({
        method: 'GET',
        url: '/maps/:id/locations'
      })
      .done((response) => {
        $('#edit-btn').attr('disabled');
        console.log(response);
        console.log(response.locations[0]);
        latLng = {
          lat: Number(response.locations[0].latitude),
          lng: Number(response.locations[0].longitude)
        };

        marker = L.marker(latLng, {draggable: true}).addTo(map);
        for(const location of response.locations) {
          marker = L.marker([location.latitude, location.longitude], {draggable: true}).addTo(map);
        }
      });
    });
  });
});

