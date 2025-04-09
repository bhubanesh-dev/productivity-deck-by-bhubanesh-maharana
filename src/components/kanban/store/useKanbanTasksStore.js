import { remove, insert, uniqBy, path, assocPath, clone } from "ramda";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useKanbanTasksStore = create(
  persist(
    (set, get) => ({
      tasks: {
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
          { id: 7, taskName: "Item 8" },
        ],
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
    }),
    {
      name: "Kanban_Tasks",
    }
  )
);

export default useKanbanTasksStore;
