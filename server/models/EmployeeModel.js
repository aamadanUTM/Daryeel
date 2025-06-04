import connection from "../db/db.js";
export const empReg = (data, callback) => {
  connection.query("CALL sp_empReg(?,?,?,?,?,?,?,?,?,?,?)", [
    data.emp_name,
    data.emp_email,
  ]);
};
