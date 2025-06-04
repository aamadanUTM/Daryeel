import multer from "multer";
import path from "path";

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "images/users/"),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}${path.extname(file.originalname)}`),
});

const upload = multer({ storage });

// Employee Registration & File Upload Handler
export const empReg = (req, res) => {
  if (!req.file) {
    return res.json({ message: "Please upload an image" });
  }

  res.json({
    message: "Employee registered successfully!",
    data: req.body,
    file: req.file,
  });
};

// Export Multer middleware to handle file upload
export const uploadMiddleware = upload.single("emp_file");
