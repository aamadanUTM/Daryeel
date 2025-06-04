import db from "../db/db.js";

const getAllVehicleModelsModel = (callback) => {
  const query = `SELECT vm.id, vm.model_name, vm.model_code, vs.id 'make_id', vs.make_name
FROM vehicle_models vm
INNER JOIN vehicle_makes vs ON vm.make_id = vs.id
ORDER BY vm.id ASC;`;
  db.query(query, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return callback(error, null);
    }
    return callback(null, results);
  });
};

const createVehicleModelsModel = (data, callback) => {
  const query = `CALL sp_insert_vehicle_model(?,?,?)`;
  db.query(
    query,
    [data.model_name, data.model_code, data.make_id],
    (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        return callback(error, null);
      }
      return callback(null, results[0][0]);
    }
  );
};
const updateVehicleModelsModel = (data, callback) => {
  const query = `CALL sp_update_vehicle_model(?,?,?,?)`;
  db.query(
    query,
    [data.model_name, data.model_code, data.make_id, data.modelId],
    (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        return callback(error, null);
      }
      return callback(null, results[0][0]);
    }
  );
};
const getAllVehicleMakesModel = (callback) => {
  const query = `SELECT id,make_name,make_code from vehicle_makes`;
  db.query(query, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return callback(error, null);
    }
    return callback(null, results);
  });
};
const createVehicleMakesModel = (data, callback) => {
  const query = `CALL sp_insert_vehicle_make(?,?)`;
  db.query(query, [data.make_name, data.make_code], (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return callback(error, null);
    }
    return callback(null, results[0][0]);
  });
};
const updateVehicleMakesModel = (data, callback) => {
  const query = `CALL sp_update_vehicle_make(?,?,?)`;
  db.query(
    query,
    [data.make_id, data.make_name, data.make_code],
    (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        return callback(error, null);
      }
      return callback(null, results[0][0]);
    }
  );
};

const getAllVehicles = (callback) => {
  const query = `SELECT v.id, v.vin,v.engine_number,v.license_plate, v.year_of_manufacture,v.color,v.fuel_type,v.body_type,v.engine_size_cc,
v.imported_from,v.vehicle_condition,v.status,vm.model_name,vms.make_name from vehicles v
inner join vehicle_models vm on vm.id=v.model_id
inner join vehicle_makes vms on vms.id=vm.make_id;
`;
  db.query(query, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return callback(error, null);
    }
    return callback(null, results);
  });
};
export {
  getAllVehicleModelsModel,
  createVehicleModelsModel,
  updateVehicleModelsModel,
  getAllVehicleMakesModel,
  createVehicleMakesModel,
  updateVehicleMakesModel,
  getAllVehicles,
};
