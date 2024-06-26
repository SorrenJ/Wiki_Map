const express = require('express');
const router = express.Router();

router.use(express.urlencoded({ extended: false }));

router.get('/:id', (req, res) => {
  const mapId = req.params.id;
  const templateVars = {
    mapId
  }
  res.render('map', templateVars);
});

module.exports = router;
