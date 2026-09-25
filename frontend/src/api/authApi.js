import axios from "axios";

const API = axios.create({

 baseURL: "https://job-tracker-jrps.onrender.com/api/auth",
});

export const signupUser = async (userData) => {
  const response = await API.post("/signup", userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await API.post("/login", userData);
  return response.data;
};