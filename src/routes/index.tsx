import { createBrowserRouter } from "react-router-dom";
import { Home, Login, Photos, Satellites } from "../pages";
import { Asteroids } from "../pages/Asteroids";
import { routes } from "./routes";

export const router = createBrowserRouter([
  {
    path: routes.LOGIN,
    element: <Login />,
  },
  {
    path: routes.PRINCIPAL,
    element: <Home />,
    children: [
      {
        path: routes.PHOTOS,
        element: <Photos />,
      },
      {
        path: routes.SATELLITES,
        element: <Satellites />,
      },
      {
        path: routes.ASTEROIDS,
        element: <Asteroids />,
      },
    ],
  },
]);
