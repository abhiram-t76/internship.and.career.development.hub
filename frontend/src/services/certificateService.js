import axios from "axios";
const API_URL =
  "http://localhost:5000/api/certificates";
const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
export const getCertificates = () =>
  axios.get(API_URL, getConfig());
export const createCertificate = (data) =>
  axios.post(API_URL, data, getConfig());
export const updateCertificate = (id, data) =>
  axios.put(
    `${API_URL}/${id}`,
    data,
    getConfig()
  );
export const deleteCertificate = (id) =>
  axios.delete(
    `${API_URL}/${id}`,
    getConfig()
  );
export const searchCertificates = (title) =>
  axios.get(
    `${API_URL}/search/${title}`,
    getConfig()
  );
export const updateCertificateStatus = (
  id,
  status
) =>
  axios.put(
    `${API_URL}/${id}`,
    { status },
    getConfig()
  );
export const verifyCertificate = (
  id,
  status
) =>
  axios.put(
    `${API_URL}/verify/${id}`,
    { status },
    getConfig()
  );
  export const getAllCertificates = () =>
  axios.get(
    `${API_URL}/admin`,
    getConfig()
  );