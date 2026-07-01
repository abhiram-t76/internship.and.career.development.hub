const Profile = require("../models/Profile");

const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      userId: req.user.id,
    }).populate("userId", "name email");

    if (!profile) {
      return res.json({
        userId: {
          name: "",
          email: "",
        },
        personalDetails: "",
        educationDetails: "",
        careerInterests: "",
      });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const saveProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne({
      userId: req.user.id,
    });

    if (profile) {
      profile = await Profile.findByIdAndUpdate(
        profile._id,
        {
          ...req.body,
          userId: req.user.id,
        },
        {
          new: true,
        }
      ).populate("userId", "name email");
    } else {
      profile = await Profile.create({
        ...req.body,
        userId: req.user.id,
      });

      profile = await Profile.findById(profile._id).populate(
        "userId",
        "name email"
      );
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProfile,
  saveProfile,
};