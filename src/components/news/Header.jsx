import { Filter, MenuHorizontal, Search } from "neetoicons";
import { Input, Typography } from "neetoui";
import { withT } from "utils/withT";

const Header = ({ t }) => (
  <header className=" flex flex-wrap items-center justify-between gap-4 ">
    <div className="flex flex-row items-center gap-4">
      <Typography style="h1" weight="bold">
        {t("news.heading")}
      </Typography>
      <MenuHorizontal />
      <Filter />
    </div>
    <div className="w-56">
      <Input placeholder={t("news.searchArticle")} suffix={<Search />} />
    </div>
  </header>
);

export default withT(Header);
