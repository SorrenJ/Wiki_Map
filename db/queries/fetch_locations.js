const db = require('../connection');

const getLocations = (id) => {
  console.log(id);
  return db.query('SELECT latitude, longitude FROM locations WHERE map_id = $1;', [id])
    .then(data => {
      return data.rows;
    });
};

module.exports = { getLocations };