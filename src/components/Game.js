"use client"

import Menu from "/src/components/Menu";
import Tetris from "/src/components/Tetris";
import GameOver from "./GameOver";

import { useGameOver } from "/src/hooks/useGameOver";

const Game = ({ rows, columns }) => {
  const [gameOver, setGameOver, resetGameOver, startGame, setStartGame] = useGameOver();

  const start = () => resetGameOver();

  return (
    <div className="Game">
      {startGame ? (
        <Menu onClick={start} />
      ) : gameOver ? (
        <GameOver onRestart={start} />
      ) : (
        <Tetris rows={rows} columns={columns} setGameOver={setGameOver} setStartGame={setStartGame} />
      )}
      {/* {gameOver ? (
        <Menu onClick={start} />
      ) : (
        <Tetris rows={rows} columns={columns} setGameOver={setGameOver} />
      )} */}
    </div>
  );
};

export default Game;
