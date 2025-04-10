import { QUERY_KEYS } from "constants/query";

import newsApi from "apis/news";
import { useQuery } from "react-query";

export const useFetchNews = params =>
  useQuery({
    queryKey: [QUERY_KEYS.NEWS, params],
    queryFn: () => newsApi.fetch(params),
    keepPreviousData: true,
  });
