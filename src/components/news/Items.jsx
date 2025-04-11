import { Button, Typography } from "neetoui";
import { withT } from "utils/withT";

import { FALLBACK_IMAGE } from "./Constants";

const NewsItems = ({
  title,
  description,
  publishedAt,
  urlToImage,
  url,
  author,
  t,
}) => (
  <section className="l flex flex-col gap-24 border-b border-gray-400 px-32 py-8 md:flex-row md:items-start md:gap-60">
    <div className="flex max-w-2xl flex-1 flex-col gap-2">
      <Typography style="h3" weight="bold">
        {title}
      </Typography>
      <Typography className="text-gray-600" style="body1">
        {description}{" "}
        <Button
          className="text-primary-500 p-0"
          label={t("news.knowMore")}
          style="link"
          onClick={() => window.open(url, "_self")}
        />
      </Typography>
      <div className="mt-2 text-sm text-gray-500">
        <Typography>
          {publishedAt} {author && ` - ${author}`}
        </Typography>
      </div>
    </div>
    {urlToImage && (
      <div className="w-full flex-shrink-0 justify-items-end md:w-64">
        <img
          alt={title}
          className="h-48 w-full rounded-lg object-cover shadow-sm"
          src={urlToImage}
          onError={event => (event.target.src = FALLBACK_IMAGE)}
        />
      </div>
    )}
  </section>
);

export default withT(NewsItems);
