import { QUERY_KEYS } from "constants/query";

import newsApi from "apis/news";
import { useQuery } from "react-query";

export const useSourceNews = params =>
  useQuery({
    queryKey: [QUERY_KEYS.TOP_HEADLINES, params],
    queryFn: () => newsApi.topHeadlines(params),
    enabled: !!params.sources,
  });

export const useFilterNews = params =>
  useQuery({
    queryKey: [QUERY_KEYS.EVERYTHING, params],
    queryFn: () => newsApi.everything(params),
    keepPreviousData: true,
    enabled: !!params.q || !!params.sources,
  });
