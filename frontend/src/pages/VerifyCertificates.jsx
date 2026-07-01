import { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import {
  getAllCertificates,
  verifyCertificate,
} from "../services/certificateService";
function VerifyCertificates() {
  const [certificates, setCertificates] = useState([]);
  const fetchCertificates = async () => {
  const res = await getAllCertificates();
    setCertificates(res.data);
  };
  const handleVerify = async (id) => {
    await verifyCertificate(id, "Verified");
    fetchCertificates();
  };
  const handleReject = async (id) => {
    await verifyCertificate(id, "Rejected");
    fetchCertificates();
  };

  useEffect(() => {
    fetchCertificates();
  }, []);
  return (
    <div>
      <AdminNavbar />
      <div className="container mt-4">
        <h1>Verify Certificates</h1>
        {certificates.length === 0 ? (
          <div className="alert alert-info">
            No certificates uploaded.
          </div>
        ) : (
          certificates.map((certificate) => (
            <div
              key={certificate._id}
              className="card shadow-sm mb-3"
            >
              <div className="card-body">
                <h5>{certificate.title}</h5>

<p>
  <strong>Student:</strong>{" "}
  {certificate.userId?.name}
</p>
<p>
  <strong>Email:</strong>{" "}
  {certificate.userId?.email}
</p>
<p>
  <strong>Issuer:</strong>{" "}
  {certificate.issuer}
</p>
<p>
  <strong>Status:</strong>{" "}
  {certificate.status}
</p>

                <p>
                  <strong>Issue Date:</strong>{" "}
                  {certificate.issueDate
                    ? new Date(
                        certificate.issueDate
                      ).toLocaleDateString()
                    : "N/A"}
                </p>
                <p>
                  <strong>Link:</strong>{" "}
                  <a
                    href={certificate.certificateLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Certificate
                  </a>
                </p>
                <button
                className="btn btn-success me-2"
                onClick={() => handleVerify(certificate._id)}
                >
                  Verify
                </button>
                <button
                className="btn btn-danger"
                onClick={() => handleReject(certificate._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
export default VerifyCertificates;