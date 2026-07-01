const express = require("express");
const router = express.Router();
const Internship = require("../models/Internship");
router.get("/", async (req, res) => {
  const internships = await Internship.find();
  res.json(internships);
});
router.post("/", async (req, res) => {
  try {
    console.log("Received:", req.body);

    const internship = await Internship.create({
      companyName: req.body.companyName,
      title: req.body.title,
      description: req.body.description,
      requirements: req.body.requirements,
      deadline: req.body.deadline,
    });

    res.status(201).json(internship);
  } catch (err) {
    console.error("POST ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
});
router.put("/:id", async (req, res) => {
  const internship = await Internship.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(internship);
});
router.delete("/:id", async (req, res) => {
  await Internship.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});
module.exports = router;