import {
  getAllVehicleModelsModel,
  createVehicleModelsModel,
  updateVehicleModelsModel,
  getAllVehicleMakesModel,
  createVehicleMakesModel,
  updateVehicleMakesModel,
  getAllVehicles,
  getVehiclesById,
} from "../models/VehicleModels.js";

export const getVehicleModels = (req, res) => {
  getAllVehicleModelsModel((error, results) => {
    if (error) {
      console.error("Error fetching vehicle models:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json(results);
  });
};

export const createVehicleModels = (req, res) => {
  const data = req.body;
  console.log("Data received for vehicle model creation:", data);
  createVehicleModelsModel(data, async (err, results) => {
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
export const updateVehicleModels = (req, res) => {
  const data = req.body;
  updateVehicleModelsModel(data, async (err, results) => {
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

export const getVehicleMakes = (req, res) => {
  getAllVehicleMakesModel((error, results) => {
    if (error) {
      console.error("Error fetching vehicle models:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json(results);
  });
};
export const createVehicleMakes = (req, res) => {
  const data = req.body;
  console.log("Data received for vehicle make creation:", data);
  createVehicleMakesModel(data, async (err, results) => {
    if (err) {
      console.error("Error saving owner:", err);
      return res.status(500).json({ error: "Failed to save user" });
    } else {
      res.json({
        message: results.msg,
        status: results.status,
        color: results.status.color,
      });
    }
  });
};
export const updateVehicleMakes = (req, res) => {
  const data = req.body;
  const { id } = req.params;
  data.make_id = id;
  updateVehicleMakesModel(data, async (err, results) => {
    if (err) {
      console.error("Error saving owner:", err);
      return res.status(500).json({ error: "Failed to save user" });
    } else {
      res.json({
        message: results.msg,
        status: results.status,
        color: results.color,
      });
    }
  });
};

export const getVehicles = (req, res) => {
  getAllVehicles((error, results) => {
    if (error) {
      console.error("Error fetching vehicle models:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json(results);
  });
};

export const getVehicleById = (req, res) => {
  const { id } = req.params;
  getVehiclesById(id, (error, results) => {
    if (error) {
      console.error("Error fetching vehicle by ID:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(200).json(results[0]);
  });
};
