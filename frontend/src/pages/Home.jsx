import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  FaUserGraduate,
  FaBriefcase,
  FaLaptopCode,
  FaCertificate,
  FaArrowRight,
} from "react-icons/fa";

function Home() {
  return (
    <>
      <Navbar />

      {/* Hero */}
     <section className="container py-5">
  <div className="row align-items-center">

    {/* Left Content */}
    <div className="col-lg-6 mb-4 mb-lg-0">

      <span className="badge bg-primary px-3 py-2 mb-3">
        Internship & Career Development Hub
      </span>

      <h1 className="display-4 fw-bold mb-3">
        Build Your <span className="text-primary">Career</span>
        <br />
        One Internship at a Time
      </h1>

      <p className="lead text-muted mb-4">
        ICDH helps students showcase skills, build professional
        portfolios, upload certificates, apply for internships,
        and track career growth from a single platform.
      </p>

      <div className="d-flex flex-wrap gap-3">
        <Link to="/register" className="btn btn-primary btn-lg px-4">
          Get Started
        </Link>

        <Link
          to="/login"
          className="btn btn-outline-primary btn-lg px-4"
        >
          Login
        </Link>
      </div>

    </div>

    {/* Right Image */}
    <div className="col-lg-6 text-center">

      <img
        src="/hero.jpg"
        alt="ICDH Hero"
        className="img-fluid hero-image"
      />

    </div>

  </div>
</section>

      {/* Statistics */}

      <section className="container py-5">

        <div className="row g-4">

          <div className="col-md-3">
            <div className="card stats-card text-center">
              <FaUserGraduate className="stats-icon text-primary" />
              <h2>1000+</h2>
              <p>Students</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card stats-card text-center">
              <FaBriefcase className="stats-icon text-success" />
              <h2>200+</h2>
              <p>Internships</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card stats-card text-center">
              <FaLaptopCode className="stats-icon text-danger" />
              <h2>500+</h2>
              <p>Projects</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card stats-card text-center">
              <FaCertificate className="stats-icon text-warning" />
              <h2>700+</h2>
              <p>Certificates</p>
            </div>
          </div>

        </div>

      </section>

      {/* Features */}

      <section className="container pb-5">

        <h2 className="text-center mb-5 fw-bold">
          Why Choose ICDH?
        </h2>

        <div className="row g-4">

          <div className="col-lg-4">
            <div className="card feature-card h-100">
              <div className="card-body text-center">
                <FaLaptopCode className="feature-icon" />
                <h4>Skill Tracking</h4>
                <p>
                  Maintain technical skills and monitor your growth.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card feature-card h-100">
              <div className="card-body text-center">
                <FaCertificate className="feature-icon" />
                <h4>Certificate Verification</h4>
                <p>
                  Upload and verify your achievements easily.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card feature-card h-100">
              <div className="card-body text-center">
                <FaBriefcase className="feature-icon" />
                <h4>Internship Portal</h4>
                <p>
                  Discover internships and track applications.
                </p>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="cta-section">

        <div className="container text-center">

          <h2 className="fw-bold">
            Ready to Build Your Career?
          </h2>

          <p className="mb-4">
            Join ICDH and start your internship journey today.
          </p>

          <Link
            to="/register"
            className="btn btn-warning btn-lg"
          >
            Register Now
            <FaArrowRight className="ms-2" />
          </Link>

        </div>

      </section>

    </>
  );
}

export default Home;