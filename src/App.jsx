import { PageNotFound, Sidebar } from "components/commons";
import Kanban from "components/kanban";
import News from "components/news";
import Pomodoro from "components/pomodoro";
import { Redirect, Route, Switch } from "react-router-dom/cjs/react-router-dom";
import { routes } from "routes";

import "./App.css";

const App = () => (
  <main className="flex h-screen w-full flex-row bg-gray-50">
    <Sidebar />
    <Switch>
      <Route exact component={Kanban} path={routes.kanban} />
      <Route exact component={Pomodoro} path={routes.pomodoro} />
      <Route exact component={News} path={routes.news} />
      <Redirect exact from={routes.root} to={routes.kanban} />
      <Route component={PageNotFound} path="*" />
    </Switch>
  </main>
);

export default App;
