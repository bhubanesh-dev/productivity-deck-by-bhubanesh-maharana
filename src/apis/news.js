import axios from "axios";

import { BASE_URL } from "./constants";

const fetch = params => axios.get(BASE_URL, { params });

const newsApi = { fetch };

export default newsApi;
