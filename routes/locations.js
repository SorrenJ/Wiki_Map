const express = require('express');
const router = express.Router();
const locationQueries = require('../db/queries/fetch_locations');
const saveLocationQueries = require('../db/queries/save_updated_locations');
const newLocationQueries = require('../db/queries/addLocation');
const deleteMarkerQueries = require('../db/queries/deleteMarker');

router.get('/:id', (req, res) => {
  console.log("Requested Map", req.params.id);
  const mapId = req.params.id;                   //Get map id (:id) from req.params.id
  res.cookie('map_id', mapId);                   //Set map id as map_id in respond cookie
  res.render("map", { mapId });                  //Load to map.ejs
});

router.get('/:id/locations', (req, res) => {
  console.log("Map", req.params.id);
  locationQueries.getLocations(req.params.id)
    .then(locations => {
      console.log("Returned query result:", locations);
      res.json({ locations });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/:id/locations', (req, res) => {
  console.log("Post successful...", req.body);
  console.log("Location", req.body.location_id);
  console.log(req.body.lat, req.body.lng, req.params.id);
  const editedLocationData = {
    lat: req.body.lat,
    lng: req.body.lng,
    loc_id: req.body.location_id
  }
  saveLocationQueries.saveLocations(editedLocationData)
    .then((editedLocation) => {
      res.json({ editedLocation });
    });
});

router.post('/:id/locations/new', (req, res) => {
  console.log('BODY IN ROUTE', req.body);

  const title = req.body.title;
  const description = req.body.description;
  const image = req.body.image;
  const longitude = req.body.longitude;
  const latitude = req.body.latitude;
  const mapId = req.body.mapId === "" ? null : req.body.mapId;
  const userId = req.body.userId === "" ? null : req.body.userId;

  const newLocation = {
    title,
    description,
    image,
    longitude,
    latitude,
    mapId,
    userId
  };

  newLocationQueries.addLocation(newLocation)
    .then(() => res.status(201).send())
    .catch((err) => {
      console.log(err.message);
      return Promise.reject(err);
    });
});

router.post('/:id/locations/delete', (req, res) => {
  console.log("Okay...");
  const locationData = {
    loc_id: req.body.location_id
  }
  deleteMarkerQueries.deleteMarker(locationData)
    .then((deletedLocation) => {
      res.json({deletedLocation});
    });
});


module.exports = router;
