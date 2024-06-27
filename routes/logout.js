const express = require('express');
const router  = express.Router();

router.post('/', (req, res) => {
  res.clearCookie('userId');           //Clear/Delete the cookie
  res.redirect('/');
});

module.exports = router;
