import { useState, useCallback } from "react";
import { randomTetromino, TETROMINOES } from "/src/business/Tetrominoes";

const buildPlayer = (previous) => {
  let tetrominoes;
  let currentTetromino;

  if (previous) {
    tetrominoes = [...previous.tetrominoes];
    currentTetromino = tetrominoes.shift();
    tetrominoes.push(randomTetromino());
  } else {
    tetrominoes = Array(5)
      .fill(0)
      .map((_) => randomTetromino());
    currentTetromino = tetrominoes.shift();
  }

  return {
    collided: false,
    isFastDropping: false,
    position: { row: 0, column: 4 },
    tetrominoes,
    tetromino: currentTetromino
  };
};

export const usePlayer = (changeQuestion) => {
  const [player, setPlayer] = useState(buildPlayer());

  const resetPlayer = useCallback(() => {
    setPlayer((prev) => buildPlayer(prev));
  }, [changeQuestion]);

  const setNextTetrominoX = useCallback(() => {
    setPlayer((prev) => ({
      ...prev,
      tetrominoes: [
        TETROMINOES.X,
        TETROMINOES.X,
        TETROMINOES.X,
        ...prev.tetrominoes.slice(3, -3)
      ]
    }));
  }, []);

  return [player, setPlayer, resetPlayer, setNextTetrominoX];
};
