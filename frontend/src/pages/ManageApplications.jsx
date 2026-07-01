import { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import {
  getAllApplications,
  updateApplicationStatus,
} from "../services/applicationService";
function ManageApplications() {
  const [applications, setApplications] = useState([]);
  const fetchApplications = async () => {
  const res = await getAllApplications();
  console.log(res.data);
    setApplications(res.data);
  };
  useEffect(() => {
    fetchApplications();
  }, []);
  const handleStatus = async (id, status) => {
    await updateApplicationStatus(id, status);
    fetchApplications();
  };
  return (
    <div>
      <AdminNavbar />
      <div className="container mt-4">
        <h1>Manage Applications</h1>
        {applications.map((application) => (
          <div
            key={application._id}
            className="card shadow-sm mb-3"
          >
            <div className="card-body">
  <h5>{application.companyName}</h5>
  <p>
    <strong>Student:</strong>{" "}
    {application.userId?.name}
  </p>
  <p>
    <strong>Email:</strong>{" "}
    {application.userId?.email}
  </p>
  <p>
    <strong>Role:</strong>{" "}
    {application.role}
  </p>
  <p>
    <strong>Status:</strong>{" "}
    {application.status}
  </p>
              <button
                className="btn btn-warning me-2"
                onClick={() =>
                  handleStatus(
                    application._id,
                    "Under Review"
                  )
                }
              >
                Under Review
              </button>
              <button
                className="btn btn-success me-2"
                onClick={() =>
                  handleStatus(
                    application._id,
                    "Selected"
                  )
                }
              >
                Selected
              </button>
              <button
                className="btn btn-danger"
                onClick={() =>
                  handleStatus(
                    application._id,
                    "Rejected"
                  )
                }
              >
                Rejected
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ManageApplications;