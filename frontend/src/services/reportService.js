import axios from "axios";

const API_URL = "http://localhost:5000/api/reports";

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getAdminReports = () =>
  axios.get(`${API_URL}/admin`, getConfig());