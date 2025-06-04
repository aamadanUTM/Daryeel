import db from "../db/db.js";
const getAllRolesModel = (callback) => {
  const query = `SELECT id, name, 
    CASE 
      WHEN status = 1 THEN 'Active' 
      WHEN status = 2 THEN 'In Active' 
      ELSE status 
    END AS status 
    FROM roles`;
  db.query(query, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return callback(error, null);
    }
    return callback(null, results);
  });
};
const updateRolesModel = (data, callback) => {
  const query = `CALL sp_update_role(?, ?)`;
  db.query(query, [data.id, data.role_name], (error, results) => {
    if (error) {
      console.error("Error executing updateRoleModel query:", error);
      return callback(error, null);
    }
    return callback(null, results[0][0]); // returns color, msg, status from SP
  });
};
const updateRoleStatusModel = (role, callback) => {
  const query = `update roles set status = ? where id = ?`;
  db.query(query, [role.status, role.id], (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return callback(error, null);
    }
    return callback(null, results);
  });
};
const createRoleModel = (data, callback) => {
  const query = `CALL sp_insert_role(?)`;
  db.query(query, [data.role_name], (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return callback(error, null);
    }
    return callback(null, results[0][0]);
  });
};
export {
  getAllRolesModel,
  updateRolesModel,
  updateRoleStatusModel,
  createRoleModel,
};
