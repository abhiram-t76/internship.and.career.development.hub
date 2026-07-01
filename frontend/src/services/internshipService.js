import axios from "axios";
const API =
"http://localhost:5000/api/internships";
export const getInternships =
() => axios.get(API);
export const createInternship =
(data) => axios.post(API, data);
export const updateInternship =
(id, data) =>
axios.put(`${API}/${id}`, data);
export const deleteInternship =
(id) =>
axios.delete(`${API}/${id}`);