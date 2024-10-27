import { useState, useCallback } from "react";

export const useGameOver = () => {
  const [gameOver, setGameOver] = useState(true);
  const [startGame, setStartGame] = useState(true);

  const resetGameOver = useCallback(() => {
    setGameOver(false);
    setStartGame(false);
  }, []);

  const resetStartGame = useCallback(() => {
    setStartGame(true);
    setGameOver(false);
  }, []);

  return [gameOver, setGameOver, resetGameOver, startGame, setStartGame, resetStartGame];
};
