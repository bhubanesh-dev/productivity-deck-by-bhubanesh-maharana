import { Draggable } from "@hello-pangea/dnd";
import classNames from "classnames";
import { Delete } from "neetoicons";
import { Button, Typography } from "neetoui";

const Task = ({ task: { id, taskName }, taskColumnName, index }) => (
  <Draggable draggableId={id.toString()} index={index}>
    {provided => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className={classNames(
          " group my-2 flex  w-5/6 flex-row items-center justify-between rounded bg-gray-50 p-2 shadow",
          taskColumnName === "done" && "line-through"
        )}
      >
        <Typography style="body1">{taskName}</Typography>
        <Button
          className="text-red-500  opacity-0 group-hover:opacity-100"
          icon={Delete}
          style="text"
        />
      </div>
    )}
  </Draggable>
);

export default Task;
