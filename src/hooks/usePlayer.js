import { useState, useCallback } from "react";

import { randomTetromino, TETROMINOES } from "/src/business/Tetrominoes";

const buildPlayer = (previous) => {
  let tetrominoes;

  if (previous) {
    tetrominoes = [...previous.tetrominoes];
    tetrominoes.unshift(randomTetromino());
  } else {
    tetrominoes = Array(5)
      .fill(0)
      .map((_) => randomTetromino());
  }

  return {
    collided: false,
    isFastDropping: false,
    position: { row: 0, column: 4 },
    tetrominoes,
    tetromino: tetrominoes.pop()
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
        ...prev.tetrominoes.slice(1),
        TETROMINOES.X
      ]
    }));
  }, []);

  return [player, setPlayer, resetPlayer, setNextTetrominoX];
};
