// utils/newRequest.js
import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://taskbuddy-axo5.onrender.com",
});

export const setAuthToken = (token) => {
  if (token) {
    newRequest.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete newRequest.defaults.headers.common["Authorization"];
  }
};

export default newRequest;
