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
  everythingQuery: query,
  totalResults,
  updateQueryParams,
}) => {
  const { t } = useTranslation();

  const { phrase, sources, from, to } = query;

  const formatSources = sources?.split(",");

  const handleDeletePhrase = () => {
    const updatedQueryParams = dissoc("phrase", query);
    updateQueryParams({ ...updatedQueryParams });
  };

  const handleDeleteDate = () => {
    const updatedQueryParams = omit(["from", "to"], query);
    updateQueryParams({ ...updatedQueryParams });
  };

  const handleDeleteSource = source => {
    const updatedSource = pipe(
      split(","),
      reject(equals(source)),
      reject(equals("")),
      join(",")
    )(sources);

    const updatedQueryParams = { ...query, sources: updatedSource };
    updateQueryParams({ ...updatedQueryParams });
  };

  const clearAllFilters = () => {
    updateQueryParams({});
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
      {!isEmpty(formatSources) &&
        formatSources?.map(source => (
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
