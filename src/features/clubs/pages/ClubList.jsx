// ClubList.jsx (or .js)
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { loadClubs } from "../slice";

const defaultSearchOptions = {
  nameContains: ""
};

const ClubList = () => {
  const dispatch = useAppDispatch();
  const { list, metadata, loading, error } = useAppSelector(
    (state) => state.clubs
  );

  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState("id");
  const [searchText, setSearchText] = useState("");
  const [appliedSearchOptions, setAppliedSearchOptions] =
      useState(defaultSearchOptions);

  useEffect(() => {
    dispatch(
      loadClubs({
        searchOptions: appliedSearchOptions,
        pageNo: pageNo,
        pageSize,
        sortBy,
      })
    );
  }, [dispatch, appliedSearchOptions, pageNo, pageSize, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900 min-h-screen">
      <h2 className="text-5xl font-extrabold text-white text-center mb-12 tracking-tight">
        Football Clubs
      </h2>

      {/* Optional simple search (client-side filter) */}
      <div className="max-w-xl mx-auto mb-10">
        <input
          type="text"
          placeholder="Search clubs..."
          className="w-full px-6 py-4 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500 transition"
          onChange={(e) => {
            const term = e.target.value.toLowerCase();
            document.querySelectorAll(".club-card").forEach((card) => {
              const name = card.querySelector("h3").textContent.toLowerCase();
              card.style.display = name.includes(term) ? "block" : "none";
            });
          }}
        />
      </div>

      {/* Clubs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {list.map((club) => (
          <Link
            key={club.id}
            to={`/clubs/${club.id}`}
            className="club-card group block bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:ring-4 hover:ring-blue-500 transition-all duration-300 transform hover:-translate-y-2"
          >
            {/* Logo / Fallback */}
            <div className="h-48 bg-gray-900 flex items-center justify-center p-6">
              {club.avatarUrl ? (
                <img
                  src={club.avatarUrl}
                  alt={club.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="text-6xl font-bold text-gray-700">
                  {club.name}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-5 text-center bg-gray-850">
              <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition">
                {club.name}
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                {club.foundedYear ? `Founded: ${club.foundedYear}` : "Founded year N/A"}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-16 text-gray-500">
        <p>Total clubs: {list.length}</p>
      </div>
    </div>
  );
};

export default ClubList;
