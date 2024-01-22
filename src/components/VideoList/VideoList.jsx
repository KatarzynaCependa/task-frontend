import { useState, useEffect, useRef } from "react";

import "./VideoList.css";
import { searchApi } from "../../services/api";
import { Loader } from "../Loader/Loader";
import { Footer } from "../Footer/Footer";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const lastElementRef = useRef(null);

  function onIntersecionLast(entries) {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && hasMore) {
      fetchMoreVideos();
    }
  }

  useEffect(() => {
    const observerLastEl = new IntersectionObserver(onIntersecionLast);

    if (observerLastEl && lastElementRef.current) {
      observerLastEl.observe(lastElementRef.current);
    }

    return () => {
      if (observerLastEl) {
        observerLastEl.disconnect();
      }
    };
  }, [videos]);

  const fetchMoreVideos = async () => {
    try {
      setIsLoading(true);

      const newVideos = await searchApi(page + 1);
      if (videos.length === 45) {
        setHasMore(false);
      } else {
        setVideos((prevVideos) => [...prevVideos, ...newVideos]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching more data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ul className="videoContainer">
        {videos.map((item) => (
          <li key={item.id}>
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
                  style={{ fontSize: "large", marginRight: "5px" }}
                />
                {Number(item.likes).toLocaleString()}
              </p>
              <p className="stats">
                <RemoveRedEyeOutlinedIcon
                  style={{ fontSize: "large", marginRight: "5px" }}
                />
                {Number(item.views).toLocaleString()}
              </p>
              <p className="stats">
                <DownloadOutlinedIcon
                  style={{ fontSize: "large", marginRight: "5px" }}
                />
                {Number(item.downloads).toLocaleString()}
              </p>
            </div>
          </li>
        ))}
        {isLoading && <Loader />}
        {hasMore ? <div ref={lastElementRef} /> : <Footer />}
      </ul>
    </>
  );
};

export default VideoList;
