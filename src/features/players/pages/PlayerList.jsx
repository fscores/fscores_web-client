import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { loadPlayers } from "../slice";
import PlayerCard from "../components/PlayerCard";
import LoadingBox from "@/components/LoadingBox";
import Pagination from "@/components/Pagination";

const PlayerList = () => {
  const dispatch = useAppDispatch();
  const { list, metadata, loading } = useAppSelector((state) => state.players);

  useEffect(() => {
    dispatch(loadPlayers());
  }, [dispatch]);

  if (loading) return <LoadingBox />;

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <h2>Players</h2>
      <ul>
        {list.map((p) => (
          <PlayerCard key={p.id} player={p} />
        ))}
      </ul>
      <Pagination metadata={metadata} />
    </div>
  );
};

export default PlayerList;
