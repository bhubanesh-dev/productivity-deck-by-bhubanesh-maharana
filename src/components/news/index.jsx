import { useState } from "react";

import { PageLoader } from "components/commons";
import { useFilterNews, useSourceNews } from "hooks/reactQuery/useNewsApi";
import useQueryParams from "hooks/useQueryParams";
import { filterNonNull } from "neetocist";
import { mergeLeft } from "ramda";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { routes } from "routes";
import { buildUrl } from "utils/url";

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "./Constants";
import NewsContainer from "./Container";
import Header from "./Header";
import ShowAppliedFilters from "./ShowAppliedFilters";

const News = () => {
  const history = useHistory();
  const queryParams = useQueryParams();

  const {
    source = "",
    phrase = "",
    page,
    pageSize,
    sources = "",
    from,
    to,
  } = queryParams;

  const [topHeadlinesSource, setTopHeadlinesSource] = useState(source);
  const [everythingQuery, setEverythingQuery] = useState({
    phrase,
    page,
    pageSize,
    sources,
    from,
    to,
  });

  const isFilterMode = phrase !== "" || sources !== "";

  const topHeadlinesParams = {
    sources: topHeadlinesSource,
  };

  const everythingParams = {
    q: everythingQuery.phrase,
    page: Number(page) || DEFAULT_PAGE_INDEX,
    pageSize: Number(pageSize) || DEFAULT_PAGE_SIZE,
    sources: everythingQuery.sources,
    from: everythingQuery.from,
    to: everythingQuery.to,
  };
  const sourceNews = useSourceNews(topHeadlinesParams);
  const filterNews = useFilterNews(everythingParams);

  const { data, isLoading, isFetching } = isFilterMode
    ? filterNews
    : sourceNews;
  const { articles = [], totalResults = 0 } = data || {};

  const updateQueryParamsTopHeadlines = ({ source }) => {
    setTopHeadlinesSource(source);
    history.replace(buildUrl(routes.news, filterNonNull({ source })));
  };

  const updateQueryParamsEverything = ({
    sources = "",
    phrase = "",
    from = "",
    to = "",
  }) => {
    setEverythingQuery(prev => ({
      ...prev,
      sources,
      phrase,
      from,
      to,
    }));

    const params = {
      sources: sources || null,
      phrase: phrase || null,
      from: from || null,
      to: to || null,
    };
    history.replace(buildUrl(routes.news, filterNonNull(params)));
  };

  const handlePageNavigation = page => {
    history.replace(buildUrl(routes.news, mergeLeft({ page }, queryParams)));
  };

  return (
    <main className="container-width overflow-hidden px-16 py-8">
      <Header
        {...{
          topHeadlinesSource,
          updateQueryParamsTopHeadlines,
          everythingQuery,
          updateQueryParamsEverything,
        }}
      />
      {isFilterMode && (
        <ShowAppliedFilters
          {...{ totalResults, everythingQuery, updateQueryParamsEverything }}
        />
      )}
      {isLoading || isFetching ? (
        <PageLoader />
      ) : (
        <NewsContainer
          {...{ articles, totalResults, page, handlePageNavigation }}
        />
      )}
    </main>
  );
};

export default News;
