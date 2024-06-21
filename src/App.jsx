import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveCurPlayer(gameLogs) {
  let curPlayer = "X";
  if (gameLogs.length > 0 && gameLogs[0].player === "X") curPlayer = "O";
  return curPlayer;
}

function deriveGameBoard(gameLogs) {
  let gameBoard = initialGameBoard.map((row) => [...row]);
  for (const gameLog of gameLogs) {
    const { cell, player } = gameLog;
    const { row, col } = cell;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard) {
  let winner = null;
  for (const comb of WINNING_COMBINATIONS) {
    const firstCell = gameBoard[comb[0].row][comb[0].column];
    const secondCell = gameBoard[comb[1].row][comb[1].column];
    const thirdCell = gameBoard[comb[2].row][comb[2].column];
    if (firstCell && firstCell === secondCell && firstCell === thirdCell) {
      winner = firstCell;
    }
  }
  return winner;
}

function App() {
  const [gameLogs, setGameLogs] = useState([]);
  // const [players, setPlayers] = useState();

  const curPlayer = deriveCurPlayer(gameLogs);
  const gameBoard = deriveGameBoard(gameLogs);
  const winner = deriveWinner(gameBoard);

  const isDraw = gameLogs.length === 9 && !winner;

  function handleCellSelected(row, col) {
    setGameLogs((gameLogs) => {
      let curPlayer = deriveCurPlayer(gameLogs);
      const newGameLogs = [
        { cell: { row: row, col: col }, player: curPlayer },
        ...gameLogs,
      ];
      return newGameLogs;
    });
  }

  function handleRestart() {
    setGameLogs([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={curPlayer === "X"} />
          <Player name="Player 2" symbol="O" isActive={curPlayer === "O"} />
        </ol>
        <GameBoard onCellSelected={handleCellSelected} gameBoard={gameBoard} />
        {(winner || isDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
      </div>
      <Log gameLogs={gameLogs} />
    </main>
  );
}

export default App;
