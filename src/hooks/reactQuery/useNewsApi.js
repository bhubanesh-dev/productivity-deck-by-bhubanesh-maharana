import { QUERY_KEYS } from "constants/query";

import newsApi from "apis/news";
import { useQuery } from "react-query";

export const useSourceNews = (params, isTopHeadlinesFetching) =>
  useQuery({
    queryKey: [QUERY_KEYS.TOP_HEADLINES, params],
    queryFn: () => newsApi.topHeadlines(params),
    keepPreviousData: true,
    enabled: isTopHeadlinesFetching,
  });

export const useFilterNews = (params, isTopHeadlinesFetching) =>
  useQuery({
    queryKey: [QUERY_KEYS.EVERYTHING, params],
    queryFn: () => newsApi.everything(params),
    keepPreviousData: true,
    enabled: !isTopHeadlinesFetching,
  });
