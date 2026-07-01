import { useState, useEffect } from "react";
import {
  getCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate,
  searchCertificates,
} from "../services/certificateService";
import Navbar from "../components/Navbar";

function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [title, setTitle] = useState("");
  const [issuer, setIssuer] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [certificateLink, setCertificateLink] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCertificates = async () => {
  try {
    setLoading(true);

    const res = await getCertificates();
    setCertificates(res.data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    fetchCertificates();
  }, []);
  const handleSubmit = async () => {
    if (!title || !issuer) {
      alert("Title and Issuer are required");
      return;
    }
    if (editId) {
      await updateCertificate(editId, {
        title,
        issuer,
        issueDate,
        certificateLink,
      });
    } else {
      await createCertificate({
        title,
        issuer,
        issueDate,
        certificateLink,
      });
    }
    setEditId(null);
    setTitle("");
    setIssuer("");
    setIssueDate("");
    setCertificateLink("");

    await fetchCertificates();
  };
  const handleEdit = (certificate) => {
    setEditId(certificate._id);
    setTitle(certificate.title);
    setIssuer(certificate.issuer);
    setIssueDate(
      certificate.issueDate
        ? certificate.issueDate.substring(0, 10)
        : ""
    );
    setCertificateLink(certificate.certificateLink);
  };
  const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this certificate?"
  );

  if (!confirmDelete) return;

  try {
    await deleteCertificate(id);
    fetchCertificates();
  } catch (error) {
    console.error(error);
  }
};
  const handleSearch = async (value) => {
    setSearch(value);
    if (!value) {
      fetchCertificates();
      return;
    }
    const res = await searchCertificates(value);
    setCertificates(res.data);
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
      <h1 className="fw-bold mb-4">Manage Certificates</h1>

      {/* Form Card */}
      <div className="card shadow-lg border-0 mb-4">
        <div className="card-body">
          <h4 className="mb-3">
            {editId ? "Update Certificate" : "Add New Certificate"}
          </h4>

          <input
            className="form-control mb-3 shadow-sm"
            placeholder="Search Certificate"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />

          <input
            className="form-control mb-2 shadow-sm"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="form-control mb-2 shadow-sm"
            placeholder="Issuer"
            value={issuer}
            onChange={(e) => setIssuer(e.target.value)}
          />

          <input
            className="form-control mb-2 shadow-sm"
            type="date"
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
          />

          <input
            className="form-control mb-3 shadow-sm"
            placeholder="Certificate Link"
            value={certificateLink}
            onChange={(e) => setCertificateLink(e.target.value)}
          />

          <button
            className="btn btn-primary px-4"
            onClick={handleSubmit}
          >
            {editId ? "Update Certificate" : "Add Certificate"}
          </button>
        </div>
      </div>

      <hr />

      <h3 className="fw-bold mb-3">Your Certificates</h3>

      {certificates.length === 0 ? (
        <div className="alert alert-info">
          No certificates added yet.
        </div>
      ) : (
        certificates.map((certificate) => (
          <div
            key={certificate._id}
            className="card shadow border-0 mb-4"
          >
            <div className="card-body">
              <h4 className="fw-bold text-primary">
                {certificate.title}
              </h4>

              <p>
                <strong>Issuer:</strong> {certificate.issuer}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {certificate.issueDate
                  ? new Date(
                      certificate.issueDate
                    ).toLocaleDateString()
                  : ""}
              </p>

              <p>
                <a
                  href={certificate.certificateLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-success btn-sm me-2"
                >
                  View Certificate
                </a>
              </p>

              <button
                className="btn btn-warning me-2"
                onClick={() => handleEdit(certificate)}
              >
                Edit
              </button>

              <button
                className="btn btn-danger"
                onClick={() =>
                  handleDelete(certificate._id)
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);
}

export default Certificates;