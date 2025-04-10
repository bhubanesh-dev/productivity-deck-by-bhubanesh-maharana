import { Filter, Search } from "neetoicons";
import { Input, Typography } from "neetoui";
import { withT } from "utils/withT";

import SourcesSelector from "./SourcesSelector";

const Header = ({ sourcesFilter, updateQueryParams, t }) => (
  <header className=" flex flex-wrap items-center justify-between gap-4 ">
    <div className="flex flex-row items-center gap-4">
      <Typography style="h1" weight="bold">
        {t("news.heading")}
      </Typography>
      <SourcesSelector {...{ sourcesFilter, updateQueryParams }} />
      <Filter />
    </div>
    <div className="w-56">
      <Input placeholder={t("news.searchArticle")} suffix={<Search />} />
    </div>
  </header>
);

export default withT(Header);
