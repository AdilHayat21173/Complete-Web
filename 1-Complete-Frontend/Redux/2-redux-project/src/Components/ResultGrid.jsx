import { fetchPhotos, fetchVideos, fetchGifs } from "../api/mediaApi";
import { setResults, setIsLoading, setError } from "../features/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ResultCard from "./ResultCard";

const ResultGrid = () => {
  const dispatch = useDispatch();
  const { query, activeTab, results, isLoading, error } = useSelector(
    (state) => state.search
  );

  useEffect(() => {
    if (!query.trim()) return;

    const getdata = async () => {
      try {
        dispatch(setIsLoading(true));
        let data = [];

        if (activeTab === "photos") {
          let response = await fetchPhotos(query);
          data = response.results.map((item) => ({
            id: item.id,
            type: "photo",
            title: item.alt_description,
            thumbnail: item.urls.small,
            src: item.urls.full,
            url: item.links.html,
            download: item.links.download,
          }));
        } else if (activeTab === "videos") {
          let response = await fetchVideos(query);
          data = response.videos.map((item) => ({
            id: item.id,
            type: "video",
            title: item.user.name || "video",
            thumbnail: item.image,
            src: item.video_files[0].link,
            url: item.url,
          }));
        } else if (activeTab === "gifs") {
          let response = await fetchGifs(query);
          data = response.data.map((item) => ({
            id: item.id,
            type: "gif",
            title: item.title || "GIFS",
            thumbnail: item.images.original_still.url,
            src: item.images.original.url,
            url: item.url,
          }));
        }

        dispatch(setResults(data));
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    getdata();
  }, [activeTab, query, dispatch]);

  if (error) return <h1>Error: {error}</h1>;
  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="flex flex-wrap w-full overflow-auto gap-5 justify-start">

      {results.map((item,idx) => (
        <div key={idx}>
        <ResultCard item={item} />
        </div>
      ))}

    </div>
  );
};

export default ResultGrid;