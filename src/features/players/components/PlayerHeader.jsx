const PlayerHeader = ({ player }) => (
  <div className="relative bg-gray-900 mb-8 rounded-b-xl shadow-2xl overflow-hidden">
    {/* Banner Background */}
    <div className="h-48 md:h-64 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 opacity-90 relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-black opacity-20"></div>
    </div>

    {/* Content Container */}
    <div className="relative px-4 md:px-8 pb-6">
      {/* Player Info Section - positioned over the banner */}
      <div className="flex flex-col md:flex-row items-start md:items-end gap-4 md:gap-6 -mt-16 md:-mt-24">
        {/* Player Image */}
        <div className="flex-shrink-0">
          <div className="w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full ring-4 ring-gray-900 shadow-2xl flex items-center justify-center text-6xl md:text-8xl text-white font-bold">
            {player.name ? player.name.charAt(0).toUpperCase() : "?"}
          </div>
        </div>

        {/* Player Details */}
        <div className="flex-1 pb-2 md:pb-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight truncate">
            {player.name || "Unknown Player"}
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-2xl md:text-3xl font-bold text-blue-400">
              #{player.number || "0"}
            </span>
            <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm md:text-base font-semibold">
              {player.position || "N/A"}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-700">
        <div className="flex flex-col">
          <span className="text-gray-400 text-xs md:text-sm font-medium uppercase tracking-wide">
            Club
          </span>
          <span className="text-white text-base md:text-lg font-semibold mt-1">
            {player.clubName || "N/A"}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-gray-400 text-xs md:text-sm font-medium uppercase tracking-wide">
            Age
          </span>
          <span className="text-white text-base md:text-lg font-semibold mt-1">
            {player.age || "N/A"}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-gray-400 text-xs md:text-sm font-medium uppercase tracking-wide">
            Height
          </span>
          <span className="text-white text-base md:text-lg font-semibold mt-1">
            {player.height ? `${player.height} cm` : "N/A"}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-gray-400 text-xs md:text-sm font-medium uppercase tracking-wide">
            Nationality
          </span>
          <span className="text-white text-base md:text-lg font-semibold mt-1">
            {player.nationality || "N/A"}
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default PlayerHeader;