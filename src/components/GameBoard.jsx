import {useState} from 'react';

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({onChangePlayer, curPlayer}) {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  function handleCellSelected(rowIndex, colIndex) {
    setGameBoard((prevGameBoard) => {
      const newGameBoard = prevGameBoard.map((row)=>row.slice());
      newGameBoard[rowIndex][colIndex] = curPlayer;
      return newGameBoard;
    });
    onChangePlayer();
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={()=>handleCellSelected(rowIndex, colIndex)}>{playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
