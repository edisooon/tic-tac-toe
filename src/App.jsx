import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const INITIAL_PLAYER = {
  'X': "Player 1",
  "O": "Player 2",
}

function deriveCurPlayer(gameLogs) {
  let curPlayer = "X";
  if (gameLogs.length > 0 && gameLogs[0].player === "X") curPlayer = "O";
  return curPlayer;
}

function deriveGameBoard(gameLogs) {
  let gameBoard = INITIAL_GAME_BOARD.map((row) => [...row]);
  for (const gameLog of gameLogs) {
    const { cell, player } = gameLog;
    const { row, col } = cell;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner = null;
  for (const comb of WINNING_COMBINATIONS) {
    const firstCell = gameBoard[comb[0].row][comb[0].column];
    const secondCell = gameBoard[comb[1].row][comb[1].column];
    const thirdCell = gameBoard[comb[2].row][comb[2].column];
    if (firstCell && firstCell === secondCell && firstCell === thirdCell) {
      winner = players[firstCell];
    }
  }
  return winner;
}

function App() {
  const [gameLogs, setGameLogs] = useState([]);
  const [players, setPlayers] = useState(INITIAL_PLAYER);

  const curPlayer = deriveCurPlayer(gameLogs);
  const gameBoard = deriveGameBoard(gameLogs);
  const winner = deriveWinner(gameBoard, players);

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
          <Player name={players['X']} symbol="X" isActive={curPlayer === "X"} />
          <Player name={players['O']} symbol="O" isActive={curPlayer === "O"} />
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
