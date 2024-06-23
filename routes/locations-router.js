const express = require('express');
const router = express.Router();
const newLocationQueries = require('../db/queries/addLocation');

router.post('/new', (req, res) => {
  // res.render('users');
  console.log(req.body);

  const name = req.body.name;
  const description = req.body.description;
  const image = req.body.image;
  const longitude = req.body.longitude;
  const latitude = req.body.latitude;
  // const mapId = req.body.mapId;
  // const userId = req.body.userId;

  const newLocation = {
    name,
    description,
    image,
    longitude,
    latitude,
    mapId,
    userId
  };

  newLocationQueries.addLocation(newLocation)
    .then(() => res.status(201).send());
  //res.redirect('/maps/:id')
});

module.exports = router;