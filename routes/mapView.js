const express = require('express');
const router  = express.Router();

router.get('/:id', (req, res) => {
  res.render('map');
}); 

module.exports = router;