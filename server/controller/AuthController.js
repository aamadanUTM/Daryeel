import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import AuthModel from "../models/AuthModel.js";
dotenv.config();

export const loginController = async (req, res) => {
  try {
    const { username, password } = req.body; // changed username ➔ email

    // Validate input
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Usernaem and password are required" });
    }

    // Authenticate user
    AuthModel.login({ username, password }, (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (result.code === "success") {
        const user = result.user;

        // Generate JWT
        const token = generateToken(user.id);

        return res.status(200).json({
          code: "success",
          token: token,
          user: user,
        });
      } else {
        return res
          .status(401)
          .json({ code: "invalid", error: "Invalid credentials" });
      }
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};

function generateToken(userId) {
  return jwt.sign({ user_id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN, // fixed
  });
}
