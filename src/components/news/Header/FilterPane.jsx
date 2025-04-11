import React, { useState } from "react";

import dayjs from "dayjs";
import { Field } from "formik";
import { Filter as FilterIcon } from "neetoicons";
import { Button, DatePicker, Pane, Typography } from "neetoui";
import { Input, Select, Form as NeetoUIForm } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import { FILTERS_FORM_VALIDATION_SCHEMA, SOURCE_LIST } from "../Constants";
import {
  formatSourcesArrayOfObjectsIntoString,
  formatSourcesStringToArrayOfObjects,
} from "../utils";

const FilterPane = ({ everythingQuery, updateQueryParams }) => {
  const [showFilterPane, setShowFilterPane] = useState(false);

  const { t } = useTranslation();
  const { Header, Body, Footer } = Pane;

  const INITIAL_VALUES = {
    phrase: everythingQuery.phrase || "",
    sources: formatSourcesStringToArrayOfObjects(everythingQuery.sources || ""),
    dateRange: [everythingQuery.from, everythingQuery.to] || [null, null],
  };

  const handleSubmit = ({ phrase, sources, dateRange }) => {
    const sourceValues = formatSourcesArrayOfObjectsIntoString(sources) || "";
    const [from, to] = dateRange || [];

    const formattedFrom = from ? dayjs(from).format("YYYY-MM-DD") : null;
    const formattedTo = to ? dayjs(to).format("YYYY-MM-DD") : null;

    updateQueryParams({
      phrase,
      sources: sourceValues,
      from: formattedFrom,
      to: formattedTo,
    });

    setShowFilterPane(false);
  };

  return (
    <>
      <Button
        icon={FilterIcon}
        style="text"
        onClick={() => setShowFilterPane(true)}
      />
      <Pane isOpen={showFilterPane} onClose={() => setShowFilterPane(false)}>
        <Header>
          <Typography style="h2" weight="semibold">
            {t("news.filters.heading")}
          </Typography>
        </Header>
        <NeetoUIForm
          formProps={{ noValidate: true }}
          formikProps={{
            initialValues: INITIAL_VALUES,
            validationSchema: FILTERS_FORM_VALIDATION_SCHEMA,
            onSubmit: handleSubmit,
          }}
        >
          <Body>
            <div className="my-6 w-full">
              <Input
                className="mb-6"
                label={t("news.filters.search")}
                name="phrase"
                placeholder={t("news.filters.searchPlaceHolder")}
                size="large"
              />
              <Select
                isMulti
                className="mb-6"
                isSearchable={false}
                label={t("news.filters.sources")}
                name="sources"
                options={SOURCE_LIST}
                placeholder={t("news.filters.SourcesPlaceholder")}
                portalProps={{ className: "select-menu-list" }}
                size="large"
              />
              <Field name="dateRange">
                {({ field, form }) => (
                  <DatePicker
                    {...field}
                    allowClear
                    dateFormat="DD/MM/YYYY"
                    label={t("news.filters.date")}
                    maxDate={dayjs()}
                    picker="date"
                    type="range"
                    value={field.value}
                    onChange={value => form.setFieldValue("dateRange", value)}
                  />
                )}
              </Field>
            </div>
          </Body>
          <Footer className="flex items-center justify-start space-x-2">
            <Button label={t("buttonLabel.apply")} type="submit" />
            <Button
              label={t("buttonLabel.cancel")}
              style="text"
              onClick={() => setShowFilterPane(false)}
            />
          </Footer>
        </NeetoUIForm>
      </Pane>
    </>
  );
};

export default FilterPane;
