const StatCard = ({ title, value, color }) => (
  <div
    className={`bg-gray-800 p-5 rounded-xl shadow-lg border-t-4 ${color} transition-transform hover:scale-[1.02] duration-300`}
  >
    <p className="text-3xl font-bold text-white leading-none">{value}</p>
    <p className="text-sm text-gray-400 mt-1">{title} (Season)</p>
  </div>
);

export default StatCard;