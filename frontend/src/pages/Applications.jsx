import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { getApplications } from "../services/applicationService";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await getApplications();
      setApplications(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const getBadgeClass = (status) => {
    switch (status) {
      case "Applied":
        return "bg-primary";

      case "Under Review":
        return "bg-warning text-dark";

      case "Selected":
        return "bg-success";

      case "Rejected":
        return "bg-danger";

      default:
        return "bg-secondary";
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
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="container mt-4">

        <h1 className="fw-bold mb-4">My Applications</h1>

        {applications.length === 0 ? (
          <div className="alert alert-info">
            No applications found.
          </div>
        ) : (
          applications.map((application) => (
            <div
              key={application._id}
              className="card shadow border-0 mb-4"
            >
              <div className="card-body">

                <h4 className="fw-bold text-primary">
                  {application.companyName}
                </h4>

                <p>
                  <strong>Role:</strong> {application.role}
                </p>

                <p>
                  <strong>Applied Date:</strong>{" "}
                  {application.applicationDate
                    ? new Date(
                        application.applicationDate
                      ).toLocaleDateString()
                    : "N/A"}
                </p>

                <p>
                  <strong>Status:</strong>

                  <span
                    className={`badge ms-2 ${getBadgeClass(
                      application.status
                    )}`}
                  >
                    {application.status}
                  </span>
                </p>

              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default Applications;