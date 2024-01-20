import "./App.css";
import { searchApi } from "../src/services/api";

import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";

const App = () => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const initialVideos = await searchApi(1);
        setVideos(initialVideos);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchData();
  }, []);

  const fetchMoreData = async () => {
    try {
      const newVideos = await searchApi(page + 1);
      setVideos((prevVideos) => [...prevVideos, ...newVideos]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
  };

  return (
    <InfiniteScroll
      dataLength={videos.length}
      next={fetchMoreData}
      hasMore={true}
      loader={<h4>Loading...</h4>}
    >
      <ul className="videoContainer">
        {videos.map((item) => (
          <li key={item.id} className="wrapper">
            <video controls width="250" className="video">
              <source src={item.videos.small.url} type="video/webm" />
            </video>
            <a
              href={item.pageURL}
              className="link"
              target="_blank"
              rel="noreferrer"
            >
              {item.pageURL}
            </a>
            <div className="statsContainer">
              <p>Likes: {item.likes}</p>
              <p>Views: {item.views}</p>
              <p>Downloads: {item.downloads}</p>
            </div>
          </li>
        ))}
      </ul>
    </InfiniteScroll>
  );
};

export default App;
