import "./App.css";
import { searchApi } from "../src/services/api";

import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

const App = () => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const initialVideos = await searchApi(1);
        setVideos(initialVideos);
        console.log("videos", videos);
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
      console.log("videos", videos);
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
            <video controls width="250" preload="metadata" className="video">
              <source src={item.videos.small.url} type="video/webm" />
            </video>
            <p className="link">
              You can download the video{" "}
              <a href={item.pageURL} target="_blank" rel="noreferrer">
                here
              </a>
            </p>
            <div className="statsContainer">
              <p className="stats">
                <FavoriteBorderOutlinedIcon
                  fontSize="small"
                  style={{ marginRight: "5px" }}
                />
                {item.likes}
              </p>
              <p className="stats">
                <RemoveRedEyeOutlinedIcon
                  fontSize="small"
                  style={{ marginRight: "5px" }}
                />
                {item.views}
              </p>
              <p className="stats">
                <DownloadOutlinedIcon
                  fontSize="small"
                  style={{ marginRight: "5px" }}
                />
                {item.downloads}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </InfiniteScroll>
  );
};

export default App;
