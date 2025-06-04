import express from "express";
import { loginController } from "../controller/AuthController.js";
const router = express.Router();

// Authentication Route
router.post("/login", loginController);
router.get("/logout", (req, res) => {
  res.send("Logout");
});

export default router;
