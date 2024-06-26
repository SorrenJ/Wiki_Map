const express = require('express');
const router = express.Router();
const favoriteMapsQueries = require('../db/queries/fetch-favorites');
const contributionMapsQueries = require('../db/queries/fetch-contributions');

router.get('/', (req, res) => {
  console.log("GET");
  res.render("profile");
  // favoriteMapsQueries.getFavorites()
  //   .then(favorites => {
  //     console.log(favorites);
  //     res.render("profile", { favorites });
  //     //res.json({ favorites });
  //   })
});

router.get('/userId/favs', (req, res) => {
  console.log("GET");
  favoriteMapsQueries.getFavorites()
    .then(favorites => {
      console.log(favorites);
      //res.render("profile", { favorites });
      res.json({ favorites });
    })
});

router.get('/userId/contributions', (req, res) => {
  console.log("GET");
  contributionMapsQueries.getContributions()
    .then(contributions => {
      console.log(contributions);
      //res.render("profile", { contributions });
      res.json({ contributions });
    })
});

module.exports = router;
