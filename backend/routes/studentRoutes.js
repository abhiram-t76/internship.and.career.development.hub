const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const {
  createStudent,
  getStudents,getStudentById,updateStudent,deleteStudent
} = require("../controllers/studentController");
router.post("/", createStudent);
router.get("/", getStudents);
router.get("/search/:name", async (req, res) => {
  try {
    const students = await Student.find({
      name: {
        $regex: req.params.name,
        $options: "i",
      },
    });
    res.json(students);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.get("/:id",getStudentById);
router.put("/:id", updateStudent);
router.delete("/:id",deleteStudent);
router.get("/search/:name", async (req, res) => {
  const students = await Student.find({
    name: {
      $regex: req.params.name,
      $options: "i",
    },
  });
  res.json(students);
});
module.exports = router;