import { getAllIdentificatonsModel } from "../models/IdentificationModel.js";
export const getIdentification = (req, res) => {
  getAllIdentificatonsModel((err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    } else {
      res.json({ response: results });
    }
  });
};
export const postIdentification = (req, res) => {
  res.json({
    message: "Identification post route",
    status: "success",
  });
};
