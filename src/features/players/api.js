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
    console.log("Fetching players with options:", { searchOptions, pageNo, pageSize, sortBy });
    const response = await axiosInstance.post(
      `/player-ms/player/search?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}`,
      searchOptions
    );
    console.log("Fetched players:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch players:", error);
    throw error;
  }
};

export const fetchPlayerById = async (id) => {
  try {
    if (!id && id !== 0) throw new Error("fetchPlayerById: invalid id");
    const resp = await axiosInstance.get(`/player-ms/player/${id}`);
    const payload = resp.data;

    // handle wrapper ApiResponseDto { success / isSuccess, data, message }
    const successFlag = payload?.success ?? payload?.isSuccess ?? true;
    if (!successFlag) {
      const msg = payload?.message || `Player ${id} not found`;
      const err = new Error(msg);
      // attach response body for callers if needed
      err.responseData = payload;
      throw err;
    }

    // return the inner data if present, otherwise return payload
    return payload?.data ?? payload;
  } catch (error) {
    // normalize axios error messages
    if (axios.isAxiosError(error)) {
      const msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Network error";
      const err = new Error(msg);
      err.status = error.response?.status;
      throw err;
    }
    throw error;
  }
};
