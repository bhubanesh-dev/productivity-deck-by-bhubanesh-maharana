import classNames from "classnames";
import { AddCircle } from "neetoicons";
import { Button, NoData, Typography } from "neetoui";
import { isEmpty } from "ramda";
import { Trans } from "react-i18next";

import Tasks from "./Tasks";

const Columns = ({ taskColumnName, tasks }) => (
  <div className="kanban-column-height flex w-80  flex-col gap-6 rounded-md border-2 border-black bg-gray-100 px-8 pb-2 pt-8">
    <Typography style="h2" weight="semibold">
      <Trans i18nKey={`kanban.${taskColumnName}`} />
    </Typography>
    <div
      className={classNames(
        "w-72 flex-grow rounded ",
        taskColumnName === "done" && "line-through"
      )}
    >
      {isEmpty(tasks) ? (
        <NoData title="no tasks are there " />
      ) : (
        tasks.map((task, index) => (
          <Tasks key={task.id} {...task} index={index} />
        ))
      )}
    </div>
    <div className="mt-auto self-center">
      <Button
        icon={AddCircle}
        iconPosition="left"
        label="Add New Task"
        style="text"
      />
    </div>
  </div>
);

export default Columns;
