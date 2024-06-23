const express = require('express');
const router = express.Router();
const newLocationQueries = require('../db/queries/addLocation');

router.post('/new', (req, res) => {
  console.log('BODY IN ROUTE', req.body);

  const title = req.body.title;
  const description = req.body.description;
  const image = req.body.image;
  const longitude = req.body.longitude;
  const latitude = req.body.latitude;
  // TODO: fix this when ready
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
      //res.redirect('/maps/:id')
    });
});

module.exports = router;