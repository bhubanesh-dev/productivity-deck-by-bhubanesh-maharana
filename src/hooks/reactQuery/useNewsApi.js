import { QUERY_KEYS } from "constants/query";

import newsApi from "apis/news";
import { useQuery } from "react-query";

export const useSourceNews = params =>
  useQuery({
    queryKey: [QUERY_KEYS.SOURCE, params],
    queryFn: () => newsApi.source(params),
    keepPreviousData: true,
  });

export const useFilterNews = params =>
  useQuery({
    queryKey: [QUERY_KEYS.FILTER, params],
    queryFn: () => newsApi.filter(params),
    keepPreviousData: true,
  });
