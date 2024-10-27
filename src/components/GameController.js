import "./GameController.css";

import { Action, actionForKey, actionIsDrop } from "/src/business/Input";
import { playerController } from "/src/business/PlayerController";

import { useDropTime } from "/src/hooks/useDropTime";
import { useInterval } from "/src/hooks/useInterval";

const socket = new WebSocket('ws://localhost:8080');

// Listen for messages from the server
socket.addEventListener('message', function (event) {
    console.log('Message from server:', event.data);
    // Update the DOM or perform other actions based on the received message
});

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
  setPlayer
}) => {
  const [dropTime, pauseDropTime, resumeDropTime] = useDropTime({
    gameStats
  });

  useInterval(() => {
    handleInput({ action: Action.SlowDrop });
  }, dropTime);

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
      setGameOver(true);
    } else {
      if (actionIsDrop(action)) pauseDropTime();
      if (!dropTime) {
        return;
      }
      handleInput({ action });
    }
  };

  const handleInput = ({ action }) => {
    playerController({
      action,
      board,
      player,
      setPlayer,
      setGameOver
    });
  };

  return (
    <input
      className="GameController"
      type="text"
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      autoFocus
    />
  );
};

export default GameController;
