import {
  getAllRolesModel,
  updateRolesModel,
  updateRoleStatusModel,
  createRoleModel,
} from "../models/RolesModel.js";

export const getAllRoles = (req, res) => {
  getAllRolesModel((err, results) => {
    if (err) {
      return res.json({ error: err });
    } else {
      res.json({ response: results });
    }
  });
};
export const getRoleById = (req, res) => {
  res.json({ message: "Get role by ID" });
};
export const createRole = (req, res) => {
  const data = req.body;
  console.log(data);
  createRoleModel(data, async (err, results) => {
    if (err) {
      console.error("Error saving owner:", err);
      return res.status(500).json({ error: "Failed to save user" });
    } else {
      res.json({
        message: results.msg,
        status: results.status,
        color: "success",
      });
    }
  });
};
export const updateRole = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  data.id = id;
  updateRolesModel(data, async (err, results) => {
    if (err) {
      console.error("Error saving owner:", err);
      return res.status(500).json({ error: "Failed to save user" });
    } else {
      res.json({
        message: results.msg,
        status: results.status,
        color: "success",
      });
    }
  });
};
export const updateRoleStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  updateRoleStatusModel({ id, status }, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    } else {
      res.json({
        response: "User Status Updated",
      });
    }
  });
};
export const deleteRole = (req, res) => {
  res.json({ message: "Delete role" });
};
