import axios from "axios";

import { BASE_URL } from "./constants";

const source = params => axios.get(BASE_URL.topHeadlines, { params });
const filter = params => axios.get(BASE_URL.everything, { params });

const newsApi = { source, filter };

export default newsApi;
