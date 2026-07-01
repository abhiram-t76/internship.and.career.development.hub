import axios from "axios";
const API_URL = "http://localhost:5000/api/projects";
const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
export const getProjects = () =>
  axios.get(API_URL, getConfig());
export const createProject = (data) =>
  axios.post(API_URL, data, getConfig());
export const updateProject = (id, data) =>
  axios.put(`${API_URL}/${id}`, data, getConfig());
export const deleteProject = (id) =>
  axios.delete(`${API_URL}/${id}`, getConfig());
export const searchProjects = (title) =>
  axios.get(
    `${API_URL}/search/${title}`,
    getConfig()
  );