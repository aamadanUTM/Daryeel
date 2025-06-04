import db from "../db/db.js";
const getAllOwnersModel = (callback) => {
  const query = `SELECT o.id,o.full_name,o.gender,o.date_of_birth,o.phone_number,o.email,o.address,o.identification_number,i.name 'identification_type',b.id 'branch_id',b.name 'branch_name'
    FROM owners o
    INNER JOIN identification_types i on i.id=o.identification_type
    INNER JOIN branches b on b.id=o.branch_id`;
  db.query(query, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return callback(error, null);
    }
    return callback(null, results);
  });
};
const getOwnerByIDModel = (id, callback) => {
  const query = `SELECT o.id,o.full_name,o.gender,o.date_of_birth,o.phone_number,
    o.email,o.address,o.identification_number,i.id 'identification_type_id',i.name 'identification_type',b.id 'branch_id',b.name 'branch_name'
    FROM owners o
    INNER JOIN identification_types i on i.id=o.identification_type
    INNER JOIN branches b on b.id=o.branch_id
    WHERE o.id = ?`;
  db.query(query, [id], (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return callback(error, null);
    }
    return callback(null, results[0]);
  });
};
const createOwnerModel = (data, callback) => {
  const query = `CALL sp_insert_owner(?,?,?, ?, ?, ?, ?, ?, ?,?)`;
  db.query(
    query,
    [
      data.own_fullName,
      data.own_gender,
      data.own_dob,
      data.own_phone,
      data.own_email,
      data.own_address,
      data.own_identification,
      data.own_identification_number,
      data.own_branch,
      1,
    ],
    (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        return callback(error, null);
      }
      return callback(null, results[0][0]);
    }
  );
};
const updateOwnerModel = (data, callback) => {
  const query = `CALL sp_update_owner(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(
    query,
    [
      data.own_id,
      data.own_fullName,
      data.own_gender,
      data.own_dob,
      data.own_phone,
      data.own_email,
      data.own_address,
      data.own_identification,
      data.own_identification_number,
      data.own_branch,
    ],
    (error, results) => {
      if (error) {
        console.error("Error executing updateOwnerModel query:", error);
        return callback(error, null);
      }
      return callback(null, results[0][0]); // returns color, msg, status from SP
    }
  );
};

export {
  getAllOwnersModel,
  getOwnerByIDModel,
  createOwnerModel,
  updateOwnerModel,
};
