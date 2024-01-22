import axios from "axios";

const API_key = import.meta.env.VITE_REACT_APP_PIXABAY_API_KEY;
const API_URL = "https://pixabay.com/api/videos/";

export const searchApi = async (page) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        key: API_key,
        safesearch: true,
        per_page: "9",
        page: page,
      },
    });
    return response.data.hits;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
