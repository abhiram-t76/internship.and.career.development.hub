import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await loginUser(formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("userId", res.data.user.id);

      alert("Login Successful");

      if (res.data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <section
        className="d-flex align-items-center justify-content-center"
        style={{
          minHeight: "90vh",
          backgroundImage:
            "linear-gradient(rgba(15,23,42,.75), rgba(30,58,138,.75)), url('/login-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">

            <div className="col-lg-5 col-md-7">

              <div
                className="card border-0 shadow-lg"
                style={{
                  borderRadius: "20px",
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.4)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                  transition: "0.3s",
                }}
              >
                <div className="card-body p-5">

                  <div className="text-center mb-4">

                    <img
                      src="/icdh-logo.png"
                      alt="ICDH"
                      width="75"
                    />

                    <h2 className="mt-3 text-dark fw-bold">
                      Welcome Back
                    </h2>

                    <p className="text-dark">
                      Login to Internship & Career Development Hub
                    </p>

                  </div>

                  <form onSubmit={handleSubmit}>

                    <input
                      className="form-control shadow-sm mb-3"
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />

                    <div className="input-group mb-4">
                      <input
                        className="form-control shadow-sm"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />

                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                      >
                        {showPassword ? (
                          <FaEyeSlash />
                        ) : (
                          <FaEye />
                        )}
                      </button>
                    </div>

                    <button
                      className="btn btn-warning w-100 fw-bold"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Logging in..." : "Login"}
                    </button>

                  </form>

                  <p className="text-center mt-4 text-dark">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="fw-bold text-primary text-decoration-none"
                    >
                      Register Here
                    </Link>
                  </p>

                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default Login;