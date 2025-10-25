import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import { PlayerDetail, PlayerList } from "../features/players";
import { ClubDetail, ClubList } from "../features/clubs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
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