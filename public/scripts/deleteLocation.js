// Client facing scripts here

// Client facing scripts here
// const map = L.map('map').setView([43.651070, -79.347015], 13);

// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   maxZoom: 19,
//   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);


// // Add a few markers
// addMarker(43.651070, -79.347015);
// addMarker(45.651070, -79.347015);
// addMarker(46.651070, -79.347015);


// // Function to add a marker with a click event listener
// function addMarker(lat, lng) {
  
//   var marker = L.marker([lat, lng]).addTo(map);
 
//   $('#delete-btn').on('click', function() {
//     alert("clicked on delete");
 
 
//   marker.on('click', function() {
//     map.removeLayer(marker);
//   });

// });


// }






$('#delete-btn').on('click', function() {
  alert("clicked on delete");

  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
       layer.remove();
    }
  });

 
  const $form = $(this).find($('form'));
  const location_id = $form.children($(".location_id").children($("<input>")).val()); 
  const mapId = $("#map_id").data("currentmap"); 

  $.ajax({
    url: `/maps/${mapId}/locations/delete`,
    method: 'POST',
    data: location_id,
    success: () =>
      console.log("Location successfully deleted"),
    error: function (error) {
      console.error('Error submitting form:', error);
    }
  });



//   clickedMarker.on('click', function() {
//   map.removeLayer(clickedMarker);
// });
});


