// import "./App.css";
// import { Loader } from "./components/Loader/Loader";
// import { Footer } from "./components/Footer/Footer";
// import { searchApi } from "../src/services/api";

// import { useEffect, useState } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
// import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
// import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
// import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

// const App = () => {
//   const [videos, setVideos] = useState([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const initialVideos = await searchApi(1);
//         setVideos(initialVideos);
//       } catch (error) {
//         console.error("Error fetching initial data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const fetchMoreData = async () => {
//     if (videos.length < 36) {
//       try {
//         const newVideos = await searchApi(page + 1);
//         setVideos((prevVideos) => [...prevVideos, ...newVideos]);
//         setPage((prevPage) => prevPage + 1);
//       } catch (error) {
//         console.error("Error fetching more data:", error);
//       }
//     } else {
//       setHasMore(false);
//     }
//   };

//   return (
//     <InfiniteScroll
//       dataLength={videos.length}
//       next={fetchMoreData}
//       hasMore={hasMore}
//       loader={<Loader />}
//       endMessage={<Footer />}
//       style={{ overflow: "visible" }}
//     >
//       <ul className="videoContainer">
//         {videos.map((item) => (
//           <li key={item.id} className="wrapper">
//             <video controls width="250" preload="metadata" className="video">
//               <source src={item.videos.small.url} type="video/webm" />
//             </video>
//             <p className="link">
//               You can download the video{" "}
//               <a href={item.pageURL} target="_blank" rel="noreferrer">
//                 here
//               </a>
//             </p>
//             <div className="statsContainer">
//               <p className="stats">
//                 <FavoriteBorderOutlinedIcon
//                   style={{ fontSize: "large", marginRight: "5px" }}
//                 />
//                 {Number(item.likes).toLocaleString()}
//               </p>
//               <p className="stats">
//                 <RemoveRedEyeOutlinedIcon
//                   style={{ fontSize: "large", marginRight: "5px" }}
//                 />
//                 {Number(item.views).toLocaleString()}
//               </p>
//               <p className="stats">
//                 <DownloadOutlinedIcon
//                   style={{ fontSize: "large", marginRight: "5px" }}
//                 />
//                 {Number(item.downloads).toLocaleString()}
//               </p>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </InfiniteScroll>
//   );
// };

// export default App;
