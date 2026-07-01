import { useState, useEffect } from "react";
import {
  FaUsers,
  FaBriefcase,
  FaClipboardList,
  FaCertificate,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import AdminNavbar from "../components/AdminNavbar";
import { getAllApplications } from "../services/applicationService";
import { getAllCertificates } from "../services/certificateService";
import { getInternships } from "../services/internshipService";
import { getUsers } from "../services/userService";

function AdminDashboard() {
  const [studentsCount, setStudentsCount] = useState(0);
  const [internshipsCount, setInternshipsCount] = useState(0);
  const [applicationsCount, setApplicationsCount] = useState(0);
  const [certificatesCount, setCertificatesCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const users = await getUsers();
      const internships = await getInternships();
      const applications = await getAllApplications();
      const certificates = await getAllCertificates();

      setStudentsCount(users.data.length);
      setInternshipsCount(internships.data.length);
      setApplicationsCount(applications.data.length);
      setCertificatesCount(certificates.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const cards = [
    {
      title: "Students",
      count: studentsCount,
      color: "primary",
      icon: <FaUsers size={35} />,
    },
    {
      title: "Internships",
      count: internshipsCount,
      color: "success",
      icon: <FaBriefcase size={35} />,
    },
    {
      title: "Applications",
      count: applicationsCount,
      color: "warning",
      icon: <FaClipboardList size={35} />,
    },
    {
      title: "Certificates",
      count: certificatesCount,
      color: "danger",
      icon: <FaCertificate size={35} />,
    },
  ];

  return (
    <>
      <AdminNavbar />

      <div
        className="container py-5"
        style={{ background: "#f8fafc", minHeight: "100vh" }}
      >
        {/* Welcome Banner */}

        <div
          className="p-5 rounded-4 text-white shadow-lg mb-5"
          style={{
            background:
              "linear-gradient(135deg,#0f172a,#1d4ed8,#2563eb)",
          }}
        >
          <h2 className="fw-bold">
            Welcome Admin 
          </h2>

          <p className="mb-0">
            Manage students, internships, applications and
            certificates from one place.
          </p>
        </div>

        {/* Statistics */}

        <div className="row g-4">

          {cards.map((card, index) => (
            <div className="col-lg-3 col-md-6" key={index}>
              <div
                className={`card border-0 shadow h-100 bg-${card.color} text-white`}
                style={{
                  borderRadius: "18px",
                  transition: ".3s",
                }}
              >
                <div className="card-body text-center">

                  <div className="mb-3">
                    {card.icon}
                  </div>

                  <h5>{card.title}</h5>

                  <h1 className="fw-bold">
                    {card.count}
                  </h1>

                </div>
              </div>
            </div>
          ))}

        </div>

        {/* Quick Actions */}

        <div className="mt-5">

          <h3 className="fw-bold mb-4">
            Quick Actions
          </h3>

          <div className="row g-4">

            <div className="col-md-3">
              <Link
                to="/manage-users"
                className="text-decoration-none"
              >
                <div className="card shadow border-0 h-100">
                  <div className="card-body text-center">
                    <FaUsers
                      size={35}
                      className="text-primary mb-3"
                    />
                    <h5>Manage Users</h5>
                    <FaArrowRight />
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-3">
              <Link
                to="/manage-internships"
                className="text-decoration-none"
              >
                <div className="card shadow border-0 h-100">
                  <div className="card-body text-center">
                    <FaBriefcase
                      size={35}
                      className="text-success mb-3"
                    />
                    <h5>Internships</h5>
                    <FaArrowRight />
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-3">
              <Link
                to="/manage-applications"
                className="text-decoration-none"
              >
                <div className="card shadow border-0 h-100">
                  <div className="card-body text-center">
                    <FaClipboardList
                      size={35}
                      className="text-warning mb-3"
                    />
                    <h5>Applications</h5>
                    <FaArrowRight />
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-3">
              <Link
                to="/verify-certificates"
                className="text-decoration-none"
              >
                <div className="card shadow border-0 h-100">
                  <div className="card-body text-center">
                    <FaCertificate
                      size={35}
                      className="text-danger mb-3"
                    />
                    <h5>Certificates</h5>
                    <FaArrowRight />
                  </div>
                </div>
              </Link>
            </div>

          </div>

        </div>

        {/* Dashboard Summary */}

        <div className="card shadow-lg border-0 mt-5">
          <div className="card-body">
            <h4 className="fw-bold mb-3">
              Dashboard Summary
            </h4>

            <p className="mb-0">
              The Internship & Career Development Hub currently
              manages{" "}
              <strong>{studentsCount}</strong> students,
              <strong> {internshipsCount}</strong> internships,
              <strong> {applicationsCount}</strong> applications,
              and <strong>{certificatesCount}</strong> certificates.
            </p>
          </div>
        </div>

      </div>
    </>
  );
}

export default AdminDashboard;