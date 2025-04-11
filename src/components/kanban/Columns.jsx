import { useRef, useEffect, useState } from "react";

import { Droppable } from "@hello-pangea/dnd";
import classNames from "classnames";
import useKeyboardEnter from "hooks/usekeyboardEnter";
import { Close, Plus } from "neetoicons";
import { Button, Input, NoData, Typography } from "neetoui";
import { isEmpty } from "ramda";
import { Trans, useTranslation } from "react-i18next";
import { AiOutlineEnter } from "react-icons/ai";

import useKanbanTasksStore from "./store/useKanbanTasksStore";
import Tasks from "./Tasks";

const Columns = ({ taskColumnName, tasks }) => {
  const { t } = useTranslation();

  const [shouldShowInput, setShouldShowInput] = useState(false);
  const [taskInput, setTaskInput] = useState("");
  const inputRef = useRef(null);

  const { addNewTasks } = useKanbanTasksStore.pick();

  useEffect(() => {
    if (shouldShowInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [shouldShowInput]);

  const handleAddingNewTask = () => {
    setShouldShowInput(true);
  };

  const handleInputSubmit = () => {
    if (isEmpty(taskInput)) {
      setShouldShowInput(false);

      return;
    }

    addNewTasks(taskColumnName, taskInput);
    setTaskInput("");
    setShouldShowInput(false);
  };

  useKeyboardEnter(inputRef, handleInputSubmit);

  return (
    <div className="kanban-column-height flex w-80  flex-col gap-6 rounded-md border-2 border-gray-400 bg-gray-100 px-8 pb-2 pt-8">
      <Typography style="h2" weight="bold">
        <Trans i18nKey={`kanban.${taskColumnName}`} />
      </Typography>
      <Droppable droppableId={taskColumnName} key={taskColumnName}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={classNames("w-72 flex-grow rounded ", {
              "line-through": taskColumnName === "done",
            })}
          >
            {isEmpty(tasks) ? (
              <NoData title={t("kanban.noTasksPresent")} />
            ) : (
              tasks.map((task, index) => (
                <Tasks key={task.id} {...{ task, taskColumnName, index }} />
              ))
            )}
            {provided.placeholder}
            {shouldShowInput && (
              <div className="flex w-60 flex-row gap-2">
                <Input
                  placeholder={t("kanban.inputPlaceholder")}
                  ref={inputRef}
                  size="large"
                  type="text"
                  value={taskInput}
                  onChange={({ target: { value } }) => setTaskInput(value)}
                />
                <Button
                  icon={isEmpty(taskInput) ? Close : AiOutlineEnter}
                  style="tertiary"
                  onClick={handleInputSubmit}
                />
              </div>
            )}
          </div>
        )}
      </Droppable>
      <div className="mt-auto self-center">
        <Button
          className="font-semibold"
          disabled={shouldShowInput}
          icon={Plus}
          iconPosition="right"
          iconSize={20}
          label={t("kanban.addNewTasks")}
          style="text"
          onClick={handleAddingNewTask}
        />
      </div>
    </div>
  );
};

export default Columns;
