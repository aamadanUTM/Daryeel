import express from "express";
import {
  createBranch,
  getAllBranches,
  getBranchById,
  updateBranch,
  deleteBranch,
} from "../controller/BranchController.js";

const router = express.Router();
router.get("/getbranches", getAllBranches);
router.get("/getbranch/:id", getBranchById);
router.post("/createbranch", createBranch);
router.put("/updatebranch/:id", updateBranch);
router.delete("/deletebranch/:id", deleteBranch);

export default router;
