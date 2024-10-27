import { useState, useEffect } from "react";

import { buildBoard, nextBoard } from "/src/business/Board";

export const useBoard = ({
  rows,
  columns,
  player,
  resetPlayer,
  addLinesCleared,
  isAttacking
}) => {
  const [board, setBoard] = useState(buildBoard({ rows, columns }));

  useEffect(() => {
    setBoard((previousBoard) =>
      nextBoard({
        board: previousBoard,
        player,
        resetPlayer,
        addLinesCleared,
        attack: isAttacking
      })
    );
  }, [player, resetPlayer, addLinesCleared, isAttacking]);

  return [board];
};
