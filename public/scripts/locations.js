const map = L.map('map').setView([43.651070, -79.347015], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let marker, locationId, newLatLng, clickedMarker;

$('#edit-btn').hide();
$('#save-btn').hide();
$('#cancel-btn').hide();
$('#delete-btn').hide();
$(".location-details").hide();

$(() => {
  const allCookies = document.cookie.split(';');
  console.log("All Cookies", allCookies);

  let userCookie, cookieValue;

  for (const cookie of allCookies) {
    let trimmedCookie = cookie.trim();              //Split all cookies using ; to get the name=value pairs
    let splitCookies = trimmedCookie.split('=');        //Split name=value pair using = to get name and value separately

    console.log("Split cookies", splitCookies);

    if(splitCookies[0] === 'userId') {
      userCookie = splitCookies[0];
      console.log("Name", userCookie);
      cookieValue = splitCookies[1];
      console.log("Val", cookieValue);
      break;
    }
  }

  const mapId = $("#map_id").data("currentmap");      //Access the 'data' attribute of the #map_id element
  console.log("Current Map", mapId);
  $.ajax({
    method: 'GET',
    url: `/maps/${mapId}/locations`
  })
  .done((response) => {
    console.log(response);

    for(const location of response.locations) {
      newLatLng = {
        lat: Number(location.latitude),
        lng: Number(location.longitude)
      };
      marker = L.marker(newLatLng).addTo(map);

      //Trigger the click event handler and pass that event along with the location.id for selected marker as args to the onMarkerClick function
      marker.on('click', function(e) {
        if(clickedMarker) {
          $('#cancel-btn').hide();
          $('#save-btn').hide();
          $(".location-details").hide();
          $(".location-title").remove();
          $(".location-description").remove();
          //$(".location-image").remove();
          clickedMarker.dragging.disable();
        }

        const $title = $("<section class=location-title>").text(location.title);
        const $description = $("<section class=location-description>").text(location.description);
        //const $img = $("<img class=location-image>").attr('src', location.image);
        $(".location-details").append($title, $description);
        $(".location-details").show();
        console.log("Current location Id", location.id);

        console.log("What is in the cookie?", userCookie);
        if(!userCookie) {
          console.log("Test successful");
          clickedMarker = this;
          return;
        }
        onMarkerClick(e, location.id)
     });

     map.on('click', function(e) {
      $(".location-details").hide();
      $(".location-title").remove();
      $(".location-description").remove();
      //$(".location-image").remove();
      $('#edit-btn').hide();
      $('#delete-btn').hide();
     })
    }
  });
});

$('#delete-btn').on('click', function() {
  alert("Location Removed");

  clickedMarker.on('click', function() {
    map.removeLayer(clickedMarker);
  });
});

function onMarkerClick(event, locationId) {
  $('#edit-btn').show();
  $('#delete-btn').show();

  console.log(`Marker ${locationId} was clicked`);
  console.log(event);

  const $form = $(this).find($('form'));
  $form.children($(".location_id").children($("<input>")).val(locationId));          //Locate the <div> element with class location_id and update its <input> element value

  clickedMarker = event.target;
}

$('#edit-btn').on('click', function(e) {
  $('#edit-btn').hide();
  $('#delete-btn').hide();
  $('#save-btn').show();
  $('#cancel-btn').show();
  console.log("Edit Button Clicked", e);

  //Enable the Marker Drag feature
  clickedMarker.dragging.enable();
  //Trigger dragstart on selected marker
  clickedMarker.on('dragstart', onMarkerDrag);
});

$('#cancel-btn').on('click', function() {
  $('#cancel-btn').hide();
  $('#save-btn').hide();
  $(".location-title").remove();
  $(".location-description").remove();
  //$(".location-image").remove();
  clickedMarker.dragging.disable();
  clickedMarker = undefined;
});


function onMarkerDrag(e){
  $('#edit-btn').hide();
  //Trigger dragend on selected marker
  this.on('dragend', onMarkerDrop);
}

function onMarkerDrop(event) {
  //Get new coordinates
  newLatLng = this._latlng;
  console.log("New LatLng:", newLatLng);

  //Traverse the DOM to find the form
  const $form = $(this).find($('form'));
  $form.children($(".lat").children($("<input>")).val(newLatLng.lat));          //Locate the <div> element with class lat and update its <input> element value
  $form.children($(".lng").children($("<input>")).val(newLatLng.lng));          //Locate the <div> element with class lng and update its <input> element value

  //Disable the Marker Drag feature
  clickedMarker.dragging.disable();
  clickedMarker.on('click', () => {
    $('#save-btn').show();
    $('#cancel-btn').show();
  })
};
