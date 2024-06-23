const db = require('../connection');

const addLocation = (location) => {
  return db.query(`
    INSERT INTO locations
    (title, description, image, longitude, latitude, map_id, user_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`, [location.title, location.description, location.image, location.longitude, location.latitude, location.mapId, location.userId])
    .then(data => {
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
      return Promise.reject(err);
    })
};

// const addLocation = (location) => {
//   return db.query(`
//     INSERT INTO locations
//     (title, description, image, longitude, latitude)
//      VALUES ($1, $2, $3, $4, $5, $6, $7)`, [location.title, location.description, location.image, location.longitude, location.latitude/*, location.mapId, location.userId*/])
//     .then(data => {
//       return data.rows[0];
//     })
//     .catch((err) => {
//       console.log(err.message);
//       return Promise.reject(err);
//     })
// };

module.exports = { addLocation };