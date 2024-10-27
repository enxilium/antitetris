import React, { useEffect } from "react";
import "./GameController.css";

import { Action, actionForKey, actionIsDrop } from "/src/business/Input";
import { playerController } from "/src/business/PlayerController";

import { useDropTime } from "/src/hooks/useDropTime";
import { useInterval } from "/src/hooks/useInterval";

export const socket = new WebSocket('wss://cyberattackertetris-production.up.railway.app');
// Send a message to the server
export function SendMessage(data) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(data);
  } else {
    console.error('WebSocket is not open');
  }
}

const GameController = ({
  board,
  gameStats,
  player,
  setGameOver,
  setPlayer,
  setStartGame
}) => {
  const [dropTime, pauseDropTime, resumeDropTime] = useDropTime({
    gameStats
  });

  useInterval(() => {
    handleInput({ action: Action.SlowDrop });
  }, dropTime);

  const handleInput = ({ action }) => {
    playerController({
      action,
      board,
      player,
      setPlayer,
      setGameOver
    });
  };

  const onKeyUp = ({ code }) => {
    const action = actionForKey(code);
    if (actionIsDrop(action)) resumeDropTime();
  };

  const onKeyDown = ({ code }) => {
    const action = actionForKey(code);

    if (action === Action.Pause) {
      if (dropTime) {
        pauseDropTime();
      } else {
        resumeDropTime();
      }
    } else if (action === Action.Quit) {
      setStartGame(true);
    } else {
      if (actionIsDrop(action)) pauseDropTime();
      if (!dropTime) {
        return;
      }
      handleInput({ action });
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [dropTime, onKeyDown, onKeyUp]);

  return (
    <div className="GameController">
    </div>
  );
};

export default GameController;