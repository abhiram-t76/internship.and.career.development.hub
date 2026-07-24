import axios from "axios";
const API_URL = `${import.meta.env.VITE_API_URL}/api/skills`;
const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
export const getSkills = () =>
  axios.get(API_URL, getConfig());
export const createSkill = (data) =>
  axios.post(API_URL, data, getConfig());
export const updateSkill = (id, data) =>
  axios.put(`${API_URL}/${id}`, data, getConfig());
export const deleteSkill = (id) =>
  axios.delete(`${API_URL}/${id}`, getConfig());
export const searchSkills = (name) =>
  axios.get(`${API_URL}/search/${name}`, getConfig());