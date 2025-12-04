import axios from "axios";

const BASE_URL = "http://localhost:8765";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// optional: attach auth token if you use one
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchClubs = async (searchOptions, pageNo, pageSize, sortBy) => {
  try {
    const response = await axiosInstance.post(
      `/club-ms/club/search?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}`,
      searchOptions
    );
    console.log("Fetched clubs:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch clubs:", error);
    throw error;
  }
};

export const fetchClubById = async (id) => {
  try {
    const response = await axiosInstance.get(`/club-ms/club/${id}`);
    console.log("Fetched club by ID:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch club:", error);
    throw error;
  }
};

export const fetchClubByPlayerId = async (id) => {
  try {
    const response = await axiosInstance.get(`/club-ms/club/include${id}`);
    console.log("Fetched club by player ID:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch club:", error);
    throw error;
  }
};