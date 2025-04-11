import React from "react";

import { Button, Tag, Typography } from "neetoui";
import {
  dissoc,
  equals,
  isEmpty,
  join,
  omit,
  pipe,
  reject,
  split,
} from "ramda";
import { useTranslation } from "react-i18next";

const ShowAppliedFilters = ({
  totalResults,
  everythingQuery: query,
  updateQueryParamsEverything,
}) => {
  const { t } = useTranslation();

  const { phrase, sources, from, to } = query;

  const getFilterCount = query => {
    let count = 0;
    if (query.phrase) count++;

    if (query.from && query.to) count++;

    if (query.sources) {
      count += pipe(split(","), reject(equals("")), length)(query?.sources);
    }

    return count;
  };

  const formatSources = sources?.split(",");

  const handleDeletePhrase = () => {
    if (getFilterCount === 1) {
      clearAllFilters();

      return;
    }

    const updatedQueryParams = dissoc("phrase", query);
    updateQueryParamsEverything({ ...updatedQueryParams });
  };

  const handleDeleteDate = () => {
    if (getFilterCount === 1) {
      clearAllFilters();

      return;
    }
    const updatedQueryParams = omit(["from", "to"], query);
    updateQueryParamsEverything({ ...updatedQueryParams });
  };

  const handleDeleteSource = source => {
    const updatedSourceList = pipe(
      split(","),
      reject(equals(source)),
      reject(equals(""))
    )(sources);

    const isLastFilter =
      getFilterCount === 1 ||
      (isEmpty(updatedSourceList) && getFilterCount === 1);

    if (isLastFilter) {
      clearAllFilters();

      return;
    }

    const updatedSource = join(",", updatedSourceList);
    const updatedQueryParams = { ...query, sources: updatedSource };
    updateQueryParamsEverything({ ...updatedQueryParams });
  };

  const clearAllFilters = () => {
    updateQueryParamsEverything({});
  };

  if (isEmpty(query)) {
    return null;
  }

  return (
    <div className="flex-rows my-4 flex items-center justify-start gap-3">
      <Typography style="body1" weight="semibold">
        {totalResults} {t("news.result")}
      </Typography>
      {phrase && (
        <Tag
          className="px-2"
          label={phrase}
          size="large"
          style="text"
          type="solid"
          onClose={() => handleDeletePhrase()}
        />
      )}
      {formatSources?.filter(Boolean).map(source => (
        <Tag
          className="px-2"
          key={source}
          label={source}
          size="large"
          style="text"
          type="solid"
          onClose={() => handleDeleteSource(source)}
        />
      ))}
      {from && to && (
        <Tag
          className="px-2"
          label={`${from}-${to}`}
          size="large"
          style="text"
          type="solid"
          onClose={() => handleDeleteDate()}
        />
      )}
      <Button
        label={t("buttonLabel.clearAll")}
        style="text"
        onClick={clearAllFilters}
      />
    </div>
  );
};

export default ShowAppliedFilters;
