const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createSkill,
  getSkills,
  deleteSkill,
  updateSkill,
  searchSkills,
} = require("../controllers/skillController");
router.post("/", protect,createSkill);
router.get("/", protect,getSkills);
router.get("/search/:name", protect,searchSkills);
router.put("/:id",protect, updateSkill);
router.delete("/:id", protect,deleteSkill);
module.exports = router;