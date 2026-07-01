const Application = require("../models/Application");
// Create Application
const createApplication = async (req, res) => {
  try {
    const {
      internshipId,
      companyName,
      role,
    } = req.body;

    const existingApplication =
    await Application.findOne({
      userId: req.user.id,
      internshipId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message:
          "You have already applied for this internship",
      });
    }

    const application =
      await Application.create({
        userId: req.user.id,
        internshipId,
        companyName,
        role,
        status: "Applied",
      });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Applications
const getApplications = async (req, res) => {
  try {
    const applications =
      await Application.find({
      userId: req.user.id,
      });

    res.json(applications);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Admin - Get All Applications
const getAllApplications = async (req, res) => {
  try {
    const applications =
      await Application.find()
        .populate(
          "userId",
          "name email"
        );

    res.json(applications);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Update Status
const updateApplication = async (
  req,
  res
) => {
  try {
    const application =
      await Application.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.json(application);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete
const deleteApplication = async (
  req,
  res
) => {
  try {
    await Application.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Application Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Search
const searchApplications = async (
  req,
  res
) => {
  try {
    const applications =
  await Application.find({
    userId: req.user.id,
    companyName: {
      $regex: req.params.name,
      $options: "i",
    },
  });

    res.json(applications);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateApplicationStatus = async (
  req,
  res
) => {
  try {
    const application =
      await Application.findByIdAndUpdate(
        req.params.id,
        {
          status: req.body.status,
        },
        {
          new: true,
        }
      );

    res.json(application);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createApplication,
  getApplications,
  getAllApplications,
  updateApplication,
  deleteApplication,
  searchApplications,
  updateApplicationStatus,
};