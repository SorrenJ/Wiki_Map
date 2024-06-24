// Client facing scripts here

// Client facing scripts here
const map = L.map('map').setView([43.651070, -79.347015], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


// L.marker([43.651070, -79.347015]).addTo(map);

map.on("click", function(e){ 
    var marker = new L.marker([e.latlng.lat, e.latlng.lng])
    .addTo(map);
  });

$(document).ready(function() {



  let marker, latLng;
  $('#delete-btn').on('click', function(e) {
    $(() => {
      $.ajax({
        method: 'GET',
        url: '/maps/:id'
      })
      .done((response) => {
        //$('#delete-btn').attr('disabled');
        console.log(response);
        // console.log(response.locations[0]);
        alert("clicked on delete");
        // latLng = {
        //   lat: Number(response.locations[0].latitude),
        //   lng: Number(response.locations[0].longitude)
        // };

        // map.on("click", function(e){ 
        //     var marker = new L.marker([e.latlng.lat, e.latlng.lng])
        //     .addTo(map).on('click', e=> e.target.remove());
        //   });


        var marker = new L.marker([e.latlng.lat, e.latlng.lng])
            // const marker = this;
    
            btn.addEventListener("click", function () {
                e.target.remove();
          
              map.removeLayer(marker);
            });
   



   
      });
    });
  });
});

// make a button function here jquery

// $("$favorite")
