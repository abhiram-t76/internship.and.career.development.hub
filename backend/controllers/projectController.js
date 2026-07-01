const Project = require("../models/Project");
// Create
const createProject = async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Read
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      userId: req.user.id,
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Delete
const deleteProject = async (req, res) => {
  try {
    await Project.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    res.json({
      message: "Project Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateProject = async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
  {
    _id: req.params.id,
    userId: req.user.id,
  },
  req.body,
  { new: true }
);
    res.json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const searchProjects = async (req, res) => {
  try {
    const projects = await Project.find({
  userId: req.user.id,
  title: {
    $regex: req.params.title,
    $options: "i",
  },
});
    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  createProject,
  getProjects,
  deleteProject,
  updateProject,
  searchProjects,
};