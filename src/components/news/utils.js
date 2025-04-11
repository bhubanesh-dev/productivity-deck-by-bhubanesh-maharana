import { filter, includes, isEmpty, pipe, split, values } from "ramda";

import { SOURCE_LIST } from "./Constants";

export const formatSourcesStringToArrayOfObjects = pipe(split(","), selected =>
  filter(item => includes(item.value, selected), SOURCE_LIST)
);

export const areParamsEmpty = params => values(params).every(isEmpty);

export const formatSourcesArrayOfObjectsIntoString = sources =>
  sources?.map(source => source.value).join(",");

export const formatSources = sources =>
  sources
    ?.split(",")
    .map(source =>
      source.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())
    );
