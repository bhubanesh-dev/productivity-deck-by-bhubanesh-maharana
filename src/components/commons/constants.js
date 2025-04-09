import { Articles, Globe, TimeTracking } from "neetoicons";
import { routes } from "routes";

export const NAVIGATION_ROUTES = [
  { path: routes.kanban, icon: Articles },
  { path: routes.pomodoro, icon: TimeTracking },
  { path: routes.news, icon: Globe },
];
