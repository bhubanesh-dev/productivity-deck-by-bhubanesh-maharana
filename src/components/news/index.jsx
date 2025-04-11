import { useState } from "react";

import { PageLoader } from "components/commons";
import { useFilterNews, useSourceNews } from "hooks/reactQuery/useNewsApi";
import useQueryParams from "hooks/useQueryParams";
import { filterNonNull } from "neetocist";
import { isEmpty, mergeLeft } from "ramda";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { routes } from "routes";
import { buildUrl } from "utils/url";

import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SOURCE,
} from "./Constants";
import NewsContainer from "./Container";
import Header from "./Header";
import { areParamsEmpty } from "./utils";

const News = () => {
  const queryParams = useQueryParams();
  const history = useHistory();
  const [isTopHeadlinesFetching, setIsTopHeadlinesFetching] = useState(true);

  const {
    source = "",
    sources = "",
    phrase = "",
    from = null,
    to = null,
    page,
    pageSize,
  } = queryParams;

  const [topHeadlinesSource, setTopHeadlinesSource] = useState(
    source || DEFAULT_SOURCE.value
  );

  const [everythingQuery, setEverythingQuery] = useState({
    phrase,
    sources,
    from,
    to,
  });

  const topHeadlinesNewsParams = { sources: topHeadlinesSource };

  const everythingQueryNewsParams = {
    sources,
    q: phrase,
    page: page || DEFAULT_PAGE_INDEX,
    pageSize: pageSize || DEFAULT_PAGE_SIZE,
    from: everythingQuery.from,
    to: everythingQuery.to,
  };

  const updateQueryParams = (queries, isFromSourceChange = false) => {
    const {
      source = "",
      sources = "",
      phrase = "",
      from = "",
      to = "",
    } = queries;

    const allEmpty = areParamsEmpty(queries);

    if (allEmpty) {
      const defaultSource = DEFAULT_SOURCE.value;
      setTopHeadlinesSource(defaultSource);
      setEverythingQuery({ phrase: "", sources: "", from: "", to: "" });
      setIsTopHeadlinesFetching(true);

      history.replace(
        buildUrl(routes.news, filterNonNull({ source: defaultSource }))
      );

      return;
    }

    if (isFromSourceChange) {
      setTopHeadlinesSource(source);
      setIsTopHeadlinesFetching(true);
      history.replace(buildUrl(routes.news, filterNonNull({ source })));

      return;
    }

    const updatedParams = {
      phrase: isEmpty(phrase) ? null : phrase,
      sources: isEmpty(sources) ? null : sources,
      from: isEmpty(from) ? null : from,
      to: isEmpty(to) ? null : to,
      source: null,
      pageSize:
        isEmpty(phrase) && isEmpty(sources) && isEmpty(from)
          ? null
          : DEFAULT_PAGE_SIZE,
      page:
        isEmpty(phrase) && isEmpty(sources) && isEmpty(from)
          ? null
          : DEFAULT_PAGE_INDEX,
    };

    const filteredParams = filterNonNull(updatedParams);
    setEverythingQuery(prev => ({ ...prev, ...updatedParams }));
    setIsTopHeadlinesFetching(false);
    history.replace(buildUrl(routes.news, filteredParams));
  };

  const handlePageNavigation = page => {
    history.replace(buildUrl(routes.news, mergeLeft({ page }, queryParams)));
  };

  const sourceResponse = useSourceNews(
    topHeadlinesNewsParams,
    isTopHeadlinesFetching
  );

  const filterResponse = useFilterNews(
    everythingQueryNewsParams,
    isTopHeadlinesFetching
  );

  const { data, isFetching, isLoading } = isTopHeadlinesFetching
    ? sourceResponse
    : filterResponse;
  const { articles = [], totalResults = 0 } = data || {};

  return (
    <main className="container-width px-16 py-8">
      <Header {...{ topHeadlinesSource, everythingQuery, updateQueryParams }} />
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
