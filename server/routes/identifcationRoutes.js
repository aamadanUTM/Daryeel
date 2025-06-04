import express from "express";
import {
  getIdentification,
  postIdentification,
} from "../controller/IdentificationController.js";
const router = express.Router();

router.get("/getIdentificaton", getIdentification);
router.post("/postIdentificaton", postIdentification);

export default router;
