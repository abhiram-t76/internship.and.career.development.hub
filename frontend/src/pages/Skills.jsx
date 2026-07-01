import { useState, useEffect } from "react";
import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
  searchSkills,
} from "../services/skillService";
import Navbar from "../components/Navbar";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const res = await getSkills();
      setSkills(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleSubmit = async () => {
    try {
      if (editId) {
        await updateSkill(editId, {
          name,
          level,
          category,
        });
      } else {
        await createSkill({
          name,
          level,
          category,
        });
      }

      setEditId(null);
      setName("");
      setLevel("");
      setCategory("");
      fetchSkills();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (skill) => {
    setEditId(skill._id);
    setName(skill.name);
    setLevel(skill.level);
    setCategory(skill.category);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;

    try {
      await deleteSkill(id);
      fetchSkills();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async (value) => {
    setSearch(value);

    if (!value) {
      fetchSkills();
      return;
    }

    try {
      const res = await searchSkills(value);
      setSkills(res.data);
    } catch (error) {
      console.error(error);
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
          <div className="spinner-border text-primary">
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

        <h1 className="fw-bold mb-4">Manage Skills</h1>

        <div className="card shadow-lg border-0 mb-4">
          <div className="card-body">

            <h4 className="mb-3">
              {editId ? "Update Skill" : "Add New Skill"}
            </h4>

            <input
              className="form-control mb-3 shadow-sm"
              type="text"
              placeholder="Search Skill"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />

            <input
              className="form-control mb-2 shadow-sm"
              placeholder="Skill Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="form-control mb-2 shadow-sm"
              placeholder="Level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            />

            <input
              className="form-control mb-3 shadow-sm"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />

            <button
              className="btn btn-primary px-4"
              onClick={handleSubmit}
            >
              {editId ? "Update Skill" : "Add Skill"}
            </button>

          </div>
        </div>

        <hr />

        <h3 className="fw-bold mb-3">Your Skills</h3>

        {skills.length === 0 ? (
          <div className="alert alert-info">
            No skills added yet.
          </div>
        ) : (
          skills.map((skill) => (
            <div
              key={skill._id}
              className="card shadow border-0 mb-3"
            >
              <div className="card-body">

                <h4 className="fw-bold text-primary">
                  {skill.name}
                </h4>

                <p>
                  <strong>Level:</strong> {skill.level}
                </p>

                <p>
                  <strong>Category:</strong> {skill.category}
                </p>

                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEdit(skill)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(skill._id)}
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
export default Skills;