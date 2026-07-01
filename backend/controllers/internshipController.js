const Internship = require("../models/Internship");

// Get all internships
const getInternships = async (req, res) => {
  try {
    const internships = await Internship.find().sort({ createdAt: -1 });
    res.json(internships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create internship
const createInternship = async (req, res) => {
  try {
    const internship = await Internship.create({
      companyName: req.body.companyName,
      title: req.body.title,
      description: req.body.description,
      requirements: req.body.requirements,
      deadline: req.body.deadline,
    });

    res.status(201).json(internship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update internship
const updateInternship = async (req, res) => {
  try {
    const internship = await Internship.findByIdAndUpdate(
      req.params.id,
      {
        companyName: req.body.companyName,
        title: req.body.title,
        description: req.body.description,
        requirements: req.body.requirements,
        deadline: req.body.deadline,
      },
      { new: true }
    );

    if (!internship) {
      return res.status(404).json({
        message: "Internship not found",
      });
    }

    res.json(internship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete internship
const deleteInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({
        message: "Internship not found",
      });
    }

    await internship.deleteOne();

    res.json({
      message: "Internship deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getInternships,
  createInternship,
  updateInternship,
  deleteInternship,
};