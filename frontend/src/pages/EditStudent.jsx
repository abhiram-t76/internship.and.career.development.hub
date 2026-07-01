import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getStudentById,
  updateStudent,
} from "../services/studentService";
function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    course: "",
    phone: "",
  });
  useEffect(() => {
    loadStudent();
  }, []);
  const loadStudent = async () => {
    const res = await getStudentById(id);
    setFormData(res.data);
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateStudent(id, formData);
    navigate("/students");
  };
  return (
    <div>
      <h1>Edit Student</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <br /><br />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <br /><br />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        <br /><br />
        <input
          type="text"
          name="course"
          value={formData.course}
          onChange={handleChange}
        />
        <br /><br />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <br /><br />
        <button type="submit">
          Update Student
        </button>
      </form>
    </div>
  );
}
export default EditStudent;