import axios from "axios";

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
const PEXELS_KEY = import.meta.env.VITE_PEXELS_API_KEY;
const GIPHY_KEY = import.meta.env.VITE_GIPHY_API_KEY;



export async function fetchPhotos(query, page = 1, perPage = 10) {
  const res = await axios.get("https://api.unsplash.com/search/photos", {
    params: {
      query,
      page,
      per_page: perPage,
    },
    headers: {
      Authorization: `Client-ID ${UNSPLASH_KEY}`,
    },
  });

  return res.data;
}


export async function fetchVideos(query, perPage = 10) {
  const res = await axios.get("https://api.pexels.com/videos/search", {
    params: {
      query,
      per_page: perPage,
    },
    headers: {
      Authorization: PEXELS_KEY,
    },
  });

  return res.data;
}


export async function fetchGifs(query, limit = 10) {
  const res = await axios.get("https://api.giphy.com/v1/gifs/search", {
    params: {
      api_key: GIPHY_KEY,
      q: query,
      limit,
    },
  });

  return res.data;
}
