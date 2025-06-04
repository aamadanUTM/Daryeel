import multer from "multer";
import path from "path";
import fs from "fs/promises";
import {
  createUserModel,
  getAllUsersModel,
  getUserByIdModel,
  updateUserStatusModel,
  updateUserModel,
} from "../models/UserModel.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "images/users/"),
  filename: (req, file, cb) => {
    const username = req.body.usr_username || "user";
    const timestamp = Date.now();
    const extension = path.extname(file.originalname);
    const filename = `${username}_${timestamp}${extension}`;
    req.savedFilename = filename; // Save filename to request for later use
    cb(null, filename);
  },
});

const upload = multer({ storage });

export const createUser = async (req, res) => {
  upload.single("usr_file")(req, res, async (uploadErr) => {
    if (uploadErr) {
      console.error("Upload error:", uploadErr);
      return res.status(400).json({ error: "File upload failed" });
    }
    const data = req.body;
    // Set usr_photo only if file was uploaded
    if (req.file && req.savedFilename) {
      data.usr_photo = req.savedFilename;
    }
    createUserModel(data, async (err, results) => {
      if (err) {
        console.error("Error saving user:", err);
        // Delete the uploaded file if user creation fails
        if (req.file && req.file.path) {
          try {
            await fs.unlink(req.file.path);
          } catch (deleteErr) {
            console.error("Error deleting file:", deleteErr);
          }
        }
        return res.status(500).json({ error: "Failed to save user" });
      } else if (results.status === "error") {
        try {
          await fs.unlink(req.file.path);
        } catch (deleteErr) {
          console.error("Error deleting file:", deleteErr);
        }
        res.json({
          message: results.msg,
          status: results.status,
          color: "danger",
        });
      } else {
        res.json({
          message: results.msg,
          status: results.status,
          color: "success",
        });
      }
    });
  });
};
export const getAllUsers = (req, res) => {
  getAllUsersModel((err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    } else {
      res.json({ response: results });
    }
  });
};
export const getUserById = (req, res) => {
  const { id } = req.params;
  getUserByIdModel(id, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    } else {
      res.json({ response: results });
    }
  });
};
export const updateUser = (req, res) => {
  upload.single("usr_file")(req, res, async (uploadErr) => {
    if (uploadErr) {
      console.error("Upload error:", uploadErr);
      return res.status(400).json({ error: "File upload failed" });
    }

    const { id } = req.params;
    const data = req.body;
    data.usr_id = id;

    // Set usr_photo only if new file was uploaded
    if (req.file && req.savedFilename) {
      data.usr_photo = req.savedFilename;
    }

    try {
      // Fetch old user to get old photo filename
      const oldUser = await new Promise((resolve, reject) => {
        getUserByIdModel(id, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
      updateUserModel(data, async (err, results) => {
        if (err) {
          console.error("Update error:", err);
          // Delete uploaded file if update fails
          if (req.file && req.file.path) {
            try {
              await fs.unlink(req.file.path);
            } catch (deleteErr) {
              console.error(
                "Failed to delete new file after update error:",
                deleteErr
              );
            }
          }
          return res.status(500).json({ error: "Failed to update user" });
        }
        // If new photo uploaded, delete old one
        if (req.file && oldUser?.usr_photo) {
          const oldFilePath = `images/users/${oldUser.usr_photo}`;
          try {
            await fs.unlink(oldFilePath);
          } catch (deleteErr) {
            console.warn("Old photo deletion failed:", deleteErr.message);
          }
        }

        res.json({
          message: results.msg || "User updated successfully",
          status: results.status || "success",
          color: "success",
        });
      });
    } catch (fetchErr) {
      console.error("Failed to get old user:", fetchErr);
      return res.status(500).json({ error: "User fetch failed before update" });
    }
  });
};

export const updateUserStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  updateUserStatusModel({ id, status }, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    } else {
      res.json({
        response: "User Status Updated",
      });
    }
  });
};
export const deleteUser = (req, res) => {
  res.json({ message: "Delete user" });
};
