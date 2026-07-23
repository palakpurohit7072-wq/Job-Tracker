import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/jobs",
});

// Automatically add JWT token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Get all jobs
export const getJobs = async () => {
  const response = await API.get("/");
  return response.data;
};

// Add new job
export const addJob = async (jobData) => {
  const response = await API.post("/", jobData);
  return response.data;
};

// Update job
export const updateJob = async (id, jobData) => {
  const response = await API.put(`/${id}`, jobData);
  return response.data;
};

// Delete job
export const deleteJob = async (id) => {
  const response = await API.delete(`/${id}`);
  return response.data;
};