import "./App.css";
import { getNews } from "../src/services/api";

import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from "moment";

function App() {
  const [news, setNews] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const newData = await getNews(page);
      setNews((prevNews) => [...prevNews, ...newData]);
      setPage((prevPage) => prevPage + 1);
      console.log("newData", newData);
      console.log("page", page);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchMoreNews = () => {
    if (news.length < 100) {
      fetchNews();
    } else {
      setHasMore(false);
    }
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={news.length}
        next={fetchMoreNews}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        {news.map((item, index) => (
          <div key={index} className="container">
            <h2>{item.title}</h2>
            <div>
              <img src={item.urlToImage} alt="Image of ${item.title} news" />
            </div>
            <p>{moment(item.publishedAt).format("YYYY/MM/DD")}</p>
            <p>{item.description}</p>
            <a href={item.url}>{item.url}</a>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default App;
