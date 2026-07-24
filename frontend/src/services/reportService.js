import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/reports`;
const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getAdminReports = () =>
  axios.get(`${API_URL}/admin`, getConfig());