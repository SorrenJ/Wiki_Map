const map = L.map('map').setView([43.651070, -79.347015], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let marker, locationId, newLatLng, clickedMarker;

$(() => {
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
        console.log("Current location Id", location.id);
        onMarkerClick(e, location.id)
     });

    }
  });
});

$('#delete-btn').on('click', function() {
  alert("clicked on delete");

  clickedMarker.on('click', function() {
  map.removeLayer(clickedMarker);
  });
});

function onMarkerClick(event, locationId) {
  $('#edit-btn').show();
  $('#save-btn').show();
  $('#delete-btn').show();
  console.log(`Marker ${locationId} was clicked`);
  console.log(event);

  const $form = $(this).find($('form'));
  $form.children($(".location_id").children($("<input>")).val(locationId));          //Locate the <div> element with class location_id and update its <input> element value

  clickedMarker = event.target;
}

$('#edit-btn').on('click', function(e) {
  console.log("Edit Button Clicked", e);
  //Enable the Marker Drag feature
  clickedMarker.dragging.enable();
  //Trigger dragstart on selected marker
  clickedMarker.on('dragstart', onMarkerDrag);
});

$('#edit-btn').on('blur', function(e) {
  $('#edit-btn').hide();
});

$('#edit-btn').hide();
$('#save-btn').hide();
$('#edit-btn').hide();
$('#delete-btn').hide();

function onMarkerDrag(e){
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
};
