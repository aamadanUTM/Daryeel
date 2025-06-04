import db from "../db/db.js";
const getAllUsersModel = (callback) => {
  const query = `SELECT u.id,u.full_name,u.username,u.email,u.address,u.phone,u.profile_photo,u.gender,
  u.created_at,u.updated_at,b.name AS 'branch_name',r.name AS 'role_name',us.name AS 'user_status',u.last_login FROM users u
  inner join branches b on u.branch_id = b.id
  inner join roles r on u.role_id = r.id
  inner join user_status us on u.user_status = us.id
  order by u.id asc
  `;
  db.query(query, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return callback(error, null);
    }
    return callback(null, results);
  });
};
const getUserByIdModel = (id, callback) => {
  const query = `SELECT u.id,u.full_name,u.username,u.email,u.address,u.phone,u.profile_photo,u.gender,
  u.created_at,u.updated_at,b.id as 'branch_id', b.name AS 'branch_name', r.id as 'role_id',r.name AS 'role_name',us.name AS 'user_status',u.last_login FROM users u
  inner join branches b on u.branch_id = b.id
  inner join roles r on u.role_id = r.id
  inner join user_status us on u.user_status = us.id
  WHERE u.id = ?  
  `;
  db.query(query, [id], (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return callback(error, null);
    }
    return callback(null, results[0]);
  });
};
const createUserModel = (user, callback) => {
  const query = `CALL sp_insert_user(?,?,?, ?, ?, ?, ?, ?, ?,?)`;
  db.query(
    query,
    [
      user.usr_fullName,
      user.usr_address,
      user.usr_branch,
      user.usr_role,
      user.usr_username,
      user.usr_password,
      user.usr_email,
      user.usr_phone,
      user.usr_photo,
      user.usr_gender,
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
const updateUserStatusModel = (user, callback) => {
  const query = `update users set user_status = ? where id = ?`;
  db.query(query, [user.status, user.id], (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return callback(error, null);
    }
    return callback(null, results);
  });
};
const updateUserModel = (user, callback) => {
  if (!user.usr_photo) {
    user.usr_photo = "";
  }
  const query = `CALL sp_update_user(?,?,?,?,?,?,?,?,?,?)`;
  db.query(
    query,
    [
      user.usr_id,
      user.usr_fullName,
      user.usr_address,
      user.usr_branch,
      user.usr_role,
      user.usr_username,
      user.usr_email,
      user.usr_phone,
      user.usr_gender,
      user.usr_photo,
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

export {
  getAllUsersModel,
  getUserByIdModel,
  createUserModel,
  updateUserStatusModel,
  updateUserModel,
};
