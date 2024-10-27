import React, { useState, useCallback, useEffect } from "react";
import "./Tetris.css";

import Board from "/src/components/Board";
import GameController from "/src/components/GameController";
import GameStats from "/src/components/GameStats";
import Previews from "/src/components/Previews";
import Questions, { questions } from "/src/components/Questions";

import { useBoard } from "/src/hooks/useBoard";
import { useGameStats } from "/src/hooks/useGameStats";
import { usePlayer } from "/src/hooks/usePlayer";

const Tetris = ({ rows, columns, setGameOver, setStartGame }) => {
  const [gameStats, addLinesCleared] = useGameStats();
  const [currentQuestion, setCurrentQuestion] = useState(questions[0][0]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAttacking, setIsAttacking] = useState(false);
  const [isBlackedOut, setIsBlackedOut] = useState(false);
  const [incrementBar, setIncrementBar] = useState(0);
  const [isQuestionVisible, setIsQuestionVisible] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timer, setTimer] = useState(3); // Timer state
  const [blackoutInput, setBlackoutInput] = useState(""); // Input for blackout
  const [inputError, setInputError] = useState(false); // Error state for input
  const incrementNames = ["Beginner", "Intermediate", "Advanced", "Expert"]; // Names for the increment bar
  const [incrementName, setIncrementName] = useState(incrementNames[0]); // Initial name
  const typingLists = [
    "aB3$dE7fH1",
    "8gF*eH2#tQ",
    "nP4@rJ6$sZ",
    "kM9!vD1^xW",
    "uL2&hR8*oY",
    "1eW!zY5#qT",
    "xN3^bT7&rS",
    "vK7!gD2@jJ",
    "qF4*rL1#eV",
    "pZ5&nE9^wF",
    "hX3$kL8!yM",
    "rQ9!bV2#tD",
    "sY7^hJ4&kP",
    "mN2*eR1@zF",
    "cB8^fH3!jQ",
    "dX4@vT6#pS",
    "tK5!gQ9^wA",
    "lJ2&nR1*eT",
    "oF3@jD7#yW",
    "bM8!vK2^hR"
  ]; // State to store typing lists
  const [currentBlackoutCode, setCurrentBlackoutCode] = useState(""); // Current code to remove blackout

  const changeQuestion = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex][0]);
    setCurrentQuestionIndex(randomIndex);
    setTimer(3); // Reset timer when changing question
  }, []);

  const [player, setPlayer, resetPlayer, setNextTetrominoX] = usePlayer(changeQuestion);
  const memoizedAddLinesCleared = useCallback((lines) => {
    addLinesCleared(lines);
    setIncrementBar((prev) => {
      const newIncrement = prev + 0.5;
      if (newIncrement % 2 === 0) { // Check if the value is 2, 4, 6, or 8
        updateIncrementName(newIncrement);
      }
      return newIncrement;
    });
  }, [addLinesCleared]);

  const [board, setBoard] = useBoard({
    rows,
    columns,
    player,
    resetPlayer,
    addLinesCleared: memoizedAddLinesCleared,
    isAttacking
  });

  const handleAttack = () => {
    setIsAttacking(true);
    setTimeout(() => setIsAttacking(false), 100);
  };

  const handleBlackout = () => {
    setIsBlackedOut(true);
    const randomIndex = Math.floor(Math.random() * typingLists.length);
    setCurrentBlackoutCode(typingLists[randomIndex]); // Set a random code from typingLists
    setBlackoutInput(""); // Reset the input
    setInputError(false);
  };
  const handleNextX = () => {
    setNextTetrominoX();
  };
  const toggleQuestionVisibility = () => {
    if (!isQuestionVisible) {
      setIsQuestionVisible(true);
      setCorrectAnswers(0);
      changeQuestion();
    }
  };
  const handleAction = (action) => {
    if (action === 1) {
      toggleQuestionVisibility();
    } else if (action === 2) {
      handleBlackout();
    } else if (action === 3) {
      handleAttack();
    } else if (action >= 4) {
      handleNextX();
    }
    setIncrementBar(0);
    updateIncrementName(0); // Reset styles when action is taken
  };

  const handleKeyPress = useCallback((event) => {
    if (isBlackedOut) {
      if (event.key.length === 1) { // Only process single character keys
        setBlackoutInput((prev) => {
          const newInput = prev + event.key;
          if (newInput === currentBlackoutCode) {
            setIsBlackedOut(false);
            return "";
          }
          return newInput;
        });
      } else if (event.key === "Backspace") {
        setBlackoutInput((prev) => prev.slice(0, -1)); // Remove last character
      }
    } else {
      if (event.key === '1') {
        handleAction(2);
      } else if (event.key === '2') {
        const correctAnswer = questions[currentQuestionIndex][1];
        if (correctAnswer === 0) {
          setCorrectAnswers(prev => {
            const newCount = prev + 1;
            if (newCount >= 5) {
              setIsQuestionVisible(false);
            }
            return newCount;
          });
          changeQuestion(); // Move to the next question if correct
        } else {
          setIsQuestionVisible(false);
          handleNextX(); // Handle incorrect answer
        }
      } else if (event.key === '3') {
        const correctAnswer = questions[currentQuestionIndex][1];
        if (correctAnswer === 1) {
          setCorrectAnswers(prev => {
            const newCount = prev + 1;
            if (newCount >= 5) {
              setIsQuestionVisible(false);
            }
            return newCount;
          });
          changeQuestion(); // Move to the next question if correct
        } else {
          setIsQuestionVisible(false);
          handleNextX(); // Handle incorrect answer
        }
      }
    }
  }, [incrementBar, isQuestionVisible, currentQuestionIndex, changeQuestion, isBlackedOut, currentBlackoutCode]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    let countdown;
    if (isQuestionVisible) {
      countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            handleNextX(); // Call handleNextX when timer runs out
            setIsQuestionVisible(false); // Hide question
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [isQuestionVisible]);

  const updateIncrementName = (value) => {
    if (value === 0) {
      setIncrementName(incrementNames[0]); // Reset to Beginner
      document.documentElement.style.setProperty('--bar-color', 'grey'); // Reset to basic color
      document.documentElement.style.setProperty('--bar-glow', 'grey'); // Remove glow effect
    } else if (value >= 8) {
      setIncrementName(incrementNames[3]); // Expert
      document.documentElement.style.setProperty('--bar-color', '#EF5350'); // Most fancy color
      document.documentElement.style.setProperty('--bar-glow', '0 0 30px #EF5350'); // Glow effect
    } else if (value >= 6) {
      setIncrementName(incrementNames[2]); // Advanced
      document.documentElement.style.setProperty('--bar-color', '#FFA726'); // Fancier color
      document.documentElement.style.setProperty('--bar-glow', '0 0 30px #FFA726'); // Glow effect
    } else if (value >= 4) {
      setIncrementName(incrementNames[1]); // Intermediate
      document.documentElement.style.setProperty('--bar-color', '#FFA726'); // Intermediate color
      document.documentElement.style.setProperty('--bar-glow', '0 0 30px #FFA726'); // Glow effect
    } else if (value >= 2) {
      setIncrementName(incrementNames[0]); // Beginner
      document.documentElement.style.setProperty('--bar-color', '#4CAF50'); // Basic color
      document.documentElement.style.setProperty('--bar-glow', '0 0 20px #4CAF50'); // Glow effect
    }
  };

  const incrementBarValue = () => {
    setIncrementBar((prev) => {
      const newValue = prev + 0.5;
      if (newValue % 2 === 0) { // Check if the value is 2, 4, 6, or 8
        updateIncrementName(newValue);
      }
      return newValue;
    });
  };

  return (
    <div className="Tetris">
      <div>
        {isQuestionVisible && (
          <div className="cyber-question">
            <Questions currentQuestion={currentQuestion} />
            <div className="timer">Time Left: {timer}s</div>
          </div>
        )}
        <div className="button-container">
          <button onClick={handleAttack}>Attack!</button>
          <button onClick={handleBlackout}>Blackout</button>
          <button onClick={handleNextX}>Next X</button>
          <button onClick={toggleQuestionVisibility}>Toggle Questions</button>
        </div>
        <h1> Power Gauge: {incrementName} </h1> {/* Display the current name */}
        <div className="increment-bar">
          <div className="bar" style={{ width: `${(incrementBar % 2 / 2) * 100}%` }}></div> {/* Adjusted width */}
        </div>
        <div className="increment-value">{incrementBar}</div> {/* Display the increment value separately */}
        <button onClick={incrementBarValue}>Increment Bar</button> {/* New button to increment the bar */}
        {isQuestionVisible && <p>Correct Answers: {correctAnswers}/5</p>}
      </div>
      <div className="board-container">
        <Board board={board} />
        <div className={`blackout-overlay ${isBlackedOut ? 'visible' : 'hidden'}`}>
          <p>Type the following code to remove blackout:</p>
          <p className="blackout-code">{currentBlackoutCode}</p> {/* Display the random code */}
          <div className="blackout-input">{blackoutInput}</div> {/* Display the user's input */}
        </div>
      </div>
      <div className="panel">
        <Previews tetrominoes={player.tetrominoes} />
        <GameStats gameStats={gameStats} />
      </div>
      <GameController
        board={board}
        gameStats={gameStats}
        player={player}
        setGameOver={setGameOver}
        setPlayer={setPlayer}
        setStartGame={setStartGame}
      />
    </div>
  );
};

export default Tetris;
