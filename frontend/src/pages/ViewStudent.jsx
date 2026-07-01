import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudentById } from "../services/studentService";
function ViewStudent() {
  const { id } = useParams();
  const [student, setStudent] = useState({});
  useEffect(() => {
    loadStudent();
  }, []);
  const loadStudent = async () => {
    const res = await getStudentById(id);
    setStudent(res.data);
  };
  return (
    <div>
      <h1>Student Details</h1>
      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Age:</strong> {student.age}</p>
      <p><strong>Course:</strong> {student.course}</p>
      <p><strong>Phone:</strong> {student.phone}</p>
    </div>
  );
}
export default ViewStudent;