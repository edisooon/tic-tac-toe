import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import {useState} from "react";

function App() {
  const [curPlayer, setCurPlayer] = useState('X');

  function handleChangePlayer() {
    setCurPlayer((prevPlayer)=>curPlayer==='X'?'O':'X');
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={curPlayer==='X'}/>
          <Player name="Player 2" symbol="O" isActive={curPlayer==='O'}/>
        </ol>
        <GameBoard onChangePlayer={handleChangePlayer} curPlayer={curPlayer}/>
      </div>
    </main>
  );
}

export default App
