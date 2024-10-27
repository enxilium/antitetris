import React from "react";
import "./GameOver.css"

const GameOver = ({ onRestart }) => {
  return (
    <div className="Menu">
        <h1 className="gameover-header">Game Over</h1>
        <p className="gameover-title">Better luck next time!</p>
        <button className="Button" onClick={onRestart}>
            Play Again
        </button>
    </div>
  );
};

export default GameOver;
