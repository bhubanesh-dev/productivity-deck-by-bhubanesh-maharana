import React from "react";

import { NoData } from "neetoui";
import { routes } from "routes";
import { withT } from "utils/withT";

const PageNotFound = ({ t }) => (
  <div className="flex h-screen w-full items-center justify-center">
    <NoData
      title={t("pageNotFound.title")}
      primaryButtonProps={{
        label: t("pageNotFound.label"),
        className: "bg-green-500 hover:bg-green-400",
        style: "text",
        to: routes.root,
      }}
    />
  </div>
);

export default withT(PageNotFound);
