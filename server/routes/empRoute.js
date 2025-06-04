import express from "express";
import { empReg, uploadMiddleware } from "../controller/empController.js";

const router = express.Router();

// Route for employee registration with file upload
router.post("/registration", uploadMiddleware, empReg);

export default router;
