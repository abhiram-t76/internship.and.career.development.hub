import axios from "axios";
const API_URL = `${import.meta.env.VITE_API_URL}/api/applications`;
const getConfig = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
export const getApplications = () =>
  axios.get(API_URL, getConfig());
export const createApplication = (data) =>
  axios.post(
    API_URL,
    data,
    getConfig()
  );
export const updateApplication = (
  id,
  data
) =>
  axios.put(
    `${API_URL}/${id}`,
    data,
    getConfig()
  );
export const deleteApplication = (id) =>
  axios.delete(
    `${API_URL}/${id}`,
    getConfig()
  );
export const searchApplications = (
  name
) =>
  axios.get(
    `${API_URL}/search/${name}`,
    getConfig()
  );
export const updateApplicationStatus = (
  id,
  status
) =>
  axios.put(
    `${API_URL}/status/${id}`,
    { status },
    getConfig()
  );
  export const getAllApplications = () =>
  axios.get(
    `${API_URL}/admin`,
    getConfig()
  );