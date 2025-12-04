import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { loadPlayerDetail, clearPlayerDetail } from "../slice";

import KeyStats from "../components/KeyStats";
import PlayerHeader from "../components/PlayerHeader";
import PlayerHistory from "../components/PlayerHistory";

const PlayerDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { detail: player, detailLoading: loading, detailError: error } = useAppSelector(
    (state) => state.players
  );

  useEffect(() => {
    if (id) {
      dispatch(loadPlayerDetail(id));
    }

    return () => {
      dispatch(clearPlayerDetail());
    };
  }, [id, dispatch]);

  // Render Statuses (Loading / Error)
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400"></div>
        <p className="mt-4 text-lg">Loading details for Player ID: {id}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-red-400 p-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl border-l-4 border-red-500">
          <h2 className="text-2xl font-bold mb-2">🚨 Data Error</h2>
          <p>Could not load player details: {error}</p>
          <p className="text-sm text-gray-500 mt-2">
            Please check the network connection or the Player ID.
          </p>
        </div>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8 flex items-center justify-center">
        <p>No player data loaded for ID: {id}.</p>
      </div>
    );
  }

  // Final Render (Data is available)
  return (
    <div className="min-h-screen bg-gray-900 pb-12">
      {/* 1. Profile Header */}
      <PlayerHeader player={player} />

      {/* 2. Key Statistics */}
      {/* <KeyStats stats={player.currentSeasonStats} /> */}

      {/* 3. Detailed History */}
      {/* <PlayerHistory history={player.careerHistory} /> */}
    </div>
  );
};

export default PlayerDetail;
