import { useEffect, useState } from "react";

import newsApi from "apis/news";
import { NoData, Pagination } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";

import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  TOTAL_RESULTS,
} from "./Constants";
import NewsItems from "./Items";

const NewsContainer = () => {
  const { t } = useTranslation();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const newsResponse = await newsApi.fetch({ sources: "bbc-news" });

      setArticles(newsResponse.articles);
    };
    fetchNews();
  }, []);

  if (isEmpty(articles)) {
    return (
      <NoData
        className="flex h-screen w-full items-center justify-center"
        title={t("news.noNewsFound")}
      />
    );
  }

  return (
    <>
      <section className="news-container my-4 w-full overflow-y-scroll">
        {articles.map(
          ({ title, description, publishedAt, urlToImage, url, author }) => (
            <NewsItems
              key={title}
              {...{
                title,
                description,
                publishedAt,
                urlToImage,
                url,
                author,
              }}
            />
          )
        )}
      </section>
      <div className="my-6 flex w-full justify-end">
        <Pagination
          count={TOTAL_RESULTS}
          pageNo={DEFAULT_PAGE_INDEX}
          pageSize={DEFAULT_PAGE_SIZE}
        />
      </div>
    </>
  );
};

export default NewsContainer;
