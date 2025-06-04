import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const postLogin = async (data) => {
  try {
    const response = await axios.post("/auth/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      return {
        code: "invalid",
        message:
          "Username and password are invalid. Please enter correct username and password",
      };
    } else {
      return {
        code: "error",
        error: error.response?.status || "Unknown",
        message:
          "An unexpected server error occurred. Please try again later or contact the administrator.",
      };
    }
  }
};

export const validateToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    return decoded.exp > currentTime; // Check if token is expired
  } catch (error) {
    return false; // Invalid token structure
  }
};
