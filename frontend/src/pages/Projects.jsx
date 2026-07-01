import { useState, useEffect } from "react";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  searchProjects,
} from "../services/projectService";
import Navbar from "../components/Navbar";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchProjects = async () => {
    try {
      const res = await getProjects();
      setProjects(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async () => {
    if (!title || !description) {
      alert("Title and Description are required");
      return;
    }

    try {
      if (editId) {
        await updateProject(editId, {
          title,
          description,
          technologies,
          githubLink,
          linkedinLink,
        });
      } else {
        await createProject({
          title,
          description,
          technologies,
          githubLink,
          linkedinLink,
        });
      }

      setEditId(null);
      setTitle("");
      setDescription("");
      setTechnologies("");
      setGithubLink("");
      setLinkedinLink("");

      fetchProjects();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (project) => {
    setEditId(project._id);
    setTitle(project.title);
    setDescription(project.description);
    setTechnologies(project.technologies);
    setGithubLink(project.githubLink);
    setLinkedinLink(project.linkedinLink);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      await deleteProject(id);
      fetchProjects();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async (value) => {
    setSearch(value);

    if (!value) {
      fetchProjects();
      return;
    }

    try {
      const res = await searchProjects(value);
      setProjects(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container mt-4">

        <h1 className="fw-bold mb-4">Manage Projects</h1>

        <div className="card shadow-lg border-0 mb-4">
          <div className="card-body">

            <h4 className="mb-3">
              {editId ? "Update Project" : "Add New Project"}
            </h4>
                        <input
              className="form-control mb-3 shadow-sm"
              placeholder="Search Project"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />

            <input
              className="form-control mb-2 shadow-sm"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="form-control mb-2 shadow-sm"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              className="form-control mb-2 shadow-sm"
              placeholder="Technologies"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
            />

            <input
              className="form-control mb-2 shadow-sm"
              placeholder="GitHub Link"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
            />

            <input
              className="form-control mb-3 shadow-sm"
              placeholder="LinkedIn Post Link"
              value={linkedinLink}
              onChange={(e) => setLinkedinLink(e.target.value)}
            />

            <button
              className="btn btn-primary px-4"
              onClick={handleSubmit}
            >
              {editId ? "Update Project" : "Add Project"}
            </button>

          </div>
        </div>

        <hr />

        <h3 className="fw-bold mb-3">Your Projects</h3>

        {projects.length === 0 ? (
          <div className="alert alert-info">
            No projects added yet.
          </div>
        ) : (
                    projects.map((project) => (
            <div
              key={project._id}
              className="card shadow border-0 mb-4"
            >
              <div className="card-body">

                <h4 className="fw-bold text-primary">
                  {project.title}
                </h4>

                <p className="text-muted">
                  {project.description}
                </p>

                <p>
                  <strong>Technologies:</strong>{" "}
                  {project.technologies}
                </p>

                <div className="mb-3">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-dark btn-sm me-2"
                    >
                      GitHub
                    </a>
                  )}

                  {project.linkedinLink && (
                    <a
                      href={project.linkedinLink}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-info btn-sm"
                    >
                      LinkedIn Post
                    </a>
                  )}
                </div>

                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEdit(project)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(project._id)}
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

export default Projects;