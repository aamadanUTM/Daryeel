import express from "express";
import cors from "cors";

//Middlewares
import authMiddleware from "./middlewares/authMiddleware.js";
// Import routes
import authRoute from "./routes/authRoute.js";
import branchRouter from "./routes/branchRoutes.js";
import roleRouter from "./routes/rolesRoute.js";
import userRouter from "./routes/userRoutes.js";
import ownerRoutes from "./routes/ownerRoutes.js";
import identificationRoutes from "./routes/identifcationRoutes.js";
import vehileRoutes from "./routes/vehicleRoutes.js";
const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve uploaded images statically
app.use("/images", express.static("images"));

app.use(
  cors({
    origin: "http://localhost:4000", // Allow React frontend
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
// Public Routes
app.use("/auth", authRoute);

// Protected routes
app.use("/branches", authMiddleware, branchRouter);
app.use("/roles", authMiddleware, roleRouter);
app.use("/users", authMiddleware, userRouter);
app.use("/owners", authMiddleware, ownerRoutes);
app.use("/identification", authMiddleware, identificationRoutes);
app.use("/vehicles", authMiddleware, vehileRoutes);
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
