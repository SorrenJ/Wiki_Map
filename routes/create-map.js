const express = require('express');
const router = express.Router();
const createMapQueries = require('../db/queries/createMap');

router.get('/', (req, res) => {
  res.render('create-map');
});

router.post('/', (req, res) => {
  console.log("In Post", req.body.text);      //Form 'Text' inputs from request body
  const mapTitle = req.body.text[0];
  const mapDescription = req.body.text[1];
  const mapThumbnailUrl = req.body.text[2];

  const mapInfo = {
    mapTitle,
    mapDescription,
    mapThumbnailUrl
  };

  createMapQueries.addMap(mapInfo)
    .then(newMap => {
      //res.json({newMap});
      const newMapId = newMap.id;
      res.redirect(`/maps/${newMapId}`);          //Same as res.redirect(`/maps/:id`);
    });
});

module.exports = router;
