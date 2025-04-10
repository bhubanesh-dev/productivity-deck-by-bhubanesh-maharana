import { useState } from "react";

import useFuncDebounce from "hooks/useFuncDebounce";
import { Filter, Search } from "neetoicons";
import { Input, Typography } from "neetoui";
import { withT } from "utils/withT";

import SourcesSelector from "./SourcesSelector";

const Header = ({ sourcesFilter, queryFilter, updateQueryParams, t }) => {
  const [input, setInput] = useState(queryFilter?.phrase);
  const debouncedUpdateQueryParams = useFuncDebounce(value =>
    updateQueryParams({ phrase: value })
  );

  return (
    <header className=" flex flex-wrap items-center justify-between gap-4 ">
      <div className="flex flex-row items-center gap-4">
        <Typography style="h1" weight="bold">
          {t("news.heading")}
        </Typography>
        <SourcesSelector {...{ sourcesFilter, updateQueryParams }} />
        <Filter />
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
