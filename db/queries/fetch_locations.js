const db = require('../connection');

const getLocations = (id) => {
  return db.query(`
    SELECT *
    FROM locations WHERE map_id = $1;`, [id])
    .then(data => {
      return data.rows;
    });
};

module.exports = { getLocations };
