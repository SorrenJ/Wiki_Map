const express = require('express');
const router = express.Router();
const createMapQueries = require('../db/queries/createMap');

//Middleware
router.use("/", (req, res, next) => {
  if (!req.cookies.userId) {
    return res.redirect("/login");
  }
  next();
});

router.get('/', (req, res) => {
  const userId = req.cookies.userId;
  const templateVars = {
    userId: userId
  }
  res.render('create-map', templateVars);
});

router.post('/', (req, res) => {
  const userId = req.cookies.userId;
  const mapTitle = req.body.text[0];                //Form 'Text' inputs from request body
  const mapDescription = req.body.text[1];
  const mapThumbnailUrl = req.body.text[2];

  const mapInfo = {
    mapTitle,
    mapDescription,
    mapThumbnailUrl,
    userId: userId
  };

  createMapQueries.addMap(mapInfo)
    .then(newMap => {
      const newMapId = newMap.id;
      res.redirect(`/maps/${newMapId}`);          //Same as res.redirect(`/maps/:id`);
    });
});

module.exports = router;
