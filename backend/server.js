const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");
const skillRoutes = require("./routes/skillRoutes");
const connectDB = require("./config/db");
const certificateRoutes =
  require("./routes/certificateRoutes");
const projectRoutes =
  require("./routes/projectRoutes");
const applicationRoutes =
  require("./routes/applicationRoutes");
  const internshipRoutes =
require("./routes/internshipRoutes");
const profileRoutes =
  require("./routes/profileRoutes");
const userRoutes=
require("./routes/userRoutes");
const reportRoutes = require("./routes/reportRoutes");
dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/students", studentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/skills", skillRoutes);
app.use(
  "/api/projects",
  projectRoutes
);
app.use(
  "/api/certificates",
  certificateRoutes
);
app.use(
  "/api/applications",
  applicationRoutes
);
app.use(
"/api/internships",
internshipRoutes
);
app.use(
  "/api/profile",
  profileRoutes
);
app.use("/api/users", userRoutes);
app.use("/api/reports", reportRoutes);
app.get("/", (req, res) => {
  res.send("Server Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});