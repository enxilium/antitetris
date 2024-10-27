import React, { useState } from "react";

const PlayerSetup = ({ onStartGame }) => {
  const [playerSecrets, setPlayerSecrets] = useState({ player1: "", player2: "" });
  const [currentPlayer, setCurrentPlayer] = useState(1);

  const handleNext = () => {
    if (currentPlayer === 1) {
      setCurrentPlayer(2);
    } else {
        // storing in the browser storage
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

  return (
    <div>
      <h2 style={styles.heading}>Player {currentPlayer} Secret</h2>
      <input
        type="text"
        placeholder={`Enter Player ${currentPlayer}'s secret`}
        value={currentPlayer === 1 ? playerSecrets.player1 : playerSecrets.player2}
        onChange={handleChange}
        style={styles.input}
      />
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
    backgroundColor: "#f8f9fa",
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
    padding: "0.8em 1.5em",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default PlayerSetup;
