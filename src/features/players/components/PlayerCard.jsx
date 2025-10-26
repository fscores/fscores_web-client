const PlayerCard = ({ player }) => {
  return (
    <li key={player.id} className="flex justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4">
        <img
          alt=""
          src="https://www.svgrepo.com/show/452030/avatar-default.svg"
          className="size-12 flex-none rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
        />
        <div className="min-w-0 flex-auto">
          <p className="text-sm/6 font-semibold text-white">
            {player.firstName} {player.lastName}
          </p>
          <p className="mt-1 truncate text-xs/5 text-gray-400">
            {player.position}
          </p>
        </div>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p className="text-sm/6 text-white">{player.nationality}</p>
        <div className="mt-1 flex items-center gap-x-1.5">
          <div className="flex-none rounded-full bg-emerald-500/30 p-1">
            <div className="size-1.5 rounded-full bg-emerald-500" />
          </div>
          <p className="text-xs/5 text-gray-400">Active</p>
        </div>
      </div>
    </li>
  );
};

export default PlayerCard;
