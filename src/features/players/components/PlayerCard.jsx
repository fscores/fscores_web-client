const PlayerCard = ({ player }) => {
  return (
    <li key={player.id}>
      <h2>{player.firstName} {player.lastName}</h2>
    </li>
  );
};

export default PlayerCard;
