export default function Log({ gameLogs }) {
  return (
    <ol id="log">
      {gameLogs.map((gameLog) => {
        const { cell, player } = gameLog;
        const { row, col } = cell;
        return(
        <li key={`${row} ${col}`}>
          {player} selected {row}, {col}
        </li>);
      })}
    </ol>
  );
}
