import { useEffect, useState } from "react";
import { TrophyIcon } from "@heroicons/react/24/outline";

import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { loadPlayers } from "../slice";
import ErrorBox from "@/components/ErrorBox";
import LoadingBox from "@/components/LoadingBox";
import Pagination from "@/components/Pagination";
import PlayerCard from "@/features/players/components/PlayerCard";

var searchOptions = {};

const positions = [
  "Goalkeeper",
  "Center Back",
  "Right Back",
  "Left Back",
  "Right Wing Back",
  "Left Wing Back",
  "Central Defensive Midfielder",
  "Central Midfielder",
  "Central Attacking Midfielder",
  "Right Midfielder",
  "Left Midfielder",
  "Right Winger",
  "Left Winger",
  "Center Forward",
  "Striker",
];

const PlayerList = () => {
  const dispatch = useAppDispatch();
  const { list, metadata, loading, error } = useAppSelector(
    (state) => state.players
  );

  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState("id");
  const [searchText, setSearchText] = useState("");
  const [lowerAge, setLowerAge] = useState(0);
  const [upperAge, setUpperAge] = useState(100);
  const [selectedPositions, setSelectedPositions] = useState([]); // Updated to handle multiple positions

  useEffect(() => {
    dispatch(loadPlayers({ searchOptions, pageNo: pageNo, pageSize, sortBy }));
  }, [dispatch, pageNo, pageSize, sortBy]);

  const handleSearch = (e) => {
    e.preventDefault();
    searchOptions = {
      ...searchOptions,
      nameContains: searchText.trim(),
      upperAge,
      lowerAge,
      positions: selectedPositions, // Send positions as an array
    };
    dispatch(loadPlayers({ searchOptions, pageNo: 0, pageSize, sortBy }));
  };

  const handlePositionChange = (e) => {
    const value = e.target.value;

    if (value === "all") {
      // If "-- All Positions --" is selected, reset to an empty array
      setSelectedPositions([]);
    } else {
      setSelectedPositions((prev) => {
        // If any other option is selected, remove "all" and toggle the selected option
        const updated = prev.includes(value)
          ? prev.filter((pos) => pos !== value) // Remove if already selected
          : [...prev.filter((pos) => pos !== "all"), value]; // Add if not selected and remove "all"
        return updated;
      });
    }
  };

  return (
    <div>
      <div className="mx-2">
        <form className="flex flex-col space-y-4 mx-auto">
          {/* Search Input */}
          <div className="relative w-full">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm2.522 17.618a3.154 3.154 0 0 1-2.903-3.018l2.645-5.184 2.872 5.566a3.296 3.296 0 0 1-2.614 2.636ZM17.147 14.665a3.12 3.12 0 0 1-2.625-2.63l-2.735-5.32 5.362-2.716a10.038 10.038 0 0 1 .498 7.359ZM6.9 11.231l2.748 5.353a3.177 3.177 0 0 1-2.522-2.673l-.226-2.68ZM1.853 14.665a10.038 10.038 0 0 1 .498-7.359l5.362 2.716-2.735 5.32a3.12 3.12 0 0 1-2.625 2.63ZM10 2.052a3.154 3.154 0 0 1 2.903 3.018L10 10.254 7.097 5.07A3.154 3.154 0 0 1 10 2.052Z" />
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Insert player name..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          {/* Min Age, Max Age, and Position */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <label
                htmlFor="min-age"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Min Age
              </label>
              <input
                type="number"
                id="min-age"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-md font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                min="0"
                value={lowerAge}
                onChange={(e) => setLowerAge(Number(e.target.value))}
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="max-age"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Max Age
              </label>
              <input
                type="number"
                id="max-age"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-md font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                max="100"
                value={upperAge}
                onChange={(e) => setUpperAge(Number(e.target.value))}
              />
            </div>
            <div className="flex-4">
              <label
                htmlFor="position"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Position
              </label>
              <select
                id="position"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-md font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-40 overflow-y-auto"
                multiple
                value={selectedPositions}
                onChange={handlePositionChange}
              >
                <option
                  value="all"
                  className="p-2 hover:bg-blue-100 dark:hover:bg-blue-600 dark:hover:text-white"
                >
                  -- All Positions --
                </option>
                {positions.map((pos) => (
                  <option
                    key={pos}
                    value={pos}
                    className="p-2 hover:bg-blue-100 dark:hover:bg-blue-600 dark:hover:text-white"
                  >
                    {pos}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="text-md p-2.5 font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <p>Apply filters</p>
          </button>
        </form>
      </div>

      {/* Player List */}
      <div className="my-4 min-h-[600px]">
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

      {/* Pagination */}
      {metadata && (
        <div className="my-4 flex items-center justify-between space-x-4 mx-2">
          <p className="text-white">
            Showing {pageNo * 10 + 1} to{" "}
            {(pageNo + 1) * 10 > metadata.totalElements
              ? metadata.totalElements
              : (pageNo + 1) * 10}{" "}
            of total {metadata.totalElements}
          </p>
          <Pagination
            metadata={metadata}
            handlePageChange={setPageNo}
            currentPageNo={pageNo}
          />
        </div>
      )}
    </div>
  );
};

export default PlayerList;
