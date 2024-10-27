"use client"

import Menu from "/src/components/Menu";
import Tetris from "/src/components/Tetris";
import GameOver from "./GameOver";
import PlayerSetup from "./PlayerSetup";

import { useGameOver } from "/src/hooks/useGameOver";

const Game = ({ rows, columns }) => {
  const [gameOver, setGameOver, resetGameOver, startGame, setStartGame] = useGameOver();

  const restart = () => resetGameOver();

  return (
    <div className="Game">
      {startGame ? (
        <PlayerSetup onStartGame={restart} />
      ) : gameOver ? (
        <GameOver onRestart={restart} />
      ) : (
        <Tetris rows={rows} columns={columns} setGameOver={setGameOver} setStartGame={setStartGame} />
      )}
    </div>
  );
};

export default Game;
