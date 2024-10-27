// import React from "react";
// import "./GameOver.css"

// const GameOver = ({ onRestart }) => {
//   return (
//     <div className="Menu">
//         <h1 className="gameover-header">Game Over</h1>
//         <p className="gameover-title">Better luck next time!</p>
//         <button className="Button" onClick={onRestart}>
//             Play Again
//         </button>
//     </div>
//   );
// };

// export default GameOver;


import React from "react";
import "./GameOver.css";

const GameOver = ({ onRestart, winner }) => {
  // Retrieve both player secrets from localStorage
  const player1Secret = localStorage.getItem("player1Secret");
  const player2Secret = localStorage.getItem("player2Secret");

  // Determine the message to display
  const isWinner = winner === "player1";
  const winMessage = isWinner ? "You Won!" : "You Lost";
  const lostSecret = isWinner ? player2Secret : player1Secret; // Secret of the losing player

  return (
    <div className="Menu">
      <h1 className="gameover-header">Game Over</h1>
      <p className="gameover-title">{winMessage}</p>
      <p className="gameover-secret">Lost Player's Secret: {lostSecret}</p>
      <button className="Button" onClick={onRestart}>
        Play Again
      </button>
    </div>
  );
};

export default GameOver;
