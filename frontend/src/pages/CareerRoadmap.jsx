import Navbar from "../components/Navbar";
import {
  FaUserCheck,
  FaLaptopCode,
  FaProjectDiagram,
  FaCertificate,
  FaBriefcase,
  FaFlagCheckered,
} from "react-icons/fa";

function CareerRoadmap() {
  const roadmap = [
    {
      title: "Complete Your Profile",
      description:
        "Fill in your personal details, education, and career interests.",
      icon: <FaUserCheck size={28} className="text-primary" />,
      color: "primary",
    },
    {
      title: "Add Your Skills",
      description:
        "Include technical and soft skills to showcase your abilities.",
      icon: <FaLaptopCode size={28} className="text-success" />,
      color: "success",
    },
    {
      title: "Build Projects",
      description:
        "Upload academic or personal projects with descriptions.",
      icon: <FaProjectDiagram size={28} className="text-warning" />,
      color: "warning",
    },
    {
      title: "Upload Certificates",
      description:
        "Add verified certificates to strengthen your profile.",
      icon: <FaCertificate size={28} className="text-danger" />,
      color: "danger",
    },
    {
      title: "Apply for Internships",
      description:
        "Start applying for internships that match your skills.",
      icon: <FaBriefcase size={28} className="text-info" />,
      color: "info",
    },
    {
      title: "Become Internship Ready",
      description:
        "Maintain an updated profile and continue improving your portfolio.",
      icon: <FaFlagCheckered size={28} className="text-dark" />,
      color: "dark",
    },
  ];

  return (
    <>
      <Navbar />

      <div
        className="container py-5"
        style={{ background: "#f8fafc", minHeight: "100vh" }}
      >
        <div className="text-center mb-5">
          <h2 className="fw-bold text-primary">
            Career Roadmap
          </h2>

          <p className="text-muted">
            Follow these steps to become internship ready.
          </p>
        </div>

        {roadmap.map((step, index) => (
          <div className="row justify-content-center" key={index}>
            <div className="col-lg-9">

              <div
                className="card shadow border-0 mb-4"
                style={{
                  borderRadius: "18px",
                  transition: "0.3s",
                }}
              >
                <div className="card-body p-4">

                  <div className="d-flex align-items-center">

                    <div
                      className={`bg-${step.color} bg-opacity-10 rounded-circle p-3 me-4`}
                    >
                      {step.icon}
                    </div>

                    <div className="flex-grow-1">

                      <h4 className="fw-bold">
                        Step {index + 1}
                      </h4>

                      <h5 className={`text-${step.color}`}>
                        {step.title}
                      </h5>

                      <p className="text-muted mb-0">
                        {step.description}
                      </p>

                    </div>


                  </div>

                </div>
              </div>

            </div>
          </div>
        ))}

        <div
  className="text-center mt-5 p-5 rounded-4 shadow"
  style={{
    background:
      "linear-gradient(135deg,#2563eb,#1d4ed8)",
    color: "#fff",
  }}
>
  <FaFlagCheckered size={45} className="mb-3" />

  <h3 className="fw-bold">
    Your Career Journey Starts Here
  </h3>

  <p className="mb-0">
    Complete each milestone to build a strong portfolio and
    become internship ready.
  </p>
</div>
      </div>
    </>
  );
}

export default CareerRoadmap;