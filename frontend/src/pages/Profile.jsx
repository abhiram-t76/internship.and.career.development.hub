import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  getProfile,
  saveProfile,
} from "../services/profileService";

function Profile() {
  const [profile, setProfile] = useState({
    personalDetails: "",
    educationDetails: "",
    careerInterests: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const res = await getProfile();

      setProfile({
        personalDetails: res.data.personalDetails || "",
        educationDetails: res.data.educationDetails || "",
        careerInterests: res.data.careerInterests || "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await saveProfile(profile);

      alert("Profile Saved Successfully");

      fetchProfile();
    } catch (error) {
      console.error(error);
      alert("Failed to Save");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          <div
            className="spinner-border text-primary"
            role="status"
          >
            <span className="visually-hidden">
              Loading...
            </span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h1 className="fw-bold mb-4">
          Profile Management
        </h1>

        <div className="card shadow-lg border-0">
          <div className="card-body">

            <h4 className="mb-4">
              Update Your Profile
            </h4>

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Personal Details
                </label>

                <textarea
                  className="form-control shadow-sm"
                  rows="4"
                  name="personalDetails"
                  placeholder="Enter your personal details..."
                  value={profile.personalDetails}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Education Details
                </label>

                <textarea
                  className="form-control shadow-sm"
                  rows="4"
                  name="educationDetails"
                  placeholder="Enter your education details..."
                  value={profile.educationDetails}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">
                  Career Interests
                </label>

                <textarea
                  className="form-control shadow-sm"
                  rows="4"
                  name="careerInterests"
                  placeholder="Enter your career interests..."
                  value={profile.careerInterests}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary px-4"
              >
                Save Profile
              </button>

            </form>

          </div>
        </div>

      </div>
    </>
  );
}

export default Profile;