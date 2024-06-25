import { EasyMode, HardMode, MidMode, PageNotFound } from "../pages";
import Welcome from "../pages/Welcome";
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
