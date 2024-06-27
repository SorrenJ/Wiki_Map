const express = require('express');
const router = express.Router();
const locationQueries = require('../db/queries/fetchLocations');
const saveLocationQueries = require('../db/queries/saveEditedLocations');
const newLocationQueries = require('../db/queries/addLocation');
const deleteMarkerQueries = require('../db/queries/deleteMarker');
const mapDetailQueries = require('../db/queries/fetchMapDetails');

router.get('/:id', (req, res) => {
  const mapId = req.params.id;                   //Get map id (:id) from req.params.id
  res.cookie('map_id', mapId);                   //Set map id as map_id in respond cookie

  const userId = req.cookies.userId;

  mapDetailQueries.getMapDetails(mapId)
    .then(mapDetails => {
      const mapInfo = {
        userId: userId,
        mapId: mapDetails.id,
        title: mapDetails.title
      }
      res.render("map", mapInfo);                  //Load to map.ejs
    })
    .catch((err) => {
      console.error(err.message);
      return Promise.reject(err);
    });
});

router.get('/:id/locations', (req, res) => {
  locationQueries.getLocations(req.params.id)
    .then(locations => {
      res.json({ locations });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


//Middleware
router.use("/", (req, res, next) => {
  if (!req.cookies.userId) {
    return res.redirect("/login");
  }
  next();
});


router.post('/:id/locations', (req, res) => {
  const editedLocationData = {
    lat: req.body.lat,
    lng: req.body.lng,
    loc_id: req.body.location_id
  }
  saveLocationQueries.saveLocations(editedLocationData)
    .then((editedLocation) => {
      const mapId = editedLocation.map_id;
      res.redirect(`/maps/${mapId}`);
    })
    .catch((err) => {
      console.error(err.message);
      return Promise.reject(err);
    });
});

router.post('/:id/locations/new', (req, res) => {
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
      console.error(err.message);
      return Promise.reject(err);
    });
});

router.post('/:id/locations/delete', (req, res) => {
  const locationData = {
    loc_id: req.body.location_id
  }
  deleteMarkerQueries.deleteMarker(locationData)
    .then((deletedLocation) => {
      const mapId = deletedLocation.map_id;
      res.redirect(`/maps/${mapId}`);
    })
    .catch((err) => {
      console.error(err.message);
      return Promise.reject(err);
    });
});


module.exports = router;
