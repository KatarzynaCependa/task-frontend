import "./App.css";
import { Loader } from "./components/Loader";
import { searchApi } from "../src/services/api";

import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
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
      loader={<Loader />}
      style={{ overflow: "visible" }}
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
                {Number(item.likes).toLocaleString()}
              </p>
              <p className="stats">
                <RemoveRedEyeOutlinedIcon
                  fontSize="small"
                  style={{ marginRight: "5px" }}
                />
                {Number(item.views).toLocaleString()}
              </p>
              <p className="stats">
                <DownloadOutlinedIcon
                  fontSize="small"
                  style={{ marginRight: "5px" }}
                />
                {Number(item.downloads).toLocaleString()}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </InfiniteScroll>
  );
};

export default App;
