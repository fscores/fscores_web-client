import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { loadPlayers } from "../slice";
import PlayerCard from "../components/PlayerCard";
import LoadingBox from "@/components/LoadingBox";

const PlayerList = () => {
  const dispatch = useAppDispatch();
  const { list, loading } = useAppSelector((state) => state.players);

  useEffect(() => {
    dispatch(loadPlayers());
  }, [dispatch]);

  if (loading) return <LoadingBox />;

  return (
    <div>
      <h2>Players</h2>
      <ul>
        {list.map((p) => (
          <PlayerCard key={p.id} player={p} />
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
