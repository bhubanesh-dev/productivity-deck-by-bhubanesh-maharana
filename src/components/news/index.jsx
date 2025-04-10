import { PageLoader } from "components/commons";
import { useFetchNews } from "hooks/reactQuery/useNewsApi";

import NewsContainer from "./Container";
import Header from "./Header";

const News = () => {
  const {
    data = {},
    isLoading,
    isFetching,
  } = useFetchNews({ sources: "bbc-news" });

  const { articles = [], totalResults = 0 } = data;

  return (
    <main className="container-width px-16 py-8">
      <Header />
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
