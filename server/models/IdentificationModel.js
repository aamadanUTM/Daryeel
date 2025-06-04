import db from "../db/db.js";
const getAllIdentificatonsModel = (callback) => {
  const query = `SELECT * FROM identification_types`;
  db.query(query, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return callback(error, null);
    }
    return callback(null, results);
  });
};
export { getAllIdentificatonsModel };
