const PlayerCard = ({ player }) => {
  return (
    <li className="flex justify-between hover:bg-gray-700 rounded-lg mx-2">
      <div className="flex items-center gap-4 p-4">
        <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <svg
            className="absolute w-12 h-12 text-gray-400 -left-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <div>
          <h2 className="text-white text-lg font-semibold">
            {player.firstName} {player.lastName}
          </h2>
          <p className="text-white text-sm">
            {player.position}
          </p>
        </div>  
      </div>
      <div className="flex items-center gap-4 p-4">
        <p className="text-white">{player.nationality}</p>
      </div>
    </li>
  );
};

export default PlayerCard;
