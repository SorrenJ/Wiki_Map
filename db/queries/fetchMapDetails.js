const db = require('../connection');

const getMapDetails = (id) => {
  return db.query(`
    SELECT *
    FROM maps WHERE id = $1;`, [id])
    .then(data => {
      console.log("Map Info", data.rows[0]);
      return data.rows[0];
    });
};

module.exports = { getMapDetails };
