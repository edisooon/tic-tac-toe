import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivedCurPlayer(gameLogs) {
  let curPlayer = "X";
  if (gameLogs.length > 0 && gameLogs[0].player === "X") curPlayer = "O";
  return curPlayer;
}

function App() {
  const [gameLogs, setGameLogs] = useState([]);

  const curPlayer = derivedCurPlayer(gameLogs);

  let gameBoard = initialGameBoard;
  for (const gameLog of gameLogs) {
    const { cell, player } = gameLog;
    const { row, col } = cell;
    gameBoard[row][col] = player;
  }

  let winner = null;
  for (const comb of WINNING_COMBINATIONS) {
    const firstCell = gameBoard[comb[0].row][comb[0].column];
    const secondCell = gameBoard[comb[1].row][comb[1].column];
    const thirdCell = gameBoard[comb[2].row][comb[2].column];
    if (firstCell && firstCell === secondCell && firstCell === thirdCell) {
      winner = firstCell;
    }
  }

  function handleCellSelected(row, col) {
    setGameLogs((gameLogs) => {
      let curPlayer = derivedCurPlayer(gameLogs);
      const newGameLogs = [
        { cell: { row: row, col: col }, player: curPlayer },
        ...gameLogs,
      ];
      return newGameLogs;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={curPlayer === "X"} />
          <Player name="Player 2" symbol="O" isActive={curPlayer === "O"} />
        </ol>
        <GameBoard onCellSelected={handleCellSelected} gameBoard={gameBoard} />
        <p>{winner}</p>
      </div>
      <Log gameLogs={gameLogs} />
    </main>
  );
}

export default App;
