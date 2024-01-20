import axios from "axios";

const API_key = "36085372-0e054a65c2dad8200a3139bdc";
const API_URL = "https://pixabay.com/api/videos/";

export const searchApi = async (page) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        key: API_key,
        safesearch: true,
        order: "popular",
        per_page: "12",
        page: page,
      },
    });
    return response.data.hits;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
