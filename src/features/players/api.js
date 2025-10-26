import axios from "axios";

// You can define your base URL in an .env file or directly here
const BASE_URL = "http://localhost:8765";

export const fetchPlayers = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/player-ms/player/search`,
      {} // This object is sent as the request body
    );
    return response.data; // assuming backend returns a JSON list of players
  } catch (error) {
    console.error("Failed to fetch players:", error);
    throw error;
  }
};
