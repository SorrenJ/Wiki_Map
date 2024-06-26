// Client facing scripts here

$('#delete-btn').on('click', function() {
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

});


