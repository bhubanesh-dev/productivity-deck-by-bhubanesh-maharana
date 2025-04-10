import { useState } from "react";

import { PageLoader } from "components/commons";
import { useFilterNews, useSourceNews } from "hooks/reactQuery/useNewsApi";
import useQueryParams from "hooks/useQueryParams";
import { filterNonNull } from "neetocist";
import { isEmpty, isNotEmpty } from "ramda";
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

const News = () => {
  const queryParams = useQueryParams();
  const history = useHistory();

  const { sources, q: phrase, page, pageSize } = queryParams;

  const [sourcesFilter, setSourcesFilter] = useState(
    sources || DEFAULT_SOURCE.value
  );
  const [queryFilter, setQueryFilter] = useState({ phrase } || {});

  const [shouldFetchSource, setShouldFetchSource] = useState(true);

  const isInitialLoad =
    !("sources" in queryParams) && !("phrase" in queryParams);

  const newsParams = {
    sources: isInitialLoad ? DEFAULT_SOURCE?.value : sources,
    q: queryFilter.phrase,
    page,
    pageSize,
  };

  const updateQueryParams = ({ sources = "", phrase = "" }) => {
    const hasSource = isNotEmpty(sources);

    const hasPhraseParams = isNotEmpty(phrase);

    if (!hasSource && !hasPhraseParams) {
      setQueryFilter({ phrase: "" });
      history.replace(
        buildUrl(routes.news, filterNonNull({ sources: sourcesFilter }))
      );

      setShouldFetchSource(true);

      return;
    } else if (hasSource && !hasPhraseParams) {
      setSourcesFilter(sources);
      history.replace(buildUrl(routes.news, filterNonNull({ sources })));
      setShouldFetchSource(true);

      return;
    } else if (hasPhraseParams) {
      setQueryFilter(previousObject => ({ ...previousObject, phrase }));
      const updatedParams = {
        phrase,
        sources: null,
        page: isEmpty(phrase) ? null : DEFAULT_PAGE_INDEX,
        pageSize: DEFAULT_PAGE_SIZE,
      };
      history.replace(buildUrl(routes.news, filterNonNull(updatedParams)));
      setShouldFetchSource(false);

      return;
    }
  };

  const sourceResult = useSourceNews(newsParams, {
    enabled: shouldFetchSource,
  });

  const filterResult = useFilterNews(newsParams, {
    enabled: !shouldFetchSource,
  });

  const data = shouldFetchSource ? sourceResult.data : filterResult.data;

  const isLoading = shouldFetchSource
    ? sourceResult.isLoading
    : filterResult.isLoading;

  const isFetching = shouldFetchSource
    ? sourceResult.isFetching
    : filterResult.isFetching;

  const { articles = [], totalResults = 0 } = data;

  return (
    <main className="container-width px-16 py-8">
      <Header {...{ sourcesFilter, queryFilter, updateQueryParams }} />
      {isLoading || isFetching ? (
        <PageLoader />
      ) : (
        <NewsContainer
          {...{
            articles,
            totalResults,
          }}
        />
      )}
    </main>
  );
};

export default News;
