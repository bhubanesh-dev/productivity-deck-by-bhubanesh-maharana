import React from "react";

import { Button, Typography } from "neetoui";
import {
  dissoc,
  equals,
  isEmpty,
  join,
  omit,
  pipe,
  reject,
  split,
  length,
} from "ramda";
import { useTranslation } from "react-i18next";

import RenderTags from "./RenderTags";

import { convertToSlug, formatSources } from "../utils";

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
      count += pipe(split(","), reject(equals("")), length)(query.sources);
    }

    return count;
  };

  const formattedSources = formatSources(sources);

  const handleDeletePhrase = () => {
    if (getFilterCount(query) === 1) {
      clearAllFilters();

      return;
    }
    const updatedQueryParams = dissoc("phrase", query);
    updateQueryParamsEverything({ ...updatedQueryParams });
  };

  const handleDeleteDate = () => {
    if (getFilterCount(query) === 1) {
      clearAllFilters();

      return;
    }
    const updatedQueryParams = omit(["from", "to"], query);
    updateQueryParamsEverything({ ...updatedQueryParams });
  };

  const handleDeleteSource = source => {
    const sourceSlug = convertToSlug(source);

    const updatedSourceList = pipe(
      split(","),
      reject(equals(sourceSlug)),
      reject(equals(""))
    )(sources);

    const updatedSource = join(",", updatedSourceList);
    const updatedQueryParams = updatedSource
      ? { ...query, sources: updatedSource }
      : dissoc("sources", query);

    if (getFilterCount(updatedQueryParams) === 0) {
      clearAllFilters();

      return;
    }

    updateQueryParamsEverything(updatedQueryParams);
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
        <RenderTags
          {...{
            keyProp: "phrase",
            label: phrase,
            onClose: handleDeletePhrase,
          }}
        />
      )}
      {formattedSources?.filter(Boolean).map(source => (
        <RenderTags
          key={source}
          {...{
            keyProp: source,
            label: source,
            onClose: () => handleDeleteSource(source),
          }}
        />
      ))}
      {from && to && (
        <RenderTags
          {...{
            keyProp: "date-range",
            label: `${from} : ${to}`,
            onClose: handleDeleteDate,
          }}
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
