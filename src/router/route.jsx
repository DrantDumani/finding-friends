import { Root } from "../pages/Root/Root";
import { About } from "../pages/About/About";
import { Game } from "../pages/Game/Game";
import { GameInstance } from "../pages/GameInstance/GameInstance";
import { Home } from "../pages/Home/Home";
import { Leaderboards } from "../pages/Leaderboards/Leaderboards";
import { Error } from "../pages/Error/Error";
import { LeaderboardSelector } from "../pages/LeaderboardSelector/LeaderboardSelector";
import {
  getThumbnails,
  getGameData,
  getGameInstance,
  getScores,
} from "../modules/loaders";
import { createInstance, gameInstanceAction } from "../modules/actions";

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
            loader: getThumbnails,
            index: true,
          },
          {
            element: <About />,
            path: "about",
          },
          {
            element: <Game />,
            path: "game/:gameId",
            loader: getGameData,
            action: createInstance,
          },
          {
            path: "gameInstance/:gameId",
            element: <GameInstance />,
            loader: getGameInstance,
            action: gameInstanceAction,
          },
          {
            element: <LeaderboardSelector />,
            path: "leaderboards",
            loader: getThumbnails,
            shouldRevalidate: ({ currentUrl }) => {
              return currentUrl.pathname.split("/")[1] !== "leaderboards";
            },
            children: [
              {
                path: ":gameId",
                element: <Leaderboards />,
                loader: getScores,
              },
            ],
          },
        ],
      },
    ],
  },
];
