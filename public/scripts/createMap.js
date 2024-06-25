const map = L.map('map').setView([43.651070, -79.347015], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const mapTitle = $("#map-title").val();
const mapDescription = $("#map-description").val();
const mapImage = $("#upload-image").val();
