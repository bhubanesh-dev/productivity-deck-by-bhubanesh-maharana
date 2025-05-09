import dayjs from "dayjs";
import {
  remove,
  insert,
  uniqBy,
  path,
  assocPath,
  clone,
  reject,
  propEq,
  assoc,
  append,
} from "ramda";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useKanbanTasksStore = create(
  persist(
    (set, get) => ({
      tasks: {
        todo: [],
        inProgress: [],
        done: [],
      },
      onDragEnd: result => {
        const { source, destination } = result;
        if (!destination) return;

        if (
          source.droppableId === destination.droppableId &&
          source.index === destination.index
        ) {
          return;
        }

        const tasks = get().tasks;
        const sourceList = clone(tasks[source.droppableId]);
        const destList = clone(tasks[destination.droppableId]);
        const movedItem = path([source.index], sourceList);
        if (!movedItem) return;

        if (source.droppableId === destination.droppableId) {
          const withoutItem = remove(source.index, 1, sourceList);
          const reordered = insert(destination.index, movedItem, withoutItem);
          const uniqueList = uniqBy(item => item.id, reordered);

          set({
            tasks: assocPath([source.droppableId], uniqueList, tasks),
          });

          return;
        }

        const updatedSource = remove(source.index, 1, sourceList);
        const updatedDest = insert(destination.index, movedItem, destList);

        set({
          tasks: {
            ...tasks,
            [source.droppableId]: updatedSource,
            [destination.droppableId]: updatedDest,
          },
        });
      },
      addNewTasks: (taskColumnName, taskInput) => {
        const tasks = get().tasks;
        const newTask = {
          id: dayjs().format(),
          taskName: taskInput,
        };

        const updatedColumnTasks = append(newTask, tasks[taskColumnName]);
        const updatedTasks = assoc(taskColumnName, updatedColumnTasks, tasks);

        set({ tasks: updatedTasks });
      },
      deleteTasks: (taskColumnName, id) => {
        const tasks = get().tasks;
        const updatedColumn = reject(propEq(id, "id"), tasks[taskColumnName]);
        const updatedTasks = assoc(taskColumnName, updatedColumn, tasks);

        set({ tasks: updatedTasks });
      },
    }),
    {
      name: "Kanban_Tasks",
    }
  )
);

export default useKanbanTasksStore;
