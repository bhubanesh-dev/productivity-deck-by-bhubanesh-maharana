import * as Yup from "yup";

export const DEFAULT_PAGE_INDEX = 1;
export const DEFAULT_PAGE_SIZE = 30;

export const FALLBACK_IMAGE =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsBGOs2225fFqTfnl5EKlrEUBn5-drby1x3Q&s";

export const SOURCE_LIST = [
  { value: "bbc-news", label: "BBC News" },
  { value: "ign", label: "IGN" },
  { value: "the-washington-post", label: "The Washington Post" },
  { value: "cnn", label: "CNN" },
  { value: "politico", label: "Politico" },
  { value: "associated-press", label: "Associated Press" },
  { value: "abc-news", label: "ABC News" },
  { value: "espn", label: "ESPN" },
];

export const DEFAULT_SOURCE = SOURCE_LIST[0];

export const FILTERS_FORM_VALIDATION_SCHEMA = Yup.object().shape({
  phrase: Yup.string(),
  sources: Yup.array().of(
    Yup.object().shape({
      value: Yup.string().required(),
      label: Yup.string().required(),
    })
  ),
  dateRange: Yup.array().of(Yup.date().nullable()).length(2).nullable(),
});
