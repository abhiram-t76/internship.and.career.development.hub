const User = require("../models/User");
const Profile = require("../models/Profile");
const Skill = require("../models/Skill");
const Project = require("../models/Project");
const Certificate = require("../models/Certificate");
const Application = require("../models/Application");

const getAdminReports = async (req, res) => {
  try {
    // Get all students
    const students = await User.find({ role: "student" }).select(
      "name email"
    );

    const reports = await Promise.all(
      students.map(async (student) => {
        const profile = await Profile.findOne({
          userId: student._id,
        });

        const skills = await Skill.countDocuments({
          userId: student._id,
        });

        const projects = await Project.countDocuments({
          userId: student._id,
        });

        const certificates =
          await Certificate.countDocuments({
            userId: student._id,
          });

        const applications =
          await Application.countDocuments({
            userId: student._id,
          });

        let careerScore = 0;

        if (profile?.personalDetails) careerScore += 20;
        if (profile?.educationDetails) careerScore += 20;
        if (profile?.careerInterests) careerScore += 10;
        if (skills > 0) careerScore += 20;
        if (projects > 0) careerScore += 20;
        if (certificates > 0) careerScore += 5;
        if (applications > 0) careerScore += 5;

        let status = "Needs Improvement";

        if (careerScore >= 80) {
          status = "Internship Ready";
        } else if (careerScore >= 60) {
          status = "Good Progress";
        }

        return {
          _id: student._id,
          name: student.name,
          email: student.email,

          personalDetails:
            profile?.personalDetails || "",

          educationDetails:
            profile?.educationDetails || "",

          careerInterests:
            profile?.careerInterests || "",

          skills,
          projects,
          certificates,
          applications,

          careerScore,
          status,
        };
      })
    );

    res.json(reports);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAdminReports,
};