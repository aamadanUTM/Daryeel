import express from "express";
import cors from "cors";

// Import routes
import authRoute from "./routes/authRoute.js";
import empRouter from "./routes/empRoute.js";
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
// Routes
app.use("/auth", authRoute);
app.use("/employee", empRouter);
app.use("/branches", branchRouter);
app.use("/roles", roleRouter);
app.use("/users", userRouter);
app.use("/owners", ownerRoutes);
app.use("/identification", identificationRoutes);
app.use("/vehicles", vehileRoutes);
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
