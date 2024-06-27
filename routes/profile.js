const express = require('express');
const router = express.Router();
const favoriteMapsQueries = require('../db/queries/fetch-favorites');
const contributionMapsQueries = require('../db/queries/fetch-contributions');

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
  };
  console.log("GET");
  res.render("profile", templateVars);
});

router.get('/favs', (req, res) => {
  const userId = req.cookies.userId;
  console.log("GET", userId);
  favoriteMapsQueries.getFavorites(userId)
    .then(favorites => {
      console.log(favorites);
      res.json({ favorites });
    })
});

router.get('/contributions', (req, res) => {
  const userId = req.cookies.userId;
  console.log("GET", userId);
  contributionMapsQueries.getContributions(userId)
    .then(contributions => {
      console.log(contributions);
      res.json({ contributions });
    })
});

module.exports = router;
