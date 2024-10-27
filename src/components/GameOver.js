import React from "react";
import "./GameOver.css";

const GameOver = ({ onRestart, win }) => {
  // Retrieve both player secrets from localStorage
  const player1Secret = localStorage.getItem("player1Secret");
  const player2Secret = localStorage.getItem("player2Secret");

  // Determine the message to display
  const winMessage = win ? "You Won!" : "You Lost";
  const lostSecret = win ? player2Secret : player1Secret; // Secret of the losing player

  return (
    <div className="Menu">
      <h1 className="gameover-header">Game Over</h1>
      <p className="gameover-title">{winMessage}</p>
      <p className="gameover-secret">Lost Player&apos;s Secret: <span>{lostSecret}</span></p>

      <div className="cybersecurity-info">
        <h2 className="gameover-title">Takeaways</h2>
        <p>
          Just like Tetris, cybersecurity is an ongoing, persistent game of cat and mouse between different parties.
          The purpose of our game was to highlight the importance of keeping your secrets safe - in the digital world, 
          secrets can be anything from passwords to personal information. Don't give it away too easily!
        </p>
        <h2>A few key takeaways:</h2>
        <ul>
          <li>Always use strong, unique passwords for different accounts.</li>
          <li>Be cautious about where you store sensitive information.</li>
          <li>Regularly update your passwords and security settings.</li>
          <li>Be aware of phishing attempts and other online threats.</li>
        </ul>
        <h3>
          Remember, in the game of cybersecurity, staying vigilant and informed is the key to winning.
        </h3>
      </div>

      <button className="Button" onClick={onRestart}>
        Play Again
      </button>
    </div>
  );
};

export default GameOver;