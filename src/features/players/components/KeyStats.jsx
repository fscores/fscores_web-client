import StatCard from "./StatCard";

const KeyStats = ({ stats }) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-4 md:px-8">
    <StatCard title="Goals" value={stats.goals || 0} color="border-sky-500" />
    <StatCard
      title="Assists"
      value={stats.assists || 0}
      color="border-teal-500"
    />
    <StatCard
      title="Rating"
      value={stats.rating ? stats.rating.toFixed(1) : "N/A"}
      color="border-yellow-500"
    />
    <StatCard
      title="Matches"
      value={stats.matches || 0}
      color="border-red-500"
    />
  </div>
);

export default KeyStats;