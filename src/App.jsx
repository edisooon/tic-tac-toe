import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import {useState} from "react";

function derivedCurPlayer(gameLogs) {
  let curPlayer = 'X';
  if(gameLogs.length>0 && gameLogs[0].player==='X')  curPlayer = 'O';
  return curPlayer;
}

function App() {
  const [gameLogs, setGameLogs] = useState([]);

  const curPlayer = derivedCurPlayer(gameLogs);

  function handleCellSelected(row, col) {
    setGameLogs((gameLogs)=>{
      let curPlayer = derivedCurPlayer(gameLogs)
      const newGameLogs = [{cell: {row: row, col: col}, player: curPlayer}, ...gameLogs];
      return newGameLogs;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={curPlayer==='X'}/>
          <Player name="Player 2" symbol="O" isActive={curPlayer==='O'}/>
        </ol>
        <GameBoard onCellSelected={handleCellSelected} gameLogs={gameLogs} />
      </div>
      <Log gameLogs={gameLogs}/>
    </main>
  );
}

export default App
