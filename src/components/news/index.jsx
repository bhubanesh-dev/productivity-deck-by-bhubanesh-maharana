import { useState } from "react";

import { PageLoader } from "components/commons";
import { useFetchNews } from "hooks/reactQuery/useNewsApi";
import useQueryParams from "hooks/useQueryParams";
import { filterNonNull } from "neetocist";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { routes } from "routes";
import { buildUrl } from "utils/url";

import { DEFAULT_SOURCE } from "./Constants";
import NewsContainer from "./Container";
import Header from "./Header";

const News = () => {
  const queryParams = useQueryParams();
  const history = useHistory();

  const { sources } = queryParams;

  const [sourcesFilter, setSourcesFilter] = useState(
    sources || DEFAULT_SOURCE.value
  );

  const newsParams = {
    sources: sourcesFilter,
  };

  const updateQueryParams = ({ sources = "" }) => {
    setSourcesFilter(sources);
    history.replace(buildUrl(routes.news, filterNonNull({ sources })));
  };

  const { data = {}, isLoading, isFetching } = useFetchNews(newsParams);

  const { articles = [], totalResults = 0 } = data;

  return (
    <main className="container-width px-16 py-8">
      <Header {...{ sourcesFilter, updateQueryParams }} />
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
