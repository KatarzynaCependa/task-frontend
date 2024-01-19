import axios from "axios";

const API_key = "6b2cd22cfe404e0f8fa3682f8ec23424";
const news_API_URL = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${API_key}`;

export const getNews = async (page, pageSize = 10) => {
  try {
    const result = await axios.get(
      `${news_API_URL}&page=${page}&pageSize=${pageSize}`
    );
    const data = result.data.articles;
    return data;
  } catch (error) {
    console.error(error);
  }
};
