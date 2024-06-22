const express = require('express');
const router = express.Router();
const newLocationQueries = require('../db/queries/addLocation');

router.post('/new', (req, res) => {
  // res.render('users');
  console.log(req.body);
  newLocationQueries.addLocation(req.body)
    .then(location => {
      res.json(location);
    })
});

module.exports = router;