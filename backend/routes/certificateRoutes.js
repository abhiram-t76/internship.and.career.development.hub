const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createCertificate,
  getCertificates,
  updateCertificate,
  deleteCertificate,
  searchCertificates,
  verifyCertificate,
  getAllCertificates,
} = require("../controllers/certificateController");
router.post("/", protect, createCertificate);
router.get("/", protect, getCertificates);
router.get("/search/:title", protect, searchCertificates);
router.put("/:id", protect, updateCertificate);
router.delete("/:id", protect, deleteCertificate);
router.put("/verify/:id", protect, verifyCertificate);
router.get(
  "/admin",
  protect,
  getAllCertificates
);
module.exports = router;