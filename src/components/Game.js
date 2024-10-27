"use client"

import "./Game.css";

import Tetris from "/src/components/Tetris";
import GameOver from "./GameOver";
import PlayerSetup from "./PlayerSetup";

import { useGameOver } from "/src/hooks/useGameOver";

const Game = ({ rows, columns }) => {
  const [gameOver, setGameOver, resetGameOver, startGame, setStartGame, resetStartGame] = useGameOver();

  const restart = () => resetGameOver();
  const playAgain = () => resetStartGame();

  return (
    <div className="Game">
      {startGame ? (
        <PlayerSetup onStartGame={restart} />
      ) : gameOver.status ? (
        <GameOver onRestart={playAgain} win={gameOver.win} />
      ) : (
        <div className="GameBoard">
          <Tetris rows={rows} columns={columns} setGameOver={setGameOver} setStartGame={setStartGame} />
        </div>
      )}
    </div>
  );
};

export default Game;
