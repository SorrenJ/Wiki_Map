const db = require('../connection');

const getLocations = (id) => {
  return db.query('SELECT latitude, longitude FROM locations WHERE map_id = 2;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getLocations };
