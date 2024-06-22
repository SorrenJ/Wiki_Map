const addLocation = require("../../db/queries/addLocation");

var map = L.map('map').setView([43.651070, -79.347015], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);



// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

function onMapClick(e) {
  alert(e.latlng);

  var marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
  console.log(e.latlng);

  // Shows the form
  $('.new-location').css('display', 'block');

  // Handle form submission
  $('.new-location-form').submit(function (event) {
    event.preventDefault();

    const newLocationObj = {
      title: $('.title').val(),
      description: $('.description').val(),
      image: $('.image').val(),
      longitude: e.latlng.lng,
      latitude: e.latlng.lat,
      map_id: req.params.id,
      user_id: req.cookie.session
    };

    addLocation(newLocationObj);

    //   // AJAX request to submit form data
    //   $.ajax({
    //     type: 'POST',
    //     url: '/location/new',
    //     data: newLocationObj,
    //     success: function (response) {
    //       addLocation(newLocationObj); -----------------------------------------------------------
    //     },
    //     error: function (error) {
    //       console.error('Error submitting form:', error);
    //     }
    //   })
  });

  // Hide form
  $('.new-location').css('display', 'none');


  // });

  // Removes event listener after 1 marker(location) has been added.
  map.off('click', onMapClick);
}

// Doesn't let the new marker to be positioned in the map until the 'Add Location' button is hit
$('.add-location-button').click(() =>
  map.on('click', onMapClick)
);