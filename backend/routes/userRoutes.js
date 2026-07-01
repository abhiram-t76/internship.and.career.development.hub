const express = require("express");
const router = express.Router();
const { protect } =
require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  getUsers,
  searchUsers,
  deleteUser,
} = require("../controllers/userController");
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", protect, getUsers);
router.get(
  "/search/:name",
  protect,
  searchUsers
);
router.delete(
  "/:id",
  protect,
  deleteUser    
);
module.exports = router;