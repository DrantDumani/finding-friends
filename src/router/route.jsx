import { Root } from "../pages/Root/Root";
import { About } from "../pages/About/About";
import { Game } from "../pages/Game/Game";
import { Home } from "../pages/Home/Home";
import { Leaderboards } from "../pages/Leaderboards/Leaderboards";
import { Error } from "../pages/Error/Error";

export const routes = [
  {
    element: <Root />,
    path: "/",
    errorElement: <Error />,
    children: [
      {
        errorElement: <Error />,
        children: [
          {
            element: <Home />,
            index: true,
          },
          {
            element: <About />,
            path: "about",
          },
          {
            element: <Game />,
            path: "game/:gameId",
          },
          {
            element: <Leaderboards />,
            path: "leaderboards",
          },
        ],
      },
    ],
  },
];
