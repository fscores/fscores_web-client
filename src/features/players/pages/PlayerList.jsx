import { useEffect, useState } from "react";
import { TrophyIcon } from "@heroicons/react/24/outline";

import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { loadPlayers } from "../slice";
import ErrorBox from "@/components/ErrorBox";
import LoadingBox from "@/components/LoadingBox";
import Pagination from "@/components/Pagination";
import PlayerCard from "@/features/players/components/PlayerCard";

var searchOptions = {};

const PlayerList = () => {
  const dispatch = useAppDispatch();
  const { list, metadata, loading, error } = useAppSelector(
    (state) => state.players
  );

  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState("id");
  const [searchText, setSearchText] = useState("");
  const [lowerAge, setLowerAge] = useState(0);
  const [upperAge, setUpperAge] = useState(100);

  useEffect(() => {
    dispatch(
      loadPlayers({ searchOptions, pageNo: pageNo - 1, pageSize, sortBy })
    );
  }, [dispatch, pageNo, pageSize, sortBy]);

  const handleSearch = (e) => {
    e.preventDefault();
    searchOptions = {
      ...searchOptions,
      nameContains: searchText.trim(),
      upperAge,
      lowerAge,
    }; // update search option
    setPageNo(1); // reset to first page
    dispatch(loadPlayers({ searchOptions, pageNo: 0, pageSize, sortBy }));
  };

  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <ErrorBox error={error} />
      ) : list.length === 0 ? (
        <p>No players found.</p>
      ) : (
        <>
          <ul>
            {list.map((p) => (
              <PlayerCard key={p.id} player={p} />
            ))}
          </ul>
          {metadata && (
            <Pagination
              metadata={metadata}
              handlePageChange={setPageNo}
              currentPageNo={pageNo}
            />
          )}
        </>
      )}
    </div>
  );
};

export default PlayerList;
