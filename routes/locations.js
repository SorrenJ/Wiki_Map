const express = require('express');
const router  = express.Router();
const locationQueries = require('../db/queries/fetch_locations');
const saveLocationQueries = require('../db/queries/save_locations');


router.get('/:id', (req, res) => {
  console.log("Requested Map", req.params.id);
  const mapId = req.params.id;        //Get map id (:id) from req.params.id
  res.cookie('map_id', mapId);        //Set map id as map_id in respond cookie
  res.render("map", {mapId});                  //Load to map.ejs
});

router.get('/:id/locations', (req, res) => {
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
});

module.exports = router;
