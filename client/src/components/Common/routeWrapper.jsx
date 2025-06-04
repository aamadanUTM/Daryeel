import React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { validateToken } from "../../utilities/userAuthentication";

const RouteWrapper = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("authUser"))?.token;
    const isValidToken = validateToken(token);
    if (!isValidToken) {
      localStorage.removeItem("authUser");
      navigate("/login"); // Redirect to login if the token is invalid
    }
    const pathSegments = location.pathname.split("/").filter(Boolean); // Remove empty parts
    if (pathSegments.length > 0) {
      const pageName = pathSegments[0]; // Get first segment (e.g., "employees" or "createUser")
      const formattedName = pageName
        .replace(/([a-z])([A-Z])/g, "$1 $2") // "vehicleModels" → "vehicle Models"
        .split(" ") // ["vehicle", "Models"]
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // ["Vehicle", "Models"]
        .join(" "); // "Vehicle Models"
      document.title = formattedName;
    } else {
      document.title = ""; // Default title
    }
  }, [location.pathname, navigate]); // Added `navigate` to the dependency array

  return <>{children}</>;
};

export default RouteWrapper;
