const pool = require('../connection');


const deleteMarker = function (delete_M) {


  const locationId = delete_M.loc_id;

  // User inputted queries for creating a new property
  const queryString = `
      DELETE FROM locations
     WHERE id = $1
     RETURNING * ;
  `;

  const queryParams = [
    locationId
  ];

  // Pool query error handling
  return pool.query(queryString, queryParams)
    .then(res => {
      return res.rows[0];
    })
    .catch
    (err => console.error('query error', err.stack));

};

module.exports = { deleteMarker };
