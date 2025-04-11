import { useEffect, useState } from "react";

import useFuncDebounce from "hooks/useFuncDebounce";
import { Search } from "neetoicons";
import { Input, Typography } from "neetoui";
import { withT } from "utils/withT";

import FilterPane from "./FilterPane";
import SourcesSelector from "./SourcesSelector";

const Header = ({
  topHeadlinesSource,
  updateQueryParamsTopHeadlines,
  everythingQuery,
  updateQueryParamsEverything,
  t,
}) => {
  const [input, setInput] = useState(everythingQuery.phrase);

  const debouncedUpdateQueryParams = useFuncDebounce(value =>
    updateQueryParamsEverything({ phrase: value })
  );

  useEffect(() => {
    setInput(everythingQuery.phrase);
  }, [everythingQuery.phrase]);

  return (
    <header className=" flex flex-wrap items-center justify-between gap-4 ">
      <div className="flex flex-row items-center gap-4">
        <Typography style="h1" weight="bold">
          {t("news.heading")}
        </Typography>
        <SourcesSelector
          {...{
            topHeadlinesSource,
            updateQueryParamsTopHeadlines,
          }}
        />
        <FilterPane {...{ everythingQuery, updateQueryParamsEverything }} />
      </div>
      <div className="w-56">
        <Input
          placeholder="Search for article"
          suffix={<Search />}
          value={input}
          onChange={({ target: { value } }) => {
            setInput(value);
            debouncedUpdateQueryParams(value);
          }}
        />
      </div>
    </header>
  );
};

export default withT(Header);
