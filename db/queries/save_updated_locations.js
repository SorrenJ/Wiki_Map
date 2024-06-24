const db = require('../connection');

const saveLocations = (newLocationData) => {
  const {
    loc_id,
    lng,
    lat,
  } = newLocationData;

  console.log(lng, lat, loc_id);

  return db.query(`
    UPDATE locations
    SET longitude = $1, latitude = $2
    WHERE id = $3
    RETURNING *;`, [lng, lat, loc_id])
      .then(data => {
        return data.rows[0];
      });
};

module.exports = { saveLocations };
