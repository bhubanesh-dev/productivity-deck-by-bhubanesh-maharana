import { NoData, Pagination } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "./Constants";
import NewsItems from "./Items";

const NewsContainer = ({ articles, totalResults }) => {
  const { t } = useTranslation();

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
          count={totalResults}
          pageNo={DEFAULT_PAGE_INDEX}
          pageSize={DEFAULT_PAGE_SIZE}
        />
      </div>
    </>
  );
};

export default NewsContainer;
