const PlayerHistory = ({ history }) => (
  <div className="bg-gray-800 p-6 rounded-xl shadow-lg mt-8 mx-4 md:mx-8">
    <h3 className="text-2xl font-semibold text-white mb-4 border-b border-gray-700 pb-2">
      Career History
    </h3>

    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left text-gray-400">
        <thead className="text-xs text-gray-200 uppercase bg-gray-700">
          <tr>
            <th scope="col" className="py-3 px-6">
              Season
            </th>
            <th scope="col" className="py-3 px-6">
              Team
            </th>
            <th scope="col" className="py-3 px-6">
              Goals
            </th>
            <th scope="col" className="py-3 px-6">
              Assists
            </th>
            <th scope="col" className="py-3 px-6">
              Matches
            </th>
          </tr>
        </thead>
        <tbody>
          {history.map((h, index) => (
            <tr
              key={index}
              className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700 transition duration-150"
            >
              <td className="py-4 px-6 font-medium text-white">{h.season}</td>
              <td className="py-4 px-6">{h.team}</td>
              <td className="py-4 px-6 text-sky-400">{h.goals}</td>
              <td className="py-4 px-6 text-teal-400">{h.assists}</td>
              <td className="py-4 px-6">{h.matches}</td>
            </tr>
          ))}
          {history.length === 0 && (
            <tr className="bg-gray-800">
              <td colSpan="5" className="py-4 px-6 text-center">
                No historical data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default PlayerHistory;