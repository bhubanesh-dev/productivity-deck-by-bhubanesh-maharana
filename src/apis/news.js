import axios from "axios";

import { BASE_URL } from "./constants";

const topHeadlines = params => axios.get(BASE_URL.topHeadlines, { params });
const everything = params => axios.get(BASE_URL.everything, { params });

const newsApi = { topHeadlines, everything };

export default newsApi;
