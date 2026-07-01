import axios from "axios";
const API_URL =
  "http://localhost:5000/api/profile";

const getConfig = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
export const getProfile = () =>
  axios.get(API_URL, getConfig());
export const saveProfile = (data) =>
  axios.post(
    API_URL,
    data,
    getConfig()
  );