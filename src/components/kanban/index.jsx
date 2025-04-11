import { DragDropContext } from "@hello-pangea/dnd";
import { Typography } from "neetoui";
import { useTranslation } from "react-i18next";

import Columns from "./Columns";
import useKanbanTasksStore from "./store/useKanbanTasksStore";

const Kanban = () => {
  const { t } = useTranslation();

  const { tasks, onDragEnd } = useKanbanTasksStore.pick();

  return (
    <main className="container-width px-16 py-8">
      <Typography style="h1" weight="bold">
        {t("kanban.heading")}
      </Typography>
      <DragDropContext onDragEnd={onDragEnd}>
        <section className="mb-2 mt-8 flex flex-row items-center justify-center gap-5">
          {Object.entries(tasks).map(([taskColumnName, tasks]) => (
            <Columns
              key={taskColumnName}
              {...{
                taskColumnName,
                tasks,
              }}
            />
          ))}
        </section>
      </DragDropContext>
    </main>
  );
};

export default Kanban;
