import {
  getAllOwnersModel,
  getOwnerByIDModel,
  createOwnerModel,
  updateOwnerModel,
} from "../models/OwnerModel.js";
export const getAllOwners = async (req, res) => {
  getAllOwnersModel((err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    } else {
      res.json({ response: results });
    }
  });
};
export const getOwnerById = (req, res) => {
  const { id } = req.params;
  getOwnerByIDModel(id, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    } else {
      res.json({ response: results });
    }
  });
};
export const createOwner = async (req, res) => {
  const data = req.body;
  createOwnerModel(data, async (err, results) => {
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
export const updateOwner = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  data.own_id = id;
  updateOwnerModel(data, async (err, results) => {
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
export const deleteOwner = async (req, res) => {
  res.json({ message: "Delete owner" });
};
