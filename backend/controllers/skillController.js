const Skill = require("../models/Skill");
// Create
const createSkill = async (req, res) => {
  try {
const skill = await Skill.create({
  ...req.body,
  userId: req.user.id,
});    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Read All
const getSkills = async (req, res) => {
  try {
const skills = await Skill.find({
  userId: req.user.id,
});    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Delete
const deleteSkill = async (req, res) => {
  try {
await Skill.findOneAndDelete({
  _id: req.params.id,
  userId: req.user.id,
});    res.json({ message: "Skill Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Update Skill
const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findOneAndUpdate(
  {
    _id: req.params.id,
    userId: req.user.id,
  },
  req.body,
  { new: true }
);
    res.json(skill);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Search Skill
const searchSkills = async (req, res) => {
  try {
    const skills = await Skill.find({
  userId: req.user.id,
  name: {
    $regex: req.params.name,
    $options: "i",
  },
});
    res.json(skills);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  createSkill,
  getSkills,
  deleteSkill,
  updateSkill,
  searchSkills,
};