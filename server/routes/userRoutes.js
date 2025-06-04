import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserStatus,
  deleteUser,
} from "../controller/UserController.js";

const router = express.Router();

router.get("/getAllUsers", getAllUsers);
router.get("/getUser/:id", getUserById);
router.post("/createUser", createUser);
router.put("/updateUser/:id", updateUser);
router.put("/updateStatus/:id", updateUserStatus);
router.delete("/deleteUser/:id", deleteUser);

export default router;
