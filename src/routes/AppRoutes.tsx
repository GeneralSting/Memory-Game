import { EasyMode, HardMode, MidMode, PageNotFound, Welcome } from "../pages";
import { AppRoute } from "./AppRoute";

const appRoutes: AppRoute[] = [
  {
    path: "easy",
    element: <EasyMode />,
  },
  {
    path: "mid",
    element: <MidMode />,
  },
  {
    path: "hard",
    element: <HardMode />,
  },
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
];

export default appRoutes;
