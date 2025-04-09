import { Typography } from "neetoui";
import { useTranslation } from "react-i18next";

import Columns from "./Columns";

const Kanban = () => {
  const { t } = useTranslation();

  const TASKS = {
    todo: [
      { id: 1, taskName: "Item 1" },
      { id: 2, taskName: "Item 2" },
    ],
    inProgress: [
      { id: 3, taskName: "Item 3" },
      { id: 4, taskName: "Item 4" },
    ],
    done: [
      { id: 5, taskName: "Item 5" },
      { id: 6, taskName: "Item 6" },
    ],
  };

  return (
    <main className="w-full px-32 py-8">
      <Typography style="h1" weight="bold">
        {t("kanban.heading")}
      </Typography>
      <section className="mb-2 mt-8 flex flex-row items-center justify-center gap-5">
        {Object.entries(TASKS).map(([taskColumnName, tasks]) => (
          <Columns
            key={taskColumnName}
            {...{
              taskColumnName,
              tasks,
            }}
          />
        ))}
      </section>
    </main>
  );
};

export default Kanban;
