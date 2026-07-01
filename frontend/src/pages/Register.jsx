import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import Navbar from "../components/Navbar";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(formData);

      alert("Registration Successful");
      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
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
                      alt="ICDH Logo"
                      width="75"
                    />

                    <h2 className="mt-3 text-dark fw-bold">
                      Create Account
                    </h2>

                    <p className="text-dark">
                      Join the Internship & Career Development Hub
                    </p>

                  </div>

                  <form onSubmit={handleSubmit}>

                    <input
                      className="form-control mb-3"
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />

                    <input
                      className="form-control mb-3"
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />

                    <input
                      className="form-control mb-4"
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />

                    <button
                      className="btn btn-warning w-100 fw-bold py-2"
                      type="submit"
                    >
                      Register
                    </button>

                  </form>

                  <p className="text-center mt-4 text-dark">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="fw-bold text-primary"
                    >
                      Login Here
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

export default Register;