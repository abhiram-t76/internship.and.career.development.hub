const express = require("express");
const router = express.Router();

const { protect, adminOnly } = require("../middleware/authMiddleware");
const { getAdminReports } = require("../controllers/reportController");

router.get("/admin", protect, adminOnly, getAdminReports);

module.exports = router;