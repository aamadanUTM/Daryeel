import express from "express";
import {
  getAllOwners,
  getOwnerById,
  createOwner,
  updateOwner,
  deleteOwner,
} from "../controller/OwnerController.js";

const router = express.Router();
// Define the routes for owner operations
router.get("/getAllOwners", getAllOwners);
router.get("/getOwnerById/:id", getOwnerById);
router.post("/createOwner", createOwner);
router.put("/updateOwner/:id", updateOwner);
router.delete("/deleteOwner/:id", deleteOwner);
export default router;
