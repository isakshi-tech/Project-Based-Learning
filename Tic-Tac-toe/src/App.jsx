import "./newStyle.css";
import { useState } from "react";

function Square({ value, onSquareClick }) {
  let symbolClass = "";

  if (value === "X") symbolClass = "square-x";
  if (value === "O") symbolClass = "square-o";
  return (
    <button className={`square ${symbolClass}`} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ nextMove, onplay, squares }) {
  // const [squares, setSquares] = useState(Array(9).fill(null));
  console.log(squares);

  function handleClick(i) {
    if (squares[i] || CalculateWinner(squares)) {
      return;
    }
    const nextSqaures = squares.slice();
    if (nextMove) {
      nextSqaures[i] = "X";
    } else {
      nextSqaures[i] = "O";
    }
    onplay(nextSqaures);
  } // console.log(squares);

  const winner = CalculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner is " + winner;
  } else {
    status = "next player " + (nextMove ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
//0 1 2
//3 4 5
//6 7 8
function CalculateWinner(squares) {
  let lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] == squares[c]) {
      return squares[a];
    }
  }
  return null; // why here and not after if : we need to check all the conditions for the rules.
}

function Game() {
  const [currentMove, setCurrentMove] = useState(0);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const nextMove = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);//for next render
    setCurrentMove(nextHistory.length - 1);//history has not updated yet. 
  }

  function jumpTo(nMove) {
    setCurrentMove(nMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "go to move " + move;
    } else {
      description = "go to start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <h1 className="game-title">Tic Tac Toe Game</h1>

        <Board
          nextMove={nextMove}
          squares={currentSquares}
          onplay={handlePlay}
        />
      </div>
      <div className="game-info">
        <ul>{moves}</ul>
      </div>
    </div>
  );
}
function App() {
  return (
    <>
      <Game />
    </>
  );
}

export default App;

