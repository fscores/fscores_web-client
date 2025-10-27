import axios from "axios";

// You can define your base URL in an .env file or directly here
const BASE_URL = "http://localhost:8765";

export const fetchPlayers = async (searchOptions, pageNo, pageSize, sortBy) => {
  try {
    console.log("Fetching players with options:", { searchOptions, pageNo, pageSize, sortBy });
    const response = await axios.post(
      `${BASE_URL}/player-ms/player/search?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}`,
      searchOptions
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch players:", error);
    throw error;
  }
};
