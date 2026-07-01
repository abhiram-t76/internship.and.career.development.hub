import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getAdminReports } from "../services/reportService";

import {
  FaLaptopCode,
  FaProjectDiagram,
  FaCertificate,
  FaBriefcase,
  FaChartPie,
  FaDownload,
  FaPrint,
  FaUserGraduate,
} from "react-icons/fa";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function ReportAnalytics() {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const res = await getAdminReports();
      setReports(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const totalSkills = reports.reduce(
    (sum, r) => sum + r.skills,
    0
  );

  const totalProjects = reports.reduce(
    (sum, r) => sum + r.projects,
    0
  );

  const totalCertificates = reports.reduce(
    (sum, r) => sum + r.certificates,
    0
  );

  const totalApplications = reports.reduce(
    (sum, r) => sum + r.applications,
    0
  );

  const avgCareerScore =
    reports.length > 0
      ? Math.round(
          reports.reduce(
            (sum, r) => sum + r.careerScore,
            0
          ) / reports.length
        )
      : 0;

  const internshipReady = reports.filter(
    (r) => r.status === "Internship Ready"
  ).length;

  const goodProgress = reports.filter(
    (r) => r.status === "Good Progress"
  ).length;

  const needsImprovement = reports.filter(
    (r) => r.status === "Needs Improvement"
  ).length;

  const barData = {
    labels: [
      "Skills",
      "Projects",
      "Certificates",
      "Applications",
    ],
    datasets: [
      {
        label: "Total Records",
        data: [
          totalSkills,
          totalProjects,
          totalCertificates,
          totalApplications,
        ],
        backgroundColor: [
          "#2563eb",
          "#10b981",
          "#f59e0b",
          "#dc2626",
        ],
        borderRadius: 8,
      },
    ],
  };

  const doughnutData = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [
          avgCareerScore,
          100 - avgCareerScore,
        ],
        backgroundColor: [
          "#2563eb",
          "#e5e7eb",
        ],
        borderWidth: 0,
      },
    ],
  };

  const printReport = () => {
    window.print();
  };

  const downloadPDF = async () => {
    const input =
      document.getElementById("report-content");

    if (!input) return;

    const canvas = await html2canvas(input, {
      scale: 2,
    });

    const imgData =
      canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth =
      pdf.internal.pageSize.getWidth();

    const imgWidth = pageWidth - 20;

    const imgHeight =
      (canvas.height * imgWidth) /
      canvas.width;

    pdf.addImage(
      imgData,
      "PNG",
      10,
      10,
      imgWidth,
      imgHeight
    );

    pdf.save("ICDH_Report.pdf");
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

    <div
      className="container py-5"
      id="report-content"
    >
      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-5">

        <div>
          <h2 className="fw-bold">
            <FaChartPie className="me-2 text-primary" />
            Report & Analytics
          </h2>

          <p className="text-muted">
            Internship Analytics Dashboard
          </p>
        </div>

        <div>
          <button
            className="btn btn-outline-primary me-2"
            onClick={printReport}
          >
            <FaPrint className="me-2" />
            Print
          </button>

          <button
            className="btn btn-primary"
            onClick={downloadPDF}
          >
            <FaDownload className="me-2" />
            Download PDF
          </button>
        </div>

      </div>

      {/* Summary */}

      <div className="row g-4 mb-4">

        <div className="col-md-3">
          <div className="card shadow border-0 text-center h-100">
            <div className="card-body">
              <FaLaptopCode
                size={35}
                className="text-primary mb-3"
              />
              <h5>Skills</h5>
              <h2>{totalSkills}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0 text-center h-100">
            <div className="card-body">
              <FaProjectDiagram
                size={35}
                className="text-success mb-3"
              />
              <h5>Projects</h5>
              <h2>{totalProjects}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0 text-center h-100">
            <div className="card-body">
              <FaCertificate
                size={35}
                className="text-warning mb-3"
              />
              <h5>Certificates</h5>
              <h2>{totalCertificates}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0 text-center h-100">
            <div className="card-body">
              <FaBriefcase
                size={35}
                className="text-danger mb-3"
              />
              <h5>Applications</h5>
              <h2>{totalApplications}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0 text-center h-100">
            <div className="card-body">
              <FaUserGraduate
                size={35}
                className="text-info mb-3"
              />
              <h5>Total Students</h5>
              <h2>{reports.length}</h2>
            </div>
          </div>
        </div>

      </div>

      {/* Status Cards */}

      <div className="row g-4 mb-5">

        <div className="col-md-4">
          <div className="card bg-success text-white shadow border-0">
            <div className="card-body text-center">
              <h5>Internship Ready</h5>
              <h2>{internshipReady}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-warning shadow border-0">
            <div className="card-body text-center">
              <h5>Good Progress</h5>
              <h2>{goodProgress}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-danger text-white shadow border-0">
            <div className="card-body text-center">
              <h5>Needs Improvement</h5>
              <h2>{needsImprovement}</h2>
            </div>
          </div>
        </div>

      </div>

      {/* Charts */}

      <div className="row">

        <div className="col-lg-8 mb-4">
          <div className="card shadow border-0">
            <div className="card-body">
              <h4 className="fw-bold mb-4">
                Progress Overview
              </h4>

              <Bar data={barData} />
            </div>
          </div>
        </div>

        <div className="col-lg-4 mb-4">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h4 className="fw-bold mb-4">
                Average Career Score
              </h4>

              <Doughnut data={doughnutData} />

              <h2 className="mt-3 text-primary">
                {avgCareerScore}%
              </h2>
            </div>
          </div>
        </div>
      </div>
      

{/* Student Report Table */}
<div className="card shadow-lg border-0 mt-4">
  <div className="card-body">
    <h3 className="fw-bold mb-4">
      <FaUserGraduate className="me-2 text-primary" />
      Student Career Reports
    </h3>

    <div className="table-responsive">
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Education</th>
            <th>Career Interest</th>
            <th>Skills</th>
            <th>Projects</th>
            <th>Certificates</th>
            <th>Applications</th>
            <th>Career Score</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {reports.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.educationDetails || "-"}</td>
              <td>{student.careerInterests || "-"}</td>
              <td>{student.skills}</td>
              <td>{student.projects}</td>
              <td>{student.certificates}</td>
              <td>{student.applications}</td>
              <td>
                <span className="badge bg-primary">
                  {student.careerScore}%
                </span>
              </td>
              <td>
                <span
                  className={`badge ${
                    student.status === "Internship Ready"
                      ? "bg-success"
                      : student.status === "Good Progress"
                      ? "bg-warning text-dark"
                      : "bg-danger"
                  }`}
                >
                  {student.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>


{/* Recommendation */}
<div className="card border-0 shadow-lg mt-4">
  <div className="card-body">
    <h4 className="fw-bold mb-3">
      Career Recommendation - Overall Student Progress
    </h4>

    <p className="mb-3">
      {avgCareerScore >= 80
        ? "Excellent! Most students are internship-ready. Encourage them to apply for internships and continue building their portfolios."
        : avgCareerScore >= 60
        ? "Students are making good progress. Recommend adding more projects, verified certificates, and internship applications."
        : "Many students need improvement. Focus on completing profiles, adding skills, projects, certificates, and applying for internships."}
    </p>

    <div className="progress" style={{ height: "20px" }}>
      <div
        className="progress-bar bg-primary progress-bar-striped progress-bar-animated"
        style={{ width: `${avgCareerScore}%` }}
      >
        {avgCareerScore}%
      </div>
    </div>
  </div>
</div>

</div>
</>
);
}

export default ReportAnalytics;