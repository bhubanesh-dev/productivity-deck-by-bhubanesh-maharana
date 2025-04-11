import { useState } from "react";

import { Draggable } from "@hello-pangea/dnd";
import classNames from "classnames";
import { Delete } from "neetoicons";
import { Alert, Button, Typography } from "neetoui";
import { useTranslation } from "react-i18next";

import useKanbanTasksStore from "./store/useKanbanTasksStore";

const Task = ({ task: { id, taskName }, taskColumnName, index }) => {
  const [shouldShowDeleteTaskAlert, setShouldShowDeleteTaskAlert] =
    useState(false);

  const { deleteTasks } = useKanbanTasksStore.pick();

  const { t } = useTranslation();

  return (
    <>
      <Draggable draggableId={id.toString()} index={index}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={classNames(
              " group my-2 flex w-60 flex-row items-center justify-between rounded bg-gray-50 p-2 shadow",
              { "line-through": taskColumnName === "done" }
            )}
          >
            <Typography className="truncate" style="body1">
              {taskName}
            </Typography>
            <Button
              className="text-red-500  opacity-0 group-hover:opacity-100"
              icon={Delete}
              style="tertiary"
              onClick={() => setShouldShowDeleteTaskAlert(true)}
            />
          </div>
        )}
      </Draggable>
      <Alert
        closeOnOutsideClick
        cancelButtonLabel={t("kanban.alertCancelButtonLabel")}
        isOpen={shouldShowDeleteTaskAlert}
        message={t("kanban.alertMessage")}
        submitButtonLabel={t("kanban.alertSubmitButtonLabel")}
        title={t("kanban.alertTitle")}
        onClose={() => setShouldShowDeleteTaskAlert(false)}
        onSubmit={() => deleteTasks(taskColumnName, id)}
      />
    </>
  );
};

export default Task;
