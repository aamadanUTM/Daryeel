import connection from "../db/db.js";

const login = (data, callback) => {
  const { username, password } = data;

  const query = `
    SELECT u.id, u.username, u.email, r.name AS role, u.profile_photo
    FROM users u
    INNER JOIN roles r ON r.id = u.role_id
    WHERE u.username = ? AND u.password = MD5(?) and u.user_status = 1
  `;

  connection.query(query, [username, password], (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return callback(error, null);
    }

    if (results.length > 0) {
      return callback(null, {
        code: "success",
        user: results[0],
      });
    } else {
      return callback(null, {
        code: "invalid",
        msg: "Invalid Username or Password",
      });
    }
  });
};

export default { login };
