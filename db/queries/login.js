const db = require('../connection');

const getLoggedInUser = (userEmail) => {
  return db.query(`
    SELECT id, username
    FROM users WHERE map_id = $1;`, [userEmail])
    .then(data => {
      return data.rows;
    });
};

module.exports = { getLoggedInUser };
