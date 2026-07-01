import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer
      className="mt-5 text-white"
      style={{
        background: "linear-gradient(90deg,#0f172a,#1e3a8a)",
      }}
    >
      <div className="container py-4">

        <div className="row">

          <div className="col-md-6">
            <h4 className="fw-bold">ICDH</h4>
            <p>
              Internship & Career Development Hub helps students manage
              skills, projects, certificates and internship applications
              efficiently.
            </p>
          </div>

          <div className="col-md-3">
            <h5>Quick Links</h5>

            <p><a href="/" className="text-white">Home</a></p>
            <p><a href="/login" className="text-white">Login</a></p>
            <p><a href="/register" className="text-white">Register</a></p>
          </div>

          <div className="col-md-3">
            <h5>Contact</h5>

            <p><FaEnvelope /> support@icdh.com</p>

            <div className="fs-4">

              <FaGithub className="me-3" />

              <FaLinkedin />

            </div>

          </div>

        </div>

        <hr />

        <div className="text-center">
          © 2026 ICDH | Internship & Career Development Hub
        </div>

      </div>
    </footer>
  );
}

export default Footer;