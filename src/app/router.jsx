import { createBrowserRouter } from "react-router-dom";

import App from "../App.jsx";
import { PlayerDetail, PlayerList } from "../features/players";
import { ClubDetail, ClubList } from "../features/clubs";
import { Home } from "../features/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        children: [
          { index: true, element: <Home /> },
        ],
      },
      {
        path: "players",
        children: [
          { index: true, element: <PlayerList /> },
          { path: ":id", element: <PlayerDetail /> },
        ],
      },
      {
        path: "clubs",
        children: [
          { index: true, element: <ClubList /> },
          { path: ":id", element: <ClubDetail /> },
        ],
      }
    ],
  },
]);

export default router;