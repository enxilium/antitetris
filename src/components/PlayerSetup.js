import React, { useState } from "react";

const PlayerSetup = ({ onStartGame }) => {
  const [playerSecrets, setPlayerSecrets] = useState({ player1: "", player2: "" });
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [error, setError] = useState("");
  const [screen, setScreen] = useState("home"); // New state to track the current screen

  const handleNext = () => {
    if (!playerSecrets[`player${currentPlayer}`].trim()) {
      setError(`Player ${currentPlayer}'s secret cannot be empty.`);
      return;
    }

    setError(""); // Clear any previous errors

    if (currentPlayer === 1) {
      setCurrentPlayer(2);
    } else {
      localStorage.setItem("player1Secret", playerSecrets.player1);
      localStorage.setItem("player2Secret", playerSecrets.player2);
      onStartGame(); // Starts the game once both secrets are stored
    //   const player1Secret = localStorage.getItem("player1Secret");
    //   const player2Secret = localStorage.getItem("player2Secret");
    //   console.log(player1Secret);
    //   console.log(player2Secret);

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
      <h2 style={styles.heading}>Player {currentPlayer} Secret</h2>
      <input
        type="text"
        placeholder={`Enter Player ${currentPlayer}'s secret`}
        value={currentPlayer === 1 ? playerSecrets.player1 : playerSecrets.player2}
        onChange={handleChange}
        style={styles.input}
      />
      {error && <p style={styles.error}>{error}</p>}
      <button onClick={handleNext} style={styles.button}>
        {currentPlayer === 1 ? "Next" : "Start Game"}
      </button>
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
    color: "transparent"
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
};

export default PlayerSetup;