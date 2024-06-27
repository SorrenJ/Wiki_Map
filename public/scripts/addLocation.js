const allCookies = document.cookie.split(';');          //Split all cookies using ; to get the name=value pairs

let userCookie, cookieValue;

for (const cookie of allCookies) {
  let trimmedCookie = cookie.trim();
  let splitCookies = trimmedCookie.split('=');        //Split name=value pair using = to get name and value separately

  if (splitCookies[0] === 'userId') {
    userCookie = splitCookies[0];
    cookieValue = splitCookies[1];
    break;
  }
}

$(".add-location-button").hide();
$("#favorite_button").hide();


if (userCookie) {
  $(".add-location-button").show();
  $("#favorite_button").show();
}

function onMapClick(e) {
  var marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);

  // Shows the form
  $('.new-location').css('display', 'block');

  // Handle form submission
  const $form = $('.new-location-form');

  $form.on('submit', (event) => {
    event.preventDefault();

    const newLocationObj = {
      title: $('.new-location-title').val(),
      description: $('.new-location-description').val(),
      image: $('.new-location-image').val(),
      longitude: e.latlng.lng,
      latitude: e.latlng.lat,
      mapId: $('.hidden-map-id').data('map-id'),
      userId: cookieValue
    };

    // AJAX request to submit form data
    $.ajax({
      url: `/maps/${newLocationObj.mapId}/locations/new`,
      method: 'POST',
      data: newLocationObj,
      success: () =>
        console.log("Location successfully added"),
      error: function (error) {
        console.error('Error submitting form:', error);
      }
    })

    // Hide form
    $('.new-location').css('display', 'none');

    // Removes event listener after 1 marker(location) has been added.
    map.off('click', onMapClick);
  })
}

// Doesn't let the new marker to be positioned in the map until the 'Add Location' button is hit
$('.add-location-button').click(() =>
  map.on('click', onMapClick)
);
