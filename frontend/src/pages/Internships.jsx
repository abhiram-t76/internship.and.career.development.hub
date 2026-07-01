import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { getInternships } from "../services/internshipService";
import { createApplication } from "../services/applicationService";

function Internships() {
  const [internships, setInternships] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchInternships = async () => {
    try {
      setLoading(true);

      const res = await getInternships();
      setInternships(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  const handleApply = async (internship) => {
    try {
      await createApplication({
        userId: localStorage.getItem("userId"),
        internshipId: internship._id,
        companyName: internship.companyName,
        role: internship.title,
      });

      alert("Application submitted successfully");
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Failed to submit application"
      );
    }
  };

  const filteredInternships = internships.filter(
    (item) =>
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.companyName?.toLowerCase().includes(search.toLowerCase())
  );

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
    <>
      <Navbar />

      <div className="container mt-4">

        <h1 className="fw-bold mb-4">
          Explore Internships
        </h1>

        {/* Search */}
        <div className="card shadow-lg border-0 mb-4">
          <div className="card-body">
            <input
              className="form-control shadow-sm"
              placeholder="Search by Internship or Company"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Internship List */}
        {filteredInternships.length === 0 ? (
          <div className="alert alert-info">
            No internships found.
          </div>
        ) : (
          filteredInternships.map((item) => (
            <div
              key={item._id}
              className="card shadow border-0 mb-4"
            >
              <div className="card-body">

                <h4 className="fw-bold text-primary">
                  {item.title}
                </h4>

                <span className="badge bg-primary mb-3 d-inline-block">
                  {item.companyName}
                </span>

                <p className="text-muted">
                  {item.description}
                </p>

                <p>
                  <strong>Requirements:</strong>
                  <br />
                  <span className="text-secondary">
                    {item.requirements}
                  </span>
                </p>

                <p>
                  <strong>Deadline:</strong>

                  <span className="badge bg-danger ms-2">
                    {item.deadline
                      ? new Date(item.deadline).toLocaleDateString()
                      : "N/A"}
                  </span>
                </p>

                <div className="text-end">
                  <button
                    className="btn btn-success px-4"
                    onClick={() => handleApply(item)}
                  >
                    Apply Now
                  </button>
                </div>

              </div>
            </div>
          ))
        )}

      </div>
    </>
  );
}

export default Internships;