import { response } from "express";
import { getAllBranchesModel } from "../models/BranchModel.js";

export const getAllBranches = async (req, res) => {
  getAllBranchesModel((err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    } else {
      res.json({ response: results });
    }
  });
};

export const getBranchById = async (req, res) => {
  res.json({ message: "Get branch by ID" });
};
export const createBranch = async (req, res) => {
  res.json({ message: "Create branch" });
};
export const updateBranch = async (req, res) => {
  res.json({ message: "Update branch" });
};
export const deleteBranch = async (req, res) => {
  res.json({ message: "Delete branch" });
};
