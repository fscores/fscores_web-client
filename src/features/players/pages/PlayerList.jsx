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
      loadPlayers({ searchOptions, pageNo: pageNo, pageSize, sortBy })
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
      <div class="mx-2">
        <form>
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Insert player name..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              onClick={handleSearch}
              class="text-white font-bold absolute end-2.5 bottom-2.5 text-sm px-8 py-2 bg-gray-600 hover:bg-gray-500 rounded-md"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="my-4">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <ErrorBox error={error} />
        ) : list.length === 0 ? (
          <p>No players found.</p>
        ) : (
          <>
            <ul className="grid md:grid-cols-2">
              {list.map((p) => (
                <PlayerCard key={p.id} player={p} />
              ))}
            </ul>
          </>
        )}
      </div>
      {metadata && (
        <Pagination
          metadata={metadata}
          handlePageChange={setPageNo}
          currentPageNo={pageNo}
        />
      )}
    </div>
  );
};

export default PlayerList;
