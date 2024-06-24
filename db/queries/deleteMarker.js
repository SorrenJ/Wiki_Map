const pool = require('../connection');


const deleteMarker = function (delete_M) {
    
    
const locationId = delete_M.loc_id;

console.log("delete marker", locationId)
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
    console.log("deleted")
    return res.rows;
  })
  .catch(err => console.error('query error', err.stack));

  };
  
  module.exports = { deleteMarker };