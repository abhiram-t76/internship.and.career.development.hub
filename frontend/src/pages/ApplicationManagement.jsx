import { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import {
  getApplications,
  updateApplicationStatus,
} from "../services/applicationService";

function ApplicationManagement() {
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      const res = await getApplications();
      setApplications(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStatusChange = async (
    id,
    status
  ) => {
    try {
      await updateApplicationStatus(
        id,
        status
      );

      fetchApplications();
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    }
  };

  const getBadgeClass = (status) => {
    switch (status) {
      case "Applied":
        return "bg-primary";

      case "Under Review":
        return "bg-warning";

      case "Selected":
        return "bg-success";

      case "Rejected":
        return "bg-danger";

      default:
        return "bg-secondary";
    }
  };
  return (
    <div>
      <AdminNavbar />
      <div className="container mt-4">
        <h1 className="mb-4">
          Manage Applications
        </h1>
        {applications.length === 0 ? (
          <div className="alert alert-info">
            No applications found.
          </div>
        ) : (
          applications.map((application) => (
            <div
              key={application._id}
              className="card shadow-sm mb-3"
            >
              <div className="card-body">
                <h5>
                  {application.companyName}
                </h5>
                <p>
                  <strong>Role:</strong>{" "}
                  {application.role}
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
                <label className="form-label mt-2">
                  Change Status
                </label>
                <select
                  className="form-select"
                  value={application.status}
                  onChange={(e) =>
                    handleStatusChange(
                      application._id,
                      e.target.value
                    )
                  }
                >
                  <option value="Applied">
                    Applied
                  </option>
                  <option value="Under Review">
                    Under Review
                  </option>
                  <option value="Selected">
                    Selected
                  </option>
                  <option value="Rejected">
                    Rejected
                  </option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
export default ApplicationManagement;