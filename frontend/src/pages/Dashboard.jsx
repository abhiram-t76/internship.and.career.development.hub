import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { getSkills } from "../services/skillService";
import { getProjects } from "../services/projectService";
import { getCertificates } from "../services/certificateService";
import { getApplications } from "../services/applicationService";
import { getProfile } from "../services/profileService";
import {
  FaLaptopCode,
  FaProjectDiagram,
  FaCertificate,
  FaBriefcase,
  FaUserGraduate,
  FaArrowRight,
  FaChartLine,
  FaFolderOpen,
  FaFileAlt,
  FaTasks,
} from "react-icons/fa";
function Dashboard() {
  const [skillsCount, setSkillsCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [certificatesCount, setCertificatesCount] = useState(0);
  const [applicationsCount, setApplicationsCount] = useState(0);
  const [resumeScore, setResumeScore] = useState(0);
  const [latestInternships, setLatestInternships] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const skills = await getSkills();
      const projects = await getProjects();
      const certificates = await getCertificates();
      const applications = await getApplications();
      const profile = await getProfile();
      const internships = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/internships`
);


      const skillsTotal = skills.data.length;
      const projectsTotal = projects.data.length;
      const certificatesTotal = certificates.data.length;
      const applicationsTotal = applications.data.length;

      setSkillsCount(skillsTotal);
      setProjectsCount(projectsTotal);
      setCertificatesCount(certificatesTotal);
      setApplicationsCount(applicationsTotal);



setLatestInternships(
  Array.isArray(internships.data)
    ? internships.data.slice(0, 3)
    : []
);
    const activityData = [];

skills.data.slice(-1).forEach(item =>
  activityData.push({
    text: `Added Skill: ${item.name}`,
    icon: "skill",
  })
);

projects.data.slice(-1).forEach(item =>
  activityData.push({
    text: `Added Project: ${item.title}`,
    icon: "project",
  })
);

certificates.data.slice(-1).forEach(item =>
  activityData.push({
    text: `Uploaded Certificate: ${item.title}`,
    icon: "certificate",
  })
);

applications.data.slice(-1).forEach(() =>
  activityData.push({
    text: "Applied for Internship",
    icon: "application",
  })
);
activityData.reverse();
setActivities(activityData);
let score = 0;

const profileData = profile.data;

const profileCompleted =
  profileData.personalDetails ||
  profileData.educationDetails ||
  profileData.careerInterests;

if (profileCompleted) score += 20;

if (skillsTotal > 0) score += 20;
if (projectsTotal > 0) score += 20;
if (certificatesTotal > 0) score += 20;
if (applicationsTotal > 0) score += 20;

setResumeScore(score);
    } catch (error) {
      console.log(error);
    }finally {
  setLoading(false);
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
<div className="spinner-border text-primary" role="status">
  <span className="visually-hidden">Loading...</span>
</div>      </div>
    </>
  );
}
  return (
    <>
      <Navbar />
      <div className="container py-5">

  <div className="d-flex align-items-center mb-4">
    <FaUserGraduate className="text-primary me-2" size={28} />
    <div>
      <h2 className="fw-bold mb-0">Welcome Back</h2>
      <p className="text-muted mb-0">
        Track your internship journey and career progress.
      </p>
    </div>
  </div>

  {/* Hero Section */}
      
                {/* Hero Section */}

        <div
          className="card border-0 shadow-lg mb-5"
          style={{
            background: "linear-gradient(135deg,#2563eb,#1e40af)",
            color: "#fff",
            borderRadius: "22px",
          }}
        >
          <div className="card-body p-5">
            <div className="row align-items-center">

              <div className="col-lg-8">

                <h1 className="fw-bold mb-3">
                  Student Dashboard
                </h1>

                <p className="fs-5 mb-4">
                  Manage your profile, projects, certificates,
                  internship applications and career progress
                  from one centralized dashboard.
                </p>

                <Link
                  to="/internships"
                  className="btn btn-warning btn-lg"
                >
                  Explore Internships
                  <FaArrowRight className="ms-2" />
                </Link>

              </div>

              <div className="col-lg-4 text-center">

                <FaChartLine
                  style={{
                    fontSize: "120px",
                    opacity: 0.9,
                  }}
                />

              </div>

            </div>
          </div>
        </div>
{/* Profile Completion */}

<div className="card border-0 shadow-lg mb-5">
  <div className="card-body">

    <div className="d-flex justify-content-between align-items-center mb-3">
      <h4 className="fw-bold mb-0">Profile Completion</h4>
      <span className="badge bg-info text-dark">
        {resumeScore}%
      </span>
    </div>

    <div className="progress" style={{ height: "18px" }}>
      <div
        className="progress-bar bg-info"
        style={{ width: `${resumeScore}%` }}
      ></div>
    </div>

    <div className="row mt-4 text-center">

      <div className="col-md-3">
        <div className={skillsCount > 0 ? "text-success" : "text-secondary"}>
          <FaLaptopCode size={28} />
          <p className="mt-2 mb-0">Skills</p>
        </div>
      </div>

      <div className="col-md-3">
        <div className={projectsCount > 0 ? "text-success" : "text-secondary"}>
          <FaProjectDiagram size={28} />
          <p className="mt-2 mb-0">Projects</p>
        </div>
      </div>

      <div className="col-md-3">
        <div className={certificatesCount > 0 ? "text-success" : "text-secondary"}>
          <FaCertificate size={28} />
          <p className="mt-2 mb-0">Certificates</p>
        </div>
      </div>

      <div className="col-md-3">
        <div className={applicationsCount > 0 ? "text-success" : "text-secondary"}>
          <FaBriefcase size={28} />
          <p className="mt-2 mb-0">Applications</p>
        </div>
      </div>

    </div>

  </div>
</div>
        
                {/* Statistics */}

        <div className="row g-4">

          <div className="col-lg-3 col-md-6">
            <div
              className="card text-white border-0 shadow-lg h-100"
              style={{
                background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
              }}
            >
              <div className="card-body text-center">

                <FaLaptopCode
                  size={42}
                  className="mb-3"
                />

                <h5 className="fw-semibold">
                  Skills
                </h5>

                <h1 className="fw-bold">
                  {skillsCount}
                </h1>

              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div
              className="card text-white border-0 shadow-lg h-100"
              style={{
                background: "linear-gradient(135deg,#10b981,#059669)",
              }}
            >
              <div className="card-body text-center">

                <FaFolderOpen
                  size={42}
                  className="mb-3"
                />

                <h5 className="fw-semibold">
                  Projects
                </h5>

                <h1 className="fw-bold">
                  {projectsCount}
                </h1>

              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div
              className="card text-white border-0 shadow-lg h-100"
              style={{
                background: "linear-gradient(135deg,#f59e0b,#d97706)",
              }}
            >
              <div className="card-body text-center">

                <FaFileAlt
                  size={42}
                  className="mb-3"
                />

                <h5 className="fw-semibold">
                  Certificates
                </h5>

                <h1 className="fw-bold">
                  {certificatesCount}
                </h1>

              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div
              className="card text-white border-0 shadow-lg h-100"
              style={{
                background: "linear-gradient(135deg,#dc2626,#b91c1c)",
              }}
            >
              <div className="card-body text-center">

                <FaTasks
                  size={42}
                  className="mb-3"
                />

                <h5 className="fw-semibold">
                  Applications
                </h5>

                <h1 className="fw-bold">
                  {applicationsCount}
                </h1>

              </div>
            </div>
          </div>

        </div>
                {/* Career Progress */}

        <div className="card border-0 shadow-lg mt-5">
          <div className="card-body">

            <h3 className="fw-bold mb-4">
              <FaUserGraduate className="me-2 text-primary" />
              Career Progress
            </h3>

            <ul className="list-group list-group-flush">

  <li className="list-group-item d-flex justify-content-between align-items-center">
    <span>
      <FaUserGraduate className="me-2 text-primary" />
      Add Skills
    </span>

    {skillsCount > 0 ? (
      <span className="badge bg-success">Completed</span>
    ) : (
      <span className="badge bg-secondary">Pending</span>
    )}
  </li>

  <li className="list-group-item d-flex justify-content-between align-items-center">
    <span>
      <FaProjectDiagram className="me-2 text-success" />
      Add Projects
    </span>

    {projectsCount > 0 ? (
      <span className="badge bg-success">Completed</span>
    ) : (
      <span className="badge bg-secondary">Pending</span>
    )}
  </li>

  <li className="list-group-item d-flex justify-content-between align-items-center">
    <span>
      <FaCertificate className="me-2 text-warning" />
      Upload Certificates
    </span>

    {certificatesCount > 0 ? (
      <span className="badge bg-success">Completed</span>
    ) : (
      <span className="badge bg-secondary">Pending</span>
    )}
  </li>

  <li className="list-group-item d-flex justify-content-between align-items-center">
    <span>
      <FaBriefcase className="me-2 text-danger" />
      Apply Internship
    </span>

    {applicationsCount > 0 ? (
      <span className="badge bg-success">Completed</span>
    ) : (
      <span className="badge bg-secondary">Pending</span>
    )}
  </li>

</ul>

          </div>
        </div>

        {/* Quick Actions */}

        <div className="card border-0 shadow-lg mt-5">
          <div className="card-body">

            <h3 className="fw-bold mb-4">
              Quick Actions
            </h3>

            <div className="row g-3">

              <div className="col-lg-3 col-md-6">
                <Link to="/skills" className="btn btn-primary w-100 py-3">
                  Manage Skills
                </Link>
              </div>

              <div className="col-lg-3 col-md-6">
                <Link to="/projects" className="btn btn-success w-100 py-3">
                  Manage Projects
                </Link>
              </div>

              <div className="col-lg-3 col-md-6">
                <Link to="/certificates" className="btn btn-warning w-100 py-3">
                  Certificates
                </Link>
              </div>

              <div className="col-lg-3 col-md-6">
                <Link to="/internships" className="btn btn-danger w-100 py-3">
                  Find Internships
                </Link>
              </div>

            </div>

          </div>
        </div>
        {/* Recent Summary */}

<div className="card border-0 shadow-lg mt-5">
  <div className="card-body">

    <h3 className="fw-bold mb-4">
      Recent Summary
    </h3>

    <div className="list-group">

      <div className="list-group-item d-flex justify-content-between align-items-center">
        <span>
          <FaLaptopCode className="text-primary me-2" />
          Skills
        </span>
        <span className="badge bg-primary rounded-pill">
          {skillsCount}
        </span>
      </div>

      <div className="list-group-item d-flex justify-content-between align-items-center">
        <span>
          <FaProjectDiagram className="text-success me-2" />
          Projects
        </span>
        <span className="badge bg-success rounded-pill">
          {projectsCount}
        </span>
      </div>

      <div className="list-group-item d-flex justify-content-between align-items-center">
        <span>
          <FaCertificate className="text-warning me-2" />
          Certificates
        </span>
        <span className="badge bg-warning text-dark rounded-pill">
          {certificatesCount}
        </span>
      </div>

      <div className="list-group-item d-flex justify-content-between align-items-center">
        <span>
          <FaBriefcase className="text-danger me-2" />
          Applications
        </span>
        <span className="badge bg-danger rounded-pill">
          {applicationsCount}
        </span>
      </div>

    </div>

  </div>
</div>
{/* Recent Activity */}
<div className="card border-0 shadow-lg mt-5">
  <div className="card-body">
    <h3 className="fw-bold mb-4">Recent Activity</h3>

    {activities.length === 0 ? (
      <p className="text-muted">No recent activity.</p>
    ) : (
      <ul className="list-group list-group-flush">
       {activities.map((activity, index) => (
  <li
    key={index}
    className="list-group-item d-flex align-items-center"
  >
    {activity.icon === "skill" && (
      <FaLaptopCode className="me-2 text-primary" />
    )}

    {activity.icon === "project" && (
      <FaProjectDiagram className="me-2 text-success" />
    )}

    {activity.icon === "certificate" && (
      <FaCertificate className="me-2 text-warning" />
    )}

    {activity.icon === "application" && (
      <FaBriefcase className="me-2 text-danger" />
    )}

    {activity.text}
  </li>
))}
      </ul>
    )}
  </div>
</div>
{/* Latest Internships */}

<div className="card border-0 shadow-lg mt-5">
  <div className="card-body">

    <div className="d-flex justify-content-between align-items-center mb-4">
      <h3 className="fw-bold mb-0">
        Latest Internships
      </h3>

      <Link
        to="/internships"
        className="btn btn-outline-primary"
      >
        View All
      </Link>
    </div>

    {latestInternships.length === 0 ? (

      <div className="text-center text-muted py-4">
        No internships available.
      </div>

    ) : (

      latestInternships.map((internship) => (

        <div
          key={internship._id}
          className="card border-0 shadow-sm mb-3"
        >
          <div className="card-body">

            <div className="d-flex justify-content-between align-items-center">

              <div>
                <h5 className="fw-bold">
                  {internship.title}
                </h5>

                <p className="mb-1 text-muted">
                  {internship.companyName }
                </p>

                <small className="text-secondary">
  Deadline: {new Date(internship.deadline).toLocaleDateString()}
</small>
              </div>

              <Link
                to="/internships"
                className="btn btn-primary"
              >
                View
              </Link>

            </div>

          </div>
        </div>

      ))

    )}

  </div>
</div>
      </div>
      </>
  );
}

export default Dashboard;
