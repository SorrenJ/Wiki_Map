const express = require('express');
const router  = express.Router();
const locationQueries = require('../db/queries/fetch_locations');
const saveLocationQueries = require('../db/queries/save_locations');
const deleteMarkerQueries = require('../db/queries/deleteMarker');

router.get('/:id', (req, res) => {
  console.log("Requested Map", req.params.id);
  const mapId = req.params.id;        //Get map id (:id) from req.params.id
  res.cookie('map_id', mapId);        //Set map id as map_id in respond cookie
  res.render("map", {mapId});                  //Load to map.ejs
});

router.get('/:id/locations', (req, res) => {
  //const paramId = res.cookie().req.headers.cookie.split("=")[4];
  console.log("RES", res.cookie().req.headers.cookie.split("=")[4]);
  console.log("Map", req.params.id);
  // console.log("In route", req.params.id);
  locationQueries.getLocations(req.params.id)
    .then(locations => {
      console.log("Returned query result:", locations);
      res.json({locations});
      // const templateVars = {
      //   lat: locations[0].latitude,
      //   lng: locations[0].longitude,
      // };
      // res.render("map", templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/:id/locations', (req, res) => {
  console.log("Okay...");
  console.log(req.body);
  console.log(req.body.lat);
  console.log(req.body.lng);
  console.log(req.params.id);
  const locationData = {
    lat: req.body.lat,
    lng: req.body.lng,
    map_id: req.params.id
  }
  saveLocationQueries.saveLocations(locationData)
    .then((newLocation) => {
      res.json({newLocation});
    });
});





module.exports = router;