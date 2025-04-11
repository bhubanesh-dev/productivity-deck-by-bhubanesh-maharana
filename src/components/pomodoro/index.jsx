import { Typography } from "neetoui";
import { withT } from "utils/withT";

import Container from "./Container";

const Pomodoro = ({ t }) => (
  <main className="container-width h-screen overflow-hidden px-16 py-8">
    <Typography style="h1" weight="bold">
      {t("pomodoro.heading")}
    </Typography>
    <Container />
  </main>
);

export default withT(Pomodoro);
