import { useState, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import {
  getInternships,
  createInternship,
  updateInternship,
  deleteInternship,
} from "../services/internshipService";
console.log("ManageInternships Loaded");
function ManageInternships() {
  const [internships, setInternships] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [deadline, setDeadline] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchInternships = async () => {
    const res = await getInternships();
    setInternships(res.data);
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  const handleSubmit = async () => {
    const data = {
      companyName,
      title,
      description,
      requirements,
      deadline,
    };

    if (editId) {
      await updateInternship(editId, data);
    } else {console.log({
  companyName,
  title,
  description,
  requirements,
  deadline,
});
      await createInternship(data);
    }

    setCompanyName("");
    setTitle("");
    setDescription("");
    setRequirements("");
    setDeadline("");
    setEditId(null);

    fetchInternships();
  };
  return (
    <div>
      <AdminNavbar />
      <div className="container mt-4">
        <h1>Manage Internships</h1>
        <input
          className="form-control mb-2"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => {
            setCompanyName(e.target.value)}}
        />
        <input
          className="form-control mb-2"
          placeholder="Internship Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="form-control mb-2"
          placeholder="Requirements"
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
        />
        <div className="mb-3">
            <label className="form-label fw-bold">
                 Application Deadline
            </label>
            <input
            className="form-control"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            />
        </div>
        <button
          className="btn btn-primary mb-4"
          onClick={handleSubmit}
        >
          {editId ? "Update Internship" : "Add Internship"}
        </button>
        <hr />
        {internships.map((item) => (
          <div
            key={item._id}
            className="card shadow-sm mb-3"
          >
            <div className="card-body">
              <h5>{item.title}</h5>
              <p>
                <strong>Company:</strong>{" "}
                {item.companyName}
              </p>
              <p>{item.description}</p>
             <p>
                <strong>Requirements:</strong>{" "}
                {item.requirements}
            </p>
            <p>
                <strong>Deadline:</strong>{" "}
                {item.deadline
                ? new Date(item.deadline).toLocaleDateString()
                : "N/A"}
            </p>
              <button
                className="btn btn-warning me-2"
                onClick={() => {
                  setEditId(item._id);
                  setCompanyName(item.companyName);
                  setTitle(item.title);
                  setDescription(item.description);
                  setRequirements(item.requirements);
                  setDeadline(
                    item.deadline
                      ? item.deadline.substring(0, 10)
                      : ""
                  );
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() =>
                  deleteInternship(item._id).then(
                    fetchInternships
                  )
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageInternships;