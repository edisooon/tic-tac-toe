import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import {useState} from "react";

function App() {
  const [curPlayer, setCurPlayer] = useState('X');
  const [gameLogs, setGameLogs] = useState([]);

  function handleCellSelected(row, col) {
    setCurPlayer((curPlayer)=>curPlayer==='X'?'O':'X');
    setGameLogs((gameLogs)=>{
      let curPlayer = 'X';
      if(gameLogs.length>0 && gameLogs[0].player==='X') {
        curPlayer = 'O';
      }
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
        <GameBoard onCellSelected={handleCellSelected} gameLogs={gameLogs}/>
      </div>
    </main>
  );
}

export default App
