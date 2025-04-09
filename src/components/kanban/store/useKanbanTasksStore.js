import { create } from "zustand";
import { persist } from "zustand/middleware";

const useKanbanTasksStore = create(
  persist(
    () => ({
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
    }),
    {
      name: "Kanban_Tasks",
    }
  )
);

export default useKanbanTasksStore;
