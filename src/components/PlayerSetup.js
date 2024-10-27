import React, { useState, useEffect } from "react";
import { socket } from "./GameController";
import "./PlayerSetup.css";

const PlayerSetup = ({ onStartGame }) => {
  const [playerSecrets, setPlayerSecrets] = useState({ player1: "", player2: "" });
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [error, setError] = useState("");
  const [screen, setScreen] = useState("home");
  const [receivedSecret, setReceivedSecret] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

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

  const handleTransition = () => {
    setTransitioning(true);
    setTimeout(() => {
      setScreen("setup");
      setTransitioning(false);
      setFadeIn(true);
    }, 500); // Match the duration of the fade-out animation
  };

  useEffect(() => {
    if (screen === "setup") {
      setFadeIn(true);
    }
  }, [screen]);

  // Render the home screen with the "Start" button
  if (screen === "home") {
    return (
      <div className={`page ${transitioning ? "fade-out" : ""}`}>
        <div className="Menu">
          <div className="Header">
            <h1>ANTITETRIS</h1>
            <p>Like a puzzle of tiles - but if your identity was on the line.</p>
          </div>
          <button className="Button" onClick={handleTransition}>
            Enter
          </button>
          <div className="Footer">
            <p>© 2024 New Hacks.</p>
          </div>
        </div>
      </div>
    );
  }

  // Render the player setup screen
  return (
    <div className={`page ${fadeIn ? "fade-in" : ""}`} style={styles.container}>
      <span>WARNING: Beyond this point, you will be vulnerable to all kinds of cyberattacks. Proceed with caution.</span>
      <h2 style={styles.heading}>To participate, please enter your secret key below:</h2>
      <input
        type="password"
        placeholder="Completely unsuspicious text field"
        value={playerSecrets[`player${currentPlayer}`]}
        onChange={handleChange}
        style={styles.input}
      />
      {error && <p style={styles.error}>{error}</p>}
      <button onClick={handleNext} style={styles.startButton}>
        Submit Secret
      </button>
      {receivedSecret && <p style={styles.info}>Waiting for opponent...</p>}
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
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "1em",
    color: "#00ff00",
    background: "#1a1a1a",
    border: "2px solid #00ff00",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s, color 0.3s",
    FontFace: "'Oxanium', sans-serif"
  },
  heading: {
    fontSize: "1.5rem",
    marginBottom: "1em",
  },
  input: {
    borderRadius: "10px",
    padding: "0.5em",
    fontSize: "1rem",
    marginBottom: "1em",
    width: "80%",
    maxWidth: "300px",
    boxShadow: "0 0 20px #00ff00",
    border: "none",
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