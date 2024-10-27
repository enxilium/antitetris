import React, { useState, useEffect } from "react";
import { socket } from "./GameController";

const PlayerSetup = ({ onStartGame }) => {
  const [playerSecrets, setPlayerSecrets] = useState({ player1: "", player2: "" });
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [error, setError] = useState("");
  const [screen, setScreen] = useState("home");
  const [receivedSecret, setReceivedSecret] = useState(false);

  // Initialize WebSocket message listener
  useEffect(() => {
    console.log("PlayerSetup socket initialized");
    socket.addEventListener('message', function (event) {
      if (event.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = function() {
          const secret = reader.result;
          console.log('Secret received:', secret);
          
          // Store the received secret
          setPlayerSecrets(prev => ({
            ...prev,
            player2: secret
          }));
          setReceivedSecret(true);

          // If we have both secrets, start the game
          if (playerSecrets.player1) {
            localStorage.setItem("player1Secret", playerSecrets.player1);
            localStorage.setItem("player2Secret", secret);
            onStartGame();
          }
        };
        reader.readAsText(event.data);
      }
    });
  }, []);

  const handleNext = () => {
    if (!playerSecrets[`player${currentPlayer}`].trim()) {
      setError(`Player ${currentPlayer}&apos;s secret cannot be empty.`);
      return;
    }

    setError(""); // Clear any previous errors

    // Send the secret using the socket
    if (socket.readyState === WebSocket.OPEN) {
      // Convert the secret to a Blob to match the receiving format
      const secretBlob = new Blob([playerSecrets[`player${currentPlayer}`]], { type: 'text/plain' });
      socket.send(secretBlob);
      console.log('Secret sent:', playerSecrets[`player${currentPlayer}`]);

      // If we've already received the other player's secret, start the game
      if (receivedSecret) {
        localStorage.setItem("player1Secret", playerSecrets.player1);
        localStorage.setItem("player2Secret", playerSecrets.player2);
        onStartGame();
      }
    } else {
      setError("Not connected to game server");
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setPlayerSecrets((prev) => ({
      ...prev,
      [`player${currentPlayer}`]: value,
    }));
  };

  // Render the home screen with the "Start" button
  if (screen === "home") {
    return (
      <div>
        <h1 style={styles.title}>Tetris</h1>
        <button onClick={() => setScreen("setup")} style={styles.startButton}>
          Start
        </button>
      </div>
    );
  }

  // Render the player setup screen
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Enter Your Secret</h2>
      <input
        type="text"
        placeholder="Enter your secret"
        value={playerSecrets[`player${currentPlayer}`]}
        onChange={handleChange}
        style={styles.input}
      />
      {error && <p style={styles.error}>{error}</p>}
      <button onClick={handleNext} style={styles.button}>
        Submit Secret
      </button>
      {receivedSecret && <p style={styles.info}>Received opponent's secret. Game will start soon...</p>}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    color: "white"
  },
  title: {
    fontSize: "4rem",
    marginBottom: "2rem",
  },
  startButton: {
    padding: "1rem 2rem",
    fontSize: "1.5rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    boxShadow: "rgba(0, 0, 0, 0.5) 0px 0px 60px",
  },
  heading: {
    fontSize: "1.5rem",
    marginBottom: "1em",
  },
  input: {
    padding: "0.5em",
    fontSize: "1rem",
    marginBottom: "1em",
    width: "80%",
    maxWidth: "300px",
  },
  button: {
    padding: "20px 40px",
    fontSize: "2em",
    borderRadius: "20px",
    border: "none",
    boxShadow: "rgba(0, 0, 0, 0.5) 0px 0px 60px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginBottom: "1em",
  },
  info: {
    color: "green",
    marginTop: "1em",
  }
};

export default PlayerSetup;