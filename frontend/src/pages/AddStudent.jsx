import { useState } from "react";
import { createStudent } from "../services/studentService";
import { useNavigate } from "react-router-dom";
function AddStudent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    course: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createStudent(formData);

    navigate("/students");
  };
  return (
    <div>
      <h1>Add Student</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <br /><br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <br /><br />
        <input
          type="number"
          name="age"
          placeholder="Age"
          onChange={handleChange}
          required
        />
        <br /><br />
        <input
          type="text"
          name="course"
          placeholder="Course"
          onChange={handleChange}
          required
        />
        <br /><br />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
        />
        <br /><br />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}
export default AddStudent;