const express = require('express');
const router  = express.Router();
const locationQueries = require('../db/queries/fetch_locations');

router.get('/:id/locations', (req, res) => {
  locationQueries.getLocations(req.params.id)
    .then(locations => {
      console.log("Returned query result:", locations);
      res.json({locations});
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
