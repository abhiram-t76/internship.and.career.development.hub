import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaBars, FaChevronDown } from "react-icons/fa";
function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav
  className="navbar navbar-expand-lg navbar-dark shadow-lg sticky-top py-2"
      style={{
        background:
          "linear-gradient(90deg,#0f172a,#1e3a8a,#2563eb)",
      }}
    >
      <div className="container">

        {/* Logo */}
<Link className="navbar-brand d-flex align-items-center" to="/">
  <img
    src="/icdh-logo.png"
    alt="ICDH Logo"
    width="42"
    height="42"
    className="me-2 rounded-circle bg-white p-1 shadow"
  />

  <div className="logo-text">
    <h5 className="mb-0 fw-bold text-white">
      ICDH
    </h5>

    <small className="text-white-50">
      Internship & Career Development Hub
    </small>
  </div>
</Link>

        {/* Mobile Toggle */}

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FaBars />
        </button>

        {/* Navbar */}

        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >
          <div className="navbar-nav ms-auto align-items-lg-center">

            {/* Guest */}

            {!token && (
              <>
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>

                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>

                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </>
            )}

            {/* Student */}

            {token && role === "student" && (
              <>
                {/* Student */}

{token && role === "student" && (
  <>
    <NavLink className="nav-link" to="/dashboard">
      Dashboard
    </NavLink>

    <NavLink className="nav-link" to="/profile">
      Profile
    </NavLink>

    <NavLink className="nav-link" to="/internships">
      Internships
    </NavLink>

    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        More
      </a>

      <ul className="dropdown-menu dropdown-menu-end">

        <li>
          <NavLink className="dropdown-item" to="/skills">
            Skills
          </NavLink>
        </li>

        <li>
          <NavLink className="dropdown-item" to="/projects">
            Projects
          </NavLink>
        </li>

        <li>
          <NavLink className="dropdown-item" to="/certificates">
            Certificates
          </NavLink>
        </li>

        <li>
          <NavLink className="dropdown-item" to="/applications">
            Applications
          </NavLink>
        </li>

        <li>
          <NavLink className="dropdown-item" to="/career-roadmap">
            Roadmap
          </NavLink>
        </li>

      </ul>
    </li>

    <button
      className="btn btn-danger logout-btn"
      onClick={handleLogout}
    >
      <FaSignOutAlt className="me-2" />
      Logout
    </button>
  </>
)}
              </>
            )}

            {/* Admin */}

            {token && role === "admin" && (
              <>
                <NavLink className="nav-link" to="/admin-dashboard">
                  Dashboard
                </NavLink>

                <NavLink className="nav-link" to="/manage-users">
                  Users
                </NavLink>

                <NavLink className="nav-link" to="/manage-internships">
                  Internships
                </NavLink>

                <NavLink className="nav-link" to="/manage-applications">
                  Applications
                </NavLink>

                <NavLink className="nav-link" to="/verify-certificates">
                  Certificates
                </NavLink>

                <NavLink className="nav-link" to="/reports">
                  Reports
                </NavLink>

                <button
  className="btn btn-danger logout-btn ms-lg-3 mt-2 mt-lg-0"
  onClick={handleLogout}
>
  <FaSignOutAlt className="me-2" />
  Logout
</button>
              </>
            )}

          </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;