import axios from "axios";

import API_KEY from "./key.js";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
  params: {
    part: "snippet",
    maxResults: 10,
    key: API_KEY,
  },
});
