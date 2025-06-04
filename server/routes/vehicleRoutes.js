import express from "express";
const router = express.Router();
import {
  createVehicleModels,
  getVehicleModels,
  updateVehicleModels,
  getVehicles,
  //   getVehicleById,
  //   getVehicleMakeById,
  //   getVehicleModelById,
  getVehicleMakes,
  createVehicleMakes,
  updateVehicleMakes,
  //   createVehicle,
  //   updateVehicle,
  //   updateVehicleMake,
  //   deleteVehicle,
} from "../controller/VehiclesController.js";
//get

// Vehicle Models
router.get("/vehicle-models", getVehicleModels);
router.post("/vehicle-models", createVehicleModels);
router.put("/vehicle-models/:id", updateVehicleModels);

router.get("/getvehicles", getVehicles);
// router.get("/vehicles/:id", getVehicleById);

router.get("/vehicle-makes", getVehicleMakes);
router.post("/vehicle-makes", createVehicleMakes);
router.put("/vehicle-makes/:id", updateVehicleMakes);
// router.get("/vehicle-makes/:id", getVehicleMakeById);

// router.get("/vehicle-models/:id", getVehicleModelById);

export default router;
