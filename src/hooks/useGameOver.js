import { useState, useCallback } from "react";

export const useGameOver = () => {
  const [gameOver, setGameOver] = useState({ status: false, win: false });
  const [startGame, setStartGame] = useState(true);

  const resetGameOver = useCallback(() => {
    setGameOver({ status: false, win: false });
    setStartGame(false);
  }, []);

  const resetStartGame = useCallback(() => {
    setStartGame(true);
    setGameOver({status: false, win: false});
  }, []);

  return [gameOver, setGameOver, resetGameOver, startGame, setStartGame, resetStartGame];
};
