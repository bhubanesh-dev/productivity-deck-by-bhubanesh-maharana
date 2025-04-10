import { NoData, Pagination } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";

import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  NEWS_LIST,
  TOTAL_RESULTS,
} from "./Constants";
import NewsItems from "./Items";

const NewsContainer = () => {
  const { t } = useTranslation();

  if (isEmpty(NEWS_LIST)) {
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
        {NEWS_LIST.map(
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
