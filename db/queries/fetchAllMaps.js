const db = require('../connection');

const getAllMaps = () => {
  return db.query('SELECT * FROM maps;')
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      return Promise.reject(err);
    })
};

module.exports = { getAllMaps };