const express = require("express");
const router = express.Router();
const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");
const {
  createApplication,
  getApplications,
  getAllApplications,
  updateApplication,
  deleteApplication,
  searchApplications,
  updateApplicationStatus,
} = require("../controllers/applicationController");
router.post("/", protect,createApplication);
router.get(
  "/admin",
  protect,
  adminOnly,
  getAllApplications
);
router.get(
  "/",
  protect,
  getApplications
);
router.get(
  "/search/:name",
  protect,
  searchApplications
);
router.put(
  "/status/:id",
  protect,
  updateApplicationStatus
);
router.put(
  "/:id",
  protect,
  updateApplication
);
router.delete(
  "/:id",
  protect,
  deleteApplication
);
module.exports = router;