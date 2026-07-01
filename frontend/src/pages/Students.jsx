import { useEffect, useState } from "react";
import {
  getStudents,
  deleteStudent,
  searchStudents,
} from "../services/studentService";
import { useNavigate } from "react-router-dom";
function Students() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    loadStudents();
  }, []);
  const loadStudents = async () => {
    try {
      const res = await getStudents();
      console.log("Data:", res.data);
      setStudents(res.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleDelete = async (id) => {
    await deleteStudent(id);
    loadStudents();
  };
const handleSearch = async (e) => {
  const value = e.target.value;
  setSearchTerm(value);
  if (value === "") {
    loadStudents();
    return;
  }
  const res = await searchStudents(value);
  setStudents(res.data);
};
  return (
    <div>
      <h1>Students</h1>
      <button onClick={() => navigate("/add-student")}>
        Add Student
      </button>
      <input
      type="text"
      placeholder="Search Student"
      value={searchTerm}
      onChange={handleSearch}
      />
      <br />
      <br />
      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>
              <td>
                <button
                onClick={() =>
                  navigate(`/view-student/${student._id}`)
                }>
                  View
                  </button>
                  <button
                  onClick={() =>
                    navigate(`/edit-student/${student._id}`)
                  }>
                    Edit
                    </button>
                    <button
                    onClick={() => handleDelete(student._id)}
                    >
                      Delete
                      </button>
                      </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Students;