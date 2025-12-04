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

export const fetchPlayers = async (searchOptions, pageNo, pageSize, sortBy) => {
  try {
    const response = await axiosInstance.post(
      `/player-ms/player/search?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}`,
      searchOptions
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch players:", error);
    throw error;
  }
};

export const fetchPlayerById = async (id) => {
  try {
    const response = await axiosInstance.get(`/player-ms/player/${id}`);
    console.log("Fetched player by ID:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch player:", error);
    throw error;
  }
};
