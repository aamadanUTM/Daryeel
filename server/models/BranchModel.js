import db from "../db/db.js";

const getAllBranchesModel = (callback) => {
  const query = `SELECT * FROM branches`;
  db.query(query, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return callback(error, null);
    }
    return callback(null, results);
  });
};

export { getAllBranchesModel };
