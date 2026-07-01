const Certificate = require("../models/Certificate");
// Create
const createCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.create({
  ...req.body,
  userId: req.user.id,
  status: "Pending",
});
    res.status(201).json(certificate);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Read
const getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({
  userId: req.user.id,
});
    res.json(certificates);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Update
const updateCertificate = async (
  req,
  res
) => {
  try {
    const certificate =
      await Certificate.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
    res.json(certificate);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Delete
const deleteCertificate = async (
  req,
  res
) => {
  try {
    await Certificate.findByIdAndDelete(
      req.params.id
    );
    res.json({
      message: "Certificate Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Search
const searchCertificates = async (
  req,
  res
) => {
  try {
    const certificates =
  await Certificate.find({
    userId: req.user.id,
    title: {
      $regex: req.params.title,
      $options: "i",
    },
  });
    res.json(certificates);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
//Verify
const verifyCertificate = async (req, res) => {
  try {
    const certificate =
      await Certificate.findByIdAndUpdate(
        req.params.id,
        {
          status: req.body.status,
        },
        { new: true }
      );
    res.json(certificate);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getAllCertificates = async (req, res) => {
  try {
    const certificates =
      await Certificate.find()
        .populate("userId", "name email");

    res.json(certificates);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  createCertificate,
  getCertificates,
  updateCertificate,
  deleteCertificate,
  searchCertificates,
  verifyCertificate,
  getAllCertificates,
};