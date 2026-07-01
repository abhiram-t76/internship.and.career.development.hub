import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaBars } from "react-icons/fa";

function AdminNavbar() {
  const navigate = useNavigate();

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

        <Link
          className="navbar-brand d-flex align-items-center"
          to="/admin-dashboard"
        >
          <img
            src="/icdh-logo.png"
            width="50"
            height="50"
            className="me-2 rounded-circle bg-white p-1 shadow"
            alt="ICDH Logo"
          />

          <div>
            <h5 className="mb-0 fw-bold text-white">
              ICDH
            </h5>

            <small className="text-white-50">
              Admin Panel
            </small>
          </div>
        </Link>

        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbar"
        >
          <FaBars />
        </button>

        <div
          className="collapse navbar-collapse"
          id="adminNavbar"
        >
          <div className="navbar-nav ms-auto align-items-lg-center">

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
  className="btn btn-danger logout-btn"
  onClick={handleLogout}
>
  <FaSignOutAlt className="me-2" />
  Logout
</button>

          </div>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;