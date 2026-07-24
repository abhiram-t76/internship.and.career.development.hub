import axios from "axios";
const API_URL = `${import.meta.env.VITE_API_URL}/api/users`;
const getConfig = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
export const getUsers = () =>
  axios.get(API_URL, getConfig());
export const searchUsers = (name) =>
  axios.get(
    `${API_URL}/search/${name}`,
    getConfig()
  );
export const deleteUser = (id) =>
  axios.delete(
    `${API_URL}/${id}`,
    getConfig()
  );