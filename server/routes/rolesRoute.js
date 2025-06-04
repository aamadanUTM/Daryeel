import express from "express";
import {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  updateRoleStatus,
  deleteRole,
} from "../controller/RolesController.js"; // Corrected the file name to RolesController.js
const router = express.Router();

router.get("/getAllRoles", getAllRoles);
router.get("/getRoleById/:id", getRoleById);
router.post("/createRole", createRole);
router.put("/updateRole/:id", updateRole);
router.put("/updateRoleStatus/:id", updateRoleStatus);
router.delete("/deleteRole/:id", deleteRole);

export default router;
