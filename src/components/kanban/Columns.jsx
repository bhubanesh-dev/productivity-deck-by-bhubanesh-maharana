import { Droppable } from "@hello-pangea/dnd";
import classNames from "classnames";
import { Plus } from "neetoicons";
import { Button, NoData, Typography } from "neetoui";
import { isEmpty } from "ramda";
import { Trans, useTranslation } from "react-i18next";

import Tasks from "./Tasks";

const Columns = ({ taskColumnName, tasks }) => {
  const { t } = useTranslation();

  return (
    <div className="kanban-column-height flex w-80  flex-col gap-6 rounded-md border-2 border-black bg-gray-100 px-8 pb-2 pt-8">
      <Typography style="h2" weight="bold">
        <Trans i18nKey={`kanban.${taskColumnName}`} />
      </Typography>
      <Droppable droppableId={taskColumnName} key={taskColumnName}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={classNames(
              "w-72 flex-grow rounded ",
              taskColumnName === "done" && "line-through"
            )}
          >
            {isEmpty(tasks) ? (
              <NoData title={t("kanban.noTasksPresent")} />
            ) : (
              tasks.map((task, index) => (
                <Tasks key={task.id} {...{ task, taskColumnName, index }} />
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className="mt-auto self-center">
        <Button
          className="font-semibold"
          icon={Plus}
          iconPosition="right"
          iconSize={20}
          label={t("kanban.addNewTasks")}
          style="text"
        />
      </div>
    </div>
  );
};

export default Columns;
